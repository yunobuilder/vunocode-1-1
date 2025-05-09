import { useState } from 'react';

export default function Cadastro() {
  const [formData, setFormData] = useState({ nome: '', email: '', tipo: 'usuario', senha: '', confirmSenha: '', aceito: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    if (!formData.aceito) {
      alert('Você precisa aceitar os termos.');
      return;
    }
    alert(`Cadastro realizado para: ${formData.nome}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        <input type="text" name="nome" placeholder="Nome completo" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <select name="tipo" onChange={handleChange} className="w-full p-2 mb-4 border rounded">
          <option value="usuario">Usuário</option>
          <option value="empresa">Empresa</option>
        </select>
        <input type="password" name="senha" placeholder="Senha (8+ caracteres, 1 maiúscula)" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required minLength={8} />
        <input type="password" name="confirmSenha" placeholder="Confirmar senha" onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <label className="flex items-center mb-4 text-sm">
          <input type="checkbox" name="aceito" onChange={handleChange} className="mr-2" /> Aceito os Termos de Uso
        </label>
        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700">Cadastrar</button>
      </form>
    </div>
  );
}