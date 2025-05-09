import React, { useState } from 'react';
export default function SuggestModules({ context }) {
  const [suggestions, setSuggestions] = useState(null);
  async function handleSuggest() {
    const res = await fetch('/api/suggestModule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context })
    });
    const { suggestions: text } = await res.json();
    setSuggestions(text);
  }
  return (
    <div className="p-4">
      <button
        onClick={handleSuggest}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Sugerir Módulos
      </button>
      {suggestions && (
        <pre className="mt-4 p-2 bg-gray-100 rounded text-sm whitespace-pre-wrap">
          {suggestions}
        </pre>
      )}
    </div>
  );
}
