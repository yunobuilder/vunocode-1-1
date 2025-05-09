// Componente – Logs & Auditoria Viewer
import { useState } from 'react';

export default function LogsViewer() {
  const [logs, setLogs] = useState([
    { date: '2024-06-06', action: 'Criou o módulo Dashboard.jsx', user: 'admin' },
    { date: '2024-06-05', action: 'Atualizou Plano Premium', user: 'admin' },
    { date: '2024-06-05', action: 'Executou JSON – Nova API', user: 'admin' }
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Histórico de Ações</h2>
      <ul className="max-h-96 overflow-y-auto space-y-2">
        {logs.map((log, idx) => (
          <li key={idx} className="border-b pb-2">
            <div className="text-sm text-gray-600">
              🗓️ <strong>{log.date}</strong> – {log.action} <span className="text-xs text-gray-400">(por {log.user})</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
