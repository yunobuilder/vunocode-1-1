// pages/api/roadmaps/update.js
import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' })
  }

  const { projeto } = req.query
  const { nome, fase, tarefa, status, obs } = req.body

  // monta o caminho até o JSON correto
  const filePath = path.join(
    process.cwd(),
    'vunocode-projects',
    projeto,
    'roadmaps',
    `roadmap_${nome}.json`
  )

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Arquivo não encontrado.' })
  }

  // lê, atualiza o progresso e salva de volta
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  // garante que a seção de progresso existe
  if (!data.progresso) data.progresso = {}
  if (!data.progresso[fase]) data.progresso[fase] = {}

  data.progresso[fase][tarefa] = { status, obs }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

  return res.status(200).json({ ok: true })
}
