import fs from 'fs'
import path from 'path'

const baseDir = path.join(process.cwd(), 'data', 'contextos')

export default async function handler(req, res) {
  const { projeto } = req.method === 'GET' ? req.query : req.body
  if (!projeto) return res.status(400).json({ erro: 'Projeto não informado.' })

  const filePath = path.join(baseDir, projeto, 'chat.log.json')

  if (req.method === 'GET') {
    try {
      const conteudo = fs.existsSync(filePath)
        ? fs.readFileSync(filePath, 'utf8')
        : '[]'
      return res.status(200).json({ chat: JSON.parse(conteudo) })
    } catch (err) {
      return res.status(500).json({ erro: 'Erro ao ler chat.' })
    }
  }

  if (req.method === 'POST') {
    const { mensagens } = req.body
    try {
      fs.mkdirSync(path.dirname(filePath), { recursive: true })
      fs.writeFileSync(filePath, JSON.stringify(mensagens, null, 2))
      return res.status(200).json({ ok: true })
    } catch (err) {
      return res.status(500).json({ erro: 'Erro ao salvar chat.' })
    }
  }

  res.status(405).json({ erro: 'Método não permitido.' })
}
