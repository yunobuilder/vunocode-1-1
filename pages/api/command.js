import { exec } from 'child_process';

const allowedCommands = ['npm install', 'npm run build', 'npx prisma migrate dev'];

export default async function handler(req, res) {
  const { command } = req.body;

  if (!command) {
    return res.status(400).json({ message: 'Nenhum comando fornecido.' });
  }

  if (!allowedCommands.includes(command)) {
    return res.status(403).json({ message: `Comando não permitido: ${command}` });
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar: ${error.message}`);
      return res.status(500).json({ message: `Erro: ${error.message}` });
    }
    if (stderr) {
      console.warn(`Aviso: ${stderr}`);
    }
    console.log(`✅ Executado: ${command}`);
    return res.status(200).json({
      message: `✅ Executado: ${command}`,
      output: stdout || stderr,
    });
  });
}
