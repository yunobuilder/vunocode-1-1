// pages/api/projetos/chat-ia.js
import OpenAI from 'openai'
import fs from 'fs/promises'
import path from 'path'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req, res) {
  // 1) Only POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ errorCode: 'METHOD_NOT_ALLOWED', message: 'Use POST.' })
  }

  // 2) Validate request body
  const { projeto, mensagens } = req.body || {}
  if (!projeto || typeof projeto !== 'string') {
    return res.status(400).json({ errorCode: 'INVALID_PROJECT', message: 'Campo "projeto" é obrigatório.' })
  }
  if (!Array.isArray(mensagens)) {
    return res.status(400).json({ errorCode: 'INVALID_MESSAGES', message: 'Campo "mensagens" deve ser um array.' })
  }

  // 3) Sanitize project name
  const projectName = projeto.replace(/[\\/]+/g, '-')
  if (projectName.includes('..')) {
    return res.status(400).json({ errorCode: 'INVALID_PROJECT_NAME', message: 'Nome de projeto inválido.' })
  }

  // 4) Build context path
  const basePath = path.join(process.cwd(), 'data', 'contextos', projectName)

  // Helper to read file if exists
  async function readIfExists(p) {
    try {
      await fs.access(p)
      return await fs.readFile(p, 'utf8')
    } catch {
      return ''
    }
  }

  // 5) Load project context
  const estrategia = await readIfExists(path.join(basePath, 'estrategia.txt'))
  const fases = await readIfExists(path.join(basePath, 'fases.json'))
  const arquivos = await readIfExists(path.join(basePath, 'arquivos.json'))

  const contextoBase = `
Você está atuando como VunoIA no projeto "${projeto}".

📌 Estratégia:
${estrategia}

📋 Fases definidas:
${fases}

📎 Arquivos enviados:
${arquivos}

Responda com base neste projeto, seja técnico, objetivo e útil.
`.trim()

  try {
    // 6) Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: contextoBase },
        ...mensagens
      ],
      temperature: 0.3,
    })

    const resposta = completion.choices?.[0]?.message?.content
    if (!resposta) throw new Error('Resposta vazia da IA')
    return res.status(200).json({ resposta })
  } catch (err) {
    console.error('[chat-ia] erro:', err)
    return res.status(500).json({ errorCode: 'OPENAI_ERROR', message: 'Falha ao consultar IA.', details: err.message })
  }
}