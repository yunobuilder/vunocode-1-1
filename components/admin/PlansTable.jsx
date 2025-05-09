// Componente Avançado – Tabela de Planos
import { useState } from 'react';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';

export default function PlansTable() {
  const [plans, setPlans] = useState([
    { id: 1, name: 'Básico', price: 'R$29,90/mês', features: ['Até 5 módulos', 'Suporte básico'], status: 'Ativo' },
    { id: 2, name: 'Intermediário', price: 'R$59,90/mês', features: ['Até 15 módulos', 'Suporte prioritário'], status: 'Ativo' },
    { id: 3, name: 'Premium', price: 'R$99,90/mês', features: ['Módulos ilimitados', 'Suporte premium', 'Consultoria'], status: 'Inativo' }
  ]);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
      {/* Botão Novo Plano */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600 text-sm">Total de Planos: {plans.length}</span>
        <button className="bg-purple-600 text-white flex items-center px-4 py-2 rounded hover:bg-purple-700 text-sm">
          <PlusIcon className="h-4 w-4 mr-2" />
          Novo Plano
        </button>
      </div>

      {/* Tabela */}
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Nome</th>
            <th className="px-4 py-3">Preço</th>
            <th className="px-4 py-3">Recursos</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id} className="border-b">
              <td className="px-4 py-2">{plan.id}</td>
              <td className="px-4 py-2">{plan.name}</td>
              <td className="px-4 py-2">{plan.price}</td>
              <td className="px-4 py-2">
                <ul className="list-disc ml-5 text-xs text-gray-500 space-y-1">
                  {plan.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    plan.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {plan.status}
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
                  title="Excluir"
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
