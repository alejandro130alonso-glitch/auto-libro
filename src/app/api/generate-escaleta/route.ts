import { NextRequest, NextResponse } from 'next/server';
import { getProvider } from '@/lib/ai-providers';
import { buildEscaletaSystemPrompt, buildEscaletaPrompt } from '@/lib/prompts/escaleta-prompt';
import { Escaleta } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { escaleta, provider, apiKey, model } = body as {
      escaleta: Escaleta;
      provider: 'openai' | 'gemini' | 'claude';
      apiKey: string;
      model: string;
    };

    if (!apiKey) {
      return NextResponse.json({ error: 'API key requerida' }, { status: 400 });
    }

    const aiProvider = getProvider(provider);
    const systemPrompt = buildEscaletaSystemPrompt(escaleta);
    const userPrompt = buildEscaletaPrompt(escaleta);

    const resultado = await aiProvider.generateText(userPrompt, systemPrompt, model, apiKey);

    return NextResponse.json({ resultado });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
