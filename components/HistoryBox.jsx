// ✅ Componente para exibir histórico de execuções
import { useEffect, useState } from 'react';

export default function HistoryBox() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('/api/history')
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, []);

  return (
    <div className='mt-8 w-full max-w-2xl bg-white p-4 rounded-lg shadow border'>
      <h2 className='text-lg font-semibold text-gray-700 mb-2'>Histórico de Execuções Automáticas:</h2>
      {history.length === 0 ? (
        <p className='text-sm text-gray-500'>Nenhuma execução registrada ainda.</p>
      ) : (
        <ul className='list-disc ml-5 text-sm text-gray-600'>
          {history.map((item, idx) => (
            <li key={idx} className='mb-1'>
              <strong>{item.description}</strong> ({new Date(item.timestamp).toLocaleString()})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}