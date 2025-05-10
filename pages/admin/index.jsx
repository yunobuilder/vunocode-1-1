// pages/admin/index.jsx
import Sidebar from '../../components/admin/Sidebar';
import TopBar from '../../components/admin/TopBar';
import KPITiles from '../../components/admin/KPITiles';
import AdminDashboardPanel from '../../components/admin/AdminDashboardPanel';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Indicadores de performance */}
          <KPITiles stats={{ modules: 10, executions: 200, errors: 3, users: 25 }} />
          {/* Conteúdo principal do painel */}
          <AdminDashboardPanel />
        </main>
      </div>
    </div>
  );
}