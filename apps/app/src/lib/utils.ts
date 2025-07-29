/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImprovedStackBuilder } from "@/components/StackBuilder"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getPromptByVersion = (version: string, builder: ImprovedStackBuilder): string => {
  const stackSummary = builder.getSummary()
  const stackType = stackSummary.stackType || "application"
  // const frontend = stackSummary.frontend?.join(", ") || "React"
  const frontendArr = Array.isArray(stackSummary.frontend)
    ? stackSummary.frontend
    : stackSummary.frontend
      ? [stackSummary.frontend]
      : [];

  const frontend = frontendArr.length ? frontendArr.join(", ") : "React";
  const backend = stackSummary.backend?.join(", ") || "Node.js"
  const database = stackSummary.database?.join(", ") || "PostgreSQL"

  const prompts = {
    basic: `
      ds
      `,

    detailed: `
      ewt`,

    production: `
      ewt`,

    enterprise: `
      et`,

    custom: "",
  } as const

  type PromptKey = keyof typeof prompts;
  return prompts[version as PromptKey] || prompts.basic
}


export function generateStackPrompt(systemPrompt: any, userPrompt: any, stackData: any) {
  function formatSection(title: string, items: { name: string; version: string; description: string; }[] = []) {
    if (!items.length) return '';
    return `${title}:\n${items.map(i => `- ${i.name} (v${i.version}): ${i.description}`).join('\n')}\n\n`;
  }

  let stackText = '';

  ['runtime', 'packageManager', 'language'].forEach(key => {
    const items = Array.isArray(stackData[key]) ? stackData[key] : [];
    if (items.length) {
      const i = items[0];
      stackText += `${i.name} (v${i.version}): ${i.description}\n\n`;
    }
  });

  ['backend', 'database', 'orm', 'authentication', 'apiTools', 'testing', 'styling', 'stateManagement'].forEach(key => {
    const items = Array.isArray(stackData[key]) ? stackData[key] : [];
    stackText += formatSection(key.charAt(0).toUpperCase() + key.slice(1), items);
  });

  return `${systemPrompt}\n\n${userPrompt}\n\nStack Information:\n${stackText.trim()}`;
}
