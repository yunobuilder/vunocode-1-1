import Header from '../components/Header';
import Footer from '../components/Footer';
import { BellIcon } from '@heroicons/react/24/outline';
import JsonExecutor from '../components/JsonExecutor';
import LivePreview from '../components/LivePreview';
import dynamic from 'next/dynamic';

const DashboardPreview = dynamic(() => import('./dashboard'), { ssr: false });

export default function Dashboard() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      <Header />
      <main className='flex-1 p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-purple-700'>Painel do Usuário 🚀</h1>
          <button className='relative bg-white rounded-full p-2 shadow hover:bg-gray-100'>
            <BellIcon className='h-6 w-6 text-purple-700' />
            <span className='absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500'></span>
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
          <div className='bg-white shadow rounded-lg p-4 text-center'>
            <p className='text-sm text-gray-500'>Projetos Ativos</p>
            <p className='text-2xl font-bold text-purple-700'>5</p>
          </div>
          <div className='bg-white shadow rounded-lg p-4 text-center'>
            <p className='text-sm text-gray-500'>Módulos Gerados</p>
            <p className='text-2xl font-bold text-purple-700'>23</p>
          </div>
          <div className='bg-white shadow rounded-lg p-4 text-center'>
            <p className='text-sm text-gray-500'>Último Deploy</p>
            <p className='text-2xl font-bold text-green-500'>✅ Sucesso</p>
          </div>
          <div className='bg-white shadow rounded-lg p-4 text-center'>
            <p className='text-sm text-gray-500'>Erros Detectados</p>
            <p className='text-2xl font-bold text-red-500'>0</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white rounded-lg shadow p-4'>
            <h2 className='font-semibold text-lg mb-2'>Visão Geral</h2>
            <p>Projeto Atual: <strong>VUNOCode Pro</strong></p>
            <p>Status: <span className='text-green-500 font-semibold'>Rodando</span></p>
            <button className='mt-3 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 w-full'>Reexecutar Projeto</button>
          </div>

          <div className='bg-white rounded-lg shadow p-4'>
            <h2 className='font-semibold text-lg mb-2'>Módulos Ativos</h2>
            <ul className='list-disc ml-5 text-sm'>
              <li>Login.jsx ✅</li>
              <li>Dashboard.jsx ✅</li>
              <li>Admin.jsx ✅</li>
              <li>API/save.js ✅</li>
            </ul>
            <button className='mt-3 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 w-full'>Visualizar Todos</button>
          </div>

          <div className='bg-white rounded-lg shadow p-4'>
            <h2 className='font-semibold text-lg mb-2'>Deploy & Logs</h2>
            <p>Status Deploy: <span className='text-yellow-500 font-semibold'>Em progresso...</span></p>
            <div className='mt-2 h-2 bg-gray-200 rounded-full overflow-hidden'>
              <div className='w-2/3 h-full bg-green-500'></div>
            </div>
            <button className='mt-3 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full'>Forçar Deploy</button>
          </div>
        </div>

        <div className='mt-8 bg-white rounded-lg shadow p-4'>
          <h2 className='font-semibold text-lg mb-2'>Histórico de Execuções</h2>
          <ul className='list-disc ml-5 text-sm text-gray-600'>
            <li>06/05 - Deploy otimizado ✅</li>
            <li>05/05 - Módulo Dashboard.jsx atualizado 🚀</li>
            <li>04/05 - Estrutura inicial criada ⚙️</li>
          </ul>
          <button className='mt-3 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 w-full'>Ver Todos os Logs</button>
        </div>

            {/* Campo Extra: Executor de JSON + Sandbox Preview */}
        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white rounded-lg shadow p-4'>
            <h2 className='font-semibold text-lg mb-4'>Executor de Instruções (JSON)</h2>
            <JsonExecutor onExecute={(json) => console.log('Novo JSON executado:', json)} />
          </div>
          <div className='bg-white rounded-lg shadow p-4'>
            <h2 className='font-semibold text-lg mb-4'>Pré-Visualização Local (Live Preview)</h2>
            <LivePreview component={DashboardPreview} />

            
        </div>
        <div className='mt-8 flex flex-col md:flex-row gap-6'>
          <div className='bg-white rounded-lg shadow p-4 flex-1 flex items-center'>
            <img src='https://via.placeholder.com/80' alt='Avatar' className='w-20 h-20 rounded-full mr-4' />
            <div>
              <h2 className='font-semibold text-lg'>João Silva</h2>
              <p className='text-gray-500 text-sm'>Plano: Premium</p>
              <p className='text-gray-500 text-sm'>Membro desde: Jan 2025</p>
            </div>
          </div>
          <div className='bg-white rounded-lg shadow p-4 flex-1'>
            <h2 className='font-semibold text-lg mb-2'>Minhas Preferências</h2>
            <p className='text-gray-500 text-sm mb-2'>Tema: Claro</p>
            <p className='text-gray-500 text-sm mb-2'>Linguagem: Português</p>
            <button className='mt-2 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 w-full'>Editar Perfil</button>
          </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
