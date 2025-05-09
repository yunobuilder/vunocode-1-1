import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { instruction } = req.body
  if (!instruction || instruction.length < 5) {
    return res.status(400).json({ error: 'Instrução inválida ou curta demais.' })
  }

  try {
    const prompt = `
Você é uma IA dentro do sistema VUNOCODE. 
Sua missão é transformar a seguinte ideia em uma sugestão de roadmap de módulos a serem criados:

"${instruction}"

Retorne apenas os nomes dos módulos e componentes sugeridos.
    `.trim()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Você é uma IA de sugestão técnica para roadmap modular.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.4
    })

    const suggestion = completion.choices[0].message.content.trim()
    return res.status(200).json({ suggestion })
  } catch (err) {
    console.error('[roadmapSuggest] ERRO:', err)
    return res.status(500).json({ error: 'Erro interno ao gerar sugestão.' })
  }
}
