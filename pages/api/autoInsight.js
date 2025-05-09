// pages/api/autoInsight.js
import { analisarProjeto } from '../../src/ai/autoInsight'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido. Use GET.' })
  }

  try {
    const sugestoes = await analisarProjeto()
    return res.status(200).json({ sugestoes })
  } catch (err) {
    console.error('[autoInsight] ERRO:', err)
    return res.status(500).json({ error: 'Falha na análise do projeto.' })
  }
}
