import { GoogleGenAI } from '@google/genai';

export async function aiResponse(prompt: string, model: string = 'gemini-2.5-flash') {
    let key = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

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
