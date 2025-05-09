// Página AdminBuilder – Chamando o painel técnico
import Sidebar from '../../components/admin/Sidebar';
import TopBar from '../../components/admin/TopBar';
import AdminBuilderPanel from '../../components/admin/AdminBuilderPanel';

export default function AdminBuilderPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-y-auto">
          <AdminBuilderPanel />
        </main>
      </div>
    </div>
  );
}
