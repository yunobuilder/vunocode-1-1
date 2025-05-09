// Configurações Gerais – Admin
import { useState } from 'react';

export default function AdminSettings() {
  const [siteName, setSiteName] = useState('VUNOCODE');
  const [themeColor, setThemeColor] = useState('#7C3AED');

  const handleSave = (e) => {
    e.preventDefault();
    alert(`💾 Configurações salvas:\nNome: ${siteName}\nCor: ${themeColor}`);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">⚙️ Configurações Gerais</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome do Site</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cor Primária (HEX)</label>
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="mt-1 h-10 w-20 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Salvar Configurações
        </button>
      </form>
    </div>
  );
}
