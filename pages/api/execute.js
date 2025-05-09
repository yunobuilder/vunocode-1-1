// pages/api/execute.js
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const arquivos = req.body;

  if (!arquivos || !Array.isArray(arquivos)) {
    return res.status(400).json({ error: 'Entrada inválida. Esperado um array.' });
  }

  const gerados = [];

  try {
    for (const file of arquivos) {
      if (!file.path || typeof file.content !== 'string') {
        console.warn('[execute] Ignorando arquivo inválido:', file);
        continue;
      }

      const fullPath = path.join(process.cwd(), file.path);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, file.content, 'utf8');
      gerados.push(file.path);
    }

    return res.status(200).json({
      message: `✅ ${gerados.length} arquivo(s) salvo(s) com sucesso.`,
      files: gerados
    });
  } catch (err) {
    console.error('[execute] ERRO ao gravar arquivos:', err);
    return res.status(500).json({ error: 'Erro ao gravar arquivos.' });
  }
}
