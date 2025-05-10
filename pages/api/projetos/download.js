import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { projeto, file } = req.query

  if (!projeto || !file) return res.status(400).send('Parâmetros inválidos.')

  try {
    const proj = await prisma.projetos.findFirst({
      where: { nome: projeto }
    })

    if (!proj) return res.status(404).send('Projeto não encontrado.')

    const arq = await prisma.arquivos.findFirst({
      where: {
        projeto_id: proj.id,
        path: file
      }
    })

    if (!arq) return res.status(404).send('Arquivo não encontrado.')

    res.setHeader('Content-Disposition', `attachment; filename="${file}"`)
    res.setHeader('Content-Type', 'application/octet-stream')
    res.status(200).send(arq.content)
  } catch (err) {
    console.error('[download]', err)
    res.status(500).send('Erro ao buscar arquivo.')
  }
}
