import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { usuario_id } = req.query

  try {
    const projetos = await prisma.projeto.findMany({
      where: { usuario_id },
      orderBy: { criado_em: 'desc' }
    })

    res.status(200).json({ projetos })
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
}
