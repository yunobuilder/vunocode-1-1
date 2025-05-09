import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { arquivos } = req.body;

  if (!arquivos || !Array.isArray(arquivos)) {
    return res.status(400).json({ error: 'Arquivos ausentes ou inválidos.' });
  }

  const basePath = path.join(process.cwd(), 'vunocode-2.0-core');
  const gerados = [];

  try {
    console.log('[runPhase] Criando base:', basePath);
    await fs.mkdir(basePath, { recursive: true });

    for (const file of arquivos) {
      if (!file.path || typeof file.content !== 'string') {
        console.warn('[runPhase] Arquivo ignorado (path ou content inválido)', file);
        continue;
      }

      // Limpa prefixo redundante se presente
      const cleanPath = file.path.replace(/^vunocode-2.0-core[\\/]/, '');
      const fullPath = path.join(basePath, cleanPath);

      console.log('[runPhase] Gravando em:', fullPath);

      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, file.content, 'utf8');
      gerados.push(fullPath);
    }

    return res.status(200).json({
      message: `✅ ${gerados.length} arquivo(s) criado(s) com sucesso.`,
      files: gerados
    });
  } catch (err) {
    console.error('[runPhase] ERRO ao gravar arquivos:', err);
    return res.status(500).json({ error: 'Erro interno ao gravar arquivos.' });
  }
}
