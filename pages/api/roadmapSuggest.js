import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' })

  const { projeto, instruction = 'Sugira um novo módulo útil para esse projeto.' } = req.body
  if (!projeto) return res.status(400).json({ erro: 'Projeto não informado' })

  const contexto = carregarContexto(projeto)

  const prompt = `
Você é uma IA que gera módulos inteligentes com base no contexto de um projeto.

📁 Projeto: ${projeto}

📌 Estratégia:
${contexto.estrategia || 'Não definida'}

📋 Fases:
${contexto.fases || '[]'}

📎 Arquivos:
${contexto.arquivos || '[]'}

💬 Última conversa:
${contexto.chat || 'Nenhuma'}

🎯 Solicitação:
${instruction}

🧠 Retorne no seguinte formato JSON:

{
  "description": "Resumo do módulo",
  "pages": [
    { "name": "Arquivo.jsx", "path": "src/pages/Arquivo.jsx", "overwrite": true, "content": "..." }
  ],
  "api": [
    { "name": "api.js", "path": "src/pages/api/api.js", "overwrite": true, "content": "..." }
  ],
  "linksToAdd": ["/rota-gerada"],
  "futureIdeas": ["Melhoria futura 1", "Melhoria futura 2"]
}
  `.trim()

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Você é um gerador de módulos para sistemas web fullstack.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
    })

    const resposta = completion.choices[0].message.content.trim()
    let parsed = {}

    try {
      parsed = JSON.parse(resposta)
    } catch {
      return res.status(500).json({ erro: 'Resposta da IA não está em JSON válido.', raw: resposta })
    }

    return res.status(200).json({ sugestao: parsed })
  } catch (err) {
    console.error('[roadmapSuggest] Erro:', err)
    return res.status(500).json({ erro: 'Erro ao gerar sugestão via IA.' })
  }
}

function carregarContexto(projeto) {
  const base = path.join(process.cwd(), 'data/contextos', projeto)

  const ler = (arquivo) => {
    try {
      const full = path.join(base, arquivo)
      if (fs.existsSync(full)) return fs.readFileSync(full, 'utf8')
    } catch {}
    return ''
  }

  return {
    estrategia: ler('estrategia.txt'),
    fases: ler('fases.json'),
    arquivos: ler('arquivos.json'),
    chat: ler('chat.log.json'),
  }
}
