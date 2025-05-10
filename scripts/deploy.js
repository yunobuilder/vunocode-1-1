import { execSync } from 'child_process'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('🚀 Deseja fazer deploy em produção? (s/n): ', resposta => {
  const comando = resposta.trim().toLowerCase() === 's'
    ? 'vercel --prod'
    : 'vercel'

  try {
    console.log(`\n⏳ Executando: ${comando}\n`)
    const output = execSync(comando, { stdio: 'inherit' })
    console.log(`✅ Deploy concluído com sucesso.`)
  } catch (err) {
    console.error('❌ Erro no deploy:', err.message)
  }

  rl.close()
})
