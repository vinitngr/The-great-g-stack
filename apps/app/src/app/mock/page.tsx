"use client";
import { ResultPage } from "./aiResult";
import { useState } from "react";
import { aiResponse } from "@/lib/aiGenerate";
type AiResult = Record<string, string>;

export default function Parent() {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AiResult | null>(null);

  const prompt =
    "hey give me readme.md and package.json and any random content and give me strict json output , strict only key as file name and vaule as file content";

  const generate = async () => {
    setLoading(true);
    const res = await aiResponse(prompt);

    let text = res?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    text = text
      .trim()
      .replace(/^```json\s*/, "")
      .replace(/```$/, "");
    try {
      const parsed = JSON.parse(text);
      parsed.prompt = prompt;
      setAiResult(parsed);
    } catch (e) {
      setAiResult(null);
      console.error("Invalid JSON from AI response:", e);
    }
    setLoading(false);
  };

  const handlePublish = () => {
    console.log("Publish clicked");
  };

  const downloadFolder = () => {
    console.log("Download folder:");
  };

  if (loading) {
    return <div style={{ padding: 20 }}>Loading AI response...</div>;
  }

  if (aiResult) {
    return (
      <ResultPage
        projectName="Normal Project for Testing"
        stackDetails={["Express.js 4.x", "Redis 7.x", "Node.js 20.x"]}
        aiResult={aiResult}
        onPublish={handlePublish}
        onDownloadFolder={downloadFolder}
      />
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <button onClick={generate}>Generate AI Response</button>
      <div style={{ marginTop: 12 }}>
        <strong>Prompt:</strong> {prompt}
      </div>
    </div>
  );
}
