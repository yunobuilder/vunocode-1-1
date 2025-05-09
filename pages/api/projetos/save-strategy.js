import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const { projeto, texto } = req.body
  const filePath = path.join(process.cwd(), 'projetos', projeto, 'estrategia.txt')
  fs.writeFileSync(filePath, texto)
  res.status(200).json({ ok: true })
}
