// Logs & Auditoria – Admin
import { useState, useEffect } from 'react';

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('/api/logs')
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">📜 Logs & Auditoria</h1>
      {logs.length === 0 ? (
        <p className="text-gray-600">Nenhum log registrado.</p>
      ) : (
        <ul className="space-y-3">
          {logs.map((log, index) => (
            <li key={index} className="bg-white shadow p-4 rounded">
              <p className="text-sm text-gray-600">{log.date} - {log.action}</p>
              <p className="text-xs text-gray-400">{log.details}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
