// Página Perfil avançada gerada automaticamente
import { useState } from 'react';

export default function Perfil() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    const res = await fetch('/api/perfil', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    setMessage(data.message || 'Perfil atualizado com sucesso.');
  };

  return (
    <div className='p-6 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold text-purple-700 mb-4'>Perfil 🚀</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Nome</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='mt-1 block w-full border border-gray-300 rounded-md p-2'/>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Email</label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='mt-1 block w-full border border-gray-300 rounded-md p-2'/>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Avatar</label>
          <input type='file' accept='image/*' onChange={(e) => setAvatar(e.target.files[0])} className='mt-1'/>
        </div>
        <button type='submit' className='bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700'>Salvar Perfil</button>
      </form>
      {message && <p className='mt-4 text-green-600'>{message}</p>}
    </div>
  );
}