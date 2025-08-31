import { GoogleGenAI } from '@google/genai';

export async function aiResponse(prompt: string, model: string = 'gemini-2.5-flash') {
    let key;

    if (typeof window !== 'undefined') {
        const storedKey = localStorage.getItem('TGGS-useGeminiApiKey');
        if (storedKey) key = storedKey;
    }

    if (!key) throw new Error('API key missing');
    const ai = new GoogleGenAI({
        apiKey: key,
    });
    let config = {};

    if (model === 'gemini-2.5-flash') {
        config = {
            thinkingConfig: {
                thinkingBudget: 0,
            },
        };
    } else if (model === 'gemini-2.5-pro') {
        config = {
            thinkingConfig: {
                thinkingBudget: -1,
            },
        };
    }
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: prompt,
                },
            ],
        },
    ];

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });
    console.log(response);
    return response;
}


export async function aiResponseStream(
  prompt: string,
  model: string = 'gemini-2.5-flash',
  onChunk?: (chunk: string) => void
) {
  let key: string | null = null;

  if (typeof window !== 'undefined') {
    key = localStorage.getItem('TGGS-useGeminiApiKey');
  }
  if (!key) throw new Error('API key missing');

  const ai = new GoogleGenAI({ apiKey: key });

  const config =
    model === 'gemini-2.5-flash'
      ? { thinkingConfig: { thinkingBudget: 0 }, responseMimeType: 'application/json' }
      : { thinkingConfig: { thinkingBudget: -1 }, responseMimeType: 'application/json' };

  const contents = [{ role: 'user', parts: [{ text: prompt }] }];

  const stream = await ai.models.generateContentStream({ model, config, contents });

  let result = '';
  for await (const chunk of stream) {
    const text = chunk.text;
    if (text) {
      result += text;
      if (onChunk) onChunk(text);
    }
  }

  return result;
}
