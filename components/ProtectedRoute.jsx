// Rota protegida
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  useEffect(() => {
    const isAuth = localStorage.getItem('auth');
    if (!isAuth) {
      router.push('/Login');
    }
  }, []);
  return children;
}