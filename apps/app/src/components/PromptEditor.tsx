// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PromptEditor({aiPrompt  , setAiPrompt , selectedPromptVersion, setSelectedPromptVersion}: any) {
  const topPrompt =
    `PROJECT INFORMATION:
Project Name: {{projectName}}

USER PROMPT:
Generate a SaaS-level backend stack and boilerplate structure based on the selected technologies. The output should include the necessary file and folder setup, boilerplate code (imports, route definitions, database connection setup, config files), and minimal scaffolding for features like authentication, routing, and database schema.

Important:

Do NOT implement any business or endpoint logic (e.g., no actual CRUD logic for todo items).

Focus strictly on stack setup, folder/file structure, boilerplate code, and integration points only.

Prepare the project for scalability typical of a SaaS product (modular folder structure, clear separation of concerns, config management).

Use the selected stacks exactly with specified versions.

Include example placeholder files for routes, controllers, models, and middleware with comments explaining where to add logic.


//user Prompt
`
  const importantPoints =
    `
    IMPORTANT CAUTIONS FOR AI TO FOLLOW:
Do NOT write any application logic, data processing, or endpoint functionality.

Do NOT write tests, scripts, or deployment configs unless requested.

Use modular folder structures: routes/, controllers/, middleware/, models/

Boilerplate must include empty route handlers with comments on where to add logic.

Include environment configuration and connection setups.

Follow SaaS backend best practices strictly.

Use only the stacks provided; no external libraries.

Output all code files with EOF file delimiters.

Provide README.md and .env.example with placeholders.

Output must be a JSON object with keys: setup.sh, root-package.json, structure.txt, guide.txt only.

ADDITIONAL NOTES / REQUIREMENTS:
Project must be scalable and maintainable for SaaS use.

Boilerplate files should contain clear guiding comments.

setup.sh script must create all files/folders with shell commands only.

root package.json must be included separately.

Include structure.txt showing tree-like folder/file layout.

Include guide.txt explaining stacks, setup, and starting instructions.

AI INSTRUCTIONS:
Generate all boilerplate and scaffolding code without business logic.

Provide a detailed setup.sh script using mkdir, cat << EOF for file creation.

Use SaaS best practices for folder structure and configs.

Response must be a single JSON object with keys below only.

No output outside this JSON object.

OUTPUT FORMAT:
{
"setup.sh": "<bash setup script creating files/folders with boilerplate>",
"root-package.json": "<package.json content as JSON string>",
"structure.txt": "<tree-formatted folder/file structure>",
"guide.txt": "<plaintext guide for stacks and running project>"
}

END OF PROMPT
    `
  return (
    <div className="max-w-3xl max-h-96 overflow-auto mx-auto py-6">
      <div
        className="w-full whitespace-pre-wrap rounded border border-gray-300 bg-gray-100 p-4 text-gray-600 select-none"
        aria-label="AI Prompt (read only)"
        tabIndex={0}
      >
        {topPrompt}
      </div>

      <textarea
        className="w-full h-64 p-4 border border-purple-500 rounded resize-y focus:outline-none focus:ring-2 focus:ring-purple-400"
        aria-label="User prompt (editable)"
        value={aiPrompt}
        onChange={(e) => {
        setAiPrompt(e.target.value)
        if (selectedPromptVersion !== "custom") {
          setSelectedPromptVersion("custom")
        }
      }}
        spellCheck={false}
      />

      <div
        className="w-full whitespace-pre-wrap rounded border border-gray-300 bg-gray-100 p-4 text-gray-600 select-none"
        aria-label="Important points (read only)"
        tabIndex={0}
      >
        {importantPoints}
      </div>
    </div>
  );
}
