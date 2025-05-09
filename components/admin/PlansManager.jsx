// Componente – Gerenciamento de Planos
import { useState } from 'react';

export default function PlansManager() {
  const [plans, setPlans] = useState([
    { name: 'Básico', price: 'R$29,90', status: 'Ativo' },
    { name: 'Premium', price: 'R$59,90', status: 'Ativo' },
    { name: 'Enterprise', price: 'R$199,90', status: 'Inativo' }
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Lista de Planos</h2>
      <table className="w-full text-sm text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Preço</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, idx) => (
            <tr key={idx}>
              <td className="p-2 border">{plan.name}</td>
              <td className="p-2 border">{plan.price}</td>
              <td className="p-2 border">{plan.status}</td>
              <td className="p-2 border">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600 mr-2">Editar</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
