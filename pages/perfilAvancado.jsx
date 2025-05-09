// Página Perfil Avançado com visual moderno 🚀
import Head from 'next/head';

export default function PerfilAvancado() {
  return (
    <>
      <Head>
        <title>Perfil Avançado - VUNOCode</title>
      </Head>
      <div className='min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-6'>
        <div className='max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6'>
          <h1 className='text-4xl font-bold text-purple-700 mb-4'>Meu Perfil 🚀</h1>
          <div className='flex items-center mb-4'>
            <img
              src='https://via.placeholder.com/100'
              alt='Avatar'
              className='rounded-full w-24 h-24 mr-4 border-4 border-purple-500'
            />
            <div>
              <h2 className='text-2xl font-semibold'>João Silva</h2>
              <p className='text-gray-500'>joao@example.com</p>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-purple-50 p-4 rounded shadow'>
              <h3 className='text-lg font-semibold text-purple-700 mb-2'>Informações</h3>
              <p><strong>Plano:</strong> Premium</p>
              <p><strong>Membro desde:</strong> Jan 2025</p>
              <p><strong>Status:</strong> Ativo ✅</p>
            </div>
            <div className='bg-purple-50 p-4 rounded shadow'>
              <h3 className='text-lg font-semibold text-purple-700 mb-2'>Configurações Rápidas</h3>
              <button className='w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 mb-2'>Editar Perfil</button>
              <button className='w-full bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300'>Alterar Senha</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}