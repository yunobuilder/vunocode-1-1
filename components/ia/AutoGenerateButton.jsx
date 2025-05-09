import { useState } from 'react';

export default function AutoGenerateButton({ contexto }) {
  const [log, setLog] = useState('');
  const [loading, setLoading] = useState(false);

  const gerarModulo = async () => {
    setLoading(true);
    setLog('🧠 Gerando módulo com IA...\n');

    const res = await fetch('/api/insight/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contexto })
    });

    const data = await res.json();

    if (data && data.arquivos?.length) {
      const exec = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.arquivos)
      });

      const final = await exec.json();
      setLog(prev => prev + `✅ Módulo gerado: ${final.message}`);
    } else {
      setLog(prev => prev + '❌ Nenhum módulo gerado.\n');
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-4xl mb-6">
      <h3 className="font-semibold text-purple-700 mb-2">✨ Gerador Inteligente</h3>
      <button
        onClick={gerarModulo}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? 'Gerando...' : '⚡ Gerar Agora'}
      </button>

      <pre className="mt-3 p-2 bg-gray-100 rounded text-xs text-gray-800 whitespace-pre-wrap">
        {log}
      </pre>
    </div>
  );
}
