// pages/api/projetos/list-nomes.js
import { promises as fs } from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const dir = path.join(process.cwd(), 'data/projetos')
    await fs.mkdir(dir, { recursive: true })
    const pastas = await fs.readdir(dir, { withFileTypes: true })
    const nomes = pastas.filter(p => p.isDirectory()).map(p => p.name)
    return res.status(200).json(nomes)
  } catch (err) {
    console.error('[list-nomes] Erro ao ler projetos:', err)
    return res.status(500).json({ error: 'Erro ao listar projetos.' })
  }
}
