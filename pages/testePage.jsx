import ButtonVuno from '../components/ButtonVuno';
import CardVuno from '../components/CardVuno';

export default function TestePage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold mb-4'>Página de Teste VUNO ✅</h1>
      <CardVuno />
      <div className='mt-4'>
        <ButtonVuno />
      </div>
    </div>
  );
}