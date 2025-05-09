// Painel Admin Geral – Dashboard com Resumo e Links Rápidos
import Link from 'next/link';

export default function AdminDashboardPanel() {
  return (
    <div className="bg-white p-6 rounded-lg shadow border">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Painel Admin – Dashboard 🛡️</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-purple-100 p-4 rounded text-center">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">Usuários 👤</h3>
          <p className="text-gray-600 mb-4">Gerencie usuários registrados.</p>
          <Link href="/admin/users" className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm">
            Acessar Usuários
          </Link>
        </div>
        <div className="bg-green-100 p-4 rounded text-center">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Empresas 🏢</h3>
          <p className="text-gray-600 mb-4">Gerencie empresas cadastradas.</p>
          <Link href="/admin/companies" className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
            Acessar Empresas
          </Link>
        </div>
        <div className="bg-blue-100 p-4 rounded text-center">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Planos 💳</h3>
          <p className="text-gray-600 mb-4">Controle os planos e assinaturas.</p>
          <Link href="/admin/plans" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
            Acessar Planos
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-yellow-100 p-4 rounded text-center">
        <h3 className="text-lg font-semibold text-yellow-700 mb-2">⚙️ Configurações Gerais</h3>
        <p className="text-gray-600 mb-4">Ajuste opções globais e preferências.</p>
        <Link href="/admin/settings" className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 text-sm">
          Ir para Configurações
        </Link>
      </div>
    </div>
  );
}
