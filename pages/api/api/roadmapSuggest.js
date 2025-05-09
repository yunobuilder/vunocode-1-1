import OpenAI from 'openai'
import { createPromptFromRoadmap } from '../../helpers/createPromptFromRoadmap'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const promptBase = createPromptFromRoadmap()
    const instruction = req.body.instruction || 'Crie um módulo novo relevante ao projeto.'

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Você é uma IA que gera módulos completos com base no roadmap do projeto.' },
        { role: 'user', content: `${promptBase}\n\nSolicitação: ${instruction}` }
      ],
      temperature: 0.3
    })

    const output = completion.choices[0].message.content.trim()
    return res.status(200).json({ suggestion: output })
  } catch (err) {
    console.error('[roadmapSuggest] ERRO:', err)
    return res.status(500).json({ error: 'Falha ao gerar sugestão.' })
  }
}
