export default function handler(req, res) {
    const roadmap = [
      {
        fase: 1,
        nome: 'Setup Inicial',
        status: 'concluída',
        arquivos: ['pages/index.jsx', 'styles/global.css']
      },
      {
        fase: 2,
        nome: 'Deploy Automático',
        status: 'concluída',
        arquivos: ['pages/api/deploy.js']
      },
      {
        fase: 3,
        nome: 'Editor Visual',
        status: 'pendente',
        arquivos: ['components/DragDropEditor.jsx']
      },
      {
        fase: 4,
        nome: 'IA Estratégica + Geração Dinâmica',
        status: 'em progresso',
        arquivos: []
      }
    ]
  
    res.status(200).json({ roadmap })
  }
  