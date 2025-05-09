// components/executor/ExecutorControls.jsx
import React from 'react';

export default function ExecutorControls({ mode, onChangeMode, onRun }) {
  return (
    <div className="flex items-center mb-4 gap-3">
      <select
        value={mode}
        onChange={e => onChangeMode(e.target.value)}
        className="border rounded p-2"
      >
        <option value="auto">Auto</option>
        <option value="json">JSON</option>
        <option value="code">Código</option>
        <option value="natural">Texto Natural</option>
      </select>
      <button
        onClick={onRun}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        Executar
      </button>
    </div>
  );
}
