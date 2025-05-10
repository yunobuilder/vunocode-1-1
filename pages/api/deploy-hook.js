export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Use POST.' })

  try {
    const webhookUrl = process.env.VERCEL_DEPLOY_HOOK_URL
    if (!webhookUrl) {
      return res.status(400).json({ message: 'Webhook não configurado no .env' })
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
    })

    if (!response.ok) throw new Error('Erro ao acionar webhook')

    res.status(200).json({ ok: true, message: 'Deploy enviado com sucesso!' })
  } catch (err) {
    console.error('[deploy-hook]', err)
    res.status(500).json({ error: 'Falha ao executar deploy automático.' })
  }
}
