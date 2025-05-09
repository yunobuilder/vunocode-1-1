// Lista de Usuários – Admin
import { useState, useEffect } from 'react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">👤 Usuários</h1>
      {users.length === 0 ? (
        <p className="text-gray-600">Nenhum usuário encontrado.</p>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Nome</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
