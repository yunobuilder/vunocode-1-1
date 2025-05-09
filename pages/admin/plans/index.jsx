// Gerenciar Planos – Admin
import { useState, useEffect } from 'react';

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch('/api/plans')
      .then((res) => res.json())
      .then((data) => setPlans(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">💳 Planos</h1>
      {plans.length === 0 ? (
        <p className="text-gray-600">Nenhum plano cadastrado.</p>
      ) : (
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Nome</th>
              <th className="p-3">Preço</th>
              <th className="p-3">Descrição</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id} className="border-t">
                <td className="p-3">{plan.name}</td>
                <td className="p-3">R$ {plan.price}</td>
                <td className="p-3">{plan.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
