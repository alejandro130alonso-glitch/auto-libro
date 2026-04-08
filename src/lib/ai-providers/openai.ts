export interface AIProvider {
  generateText(prompt: string, systemContext: string, model: string, apiKey: string): Promise<string>;
}

export class OpenAIProvider implements AIProvider {
  async generateText(prompt: string, systemContext: string, model: string, apiKey: string): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemContext },
          { role: 'user', content: prompt },
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }
}
