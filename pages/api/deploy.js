import { exec } from 'child_process';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const log = [];

  // Roda o build
  exec('npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Erro no build:', error);
      log.push(`❌ Erro no build: ${error.message}`);
      return res.status(500).json({ message: 'Erro no build', log });
    }
    console.log('✅ Build concluído');
    log.push('✅ Build concluído\n' + stdout);

    // Roda o deploy
    exec('npx vercel --prod', (deployError, deployStdout, deployStderr) => {
      if (deployError) {
        console.error('❌ Erro no deploy:', deployError);
        log.push(`❌ Erro no deploy: ${deployError.message}`);
        return res.status(500).json({ message: 'Erro no deploy', log });
      }
      console.log('✅ Deploy concluído');
      log.push('✅ Deploy concluído\n' + deployStdout);

      return res.status(200).json({ message: 'Deploy realizado com sucesso', log });
    });
  });
}
