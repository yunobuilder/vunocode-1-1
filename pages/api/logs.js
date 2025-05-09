import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const logPath = path.join(process.cwd(), 'logs', 'main.log');

  try {
    if (!fs.existsSync(logPath)) {
      return res.status(200).json({ log: 'Nenhum log encontrado ainda.' });
    }
    const content = fs.readFileSync(logPath, 'utf8');
    return res.status(200).json({ log: content });
  } catch (err) {
    console.error('Erro ao ler log:', err);
    return res.status(500).json({ log: 'Erro ao ler log.' });
  }
}
