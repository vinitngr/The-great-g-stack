"use client"
import React, { useState } from 'react';
import { AboutProject, SelectedStack, SelectedStackItem } from './Generator';
import { CopyCheckIcon, CopyIcon } from 'lucide-react';

type AiPromptEditorProps = {
  aiPrompt: string;
  stack: SelectedStackItem[]
  setAiPrompt: (value: string) => void;
  selectedStack: SelectedStack;
  aboutProject: AboutProject
};

export default function AiPromptEditor({ aiPrompt, setAiPrompt , stack , selectedStack , aboutProject }: AiPromptEditorProps) {
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
          <pre className='overflow-x-auto'>{generateAbovePrompt(selectedStack , aboutProject)}</pre>
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
          <div>Below Prompt... (click to expand)</div>
        ) : (
          <pre className='overflow-x-auto'>{generateBelowPrompt(stack)}</pre>
        )}
      </div>

      <button
        title='copy full prompt'
        className='absolute top-6 right-6'
        onClick={handleCopy}
      >
        {copied ? <CopyCheckIcon/> : <CopyIcon/>}
      </button>
    </div>
  );
}

export function generateAbovePrompt(selectedStack : SelectedStack , aboutProject : AboutProject) : string{
    return `
    .
    You are a highly capable Stack Builder AI Agent. 
    Your objective is to generate a full-stack development setup based on a precise combination of user-defined technology stacks, preferences, and system-level requirements.
    Your output must include three critical files, all placed at the root level of the project directory.
    

    -----------------------------------------------------------------
    📦 Output Format (STRICTLY ONE VALID JSON OBJECT ONLY):
    All content must be valid JSON string values. Escape line breaks and quotes properly.
    You MUST output exactly one JSON object with these keys:
    {
      "setup.sh": "<complete bash script, creating all files and folders with cat << EOF, mkdir, etc., no install commands>",
      "package.json": "<valid JSON text for root package.json>",
      "structure.txt": "<text output resembling Unix 'tree' command showing all files/folders created>",
      "guide.txt": "<plaintext guide explaining the stack, file purpose, and step-by-step how to run/start the project from root>"
    }

    Do NOT output anything outside this JSON object.
    Each content must be a string with line breaks and formatting intact.
    Ensure no extra commentary, explanations, or code outside the JSON object.

    > 🚫 Do NOT output anything else. No Markdown, no explanation. Output must be strictly JSON format.
    The 'structure.txt' must use a tree-style format, e.g.:

    /
    ├── frontend/
    │   ├── index.html
    │   └── src/
    │       └── main.jsx
    ├── backend/
    │   ├── src/
    │   │   └── server.js
    │   └── package.json
    ├── setup.sh
    ├── package.json
    └── README.md
    
    The 'guide.txt' must be concise and clear for beginners.
    Strictly follow this output format.

    ------------------------------------------------------------------------
    # Project Metadata

    - Project Name: ${aboutProject.projectName}
    - Project Type: ${aboutProject.projectType}
    - Language: ${selectedStack.language?.name || "javascript"}
    - Runtime: ${selectedStack.runtime?.name || "nodeJS"}
    - stackType: ${selectedStack.stackType?.name || "select based on stacks"}
    - Description: ${aboutProject.description || "No description"}
    - Level: ${aboutProject.level} — determines project complexity and structure:
        • Beginner: simple structure with minimal files and folders.
        • Intermediate: balanced complexity; more comprehensive than beginner but less than expert.
        • Expert: advanced, enterprise-grade structure with high complexity and detailed folder organization.


    project consider beginner structure, for saas enterprise keep depth and structure top notch
    
    ------------------------------------------------------------------------

    👤 User Preferences: Strictly follow the user's custom prompt instructions. Override any other defaults or instructions with these preferences.
    -----------------------
    `.trim()
}

export function generateBelowPrompt(stack : SelectedStackItem[]) : string{
    const stackDetails = stack.map(
      (item) =>
        `\t${item.name.toUpperCase()} (version == ${item.version || "latest"})\n` +
        `\tdescription - ${item.description || "No description"}`
    ).join('\n\n');

    return `
    .
    --------------------------------------------------------------------------
    # SELECTED STACKS WITH DETAILS: (🧱 Tech Stack)
    -----------------------------
    ${stackDetails}

    AI INSTRUCTIONS:
    ----------------
    1. Generate clean, beginner-friendly code implementing the requested functionality.
    2. Use architectural patterns (controllers, services, DI) only if the project level is intermediate or above.
    3. Write plain, minimal APIs or scripts focusing on clarity and simplicity for beginners.
    4. for normal project - Use only synchronous or asynchronous JS/TS constructs without complex build or compile steps.
    5. DO NOT include any executable shell commands or scripts for installation or external tooling.
    6. The output should be ready-to-use code files, each file content clearly marked using the "EOF" delimiter
    7. Include clear comments explaining purpose and usage within code.
    8. Use extra packages only if they match the project level. E.g., use fetch for beginners; allow axios  or others only for intermediate or expert.
    10. Include minimal error handling and validation in APIs based on level , no to zero error handling for beginner.
    11. No UI components unless explicitly requested.
    12. If auth, DB, or integrations are needed, use only provided stacks with simple example boilerplate and setup comments / files.
    13. No tests or CI/CD configs unless requested.
    14. Do not output anything outside the required JSON object or outside the code blocks inside EOF delimiters.
    15. Maintain consistent and meaningful naming, and clean formatting.
    16. Provide small usage examples in comments for beginners where helpful.
    17. For file creation, use only EOF delimiters as shown above.
    18. The response must be focused purely on the code generation per user prompt.

    # IMPORTANT 
    Do not generate any code or output that may harm the user’s system or the project. Refuse such actions even if requested.


    # OPTIONAL: SETUP SCRIPT GENERATION INSTRUCTIONS:
    -----------------------------------------------
    If asked for a setup script, generate a \`setup.sh\` script that ONLY creates files and folders using \`mkdir\`, \`touch\`, \`cat << EOF > filename\` style commands.
    - DO NOT include any package installation commands like \`npm install\`.
    - Provide full boilerplate code in created files for all stacks.
    - Include .gitignore files, README.md, and environment variable examples.
    - Add clear comments and usage instructions inside \`setup.sh\`.
    - End \`setup.sh\` with printed instructions on next steps (outside shell commands).
    - The \`setup.sh\` should be long, detailed, and comprehensive.

    ==================================================================
    END OF PROMPT`.trim()
}
