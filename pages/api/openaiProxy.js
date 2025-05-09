import { Configuration, OpenAIApi } from 'openai'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Método ${req.method} não permitido` })
  }

  const { prompt } = req.body
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'É necessário enviar um campo "prompt" como string.' })
  }

  // Configuração com a nova versão GPT-4o
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Você é um tradutor de linguagem natural para estrutura de arquivos em JSON, no formato:
[
  { "path": "src/pages/MeuArquivo.jsx", "content": "<conteúdo do arquivo>" }
]
Responda **apenas** com esse JSON, sem explicações adicionais.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 2000
    })

    const text = completion.data.choices[0].message.content.trim()
    let data
    try {
      data = JSON.parse(text)
    } catch (parseErr) {
      console.error('Erro ao fazer parse do JSON retornado pela IA:', parseErr)
      return res.status(500).json({ error: 'Resposta da IA não estava em JSON válido.' })
    }

    return res.status(200).json({ files: data })
  } catch (err) {
    console.error('Erro ao chamar OpenAI:', err)
    return res.status(500).json({ error: 'Falha ao consultar a OpenAI.' })
  }
}
