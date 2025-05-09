// /utils/translator.js

export async function translateToCode(naturalText) {
    const res = await fetch('/api/openaiProxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: naturalText,
        system: `
  Você é um tradutor de linguagem natural para código React/Next.js.
  O usuário vai descrever em português o que quer, e você responde somente com um array JSON de instruções:
  [
    { "path": "/src/pages/MeuArquivo.jsx", "content": "<código jsx aqui>" },
    ...
  ]
  Sem explicações.
        `
      })
    })
    const data = await res.json()
    if (!Array.isArray(data.files)) {
      throw new Error('Resposta da IA não veio no formato esperado')
    }
    return data.files
  }
  