// src/pages/api/status.js
export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Método não permitido' });
    }
  
    const status = {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      memory: process.memoryUsage(),
      node: process.version,
      status: 'online'
    };
  
    return res.status(200).json(status);
  }
  