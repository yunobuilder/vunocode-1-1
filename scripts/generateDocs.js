// Script: generateDocs.js
// Objetivo: Gerar documentação automática do projeto VUNOCODE

const fs = require('fs');
const path = require('path');

function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-');
}

function generateReadme() {
  const content = `# 📖 VUNOCODE Documentation

**Versão:** ${getTimestamp()}

## 🔧 Estrutura do Projeto
- Frontend: React + Tailwind + Next.js
- Backend: Node.js + Prisma + PostgreSQL

## 🚀 Como Executar
npm install
npm run dev

## 📂 Pastas Importantes
- /components
- /pages
- /api
- /scripts
- /docs (esta pasta)

## ✍️ Última geração: ${new Date().toLocaleString()}`;

  const docsDir = path.join(__dirname, '../docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir);
  }

  const readmePath = path.join(docsDir, 'README.md');
  fs.writeFileSync(readmePath, content);

  console.log(`✅ Documentação gerada em: ${readmePath}`);
}

generateReadme();