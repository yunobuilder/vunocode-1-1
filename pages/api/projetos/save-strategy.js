import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ message: 'Use POST.' })
  }

  const { projeto, texto } = req.body
  if (!projeto || typeof texto !== 'string') {
    return res.status(400).json({ message: 'Parâmetros inválidos.' })
  }

  try {
    const projetoEncontrado = await prisma.projetos.findFirst({
      where: { nome: projeto }
    })

    if (!projetoEncontrado) {
      return res.status(404).json({ message: 'Projeto não encontrado.' })
    }

    // Cria ou atualiza o contexto
    const ctx = await prisma.project_context.upsert({
      where: { projeto_id: projetoEncontrado.id },
      update: { estrategia: texto, atualizado_em: new Date() },
      create: {
        projeto_id: projetoEncontrado.id,
        estrategia: texto,
        fases: [],
        arquivos: []
      }
    })

    return res.status(200).json({ ok: true, contexto: ctx })
  } catch (err) {
    console.error('[save-strategy]', err)
    return res.status(500).json({ message: 'Erro ao salvar estratégia.' })
  }
}
