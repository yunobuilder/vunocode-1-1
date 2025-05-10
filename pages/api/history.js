import fs from 'fs/promises'
import path from 'path'

const HISTORY_FILE = path.join(process.cwd(), 'data', 'history.json')

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const raw = await fs.readFile(HISTORY_FILE, 'utf8')
      const arr = JSON.parse(raw)
      return res.status(200).json(arr)
    } catch {
      return res.status(200).json([])
    }
  }

  if (req.method === 'POST') {
    const entry = req.body  // { timestamp, type, trilha, files, resultado? }

    // Dados adicionais: IP e user-agent
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''
    const agent = req.headers['user-agent'] || ''

    const fullEntry = {
      ...entry,
      ip,
      userAgent: agent,
      status: entry.status || 'ok',
      erro: entry.erro || null
    }

    let arr = []
    try {
      arr = JSON.parse(await fs.readFile(HISTORY_FILE, 'utf8'))
    } catch {}

    arr.unshift(fullEntry)

    await fs.mkdir(path.dirname(HISTORY_FILE), { recursive: true })
    await fs.writeFile(HISTORY_FILE, JSON.stringify(arr, null, 2))

    return res.status(201).json({ ok: true })
  }

  res.status(405).json({ error: 'Método não permitido' })
}
