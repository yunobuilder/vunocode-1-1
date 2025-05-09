// utils/aiExecutor.js

/**
 * Envia prompt para o proxy OpenAI e devolve array de arquivos { path, content }.
 * Aqui chamamos o nosso /api/openaiProxy, que deve devolver { files: [...] }.
 */
export async function aiProcess(prompt) {
  const res = await fetch('/api/openaiProxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error('Falha no AI proxy');
  const data = await res.json();
  return Array.isArray(data.files) ? data.files : [];
}
