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

    const isJSX = absolutePath.endsWith('.jsx') || absolutePath.endsWith('.js');
    const trimmedContent = content.trim();
    const onlyCommentsOrEmpty = trimmedContent === '' ||
      /^[\s/]*$/.test(trimmedContent) ||
      /^\s*(\/\/.*|\s*\/\*[\s\S]*?\*\/\s*)*$/gm.test(trimmedContent);

    if (isJSX && onlyCommentsOrEmpty) {
      console.log(`❌ Conteúdo inválido (vazio/comentários) detectado. Bloqueado: ${absolutePath}`);
      return res.status(400).json({
        message: `❌ Conteúdo inválido: arquivo .jsx/.js não pode ser salvo vazio ou só com comentários.`,
        blocked: true
      });
    }

    if (fs.existsSync(absolutePath)) {
      const existingContent = fs.readFileSync(absolutePath, 'utf8').trim();

      const existingIsInvalid = existingContent === '' ||
        /^[\s/]*$/.test(existingContent) ||
        /^\s*(\/\/.*|\s*\/\*[\s\S]*?\*\/\s*)*$/gm.test(existingContent);

      if (existingContent === trimmedContent) {
        console.log(`✅ Arquivo já atualizado e válido: ${absolutePath}`);
        return res.status(200).json({
          message: `✅ Arquivo já está atualizado e válido: ${absolutePath}`,
          skipped: true
        });
      }

      if (overwrite || existingIsInvalid) {
        fs.writeFileSync(absolutePath, content, 'utf8');
        console.log(`✅ Arquivo sobrescrito (forçado porque estava inválido ou overwrite): ${absolutePath}`);
        return res.status(200).json({
          message: `✅ Arquivo sobrescrito (inválido ou overwrite): ${absolutePath}`,
          updated: true
        });
      } else {
        console.log(`⚠️ Arquivo já existe e não foi sobrescrito: ${absolutePath}`);
        return res.status(200).json({
          message: `⚠️ Arquivo já existe e não foi sobrescrito: ${absolutePath}`,
          skipped: true
        });
      }
    }

    fs.writeFileSync(absolutePath, content, 'utf8');
    console.log(`✅ Novo arquivo salvo em: ${absolutePath}`);
    return res.status(200).json({
      message: `✅ Novo arquivo salvo em: ${absolutePath}`,
      created: true
    });

  } catch (err) {
    console.error('❌ Erro ao salvar o arquivo:', err);
    return res.status(500).json({ message: '❌ Erro ao salvar o arquivo.' });
  }
}
