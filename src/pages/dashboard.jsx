// src/pages/dashboard.jsx
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Painel Principal</h2>
          <p className="text-sm text-gray-700">Bem-vindo ao painel do VUNOCODE 2.0. Aqui você poderá acompanhar o progresso dos seus projetos, fases, execuções e automações futuras.</p>
        </main>
      </div>
    </div>
  )
}
