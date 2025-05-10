// pages/api/projetos/list-fases.js
import fs from 'fs/promises'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { projeto } = req.query

  if (!projeto) {
    return res.status(400).json({ error: 'Projeto não especificado.' })
  }

  const filePath = path.join(process.cwd(), 'data', 'contextos', projeto, 'fases.json')

  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(raw)
    return res.status(200).json(data)
  } catch (err) {
    return res.status(200).json([])
  }
}
