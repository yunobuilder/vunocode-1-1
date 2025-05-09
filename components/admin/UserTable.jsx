// Componente Avançado – Tabela de Usuários
import { useState } from 'react';
import { SearchIcon, PencilIcon, LockClosedIcon } from '@heroicons/react/outline';

export default function UserTable() {
  const [search, setSearch] = useState('');
  const mockUsers = [
    { id: 1, name: 'João Silva', email: 'joao@example.com', status: 'Ativo' },
    { id: 2, name: 'Maria Souza', email: 'maria@example.com', status: 'Inativo' },
    { id: 3, name: 'Carlos Lima', email: 'carlos@example.com', status: 'Ativo' },
    { id: 4, name: 'Ana Paula', email: 'ana@example.com', status: 'Ativo' },
    { id: 5, name: 'Roberto Dias', email: 'roberto@example.com', status: 'Inativo' }
  ];

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
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
            <th className="px-4 py-3">Nome</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-right flex justify-end gap-2">
                  <button
                    title="Editar"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    title="Bloquear"
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                  >
                    <LockClosedIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                Nenhum usuário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginação Mock */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>Mostrando {filteredUsers.length} de {mockUsers.length} usuários</span>
        <div className="space-x-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-100">Anterior</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">Próximo</button>
        </div>
      </div>
    </div>
  );
}
