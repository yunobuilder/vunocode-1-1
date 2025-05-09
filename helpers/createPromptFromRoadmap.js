import { readFileSync } from 'fs'
import path from 'path'

export function createPromptFromRoadmap() {
  try {
    const roadmapPath = path.join(process.cwd(), 'vunocode-2.0-core/core/roadmap.json')
    const raw = readFileSync(roadmapPath, 'utf8')
    const roadmap = JSON.parse(raw)

    const estrutura = roadmap.fases.map(f => `Fase ${f.numero}: ${f.descricao}`).join('\n')
    return `Este projeto segue o roadmap:\n${estrutura}\n\nCom base nisso, gere um sistema completo.`
  } catch (err) {
    console.error('[createPromptFromRoadmap] Erro ao ler roadmap:', err)
    return 'Projeto VUNOCODE 2.0 sem roadmap definido.'
  }
}
