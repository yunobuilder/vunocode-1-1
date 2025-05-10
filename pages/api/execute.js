import { promises as fs } from 'fs'
import path from 'path'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const arquivos = req.body

  if (!arquivos || !Array.isArray(arquivos)) {
    return res.status(400).json({ error: 'Entrada inválida. Esperado um array de arquivos.' })
  }

  const gerados = []

  try {
    for (const file of arquivos) {
      if (!file.path || typeof file.content !== 'string') {
        console.warn('[execute] Ignorando arquivo inválido:', file)
        continue
      }

      let conteudo = file.content.trim()

      // 🚨 Validação leve de conteúdo
      if (conteudo.length < 10 || conteudo.includes('undefined') || conteudo.match(/<html.*>/i)) {
        console.log('[execute] Corrigindo com IA:', file.path)

        try {
          const resposta = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
              { role: 'system', content: 'Você é um revisor de código. Retorne somente o conteúdo corrigido, sem comentários.' },
              { role: 'user', content: `Corrija este conteúdo:

${conteudo}` }
            ],
            temperature: 0.2
          })

          const iaFix = resposta.choices?.[0]?.message?.content?.trim()
          if (iaFix && iaFix.length > 10) conteudo = iaFix
        } catch (erroIa) {
          console.warn('[execute] Falha ao corrigir com IA:', erroIa.message)
        }
      }

      const fullPath = path.join(process.cwd(), file.path)
      await fs.mkdir(path.dirname(fullPath), { recursive: true })
      await fs.writeFile(fullPath, conteudo, 'utf8')
      gerados.push(file.path)
    }

    return res.status(200).json({
      message: `✅ ${gerados.length} arquivo(s) salvo(s) com sucesso.`,
      files: gerados
    })
  } catch (err) {
    console.error('[execute] ERRO ao gravar arquivos:', err)
    return res.status(500).json({ error: 'Erro ao gravar arquivos.' })
  }
}
