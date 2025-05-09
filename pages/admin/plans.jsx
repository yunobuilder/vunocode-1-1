// Página Admin – Gerenciamento de Planos
import Sidebar from '../../components/admin/Sidebar';
import TopBar from '../../components/admin/TopBar';
import PlansTable from '../../components/admin/PlansTable';

export default function PlansPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold text-purple-700 mb-6">💳 Gerenciamento de Planos</h1>
          <PlansTable />
        </main>
      </div>
    </div>
  );
}
