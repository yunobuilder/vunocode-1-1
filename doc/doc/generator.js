import { promises as fs } from 'fs';
import path from 'path';

export async function generateDocs(files = []) {
  let readme = `# Projeto VUNOCODE 2.0\n\n## Arquivos Gerados\n\n`;
  let apidocs = `# API Documentation\n\n`;

  for (const file of files) {
    readme += `- \`${file.path}\`\n`;

    if (file.path.includes('/api/')) {
      apidocs += `## ${file.path}\n\n\`\`\`js\n${file.content.slice(0, 500)}\n...\n\`\`\`\n\n`;
    }
  }

  const readmePath = path.join(process.cwd(), 'vunocode-2.0-core/README.md');
  const apiPath = path.join(process.cwd(), 'vunocode-2.0-core/doc/api.md');

  await fs.mkdir(path.dirname(apiPath), { recursive: true });
  await fs.writeFile(readmePath, readme);
  await fs.writeFile(apiPath, apidocs);
}
