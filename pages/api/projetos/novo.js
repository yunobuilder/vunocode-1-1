import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' })
  }

  const { nome, usuario_id, estrategia } = req.body

  if (!nome || !usuario_id) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes' })
  }

  try {
    const projeto = await prisma.projetos.create({
      data: {
        nome,
        usuario_id,
        estrategia,
        fases: {} // inicia vazio
      }
    })

    res.status(200).json({ sucesso: true, projeto })
  } catch (error) {
    console.error('Erro ao criar projeto:', error)
    res.status(500).json({ erro: error.message })
  }
}
