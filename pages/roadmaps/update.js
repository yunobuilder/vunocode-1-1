import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { projeto } = req.query
  const { nome, fase, tarefa, status, obs } = req.body

  const filePath = path.join(process.cwd(), 'vunocode-projects', projeto, 'roadmaps', `roadmap_${nome}.json`)
  if (!fs.existsSync(filePath)) return res.status(404).json({ erro: 'Arquivo não encontrado' })

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  if (!data.progresso[fase]) data.progresso[fase] = {}
  data.progresso[fase][tarefa] = {
    status,
    obs
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  res.status(200).json({ ok: true })
}
