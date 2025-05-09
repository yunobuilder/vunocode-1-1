import fs from 'fs';
import path from 'path';

export function analisarProjeto(base = 'vunocode-2.0-core') {
  const resultados = [];

  function lerDiretorioRecursivo(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        lerDiretorioRecursivo(fullPath);
      } else {
        const relativePath = fullPath.replace(path.join(process.cwd(), base), '');
        resultados.push(relativePath);
      }
    }
  }

  try {
    const fullBase = path.join(process.cwd(), base);
    if (fs.existsSync(fullBase)) {
      lerDiretorioRecursivo(fullBase);
    }
  } catch (err) {
    console.error('[analisadorProjeto] ERRO:', err.message);
  }

  return resultados;
}
