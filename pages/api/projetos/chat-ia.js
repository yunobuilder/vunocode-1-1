import { Configuration, OpenAIApi } from 'openai'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || '',
})

const openai = new OpenAIApi(config)

export default async function handler(req, res) {
  const { projeto, pergunta } = req.body

  if (!pergunta) {
    return res.status(400).json({ erro: 'Pergunta não fornecida.' })
  }

  try {
    const resposta = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Você é o VunoIA, assistente inteligente do projeto "${projeto}". Responda com clareza e estratégia.`,
        },
        {
          role: 'user',
          content: pergunta,
        },
      ],
    })

    const respostaIA = resposta.data.choices[0].message.content
    res.status(200).json({ resposta: respostaIA })
 } catch (err) {
  console.error('Erro na IA ➜', {
    status: err.response?.status,
    data: err.response?.data || err.message,
  })
  
  res.status(err.response?.status || 500).json({
    erro: err.response?.data?.error?.message || err.message,
  })
}

}
