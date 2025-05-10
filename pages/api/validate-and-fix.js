// pages/api/validate-and-fix.js
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  // 1) sanity‐check GET
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, note: 'GET ok' });
  }

  // 2) somente POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST' });
  }

  const { texto } = req.body || {};
  if (!texto || typeof texto !== 'string') {
    return res.status(400).json({ error: 'Campo "texto" é obrigatório.' });
  }

  try {
    // 3) chama OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Gere apenas JSON puro de arquivos, sem explicações.' },
        { role: 'user',   content: texto }
      ],
      temperature: 0.2,
    });

    // 4) limpa possíveis ````json``` fences
    let content = completion.choices?.[0]?.message?.content || '';
    content = content.replace(/```(?:json)?/g, '').trim();

    // 5) parse e retorna JSON puro
    const json = JSON.parse(content);
    return res.status(200).json(json);

  } catch (err) {
    console.error('[validate-and-fix]', err);
    return res.status(500).json({ error: 'Falha na validação com a IA.' });
  }
}
