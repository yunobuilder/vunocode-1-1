// Sidebar do Painel Admin
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-8">VUNOCODE Admin</h2>
      <nav className="space-y-4">
        <Link href="/admin/users" className="block text-gray-700 hover:text-purple-600">👤 Usuários</Link>
        <Link href="/admin/companies" className="block text-gray-700 hover:text-purple-600">🏢 Empresas</Link>
        <Link href="/admin/plans" className="block text-gray-700 hover:text-purple-600">💳 Planos</Link>
        <Link href="/admin/projetos" className="block hover:text-purple-600">📁 Projetos</Link>
        <Link href="/admin-builder" className="block text-gray-700 hover:text-purple-600">⚙️ AdminBuilder (Core)</Link>
        <Link href="/admin/logs" className="block text-gray-700 hover:text-purple-600">📜 Logs & Auditoria</Link>
        <Link href="/admin/settings" className="block text-gray-700 hover:text-purple-600">⚙️ Configurações</Link>
      </nav>
    </div>
  );
}
