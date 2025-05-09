// Componente – Configurações Globais
import { useState } from 'react';

export default function SettingsPanel() {
  const [siteName, setSiteName] = useState('VUNOCODE');
  const [contactEmail, setContactEmail] = useState('admin@vunocode.com');

  const handleSave = () => {
    alert('✅ Configurações salvas com sucesso!');
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Configurações Globais</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Site</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail de Contato</label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <button
          onClick={handleSave}
          className="mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Salvar Configurações
        </button>
      </div>
    </div>
  );
}
