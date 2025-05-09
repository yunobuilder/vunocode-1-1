// Componente Avançado – Tabela de Empresas
import { useState } from 'react';
import { SearchIcon, PencilIcon, EyeIcon, BanIcon } from '@heroicons/react/outline';

export default function CompanyTable() {
  const [search, setSearch] = useState('');
  const mockCompanies = [
    { id: 1, name: 'Tech Innovators', email: 'contact@tech.com', status: 'Ativo', plan: 'Premium' },
    { id: 2, name: 'Foodies SA', email: 'info@foodies.com', status: 'Inativo', plan: 'Básico' },
    { id: 3, name: 'Educa Plus', email: 'admin@educa.com', status: 'Ativo', plan: 'Intermediário' },
    { id: 4, name: 'HealthLine', email: 'hello@healthline.com', status: 'Ativo', plan: 'Premium' }
  ];

  const filteredCompanies = mockCompanies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase()) || company.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
      {/* Barra de Busca */}
      <div className="flex items-center mb-4">
        <SearchIcon className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome ou email..."
          className="border border-gray-300 rounded p-2 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Tabela */}
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Empresa</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Plano</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <tr key={company.id} className="border-b">
                <td className="px-4 py-2">{company.id}</td>
                <td className="px-4 py-2">{company.name}</td>
                <td className="px-4 py-2">{company.email}</td>
                <td className="px-4 py-2">{company.plan}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      company.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {company.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-right flex justify-end gap-2">
                  <button
                    title="Ver Detalhes"
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    title="Editar"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    title="Desativar"
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                  >
                    <BanIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                Nenhuma empresa encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginação Mock */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>Mostrando {filteredCompanies.length} de {mockCompanies.length} empresas</span>
        <div className="space-x-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-100">Anterior</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">Próximo</button>
        </div>
      </div>
    </div>
  );
}
