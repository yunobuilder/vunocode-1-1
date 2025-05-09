import { useState } from 'react';

export default function JsonExecutor({ onExecute }) {
  const [jsonCode, setJsonCode] = useState('');

  const handleExecute = () => {
    if (onExecute) {
      onExecute(jsonCode);
    }
  };

  return (
    <div className='mt-8 p-4 border-t border-purple-300'>
      <h2 className='text-lg font-semibold text-purple-700 mb-4'>Executar Novo JSON 🔧</h2>
      <textarea
        className='w-full h-48 p-2 border rounded resize-none'
        placeholder='Cole seu JSON aqui...'
        value={jsonCode}
        onChange={(e) => setJsonCode(e.target.value)}
      ></textarea>
      <button
        onClick={handleExecute}
        className='mt-3 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full'
      >
        Gerar Novo Código
      </button>
    </div>
  );
}