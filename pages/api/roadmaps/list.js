// /pages/api/roadmaps/list.js

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Exemplo: retornar lista simulada de trilhas/roadmaps
    const trilhas = [
      { nome: 'Trilha de Autenticação' },
      { nome: 'Trilha de Admin' },
      { nome: 'Trilha SaaS Avançado' }
    ]

    res.status(200).json(trilhas);
  } catch (err) {
    console.error('[roadmaps/list] ERRO:', err);
    res.status(500).json({ error: 'Erro interno ao carregar trilhas.' });
  }
}
