// pages/api/health.js
import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Método ${req.method} não permitido`)
  }

  // 1) Verifica API Next.js está respondendo
  const apiOk = true

  // 2) Verifica conexão com o banco Supabase
  const { error } = await supabase
    .from('projetos')
    .select('id')
    .limit(1)

  if (error) {
    return res.status(500).json({
      status: 'error',
      api: apiOk,
      db: false,
      message: error.message
    })
  }

  // 3) Tudo certo
  res.status(200).json({
    status: 'ok',
    api: apiOk,
    db: true
  })
}
