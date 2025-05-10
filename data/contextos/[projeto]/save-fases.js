import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' })

  const { projeto, fases } = req.body
  if (!projeto || !Array.isArray(fases)) return res.status(400).json({ erro: 'Dados inválidos.' })

  const dir = path.join(process.cwd(), 'data/contextos', projeto)
  const filePath = path.join(dir, 'fases.json')

  try {
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(filePath, JSON.stringify(fases, null, 2))
    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao salvar fases.' })
  }
}
