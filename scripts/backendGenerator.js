// vunocode-1.1/scripts/backendGenerator.js

const fs   = require('fs');
const path = require('path');

const propostas = require(path.join(__dirname, '../tarefas_propostas.json'));
const prismaSchemaPath = path.join(__dirname, '../prisma/schema.prisma');
const apiDir          = path.join(__dirname, '../src/api');

console.log('\n🎬 Iniciando geração do back-end...\n');

// 1) Inicia o schema.prisma
let schemaFile = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

`;

propostas.forEach(modulo => {
  const { nome, parametros } = modulo;

  // Só processa API se api=true e existir schema
  if (parametros.api && parametros.schema && typeof parametros.schema === 'object') {
    console.log(`✅ Gerando Prisma model e API para: ${nome}`);

    // 2) Monta bloco do Prisma
    const lines = Object.entries(parametros.schema).map(
      ([field, type]) => `  ${field} ${type}`
    );
    schemaFile += `
model ${nome} {
  id        Int      @id @default(autoincrement())
${lines.join('\n')}
  createdAt DateTime @default(now())
}
`;

    // 3) Gera arquivo de rota Next.js (API Route)
    const apiFile = path.join(apiDir, `${nome.toLowerCase()}.js`);
    const apiCode = `import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const all = await prisma.${nome.toLowerCase()}.findMany();
    return res.json(all);
  }
  if (req.method === 'POST') {
    const data = req.body;
    const created = await prisma.${nome.toLowerCase()}.create({ data });
    return res.status(201).json(created);
  }
  res.setHeader('Allow', ['GET','POST']);
  res.status(405).end(\`Method \${req.method} Not Allowed\`);
}
`;
    fs.mkdirSync(apiDir, { recursive: true });
    fs.writeFileSync(apiFile, apiCode, 'utf-8');
    console.log(`   🛠 API do módulo ${nome} criada em src/api/${nome.toLowerCase()}.js\n`);
  } else {
    console.log(`⚠️ Pulando módulo ${nome} (sem schema/API).`);
  }
});

// 4) Escreve o schema.prisma completo
fs.writeFileSync(prismaSchemaPath, schemaFile, 'utf-8');
console.log('🎉 Prisma schema.prisma criado com sucesso!');

console.log('\n✅ Backend gerado com sucesso!');
