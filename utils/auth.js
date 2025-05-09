// Utils de autenticação
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = 'vunocode_secret_key';

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hashed) {
  return await bcrypt.compare(password, hashed);
}

export function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}