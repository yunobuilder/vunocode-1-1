// Auto-Insight Script 🚀
const fs = require('fs');
const path = require('path');

function analyzeProject() {
  const baseDir = path.resolve('./');
  const insightsDir = path.join(baseDir, 'insights');
  if (!fs.existsSync(insightsDir)) {
    fs.mkdirSync(insightsDir);
  }

  const result = {
    timestamp: new Date().toISOString(),
    recommendations: []
  };

  // Simples análise: verifica se a pasta auth existe para sugerir segurança
  const hasAuth = fs.existsSync(path.join(baseDir, 'components/Auth'));
  if (!hasAuth) {
    result.recommendations.push('🔒 Recomendação: Adicionar módulo de autenticação para proteger rotas.');
  }

  // Verifica se existe documentação
  const hasDocs = fs.existsSync(path.join(baseDir, 'docs/README.md'));
  if (!hasDocs) {
    result.recommendations.push('📄 Recomendação: Criar documentação técnica (README.md).');
  }

  // Exemplo: sugerir painel admin
  const hasAdmin = fs.existsSync(path.join(baseDir, 'pages/admin.jsx'));
  if (!hasAdmin) {
    result.recommendations.push('🛠️ Recomendação: Criar painel administrativo para gestão completa.');
  }

  // Salva resultado
  const insightFile = path.join(insightsDir, `insight_${Date.now()}.json`);
  fs.writeFileSync(insightFile, JSON.stringify(result, null, 2));
  console.log(`✅ Insight gerado e salvo em: ${insightFile}`);
}

analyzeProject();