import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { prompt, model = 'gemini-2.5-flash' } = await req.json();

    const key = process.env.GEMINI_API_KEY;
    if (!key) return NextResponse.json({ error: 'API key missing' }, { status: 400 });

    const ai = new GoogleGenAI({ apiKey: key });

    const config =
        model === 'gemini-2.5-flash'
        ? { thinkingConfig: { thinkingBudget: 0 }, responseMimeType: 'application/json' }
        : { thinkingConfig: { thinkingBudget: -1 }, responseMimeType: 'application/json' };

    const contents = [{ role: 'user', parts: [{ text: prompt }] }];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const parsed = JSON.parse(text);

    return NextResponse.json({ text , parsed }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message || 'Something went wrong' }, { status: 500 });
  }
}