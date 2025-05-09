import OpenAI from 'openai';
const openai = new OpenAI();
export default async function handler(req, res) {
  const { code } = req.body;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Você é um Assistente de Código que explica trechos de código.' },
      { role: 'user', content: "Explique este código:\n```" + code + "```" }
    ]
  });
  res.status(200).json({ explanation: completion.choices[0].message.content });
}
