import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const projetos = await prisma.projetos.findMany({
      include: {
        arquivos: true,
        project_context: true
      },
      orderBy: { criado_em: 'desc' }
    })

    const formatado = projetos.map(p => ({
      nome: p.nome,
      dataCriacao: new Date(p.criado_em).toLocaleString('pt-BR'),
      arquivos: p.arquivos.map(a => a.path),
      estrategia: p.project_context[0]?.estrategia || '',
      fases: p.project_context[0]?.fases || []
    }))

    res.status(200).json(formatado)
  } catch (err) {
    console.error('[api/projetos/list] erro:', err)
    res.status(500).json({ error: 'Erro ao buscar projetos no banco de dados.' })
  }
}
