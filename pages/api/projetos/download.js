import path from 'path'
import fs from 'fs'

export default function handler(req, res) {
  const { projeto, file } = req.query
  const filePath = path.join(process.cwd(), 'projetos', projeto, 'uploads', file)

  if (!fs.existsSync(filePath)) return res.status(404).send('Arquivo não encontrado.')

  res.setHeader('Content-Disposition', `attachment; filename="${file}"`)
  const stream = fs.createReadStream(filePath)
  stream.pipe(res)
}
