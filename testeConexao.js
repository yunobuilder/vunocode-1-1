// testeConexao.js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function testar() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`
    console.log('Conexão OK:', result)
  } catch (e) {
    console.error('Erro de conexão:', e)
  } finally {
    await prisma.$disconnect()
  }
}

testar()
