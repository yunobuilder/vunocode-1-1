import OpenAI from 'openai';
const openai = new OpenAI();
export default async function handler(req, res) {
  const { context } = req.body;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Você é uma IA especialista em sugerir módulos de sistema.' },
      { role: 'user', content: `Com base neste contexto de projeto, sugira quais módulos criar:\n${context}` }
    ]
  });
  res.status(200).json({ suggestions: completion.choices[0].message.content });
}
