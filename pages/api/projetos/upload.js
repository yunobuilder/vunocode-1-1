import { PrismaClient } from '@prisma/client'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ erro: 'Método não permitido' })
  }

  const form = new formidable.IncomingForm()
  form.uploadDir = './tmp'
  form.keepExtensions = true

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ erro: 'Erro ao processar upload' })

    const projetoNome = fields.projeto?.[0]
    const arquivo = files.arquivo?.[0]

    if (!projetoNome || !arquivo) {
      return res.status(400).json({ erro: 'Arquivo ou projeto não informados' })
    }

    try {
      const projeto = await prisma.projetos.findFirst({
        where: { nome: projetoNome }
      })

      if (!projeto) return res.status(404).json({ erro: 'Projeto não encontrado.' })

      const nomeArquivo = path.basename(arquivo.originalFilename)
      const conteudo = fs.readFileSync(arquivo.filepath, 'utf8')

      await prisma.arquivos.create({
        data: {
          projeto_id: projeto.id,
          path: nomeArquivo,
          content: conteudo
        }
      })

      // Limpar arquivo temporário
      fs.unlinkSync(arquivo.filepath)

      return res.status(200).json({ ok: true, nome: nomeArquivo })
    } catch (err) {
      console.error('[upload]', err)
      return res.status(500).json({ erro: 'Erro ao salvar no banco de dados' })
    }
  })
}
