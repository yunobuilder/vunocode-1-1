import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  }
}

export default async function handler(req, res) {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Erro no upload' })

    const projeto = fields.projeto[0]
    const arquivo = files.arquivo[0]
    const dir = path.join(process.cwd(), 'projetos', projeto, 'uploads')

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    const dest = path.join(dir, arquivo.originalFilename)
    fs.copyFileSync(arquivo.filepath, dest)

    res.status(200).json({ ok: true })
  })
}
