import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { path: filePath, content, overwrite = false } = req.body;

  if (!filePath || !content) {
    return res.status(400).json({ message: '❗ Caminho e conteúdo são obrigatórios.' });
  }

  try {
    const baseDir = process.cwd();
    const absolutePath = path.join(baseDir, filePath.replace(/\.{2}\/+/g, ''));

    const dir = path.dirname(absolutePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 🔄 Se o arquivo já existe
    if (fs.existsSync(absolutePath)) {
      if (overwrite) {
        fs.writeFileSync(absolutePath, content, 'utf8');
        console.log(`✅ Arquivo sobrescrito: ${absolutePath}`);
        return res.status(200).json({
          message: `✅ Arquivo sobrescrito: ${absolutePath}`,
          updated: true
        });
      } else {
        console.log(`⚠️ Arquivo já existe (ignorado): ${absolutePath}`);
        return res.status(200).json({
          message: `⚠️ Arquivo já existe (ignorado): ${absolutePath}`,
          skipped: true
        });
      }
    }

    // 🆕 Cria novo arquivo
    fs.writeFileSync(absolutePath, content, 'utf8');
    console.log(`✅ Arquivo salvo em: ${absolutePath}`);
    return res.status(200).json({
      message: `✅ Arquivo salvo em: ${absolutePath}`,
      created: true
    });

  } catch (err) {
    console.error('❌ Erro ao salvar o arquivo:', err);
    return res.status(500).json({ message: '❌ Erro ao salvar o arquivo.' });
  }
}
