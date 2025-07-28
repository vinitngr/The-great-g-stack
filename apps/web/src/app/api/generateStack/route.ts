import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req : NextRequest ) {
  try {
    const url = new URL(req.url);
    const apiKey = url.searchParams.get("key") || req.headers.get("x-api-key");

    const genAI = new GoogleGenerativeAI(apiKey || process.env.MY_OWN_KEY!);
    const model = genAI.getGenerativeModel({
      model: apiKey ? "gemini-pro" : "chat-bison-001",
      generationConfig: {
        maxOutputTokens: apiKey ? 2048 : 1000,
        temperature: 0.7,
      },
    });

    const body = await req.json();
    const result = await model.generateContent(body.prompt);
    const text = result.response.text();

    let parsed;
    try {
      const jsonMatch = text.match(/```(?:json)?([\s\S]*?)```/);
      const cleanText = jsonMatch ? jsonMatch[1].trim() : text;
      parsed = JSON.parse(cleanText);
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON output" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      model: apiKey ? "gemini-pro" : "chat-bison-001",
      tokens: apiKey ? 2048 : 1000,
      output: {
        "setup.sh": parsed["setup.sh"] || null,
        "package.json": parsed["package.json"] || null,
        "stack.txt" : parsed["stack.txt"] || null
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
