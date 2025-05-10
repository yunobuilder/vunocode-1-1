// pages/api/projetos/list-nomes.js
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

export default async function handler(req, res) {
  // 1) Só aceita GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed. Use GET.' });
  }

  // 2) Define diretório base de projetos conforme ambiente
  const baseDir =
    process.env.NODE_ENV === 'development'
      ? path.join(process.cwd(), 'data', 'projetos')
      : path.join(os.tmpdir(), 'vunocode_projetos');

  try {
    // 3) Garante que o diretório existe
    await fs.mkdir(baseDir, { recursive: true });

    // 4) Lê entradas e filtra apenas diretórios
    const entries = await fs.readdir(baseDir, { withFileTypes: true });
    const nomes = entries
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    // 5) Retorna nomes dos projetos
    return res.status(200).json({ nomes });
  } catch (err) {
    console.error('[list-nomes] Erro ao ler diretório de projetos:', err);
    return res.status(200).json({ nomes: [] });
  }
}
