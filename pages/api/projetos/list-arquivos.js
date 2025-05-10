// pages/api/projetos/list-arquivos.js
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

  const dir = path.join(process.cwd(), 'data', 'projetos', projeto)

  try {
    const files = await fs.readdir(dir)
    return res.status(200).json({ arquivos: files })
  } catch (err) {
    return res.status(404).json({ error: 'Projeto não encontrado ou vazio.' })
  }
}
