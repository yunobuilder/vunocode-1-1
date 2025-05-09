const fs = require('fs');

const requiredStructure = [
  'pages',
  'pages/index.jsx',
  'pages/_app.jsx',
  'components',
  'components/Header.jsx',
  'components/Footer.jsx',
  'styles',
  'styles/globals.css'
];

let allOk = true;

requiredStructure.forEach(item => {
  if (!fs.existsSync(item)) {
    console.log(`❌ Faltando: ${item}`);
    allOk = false;
  } else {
    console.log(`✅ Encontrado: ${item}`);
  }
});

if (allOk) {
  console.log('\nTudo certo! A estrutura está completa.');
} else {
  console.log('\n⚠️ Estrutura incompleta. Verifique os arquivos/pastas acima.');
}
