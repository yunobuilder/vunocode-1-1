import { hashPassword } from '../../utils/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  const hashed = await hashPassword(password);

  // Aqui simularíamos salvar no banco (por enquanto só retornamos)
  return res.status(201).json({
    message: 'Usuário registrado com sucesso!',
    user: {
      email,
      hashed
    }
  });
}