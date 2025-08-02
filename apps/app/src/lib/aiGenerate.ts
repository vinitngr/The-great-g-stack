import { GoogleGenAI } from '@google/genai';

export async function aiResponse(prompt: string) {
    let key = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

    if (typeof window !== 'undefined') {
        const storedKey = localStorage.getItem('TGGS-useGeminiApiKey');
        if (storedKey) key = storedKey;
    }

    if (!key) throw new Error('API key missing');
    const ai = new GoogleGenAI({
        apiKey: key,
    });
    const config = {
        thinkingConfig: {
            thinkingBudget: 0,
        },
    };
    const model = 'gemini-2.5-flash';
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
