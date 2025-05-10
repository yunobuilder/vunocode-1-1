import fs from 'fs'
import path from 'path'

// Componente React que renderiza o roadmap
export default function RoadmapPage({ roadmap }) {
  return (
    <div>
      <h1>Roadmap: {roadmap.titulo || 'Sem título'}</h1>
      <pre>{JSON.stringify(roadmap, null, 2)}</pre>
    </div>
  )
}

// Executado *no servidor* a cada requisição
export async function getServerSideProps({ query }) {
  const { nome, projeto } = query

  // Caminho até o JSON do roadmap
  const filePath = path.join(
    process.cwd(),
    'vunocode-projects',
    projeto,
    'roadmaps',
    `roadmap_${nome}.json`
  )

  // Se não existir, retorna 404
  if (!fs.existsSync(filePath)) {
    return { notFound: true }
  }

  // Lê e parseia o JSON
  const raw = fs.readFileSync(filePath, 'utf8')
  const roadmap = JSON.parse(raw)

  // Passa como prop para o componente
  return {
    props: { roadmap },
  }
}
