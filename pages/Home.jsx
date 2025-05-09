import Head from 'next/head';

export default function Home() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-purple-600'>
      <Head>
        <title>VUNOCode - Home</title>
      </Head>
      <h1 className='text-white text-4xl font-bold'>Bem-vindo ao VUNOCode 🚀</h1>
    </div>
  );
}