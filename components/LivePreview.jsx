import dynamic from 'next/dynamic';

export default function LivePreview({ component: Component }) {
  return (
    <div className='mt-8 p-4 border-t border-purple-300'>
      <h2 className='text-lg font-semibold text-purple-700 mb-4'>Pré-visualização ao Vivo ⚡</h2>
      <div className='bg-gray-50 p-4 rounded shadow min-h-[300px] flex items-center justify-center'>
        {Component ? <Component /> : <p className='text-gray-400'>Nenhum componente carregado ainda.</p>}
      </div>
    </div>
  );
}