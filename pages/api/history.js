import fs from 'fs/promises'
import path from 'path'

const HISTORY_FILE = path.join(process.cwd(), 'data', 'history.json')

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const raw = await fs.readFile(HISTORY_FILE, 'utf8')
      const arr = JSON.parse(raw)
      return res.status(200).json(arr)
    } catch (e) {
      // se não existir, retorna vazio
      return res.status(200).json([])
    }
  } else if (req.method === 'POST') {
    // opcional: gravar novo histórico
    const entry = req.body  // { timestamp, type, files }
    let arr = []
    try {
      arr = JSON.parse(await fs.readFile(HISTORY_FILE, 'utf8'))
    } catch {}
    arr.unshift(entry)
    await fs.mkdir(path.dirname(HISTORY_FILE), { recursive: true })
    await fs.writeFile(HISTORY_FILE, JSON.stringify(arr, null, 2))
    return res.status(201).json({ ok: true })
  }
  res.status(405).end()
}
