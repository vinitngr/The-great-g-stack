import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(req ) {
  try {
    const url = new URL(req.url);
    const apiKey = url.searchParams.get("key") || req.headers.get("x-api-key");

    const filePath = path.join(process.cwd(), "selectstack.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    const config = JSON.parse(fileData);

    const prompt = `
        You're a devops and backend expert. Based on the given stack, generate two outputs:

        1. A complete **setup.sh** script to initialize the project from scratch.
        2. A proper **package.json** file with relevant dependencies, scripts, and metadata.

        Stack:
        - Frontend: ${config.frontend}
        - Backend: ${config.backend}
        - Database: ${config.database}
        - Extras: ${config.extras.join(", ")}

        Respond strictly in this JSON format:
        {
        "setup.sh": "Bash script here",
        "package.json": "package.json content here"
        }
    `;

    const genAI = new GoogleGenerativeAI(apiKey || "DUMMY_KEY");
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        maxOutputTokens: apiKey ? 2048 : 256,
        temperature: 0.7,
      },
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/```(?:json)?([\s\S]*?)```/);
    const cleanText = jsonMatch ? jsonMatch[1].trim() : text;

    const parsed = JSON.parse(cleanText);

    return NextResponse.json({
      success: true,
      model: "gemini-pro",
      tokens: apiKey ? 2048 : 256,
      output: {
        "setup.sh": parsed["setup.sh"],
        "package.json": parsed["package.json"],
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
