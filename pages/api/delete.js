import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { path: filePath } = req.body;

  if (!filePath) {
    return res.status(400).json({ message: 'Caminho do arquivo é obrigatório.' });
  }

  try {
    const baseDir = process.cwd();
    const absolutePath = path.join(baseDir, filePath.replace(/\.\.\/+/g, ''));

    if (!fs.existsSync(absolutePath)) {
      return res.status(200).json({ message: `⚠️ Arquivo não encontrado: ${absolutePath}` });
    }

    fs.unlinkSync(absolutePath);
    console.log(`🗑️ Arquivo removido: ${absolutePath}`);

    return res.status(200).json({ message: `✅ Arquivo removido: ${absolutePath}` });
  } catch (err) {
    console.error('Erro ao remover o arquivo:', err);
    return res.status(500).json({ message: 'Erro ao remover o arquivo.' });
  }
}
