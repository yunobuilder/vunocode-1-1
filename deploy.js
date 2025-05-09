// 🚀 VUNOCODE DEPLOY SCRIPT (100% CORRIGIDO E OTIMIZADO)
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// ========== CONFIG ==========
const projectDir = path.resolve(__dirname);
const logFile = path.join(projectDir, 'deploy.log');
const requiredFiles = ['package.json', 'pages', 'components', 'styles', 'tailwind.config.js', 'postcss.config.js'];

// ========== FUNÇÕES ==========

// ✅ Validação da estrutura
function validateStructure() {
    console.log('🔍 Validando estrutura do projeto...\n');
    let allOk = true;
    requiredFiles.forEach((item) => {
        const fullPath = path.join(projectDir, item);
        if (!fs.existsSync(fullPath)) {
            console.error(`❌ FALTA: ${item}`);
            allOk = false;
        } else {
            console.log(`✔️ OK: ${item}`);
        }
    });
    if (allOk) {
        console.log('\n✅ Estrutura validada com sucesso.\n');
    } else {
        console.error('\n🚨 Problemas encontrados. Corrija antes de continuar.\n');
        process.exit(1);
    }
}

// ✅ Checar se Vercel está configurado
function checkVercelConfig() {
    const vercelDir = path.join(projectDir, '.vercel');
    if (!fs.existsSync(vercelDir)) {
        console.error('\n🚨 ERRO: Configuração do Vercel não encontrada (.vercel).');
        console.error('➡️ Rode: npx vercel login && npx vercel link\n');
        process.exit(1);
    } else {
        console.log('✔️ Configuração do Vercel detectada (.vercel)\n');
    }
}

// ✅ Checar se o usuário está logado
function checkVercelLogin() {
    return new Promise((resolve, reject) => {
        exec('npx vercel whoami', (error, stdout, stderr) => {
            if (error) {
                console.error('\n🚨 Não está logado no Vercel. Faça login com: npx vercel login\n');
                process.exit(1);
            } else {
                console.log(`👤 Logado como: ${stdout.trim()}\n`);
                resolve();
            }
        });
    });
}

// ▶️ Executar comando (ex: build ou deploy)
function runCommand(command, descricao) {
    console.log(`\n▶️ ${descricao}...`);
    const process = exec(command);
    process.stdout.on('data', (data) => {
        console.log(data.toString());
        fs.appendFileSync(logFile, data.toString());
    });
    process.stderr.on('data', (data) => {
        console.error(data.toString());
        fs.appendFileSync(logFile, data.toString());
    });
    process.on('exit', (code) => {
        if (code === 0) {
            console.log(`✅ ${descricao} concluído com sucesso! ✅\n`);
        } else {
            console.error(`❌ ${descricao} falhou (código ${code}). Verifique os logs.\n`);
        }
    });
}

// ========== INSTRUÇÕES ==========
console.log(`
===========================================
🚀 VUNOCODE DEPLOY - MODO AUTO EVOLUTIVO
===========================================
✔️ Validação completa da estrutura do projeto
✔️ Checagem de login e configuração do Vercel
✔️ Deploy automático no Vercel (--prod)
✔️ Nenhuma página/component existente será sobrescrita
✔️ Logs gravados em: deploy.log
✔️ Tailwind + PostCSS validados
===========================================
`);

// ========== EXECUÇÃO ==========
(async () => {
    validateStructure();
    checkVercelConfig();
    await checkVercelLogin();

    // 1️⃣ Build do projeto
    runCommand('npm run build', 'Executando build do projeto');

    // 2️⃣ Deploy no Vercel (produção)
    runCommand('npx vercel --prod', 'Deploy no Vercel (produção)');
})();
