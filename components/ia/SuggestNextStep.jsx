import { useState } from 'react';

export default function SuggestNextStep() {
  const [sugestoes, setSugestoes] = useState([]);
  const [resumo, setResumo] = useState('');
  const [loading, setLoading] = useState(false);

  const gerarSugestoes = async () => {
    setLoading(true);
    const res = await fetch('/api/insight');
    const data = await res.json();
    setResumo(data.resumo || '');
    setSugestoes(data.sugestoes || []);
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-4xl mb-6">
      <h2 className="font-semibold text-lg text-purple-800 mb-2">🧠 IA de Evolução VUNOCODE</h2>

      <button
        onClick={gerarSugestoes}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mb-4"
      >
        {loading ? 'Analisando Projeto...' : '🔍 Analisar Estrutura'}
      </button>

      {resumo && (
        <div className="mb-3 text-sm text-gray-700 whitespace-pre-wrap border-l-4 border-purple-400 pl-3 py-2">
          {resumo}
        </div>
      )}

      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-800">
        {sugestoes.map((s, i) => (
          <li key={i} className="bg-gray-100 p-2 rounded">{s}</li>
        ))}
      </ul>
    </div>
  );
}
