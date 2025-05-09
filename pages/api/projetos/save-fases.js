import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const { projeto, fases } = req.body
  const filePath = path.join(process.cwd(), 'projetos', projeto, 'fases.json')
  fs.writeFileSync(filePath, JSON.stringify(fases, null, 2))
  res.status(200).json({ ok: true })
}
