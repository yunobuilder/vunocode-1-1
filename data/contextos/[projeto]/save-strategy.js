import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' })

  const { projeto, texto } = req.body
  if (!projeto || !texto) return res.status(400).json({ erro: 'Projeto ou texto ausente.' })

  const dir = path.join(process.cwd(), 'data/contextos', projeto)
  const filePath = path.join(dir, 'estrategia.txt')

  try {
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(filePath, texto)
    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ erro: 'Falha ao salvar estratégia.' })
  }
}
