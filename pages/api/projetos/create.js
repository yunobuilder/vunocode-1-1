import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const { nome } = req.body
  if (!nome) return res.status(400).json({ error: 'Nome do projeto é obrigatório.' })

  const base = path.join(process.cwd(), 'projetos', nome)
  if (!fs.existsSync(base)) {
    fs.mkdirSync(base, { recursive: true })
    fs.mkdirSync(path.join(base, 'uploads'))
    fs.writeFileSync(path.join(base, 'estrategia.txt'), '')
    fs.writeFileSync(path.join(base, 'fases.json'), JSON.stringify([]))
  }

  res.status(200).json({ ok: true })
}
