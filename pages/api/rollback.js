// pages/api/rollback.js
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Método não permitido. Use POST.' });
  }

  const { timestamp } = req.body;
  if (!timestamp) {
    return res.status(400).json({ message: 'É necessário informar { timestamp }.' });
  }

  const backupFile = path.join(process.cwd(), 'data', 'backups', `${timestamp}.json`);
  try {
    const raw = await fs.readFile(backupFile, 'utf8');
    const files = JSON.parse(raw);

    // Reescreve cada arquivo do backup
    for (const file of files) {
      const targetPath = path.join(process.cwd(), file.path);
      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.writeFile(targetPath, file.content, 'utf8');
    }

    return res.status(200).json({ message: 'Rollback executado com sucesso.' });
  } catch (err) {
    console.error('Erro em /api/rollback:', err);
    return res.status(500).json({ message: 'Falha ao executar rollback.' });
  }
}
