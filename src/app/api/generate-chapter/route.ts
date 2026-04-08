import { NextRequest, NextResponse } from 'next/server';
import { getProvider } from '@/lib/ai-providers';
import { buildChapterSystemPrompt, buildChapterPrompt } from '@/lib/prompts/chapter-prompt';
import { Escaleta, Capitulo, CapituloGenerado } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { escaleta, capitulo, capitulosAnteriores, numeroTotal, provider, apiKey, model } = body as {
      escaleta: Escaleta;
      capitulo: Capitulo;
      capitulosAnteriores: CapituloGenerado[];
      numeroTotal: number;
      provider: 'openai' | 'gemini' | 'claude';
      apiKey: string;
      model: string;
    };

    if (!apiKey) {
      return NextResponse.json({ error: 'API key requerida' }, { status: 400 });
    }

    const aiProvider = getProvider(provider);
    const systemPrompt = buildChapterSystemPrompt(escaleta);
    const userPrompt = buildChapterPrompt(escaleta, capitulo, capitulosAnteriores, numeroTotal);

    const contenido = await aiProvider.generateText(userPrompt, systemPrompt, model, apiKey);

    const resumenPrompt = `Resume en 2-3 frases el siguiente capítulo para usarlo como contexto en capítulos posteriores:\n\n${contenido.substring(0, 2000)}`;
    const resumen = await aiProvider.generateText(
      resumenPrompt,
      'Eres un asistente que genera resúmenes concisos de capítulos de novelas.',
      model,
      apiKey
    );

    return NextResponse.json({ contenido, resumen });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
