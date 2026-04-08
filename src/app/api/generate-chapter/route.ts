import { NextRequest, NextResponse } from 'next/server';
import { openaiGenerateChapter } from '@/lib/ai-providers/openai';
import { geminiGenerateChapter } from '@/lib/ai-providers/gemini';
import { claudeGenerateChapter } from '@/lib/ai-providers/claude';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { provider, apiKey, model, systemPrompt, userPrompt } = body;

    if (!provider || !apiKey || !model || !systemPrompt || !userPrompt) {
      return NextResponse.json(
        { message: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }

    let content: string;

    switch (provider) {
      case 'openai':
        content = await openaiGenerateChapter(systemPrompt, userPrompt, model, apiKey);
        break;
      case 'gemini':
        content = await geminiGenerateChapter(systemPrompt, userPrompt, model, apiKey);
        break;
      case 'claude':
        content = await claudeGenerateChapter(systemPrompt, userPrompt, model, apiKey);
        break;
      default:
        return NextResponse.json(
          { message: `Proveedor desconocido: ${provider}` },
          { status: 400 }
        );
    }

    return NextResponse.json({ content });
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : 'Error interno del servidor';
    return NextResponse.json({ message: mensaje }, { status: 500 });
  }
}
