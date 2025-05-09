// vunocode-1.1/scripts/startBuilder.js

const fs = require('fs');
const path = require('path');

// 1) Carrega a lista de tarefas geradas
const propostas = require(path.join(__dirname, '../tarefas_propostas.json'));

// 2) Define a raiz do VUNOCODE 1.1 (pasta acima de /scripts)
const raizDestino = path.join(__dirname, '..');

console.log(`\n🚀 Iniciando Builder em: ${raizDestino}\n`);

propostas.forEach((modulo) => {
  const { nome, parametros } = modulo;

  console.log(`🔧 Processando módulo: ${nome}`);

  // 3) Cria cada pasta
  (parametros.pastas || []).forEach((pastaRelativa) => {
    const fullPath = path.join(raizDestino, pastaRelativa);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`📁 Pasta criada: ${pastaRelativa}`);
    } else {
      console.log(`ℹ️ Pasta já existe: ${pastaRelativa}`);
    }
  });

  // 4) Cria cada arquivo
  (parametros.arquivos || []).forEach(({ path: arquivoPath, conteudo }) => {
    const fullPath = path.join(raizDestino, arquivoPath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, conteudo, 'utf-8');
    console.log(`📝 Arquivo criado: ${arquivoPath}`);
  });

  // 5) Adiciona entrada no log
  const logDir  = path.join(raizDestino, 'generated', 'logs');
  const logFile = path.join(logDir, 'estrutura_log.txt');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  const logMsg = `[${new Date().toISOString()}] ✅ Builder executado para: ${nome}\n`;
  fs.appendFileSync(logFile, logMsg, 'utf-8');

  console.log(`✅ Estrutura ${nome} finalizada!\n`);
});

console.log('🚀 VUNOCODE 1.1 — Estrutura completa gerada!');
