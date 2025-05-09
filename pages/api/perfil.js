// API Perfil avançada
export const config = {
  api: {
    bodyParser: false
  }
};

import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({ dest: './public/uploads/' });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Erro na API: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Método ${req.method} não permitido.` });
  }
});

apiRoute.use(upload.single('avatar'));

apiRoute.post((req, res) => {
  const { name, email } = req.body;
  const avatarFile = req.file;
  console.log('Perfil recebido:', { name, email, avatarFile });
  res.status(200).json({ message: 'Perfil atualizado com sucesso.' });
});

export default apiRoute;