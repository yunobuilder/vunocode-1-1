// src/core/TerminalLocal.js
import React, { useState } from 'react';

export default function TerminalLocal() {
  const [output, setOutput] = useState(['🟢 Terminal VUNOCODE iniciado.']);
  const [input, setInput] = useState('');

  function executarComando() {
    setOutput(prev => [...prev, `> ${input}`]);
    if (input === 'help') {
      setOutput(prev => [...prev, 'Comandos disponíveis: help, clear']);
    } else if (input === 'clear') {
      setOutput(['🟢 Terminal limpo.']);
    } else {
      setOutput(prev => [...prev, '⚠️ Comando não reconhecido.']);
    }
    setInput('');
  }

  return (
    <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-64 overflow-y-auto">
      {output.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <input
        className="bg-transparent border-none w-full mt-2 outline-none text-green-300"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && executarComando()}
        placeholder="Digite um comando..."
      />
    </div>
  );
}
