// TopBar do Painel Admin
import LanguageSwitcher from './LanguageSwitcher';

export default function TopBar() {
  return (
    <div className="w-full bg-white p-4 shadow flex justify-between items-center">
      <span className="text-purple-700 font-bold text-lg">Administração</span>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <span className="text-gray-600 text-sm">admin@vunocode.com</span>
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Sair</button>
      </div>
    </div>
  );
}