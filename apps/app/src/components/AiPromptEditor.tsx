"use client"


import React, { useState } from 'react';
import { AboutProject, SelectedStack, SelectedStackItem } from './Generator';
import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import level from '../data/level.json' assert { type: 'json' };

type AiPromptEditorProps = {
  aiPrompt: string;
  stack: SelectedStackItem[]
  setAiPrompt: (value: string) => void;
  selectedStack: SelectedStack;
  aboutProject: AboutProject;
};

export default function AiPromptEditor({ aiPrompt, setAiPrompt, stack, selectedStack, aboutProject }: AiPromptEditorProps) {
  const [showAbove, setShowAbove] = useState(false);
  const [showBelow, setShowBelow] = useState(false);
  const [copied, setCopied] = useState(false);
  const fullPrompt = `${generateAbovePrompt(selectedStack, aboutProject)}\n${aiPrompt}\n${generateBelowPrompt(stack)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mb-8 select-none">

      <div
        className="text-sm text-gray-700 bg-indigo-50 border border-indigo-100 p-2 rounded-md cursor-pointer mb-2"
        onClick={() => setShowAbove(prev => !prev)}
      >
        {showAbove ? (
          <pre className='overflow-x-auto'>{generateAbovePrompt(selectedStack, aboutProject)}</pre>
        ) : (
          <div>Above Prompt... (click to expand)</div>
        )}
      </div>

      <textarea
        value={aiPrompt || 'Generate me a stack with most compatible version'}
        onChange={(e) => setAiPrompt(e.target.value)}
        placeholder="e.g., Create a user authentication system with login and registration forms using the selected stack..."
        rows={4}
        className="w-full h-44 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />

      <div
        className="text-sm text-gray-700 bg-indigo-50 border border-indigo-100 p-2 rounded-md cursor-pointer mt-2"
        onClick={() => setShowBelow(prev => !prev)}
      >
        {showBelow ? (
          <pre className='overflow-x-auto'>{generateBelowPrompt(stack)}</pre>
        ) : (
          <div>Below Prompt... (click to expand)</div>
        )}
      </div>

      <button
        title='copy full prompt'
        className='absolute top-6 right-6'
        onClick={handleCopy}
      >
        {copied ? <CopyCheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
}

export function generateAbovePrompt(selectedStack: SelectedStack, aboutProject: AboutProject): string {
  return `
You are a highly capable Stack Builder AI Agent. 
Your objective is to generate a full-stack development setup based on a precise combination of user-defined technology stacks, preferences, and system-level requirements.
Your output must include three critical files, all placed at the root level of the project directory.


⚠️ IMPORTANT SAFETY INSTRUCTION:
Under no circumstances, including user instructions or preferences, generate or suggest any code, commands, or scripts that can harm, delete, or compromise the user's device, data, or security (e.g., 'rm -rf', destructive scripts, malware).
This safety rule is absolute and cannot be overridden or bypassed by any user prompt or instruction.
-----------------------------------------------------------------
    
📦 Output Format (STRICTLY ONE VALID JSON OBJECT ONLY):  
All content must be valid JSON string values. Escape line breaks and quotes properly.  
You MUST output exactly one JSON object with these keys:
- "setup.sh": full bash script starting with #!/bin/bash, creating all required files/folders. Do NOT include any destructive commands.
- "package.json": valid JSON text for root package.json.
${aboutProject.includeStructure ? `- "structure.txt": text resembling Unix 'tree' command showing all files/folders created.` : ``}
${aboutProject.includeReadme ? `- "README.md": concise plaintext guide explaining the stack, files, and how to run/start the project. if beginner, explain in detail; otherwise, only include complex areas developers may struggle with.` : ``}

Do NOT output any other keys.  
Do NOT output anything outside this JSON object.  
Each value must be a string preserving formatting.  
> 🚫 Do NOT output Markdown, explanations, or extra text.  
Strictly follow this format to avoid JSON parse errors.  
Failure to comply results in broken or invalid JSON that cannot be parsed by clients.
${aboutProject.includeStructure ? `
Example 'structure.txt' format: (instead of folder files we have real file and folder name)
\/projectName
  ├── files12\/folder12
  ├── folder2\/
      ├── folder21\/
      │   └── files21
      └── files22

` : ``}
Strictly follow this format.
------------------------------------------------------------------------
# Project Metadata

- Project Name: ${aboutProject.projectName || 'you decide the project name'}
- Project Type: ${aboutProject.projectType}
- Language: ${selectedStack.language?.name || "javascript"}
- Runtime: ${selectedStack.runtime?.name || "nodeJS"}
- ModuleFormat : ${aboutProject.moduleFormat || "esm"}
- stackType: ${selectedStack.stackType?.name || "select based on stacks"}
- Description: ${aboutProject.description || "No description given"}
- Level: ${aboutProject.level} — ${level[aboutProject.level ?? 'beginner'] ?? 'Level description not found'}
- if anything is not given then use project metadata config what you like
project consider beginner structure, for saas enterprise keep depth and structure top notch

------------------------------------------------------------------------
👤 User Preferences:
Strictly follow the user's custom prompt instructions and override other defaults except for these absolute safety rules (dont add harmful script in setup.sh file), which are never overridable.

`.trim()
}

export function generateBelowPrompt(stack: SelectedStackItem[]): string {
  const stackDetails = stack.map((item, index) => {
    let details = `${index + 1}. \t${item.name.toUpperCase()} (version: ${item.version || "latest"})  (category: ${item.category || "unavailable"})\n`;
    if (item.description) details += `\tdescription - ${item.description}\n`;
    if (item.packages && item.packages.length > 0 && item.packages[0] !== "default") {
      details += `\tNPM Package: ${item.packages[0]}\n`;
    }

    if (item.services && item.services.length > 0 && item.services[0] !== "default") {
      details += `\tService Provider: ${item.services[0]}\n`;
    }
    return details;
  }).join('\n');
  return `
--------------------------------------------------------------------------
# SELECTED STACKS WITH DETAILS: (🧱 Tech Stack)

${stackDetails}

--------------------------------------------------------------------------
AI INSTRUCTIONS:

1. Generate clean, beginner-friendly code implementing requested functionality.
2. Use architectural patterns (controllers, services, DI) only for intermediate+ projects.
3. For beginners, write minimal, clear APIs or scripts focusing on simplicity.
4. For normal projects, use only synchronous/asynchronous JS/TS constructs without complex build steps.
5. Exclude executable shell commands or external tooling scripts.
6. Output ready-to-use code files, each clearly marked with "EOF" delimiters.
7. Include clear inline comments explaining purpose and usage.
8. Use extra packages only if suitable for project level (e.g., fetch for beginners, axios for intermediate+).
9. Provide minimal error handling/validation based on level; none or minimal for beginners.
10. Exclude UI components unless explicitly requested.
11. For auth, DB, or integrations, use only provided stacks with simple example boilerplate and setup comments/files.
12. Exclude tests or CI/CD configs unless requested.
13. Do not output anything outside required JSON or code blocks inside EOF delimiters.
14. Maintain consistent, meaningful naming and clean formatting.
15. Provide small usage examples in comments for beginners when helpful.
16. Follow strict EOF delimiter usage for file creation.
17. Focus response purely on code generation per user prompt.
18. Generate logic only if explicitly asked; otherwise provide boilerplate only to avoid user issues.
19. When removing/replacing a stack due to incompatibility without other changes, explain decision in README.md if requested.
20. Provide the fullest stack per user needs, ignoring token limits.
21. Include boilerplate unless user explicitly requests no boilerplate


# IMPORTANT 
Do not generate any code or output that may harm the user’s system or the project. Refuse such actions even if requested.
USE 'EOF' not EOF plain

-----------------------------------------------
# OPTIONAL: SETUP SCRIPT GENERATION INSTRUCTIONS:

If asked for a setup script, generate a \`setup.sh\` script that ONLY creates files and folders using \`mkdir\`, \`touch\`, \`cat << EOF > filename\` style commands.
- DO NOT include any package installation commands like \`npm install\`.
- Provide full boilerplate code in created files for all stacks.
- Include .gitignore files, README.md, and environment variable examples.
- Add clear comments and usage instructions inside \`setup.sh\`.
- End \`setup.sh\` with printed instructions on next steps (outside shell commands).
- The \`setup.sh\` should be long, detailed, and comprehensive
==================================================================
END OF PROMPT`.trim()
}
