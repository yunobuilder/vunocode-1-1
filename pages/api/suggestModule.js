// pages/api/suggestModule.js

import { promises as fs } from 'fs';
import path from 'path';

/**
 * Gera uma sugestão “inteligente” com base no contexto do projeto.
 * Aqui simulamos, mas você pode trocar essa função para chamar
 * efetivamente sua API de IA (via openaiProxy, por exemplo).
 */
async function generateSmartSuggestion(contextData) {
  // Exemplo de payload que poderia ser enviado à OpenAI:
  // prompt: `Com base neste contexto:\n${contextData}\nSugira um módulo...`

  const defaultSuggestion = {
    description: 'Criar o módulo Perfil com visualização completa e API para atualização de dados pessoais.',
    pages: [
      {
        name: 'perfil.jsx',
        path: 'src/pages/perfil.jsx',
        overwrite: true,
        content: `// Página Perfil gerada automaticamente
export default function Perfil() {
  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold text-purple-700'>Perfil 🚀</h1>
      <p className='mt-2 text-gray-600'>Conteúdo automático sugerido pela IA.</p>
    </div>
  );
}`
      }
    ],
    api: [
      {
        name: 'perfil.js',
        path: 'src/pages/api/perfil.js',
        overwrite: true,
        content: `// API Perfil gerada automaticamente
export default function handler(req, res) {
  res.status(200).json({ message: 'API Perfil funcionando.' });
}`
      }
    ],
    linksToAdd: ['/perfil'],
    futureIdeas: [
      'Adicionar suporte a avatar com upload.',
      'Incluir módulo de notificações em tempo real.',
      'Criar logs automáticos de atualização de perfil.'
    ]
  };

  // Simula processamento pesado...
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    suggestion: defaultSuggestion,
    context: contextData
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Método não permitido. Use GET.' });
  }

  const filePath = path.join(process.cwd(), 'data', 'projectContext.json');

  try {
    // Lê o contexto do projeto
    let contextData = 'Nenhum contexto encontrado.';
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      contextData = raw.trim() || contextData;
    } catch (err) {
      // Se não existir, mantemos o contexto padrão
    }

    // Gera a sugestão com base no contexto
    const result = await generateSmartSuggestion(contextData);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Erro em /api/suggestModule:', error);
    return res.status(500).json({ message: 'Erro interno ao gerar sugestão.' });
  }
}
