import { scanProject } from './projectScanner';

export async function gerarInsight() {
  const resultado = await scanProject();
  if (resultado.status !== 'ok') return { erro: 'Falha ao escanear projeto.' };

  const { possui } = resultado;

  const sugestoes = [];

  if (!possui.login) sugestoes.push('Adicionar módulo de login com autenticação segura.');
  if (!possui.dashboard) sugestoes.push('Criar dashboard com navegação e resumo do sistema.');
  if (!possui.api) sugestoes.push('Gerar estrutura de API para backend (Ex: /api/user.js).');
  if (!possui.firebase) sugestoes.push('Integrar com Firebase para autenticação ou banco.');
  if (!possui.banco) sugestoes.push('Criar conexão com banco de dados (ex: Prisma + PostgreSQL).');
  if (!possui.mapa) sugestoes.push('Adicionar suporte a mapa (Leaflet, Mapbox ou Google Maps).');

  if (sugestoes.length === 0) {
    sugestoes.push('Tudo pronto! Sistema VUNOCODE 2.0 já está com estrutura completa.');
  }

  return {
    status: 'ok',
    resumo: resultado.resumo,
    sugestoes
  };
}
