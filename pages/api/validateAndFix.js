// pages/api/validateAndFix.js
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { texto } = req.body
  if (!texto || texto.length < 10) {
    return res.status(400).json({ error: 'Texto insuficiente para validar.' })
  }

  try {
    const prompt = `
Você é um gerador de arquivos para o sistema VUNOCODE.
Retorne apenas um JSON válido no formato abaixo. Não escreva explicações.

Formato esperado:
{
  "arquivos": [
    {
      "path": "src/pages/exemplo.jsx",
      "content": "// código JSX, TSX, ou outro"
    }
  ]
}

⚠️ Retorne SOMENTE o JSON puro. Não adicione comentários ou HTML.

Instrução:
"""${texto}"""
    `.trim()

    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Você gera apenas JSON de instruções para criação de arquivos em um projeto.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2
    })

    const output = completion.data.choices[0].message.content.trim()

    // Segurança: ignora resposta que parece HTML ou Markdown
    if (!output.startsWith('{') || output.includes('<!DOCTYPE') || output.includes('<html')) {
      return res.status(400).json({ error: 'A resposta da IA não foi um JSON válido.' })
    }

    const json = JSON.parse(output)

    // Validação básica do JSON
    if (!json.arquivos || !Array.isArray(json.arquivos)) {
      return res.status(400).json({ error: 'Estrutura inválida. Esperado { arquivos: [...] }' })
    }

    return res.status(200).json({ validado: true, jsonCorrigido: json })

  } catch (err) {
    console.error('[validateAndFix] ERRO:', err.message)
    return res.status(500).json({ error: 'Falha ao validar ou formatar a instrução.' })
  }
}
