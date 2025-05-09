// KPITiles.jsx – Bloco de indicadores principais (Dashboard)
export default function KPITiles({ stats }) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-500">Módulos Criados</p>
          <p className="text-2xl font-bold text-purple-700">{stats.modules}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-500">Execuções</p>
          <p className="text-2xl font-bold text-green-600">{stats.executions}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-500">Erros</p>
          <p className="text-2xl font-bold text-red-500">{stats.errors}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-500">Usuários Ativos</p>
          <p className="text-2xl font-bold text-blue-500">{stats.users}</p>
        </div>
      </div>
    );
  }
  