import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const { nome } = req.query
  const projeto = req.query.projeto
  const caminho = path.join(process.cwd(), 'vunocode-projects', projeto, 'roadmaps', `roadmap_${nome}.json`)

  if (!fs.existsSync(caminho)) return res.status(404).json({ erro: 'Trilha não encontrada' })

  const conteudo = fs.readFileSync(caminho, 'utf-8')
  const json = JSON.parse(conteudo)
  res.status(200).json(json)
}
