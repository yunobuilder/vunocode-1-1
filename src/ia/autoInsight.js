// src/ai/autoInsight.js
import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function analisarProjeto(diretorioBase = './vunocode-2.0-core') {
  const arquivos = []

  function lerArquivos(pasta) {
    const itens = fs.readdirSync(pasta)
    for (const item of itens) {
      const caminho = path.join(pasta, item)
      const stats = fs.statSync(caminho)
      if (stats.isDirectory()) {
        lerArquivos(caminho)
      } else {
        const content = fs.readFileSync(caminho, 'utf8')
        arquivos.push({ path: caminho, content })
      }
    }
  }

  lerArquivos(diretorioBase)

  const prompt = `
Você é um sistema especialista em análise de projetos fullstack.
Baseado nos arquivos abaixo, diga o que está faltando, o que pode ser refatorado e o que pode ser criado.
Responda em formato markdown.

${arquivos.slice(0, 5).map(f => `# ${f.path}\n\`\`\`\n${f.content}\n\`\`\``).join('\n\n')}
`

  const resultado = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'Você é um analisador de sistemas.' },
      { role: 'user', content: prompt }
    ]
  })

  return resultado.choices[0].message.content
}
