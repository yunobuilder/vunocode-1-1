import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register:', { email, password });
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-green-700'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded shadow-md w-80'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Cadastro</h2>
        <input
          type='email'
          placeholder='Email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-2 mb-4 border rounded'
        />
        <input
          type='password'
          placeholder='Senha'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-2 mb-6 border rounded'
        />
        <button type='submit' className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700'>
          Cadastrar
        </button>
      </form>
    </div>
  );
}