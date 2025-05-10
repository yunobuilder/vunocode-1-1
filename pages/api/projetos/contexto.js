import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ erro: 'Método não permitido' })

  const { projeto } = req.query
  if (!projeto) return res.status(400).json({ erro: 'Projeto não informado' })

  const basePath = path.join(process.cwd(), 'data/contextos', projeto)

  const lerArquivo = (nome) => {
    const full = path.join(basePath, nome)
    try {
      if (fs.existsSync(full)) {
        return fs.readFileSync(full, 'utf8')
      }
    } catch (err) {}
    return null
  }

  const contexto = {
    estrategia: lerArquivo('estrategia.txt'),
    fases: lerArquivo('fases.json'),
    arquivos: lerArquivo('arquivos.json'),
    chat: lerArquivo('chat.log.json')
  }

  res.status(200).json({ projeto, contexto })
}
