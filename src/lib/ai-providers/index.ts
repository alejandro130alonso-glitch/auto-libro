import { AIProvider, OpenAIProvider } from './openai';
import { GeminiProvider } from './gemini';
import { ClaudeProvider } from './claude';

export type { AIProvider };

export function getProvider(proveedor: 'openai' | 'gemini' | 'claude'): AIProvider {
  switch (proveedor) {
    case 'openai':
      return new OpenAIProvider();
    case 'gemini':
      return new GeminiProvider();
    case 'claude':
      return new ClaudeProvider();
    default:
      throw new Error(`Proveedor no soportado: ${proveedor}`);
  }
}
