import { Escaleta } from '../types';
import { buildSystemPrompt } from '../prompts/system-prompt';
import { buildChapterPrompt } from '../prompts/chapter-prompt';

export async function generarCapitulo(
  escaleta: Escaleta,
  numeroCapitulo: number,
  resumenesAnteriores: string[]
): Promise<string> {
  const { configIA } = escaleta;
  const systemPrompt = buildSystemPrompt(escaleta);
  const userPrompt = buildChapterPrompt(escaleta, numeroCapitulo, resumenesAnteriores);

  const response = await fetch('/api/generate-chapter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      provider: configIA.proveedor,
      apiKey: configIA.apiKey,
      model: configIA.modelo,
      systemPrompt,
      userPrompt,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al generar el capítulo');
  }

  const data = await response.json();
  return data.content;
}
