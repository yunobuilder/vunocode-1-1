import { verifyPassword, generateToken } from '../../utils/auth';

// Simulando um user salvo (em produção, buscar no banco)
const mockUser = {
  email: 'teste@vunocode.com',
  hashed: '$2a$10$T7x0jZX8QKq8K5lUD1zUEuPj2dMWvA4vGCa5RlXBXLXiYz3XTltBe' // senha: 123456
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  if (email !== mockUser.email) {
    return res.status(401).json({ message: 'Usuário não encontrado' });
  }

  const isValid = await verifyPassword(password, mockUser.hashed);

  if (!isValid) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }

  const token = generateToken({ email });

  return res.status(200).json({
    message: 'Login bem-sucedido!',
    token
  });
}