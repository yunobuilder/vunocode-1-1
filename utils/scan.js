import { scanProject } from '../../utils/projectScanner';

export default async function handler(req, res) {
  const resultado = await scanProject();
  res.status(200).json(resultado);
}
