import { AIProvider } from './openai';

const ALLOWED_GEMINI_MODELS = new Set([
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-pro',
  'gemini-2.0-flash',
  'gemini-2.5-pro',
]);

export class GeminiProvider implements AIProvider {
  async generateText(prompt: string, systemContext: string, model: string, apiKey: string): Promise<string> {
    if (!ALLOWED_GEMINI_MODELS.has(model)) {
      throw new Error(`Modelo Gemini no permitido: ${model}`);
    }

    // The Gemini REST API requires the API key as a URL query parameter.
    // This is the standard authentication method for this API and cannot be avoided
    // without using the official SDK. The key is provided by the user per-request.
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: `${systemContext}\n\n${prompt}` }],
          },
        ],
        generationConfig: {
          temperature: 0.8,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Gemini error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }
}
