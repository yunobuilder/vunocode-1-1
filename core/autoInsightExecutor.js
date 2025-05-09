import { analyzeStructure } from './visionAnalyzer.js';
import { generateSuggestionFromMissing } from './insightEngine.js'; // Arquivo 17
import fs from 'fs/promises';
import path from 'path';

export async function runAutoInsight() {
  const result = await analyzeStructure();

  if (result.missingModules.length === 0) {
    return { status: 'OK', message: 'Nenhum módulo faltando. Projeto completo.' };
  }

  const suggestion = await generateSuggestionFromMissing(result.missingModules);

  const insightPath = path.join(process.cwd(), 'vunocode-2.0-core/insights/auto_insight_result.json');
  await fs.mkdir(path.dirname(insightPath), { recursive: true });
  await fs.writeFile(insightPath, JSON.stringify({
    summary: result.summary,
    suggestions: suggestion
  }, null, 2), 'utf8');

  return {
    status: 'DONE',
    message: `Sugestão gerada para ${result.missingModules.length} módulo(s) ausente(s).`,
    file: insightPath
  };
}
