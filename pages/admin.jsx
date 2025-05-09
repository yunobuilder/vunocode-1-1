import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Admin() {
  const [jsonInput, setJsonInput] = useState('');
  const [log, setLog] = useState('');
  const [dependencies, setDependencies] = useState(new Set());
  const [strategyInput, setStrategyInput] = useState('');
  const [suggestion, setSuggestion] = useState(null);

  const handleExecute = async () => {
    const startAll = Date.now();
    setLog('🔄 Iniciando execução das instruções...\n');
    setDependencies(new Set());

    try {
      const data = JSON.parse(jsonInput);
      setLog((prev) => prev + '✅ JSON válido carregado.\n');

      const checkDependencies = (content) => {
        const importMatches = content.matchAll(/import\s+\w+.*from\s+['"]([^'"]+)['"]/g);
        for (const match of importMatches) {
          const importPath = match[1];
          if (!importPath.startsWith('./') && !importPath.startsWith('../')) {
            setDependencies((prev) => {
              const newSet = new Set(prev);
              newSet.add(importPath);
              return newSet;
            });
          }
        }
      };

      const processItem = async (item, type) => {
        const start = Date.now();
        const filePath = item.path || (
          type === 'component'
            ? `./components/${item.name}`
            : type === 'page'
              ? `./pages/${item.name}`
              : null
        );

        if (!filePath) {
          return `⚠️ Nenhum caminho válido definido para ${type}.\n`;
        }

        const response = await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: filePath,
            content: item.content,
            overwrite: item.overwrite !== false,
          }),
        });
        const result = await response.json();
        const duration = ((Date.now() - start) / 1000).toFixed(2);
        const size = new Blob([item.content]).size;
        return `✅ ${filePath} → ${result.message} | ⏱️ ${duration}s | 📦 ${size} bytes\n`;
      };

      const processArray = async (array, typeLabel) => {
        if (array?.length) {
          setLog((prev) => prev + `📦 ${typeLabel}: ${array.length} item(s)\n`);
          for (const item of array) {
            if ((!item.name && !item.path) || !item.content) {
              setLog((prev) =>
                prev + `⚠️ ${typeLabel.slice(0, -1)} inválido (faltando caminho ou conteúdo).\n`
              );
              continue;
            }
            setLog((prev) =>
              prev +
              `💾 Salvando ${typeLabel.slice(0, -1)}: ${item.name || item.path}...\n`
            );
            const resultMsg = await processItem(item, typeLabel.slice(0, -1));
            setLog((prev) => prev + resultMsg);
            checkDependencies(item.content);
          }
        }
      };

      await processArray(data.components, 'Componentes');
      await processArray(data.pages, 'Páginas');
      await processArray(data.files, 'Arquivos');

      // NOVO SUPORTE: action: create_module
      if (data.action === 'create_module' && data.module) {
        setLog((prev) => prev + `📦 Criando módulo via 'create_module': ${data.module.name}\n`);
        const resultMsg = await processItem(data.module, data.module.type || 'file');
        setLog((prev) => prev + resultMsg);
        checkDependencies(data.module.content);
      }

      if (data.delete?.length) {
        setLog((prev) => prev + `🗑️ Excluindo ${data.delete.length} item(s)...\n`);
        for (const file of data.delete) {
          if (!file.path) {
            setLog((prev) => prev + `⚠️ Exclusão inválida (faltando caminho).\n`);
            continue;
          }
          const start = Date.now();
          const response = await fetch('/api/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: file.path }),
          });
          const result = await response.json();
          const duration = ((Date.now() - start) / 1000).toFixed(2);
          setLog((prev) =>
            prev + `🗑️ ${file.path} → ${result.message} | ⏱️ ${duration}s\n`
          );
        }
      }

      if (dependencies.size > 0) {
        setLog((prev) =>
          prev +
          '\n📦 Dependências externas detectadas:\n' +
          Array.from(dependencies)
            .map((dep) => `➡️ ${dep} ➔ Rode: npm install ${dep}`)
            .join('\n') +
          '\n'
        );
      } else {
        setLog((prev) => prev + '\n✅ Nenhuma dependência externa detectada.\n');
      }

      const durationAll = ((Date.now() - startAll) / 1000).toFixed(2);
      setLog((prev) => prev + `✅ Finalizado em ${durationAll}s.\n`);
    } catch (err) {
      console.error(err);
      setLog((prev) => prev + '❌ Erro: JSON inválido ou problema durante a execução.\n');
    }
  };

  const handleSaveStrategy = async () => {
    const response = await fetch('/api/saveProjectContext', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context: strategyInput }),
    });
    const result = await response.json();
    setLog((prev) => prev + `💾 Contexto salvo: ${result.message}\n`);
  };

  const handleGetSuggestion = async () => {
    const response = await fetch('/api/suggestModule');
    const result = await response.json();
    setSuggestion(result);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Painel Admin - Executor & Estratégia 🚀
        </h1>

        {/* EXECUTOR ORIGINAL */}
        <p className="mb-4 text-gray-600 text-center max-w-2xl">
          Cole o <strong>JSON de instruções</strong> para criar/modificar/excluir arquivos ou rodar comandos.
        </p>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Cole o JSON de instruções aqui..."
          className="w-full max-w-2xl h-64 p-4 border-2 border-purple-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 text-sm font-mono"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleExecute}
            className="w-full sm:w-auto bg-purple-600 text-white py-3 px-6 rounded-lg shadow hover:bg-purple-700 transition text-sm font-semibold"
          >
            Executar Instruções
          </button>
        </div>

        {/* INSERIR INFORMAÇÕES ESTRATÉGICAS */}
        <div className="mt-10 w-full max-w-2xl bg-white p-4 rounded-lg shadow border">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">📋 Informações Estratégicas do Projeto</h2>
          <textarea
            value={strategyInput}
            onChange={(e) => setStrategyInput(e.target.value)}
            placeholder="Descreva seu projeto aqui (missão, módulos, arquitetura)..."
            className="w-full h-48 p-4 border-2 border-purple-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-mono mb-4"
          />
          <button
            onClick={handleSaveStrategy}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-sm font-semibold"
          >
            Salvar Contexto Estratégico
          </button>
        </div>

        {/* VISÃO ESTRATÉGICA IA */}
        <div className="mt-10 w-full max-w-2xl bg-white p-4 rounded-lg shadow border">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">💡 Visão Estratégica da IA</h2>
          <button
            onClick={handleGetSuggestion}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition text-sm font-semibold mb-4"
          >
            Obter Sugestão IA
          </button>
          {suggestion && (
            <pre className="h-64 overflow-y-auto bg-gray-50 p-3 rounded text-xs text-gray-600 whitespace-pre-wrap font-mono">
              {JSON.stringify(suggestion, null, 2)}
            </pre>
          )}
        </div>

        {/* LOG DA EXECUÇÃO */}
        <div className="w-full max-w-2xl bg-white p-4 rounded-lg shadow border mt-10">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Log da Execução:</h2>
          <pre className="h-64 overflow-y-auto bg-gray-50 p-3 rounded text-xs text-gray-600 whitespace-pre-wrap font-mono">
            {log || 'Nenhuma execução foi realizada ainda.'}
          </pre>
        </div>
      </div>
      <Footer />
    </>
  );
}