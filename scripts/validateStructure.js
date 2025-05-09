// vunocode-1.1/scripts/validateStructure.js

const fs   = require('fs');
const path = require('path');

// 1) Lista de itens obrigatórios
const estruturaEsperada = [
  'src/components',
  'src/core',
  'src/App.jsx',
  'scripts/startBuilder.js',
  'scripts/validateStructure.js',
  'scripts/backendGenerator.js',
  'generated',
  'templates',
];

// 2) Caminho raiz do VUNOCODE
const raiz = path.join(__dirname, '..');

console.log('\n🔎 Iniciando validação da estrutura do VUNOCODE 1.1...\n');

estruturaEsperada.forEach(item => {
  const fullPath = path.join(raiz, item);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ OK: ${item}`);
  } else {
    console.log(`❌ FALTA: ${item}`);
  }
});

// (Opcional) registrar em log
const logDir  = path.join(raiz, 'generated', 'logs');
const logFile = path.join(logDir, 'validate_log.txt');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
const timestamp = new Date().toISOString();
const resumo = estruturaEsperada.map(item => {
  const status = fs.existsSync(path.join(raiz, item)) ? 'OK' : 'FALTA';
  return `${timestamp} [${status}] ${item}`;
}).join('\n') + '\n';
fs.appendFileSync(logFile, resumo, 'utf-8');

console.log('\n✅ Validação concluída! Detalhes em generated/logs/validate_log.txt\n');
