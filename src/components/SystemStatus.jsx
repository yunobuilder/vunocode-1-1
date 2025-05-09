// src/components/SystemStatus.jsx
import React, { useEffect, useState } from 'react';

export default function SystemStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(() => setStatus({ status: 'erro' }));
  }, []);

  if (!status) return <p className="text-sm text-gray-400">Carregando status...</p>;

  return (
    <div className="bg-white p-4 shadow rounded text-sm text-gray-700">
      <h3 className="font-semibold text-purple-600 mb-2">Status do Sistema</h3>
      <ul className="space-y-1">
        <li><strong>Status:</strong> {status.status}</li>
        <li><strong>Node:</strong> {status.node}</li>
        <li><strong>Uptime:</strong> {Math.floor(status.uptime)}s</li>
        <li><strong>RAM:</strong> {(status.memory.rss / 1024 / 1024).toFixed(2)} MB</li>
        <li><strong>Timestamp:</strong> {status.timestamp}</li>
      </ul>
    </div>
  );
}
