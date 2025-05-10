import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Use POST.' })
  }

  const { projeto, file } = req.body

  if (!projeto || !file) {
    return res.status(400).json({ error: 'Projeto ou nome do arquivo não informado.' })
  }

  try {
    const projetoDB = await prisma.projetos.findFirst({
      where: { nome: projeto }
    })

    if (!projetoDB) {
      return res.status(404).json({ error: 'Projeto não encontrado.' })
    }

    const arquivoDeletado = await prisma.arquivos.deleteMany({
      where: {
        projeto_id: projetoDB.id,
        path: file
      }
    })

    if (arquivoDeletado.count === 0) {
      return res.status(404).json({ error: 'Arquivo não encontrado.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[delete]', err)
    return res.status(500).json({ error: 'Erro ao excluir arquivo.' })
  }
}
