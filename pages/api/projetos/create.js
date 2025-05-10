import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ message: 'Use POST.' })
  }

  const { nome } = req.body
  if (!nome || typeof nome !== 'string') {
    return res.status(400).json({ message: 'Campo "nome" é obrigatório.' })
  }

  const rawName = nome.trim()
  if (!rawName || rawName.includes('..') || /[\\\/]/.test(rawName)) {
    return res.status(400).json({ message: 'Nome de projeto inválido.' })
  }

  try {
    // Verifica se já existe
    const jaExiste = await prisma.projetos.findFirst({
      where: { nome: rawName }
    })

    if (jaExiste) {
      return res.status(409).json({ message: 'Projeto já existe.' })
    }

    // Cria o projeto no banco
    const projetoCriado = await prisma.projetos.create({
      data: {
        nome: rawName,
        estrategia: '',
        fases: []
      }
    })

    return res.status(201).json({
      ok: true,
      projeto: projetoCriado.nome,
      dataCriacao: projetoCriado.criado_em
    })
  } catch (err) {
    console.error('[create]', err)
    return res.status(500).json({ message: 'Erro ao criar projeto.' })
  }
}
