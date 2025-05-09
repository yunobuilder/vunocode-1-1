// Componente – Editor de Página Inicial (Visual)
import { useState } from 'react';

export default function HomeEditor() {
  const [welcomeText, setWelcomeText] = useState('Bem-vindo ao VUNOCODE!');
  const [bannerUrl, setBannerUrl] = useState('');

  const handleSave = () => {
    alert('✅ Página inicial atualizada!');
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Editar Conteúdo da Home</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texto de Boas-vindas</label>
          <input
            type="text"
            value={welcomeText}
            onChange={(e) => setWelcomeText(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL do Banner</label>
          <input
            type="text"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <button
          onClick={handleSave}
          className="mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
