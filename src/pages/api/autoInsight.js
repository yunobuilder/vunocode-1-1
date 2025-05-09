// src/pages/api/autoInsight.js
import { promises as fs } from 'fs'
import path from 'path'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const basePath = path.join(process.cwd(), 'vunocode-2.0-core')
    const arquivos = await listarArquivosRecursivamente(basePath)

    const prompt = `
Você é um especialista em arquiteturas de software modernas.
Com base na estrutura de pastas e arquivos abaixo, diga quais módulos ainda faltam para transformar o projeto em um sistema SaaS completo e inteligente.

Estrutura:
${arquivos.join('\n')}

Responda com sugestões diretas para evolução do projeto.
    `.trim()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Você é um arquiteto sênior que sugere melhorias no sistema.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3
    })

    const texto = completion.choices[0].message.content
    return res.status(200).json({ sugestoes: texto })
  } catch (err) {
    console.error('[autoInsight] Erro:', err.message)
    return res.status(500).json({ error: 'Falha ao gerar insight.' })
  }
}

async function listarArquivosRecursivamente(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const arquivos = await Promise.all(entries.map(async entry => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      return listarArquivosRecursivamente(fullPath)
    } else {
      return path.relative(process.cwd(), fullPath)
    }
  }))
  return arquivos.flat()
}
