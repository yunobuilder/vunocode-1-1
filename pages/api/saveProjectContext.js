import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { context } = req.body;
    const filePath = path.join(process.cwd(), 'data', 'projectContext.json');

    try {
      // Cria a pasta /data se não existir
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Salva o contexto
      fs.writeFileSync(filePath, context, 'utf8');
      res.status(200).json({ message: 'Contexto salvo com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao salvar o contexto.' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
  }
}
