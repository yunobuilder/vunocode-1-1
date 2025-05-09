import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateSuggestionFromMissing(missingModules = []) {
  if (!missingModules.length) return 'Nenhum módulo faltando informado.';

  const prompt = `
Você é um gerador inteligente do VUNOCODE. Analise a lista abaixo de arquivos e módulos ausentes e sugira um plano de criação com base no padrão de projetos web modernos. Retorne apenas uma lista clara e objetiva em texto.

Módulos ausentes:
${missingModules.join('\n')}
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'Você é um assistente de arquitetura de software inteligente.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.3
  });

  return completion.choices[0].message.content.trim();
}
