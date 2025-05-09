// components/executor/PreviewModal.jsx
import React, { useState } from 'react';

export default function PreviewModal({ files = [], onConfirm, onCancel }) {
  // clone inicial para edição inline
  const [edited, setEdited] = useState(files.map(f => ({ ...f })));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Pré-visualização de instruções</h2>
        {edited.length === 0 && (
          <p className="mb-4">Nenhuma instrução para pré-visualizar.</p>
        )}
        {edited.map((f, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="font-semibold mb-1">{f.path}</h3>
            <textarea
              className="w-full h-32 p-2 border rounded font-mono text-sm"
              value={f.content}
              onChange={e => {
                const copy = [...edited];
                copy[idx] = { ...copy[idx], content: e.target.value };
                setEdited(copy);
              }}
            />
          </div>
        ))}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(edited)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirmar e Executar
          </button>
        </div>
      </div>
    </div>
  );
}
