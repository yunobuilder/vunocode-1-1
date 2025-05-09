// Lista de Empresas – Admin
import { useState, useEffect } from 'react';

export default function AdminCompanies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch('/api/companies')
      .then((res) => res.json())
      .then((data) => setCompanies(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">🏢 Empresas</h1>
      {companies.length === 0 ? (
        <p className="text-gray-600">Nenhuma empresa cadastrada.</p>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Nome</th>
              <th className="p-3">CNPJ</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className="border-t">
                <td className="p-3">{company.name}</td>
                <td className="p-3">{company.cnpj}</td>
                <td className="p-3">{company.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
