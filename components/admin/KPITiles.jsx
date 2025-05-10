// components/admin/KPITiles.jsx
import React from 'react';

export default function KPITiles({ stats }) {
  const items = [
    { label: 'Módulos', value: stats.modules },
    { label: 'Execuções', value: stats.executions },
    { label: 'Erros', value: stats.errors },
    { label: 'Usuários', value: stats.users }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {items.map(item => (
        <div key={item.label} className="bg-white p-4 rounded shadow text-center">
          <div className="text-xl font-semibold text-purple-700">{item.value}</div>
          <div className="text-gray-600">{item.label}</div>
        </div>
      ))}
    </div>
  );
}