import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const baseDir = path.join(process.cwd(), 'projetos')
  if (!fs.existsSync(baseDir)) return res.status(200).json([])

  const projetos = fs.readdirSync(baseDir)
    .filter(nome => {
      const stat = fs.statSync(path.join(baseDir, nome))
      return stat.isDirectory()
    })
    .map(nome => {
      const projetoPath = path.join(baseDir, nome)
      const uploads = path.join(projetoPath, 'uploads')
      const arquivos = fs.existsSync(uploads) ? fs.readdirSync(uploads) : []
      const stats = fs.statSync(projetoPath)

      return {
        nome: nome.toLowerCase(), // padroniza para minúsculas
        dataCriacao: stats.birthtime.toLocaleString(),
        arquivos
      }
    })

  res.status(200).json(projetos)
}
