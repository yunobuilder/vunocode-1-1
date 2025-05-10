import OpenAI from 'openai'
import { promises as fs } from 'fs'
import path from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Se falhar, essa estrutura é usada como fallback
const fallbackSuggestion = {
  description: 'Criar o módulo Perfil com visualização completa e API para atualização de dados pessoais.',
  pages: [
    {
      name: 'perfil.jsx',
      path: 'src/pages/perfil.jsx',
      overwrite: true,
      content: `// Página Perfil gerada automaticamente
export default function Perfil() {
  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold text-purple-700'>Perfil 🚀</h1>
      <p className='mt-2 text-gray-600'>Conteúdo automático sugerido pela IA.</p>
    </div>
  );
}`
    }
  ],
  api: [
    {
      name: 'perfil.js',
      path: 'src/pages/api/perfil.js',
      overwrite: true,
      content: `// API Perfil gerada automaticamente
export default function handler(req, res) {
  res.status(200).json({ message: 'API Perfil funcionando.' });
}`
    }
  ],
  linksToAdd: ['/perfil'],
  futureIdeas: [
    'Adicionar suporte a avatar com upload.',
    'Incluir módulo de notificações em tempo real.',
    'Criar logs automáticos de atualização de perfil.'
  ]
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ message: 'Método não permitido. Use GET.' })
  }

  const filePath = path.join(process.cwd(), 'data', 'projectContext.json')
  let contextData = 'Nenhum contexto encontrado.'

  try {
    const raw = await fs.readFile(filePath, 'utf8')
    contextData = raw.trim() || contextData
  } catch (err) {
    // Se não existir, usa texto padrão
  }

  try {
    const prompt = `
Contexto do projeto:
${contextData}

Com base nesse contexto, sugira um novo módulo completo. A resposta deve estar neste formato JSON:

{
  "description": "...",
  "pages": [
    { "name": "...", "path": "...", "overwrite": true, "content": "..." }
  ],
  "api": [
    { "name": "...", "path": "...", "overwrite": true, "content": "..." }
  ],
  "linksToAdd": ["..."],
  "futureIdeas": ["..."]
}

Apenas retorne o JSON, sem explicações.
    `.trim()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Você é um assistente que gera módulos JSON para sistemas fullstack com base no contexto do projeto.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2
    })

    const resposta = completion.choices[0].message.content.trim()

    let parsed
    try {
      parsed = JSON.parse(resposta)
    } catch (jsonErr) {
      console.warn('Falha ao converter JSON da IA. Usando fallback.')
      return res.status(200).json({ suggestion: fallbackSuggestion, context: contextData })
    }

    return res.status(200).json({ suggestion: parsed, context: contextData })

  } catch (error) {
    console.error('[suggestModule] Erro ao gerar com IA:', error)
    return res.status(200).json({ suggestion: fallbackSuggestion, context: contextData })
  }
}
