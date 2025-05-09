import { useState } from 'react';
import { suggestNextModule } from '../utils/IAEngine';

export default function JsonSuggestionBox({ onExecute }) {
  const [suggestion, setSuggestion] = useState(null);

  const handleGetSuggestion = () => {
    const sug = suggestNextModule();
    setSuggestion(sug);
  };

  return (
    <div className='mt-8 bg-white rounded-lg shadow p-4'>
      <h2 className='font-semibold text-lg mb-2 text-purple-700'>💡 Sugestão Automática da IA</h2>
      <button
        onClick={handleGetSuggestion}
        className='mb-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 w-full'
      >
        Obter Sugestão
      </button>
      {suggestion ? (
        <>
          <pre className='bg-gray-100 p-3 text-xs rounded overflow-x-auto'>{JSON.stringify(suggestion, null, 2)}</pre>
          <button
            onClick={() => onExecute(suggestion)}
            className='mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full'
          >
            🚀 Executar Sugestão
          </button>
        </>
      ) : (
        <p className='text-gray-500 text-sm'>Nenhuma sugestão carregada ainda.</p>
      )}
    </div>
  );
}