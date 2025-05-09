import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const projeto = req.query.projeto
  if (!projeto) return res.status(400).json({ erro: 'Projeto não especificado' })

  const baseDir = path.join(process.cwd(), 'vunocode-projects', projeto, 'roadmaps')
  if (!fs.existsSync(baseDir)) return res.status(200).json([])

  const arquivos = fs.readdirSync(baseDir)
  const trilhas = arquivos.filter(f => f.endsWith('.json')).map((file) => {
    const conteudo = fs.readFileSync(path.join(baseDir, file), 'utf-8')
    const json = JSON.parse(conteudo)
    const tarefas = Object.values(json.progresso).flat()
    const feitas = tarefas.filter(t => typeof t === 'string' && t === 'ok').length
    const total = tarefas.length
    const percentual = total ? Math.round((feitas / total) * 100) : 0
    return {
      nome: json.nome,
      faseAtual: json.faseAtual,
      statusGeral: percentual === 100 ? 'concluído' : 'em andamento',
      percentualConcluido: percentual
    }
  })

  res.status(200).json(trilhas)
}
