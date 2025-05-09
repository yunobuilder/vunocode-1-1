// Página Admin – Lista Avançada de Empresas
import Sidebar from '../../components/admin/Sidebar';
import TopBar from '../../components/admin/TopBar';
import CompanyTable from '../../components/admin/CompanyTable';

export default function CompaniesPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold text-purple-700 mb-6">🏢 Gerenciamento de Empresas</h1>
          <CompanyTable />
        </main>
      </div>
    </div>
  );
}
