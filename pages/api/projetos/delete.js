import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const { projeto, file } = req.body
  const filePath = path.join(process.cwd(), 'projetos', projeto, 'uploads', file)

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
    res.status(200).json({ ok: true })
  } else {
    res.status(404).json({ error: 'Arquivo não encontrado.' })
  }
}
