// Painel AdminBuilder – Executor + Instrução Humana + IA + Logs
import { useState } from 'react';

export default function AdminBuilderPanel() {
  const [input, setInput] = useState('');
  const [log, setLog] = useState('');
  const [result, setResult] = useState('');

  const handleExecute = async () => {
    setLog('🚀 Executando...\n');
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction: input }),
      });
      const data = await res.json();
      setLog((prev) => prev + (data.message || '✅ Execução finalizada.'));
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setLog((prev) => prev + '❌ Erro na execução.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border mb-6">
      <h2 className="text-xl font-bold text-purple-700 mb-4">AdminBuilder 🚀 Executor & IA</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Cole seu JSON, código ou escreva uma instrução humana..."
        className="w-full h-64 p-4 border-2 border-purple-300 rounded-lg shadow text-sm font-mono mb-4"
      />
      <button
        onClick={handleExecute}
        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition text-sm font-semibold"
      >
        Executar / Gerar & Executar
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">📝 Log:</h3>
        <pre className="h-48 overflow-y-auto bg-gray-50 p-3 rounded text-xs text-gray-600 whitespace-pre-wrap font-mono">
          {log || 'Nenhuma execução ainda.'}
        </pre>
      </div>

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">✅ Resultado da IA / Execução:</h3>
          <pre className="h-48 overflow-y-auto bg-gray-50 p-3 rounded text-xs text-gray-600 whitespace-pre-wrap font-mono">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
