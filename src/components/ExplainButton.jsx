import React, { useState } from 'react';
export default function ExplainButton({ code }) {
  const [explicacao, setExplicacao] = useState(null);
  async function handleExplain() {
    const res = await fetch('/api/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    const { explanation } = await res.json();
    setExplicacao(explanation);
  }
  return (
    <div>
      <button
        onClick={handleExplain}
        className="px-3 py-1 bg-purple-600 text-white rounded"
      >
        Entender
      </button>
      {explicacao && (
        <pre className="mt-2 p-2 bg-gray-100 rounded text-sm">
          {explicacao}
        </pre>
      )}
    </div>
  );
}
