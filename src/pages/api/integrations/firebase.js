import { initializeApp } from 'firebase/app';
export default function handler(req, res) {
  // Inicialize seu app Firebase aqui
  const app = initializeApp({ apiKey: process.env.FIREBASE_API_KEY });
  res.status(200).json({ ok: true });
}
