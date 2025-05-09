import fs from 'fs';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'vunocode-2.0-core');

export async function scanProject() {
  const estrutura = {
    arquivos: [],
    pastas: new Set(),
    possui: {
      login: false,
      dashboard: false,
      api: false,
      firebase: false,
      banco: false,
      mapa: false
    }
  };

  async function walk(dir) {
    const files = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      const relPath = fullPath.replace(BASE_DIR + path.sep, '');
      if (file.isDirectory()) {
        estrutura.pastas.add(relPath);
        await walk(fullPath);
      } else {
        estrutura.arquivos.push(relPath);

        // Reconhecimento simples
        if (/login/i.test(file.name)) estrutura.possui.login = true;
        if (/dashboard/i.test(file.name)) estrutura.possui.dashboard = true;
        if (/api\//.test(relPath)) estrutura.possui.api = true;
        if (/firebase/i.test(relPath)) estrutura.possui.firebase = true;
        if (/db|prisma|sql/i.test(relPath)) estrutura.possui.banco = true;
        if (/mapa|geo/i.test(relPath)) estrutura.possui.mapa = true;
      }
    }
  }

  try {
    await walk(BASE_DIR);
    return {
      status: 'ok',
      resumo: {
        totalArquivos: estrutura.arquivos.length,
        totalPastas: estrutura.pastas.size,
        ...estrutura.possui
      },
      arquivos: estrutura.arquivos
    };
  } catch (err) {
    return { status: 'erro', erro: err.message };
  }
}
