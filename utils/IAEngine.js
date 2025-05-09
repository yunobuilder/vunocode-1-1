// 🔥 IA Engine Avançada
import fs from 'fs';

const contextPath = './data/projectContext.json';
const historyPath = './data/history.json';

export function getProjectContext() {
  if (fs.existsSync(contextPath)) {
    const data = fs.readFileSync(contextPath);
    return JSON.parse(data);
  }
  return {};
}

export function saveHistory(entry) {
  let history = [];
  if (fs.existsSync(historyPath)) {
    history = JSON.parse(fs.readFileSync(historyPath));
  }
  history.push(entry);
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
}

export function getHistory() {
  if (fs.existsSync(historyPath)) {
    return JSON.parse(fs.readFileSync(historyPath));
  }
  return [];
}

export function suggestNextModule() {
  const context = getProjectContext();
  const history = getHistory();

  const modulesExpected = context.modulesExpected || [];
  const createdModules = history.flatMap((h) => h.createdModules || []);

  const pending = modulesExpected.filter(
    (mod) => !createdModules.includes(mod)
  );

  if (pending.length === 0) {
    return null;
  }

  const next = pending[0];
  const name = `${next.toLowerCase()}.jsx`;

  return {
    description: `Criar o módulo ${next} com visualização completa e API para atualização de dados.`,
    pages: [
      {
        name: name,
        path: `./pages/${name}`,
        overwrite: true,
        content: `// Página ${next} gerada automaticamente\nexport default function ${next}() {\n  return (\n    <div className='p-6'>\n      <h1 className='text-3xl font-bold text-purple-700'>${next} 🚀</h1>\n      <p className='mt-2 text-gray-600'>Conteúdo automático sugerido pela IA.</p>\n    </div>\n  );\n}`
      }
    ],
    api: [
      {
        name: `${next.toLowerCase()}.js`,
        path: `./pages/api/${next.toLowerCase()}.js`,
        overwrite: true,
        content: `// API ${next} gerada automaticamente\nexport default function handler(req, res) {\n  res.status(200).json({ message: 'API ${next} funcionando.' });\n}`
      }
    ],
    linksToAdd: [`/${next.toLowerCase()}`]
  };
}