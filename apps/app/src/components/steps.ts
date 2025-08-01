const steps = [
  {
    title: "Project Information",
    type: "configuration",
    key: "metadata",
    category: "Metadata",
    required: false,
    options: []
  },
  {
    title: "Language",
    type: "radio",
    key: "language",
    category: "Core Language",
    required: true,
    options: [
      {
        id: "javascript",
        name: "JavaScript",
        version: "ES2023",
        description: "",
        category: "Core Language",
        love: [],
        hate: []
      },
      {
        id: "typescript",
        name: "TypeScript",
        version: "5.3",
        description: "use type , create types in types folder , for beginners add types in same file",
        category: "Core Language",
        love: [],
        hate: []
      },
    ]
  },
  {
    title: "Runtime",
    type: "radio",
    key: "runtime",
    category: "Runtime",
    required: true,
    options: [
      {
        id: "nodejs",
        name: "Node.js",
        version: "20.x",
        description: "",
        category: "Runtime",
        love: [],
        hate: []
      },
      {
        id: "deno",
        name: "Deno",
        version: "1.40",
        description: "Deno runtime , add guide in readme if README.md is mentioned in output format",
        category: "Runtime",
        love: ["deno-pm"],
        hate: ["npm", "yarn", "pnpm", "bun-pm"]
      },
      {
        id: "bun",
        name: "Bun",
        version: "1.0",
        description: "Bun runtime , add guide in readme if README.md is mentioned in output format",
        category: "Runtime",
        love: ["bun-pm"],
        hate: ["npm", "yarn", "pnpm", "deno-pm"]
      },
      {
        id: "browser",
        name: "Browser",
        version: "Modern",
        description: "Client-side execution environment supporting modern web standards and APIs",
        category: "Runtime",
        love: [],
        hate: []
      }
    ]
  },
  {
    title: "Package Manager",
    type: "radio",
    key: "packageManager",
    category: "Package Manager",
    required: false,
    options: [
      {
        id: "npm",
        name: "npm",
        version: "10.x",
        description: "Default Node.js package manager with extensive registry and CLI tools",
        category: "Package Manager",
        love: ["nodejs"],
        hate: ["deno", "bun"]
      },
      {
        id: "yarn",
        name: "Yarn",
        version: "4.x",
        description: "",
        category: "Package Manager",
        love: ["nodejs"],
        hate: ["deno", "bun"]
      },
      {
        id: "pnpm",
        name: "pnpm",
        version: "8.x",
        description: "for monorepo support , add guide in readme if README.md is mentioned in output format",
        category: "Package Manager",
        love: ["nodejs"],
        hate: ["deno", "bun"]
      },
      {
        id: "bun-pm",
        name: "Bun",
        version: "1.x",
        description: "Ultra-fast package manager",
        category: "Package Manager",
        love: ["bun"],
        hate: ["nodejs", "deno"]
      },
      {
        id: "deno-pm",
        name: "Deno",
        version: "1.x",
        description: "Built-in package management for Deno runtime",
        category: "Package Manager",
        love: ["deno"],
        hate: ["nodejs", "bun"]
      }
    ]
  },
  {
    title: "Stack Type",
    type: "radio",
    key: "stackType",
    category: "Architecture",
    required: true,
    options: [
      {
        id: "frontend",
        name: "Frontend Only",
        version: "",
        description: "create frontend project , create all files in ./ path in the ./projectname unless specified",
        category: "Architecture",
        love: [],
        hate: []
      },
      {
        id: "backend",
        name: "Backend Only",
        version: "",
        description: "backend project , create all files in ./backend path in the ./projectname unless specified",
        category: "Architecture",
        love: [],
        hate: []
      },
      {
        id: "fullstack",
        name: "Full Stack",
        version: "",
        description: "made specifically for full-stack development , popular framworks are nextjs nuxtjs etc , use what is provided",
        category: "Architecture",
        love: ['Nextjs', 'Nuxtjs', 'Nestjs', 'Remix', 'Astro'],
        hate: []
      },
      {
        id: "monorepo",
        name: "Monorepo (Turborepo)",
        version: " 1.13+",
        description: "create apps add project inside it , create packages , created turbo.json worflow , and use pnpm unless its not specified",
        category: "Architecture",
        love: [],
        hate: []
      },
      {
        id: "fb",
        name: "frontend + backend",
        version: " 1.13+",
        description: "create server and client folder , and root package.json and use concurrently if packagemanager dont support and add this in guide as well  if guide was asked in output format",
        category: "Architecture",
        love: [],
        hate: []
      },
      {
        id: "cli",
        name: "CLI tool",
        version: "",
        description: "to create npm packages or cli etc related projects , use most compatible legacy so it works with old nodejs (runtime)etc version as well",
        category: "Architecture",
        love: [],
        hate: []
      }
    ]
  },
  {
    title: "Frontend Framework",
    type: "checkbox",
    key: "frontendFramework",
    category: "Frontend Framework",
    required: false,
    options: [
      {
        id: "react",
        name: "React",
        version: "18.x",
        description: "use react with vite unless specified",
        category: "Frontend Framework",
        love: [],
        hate: []
      },
      {
        id: "vue",
        name: "Vue.js",
        version: "3.x",
        description: "prefer Vite over Vue CLI",
        category: "Frontend Framework",
        love: [],
        hate: []
      },
      {
        id: "angular",
        name: "Angular",
        version: "17.x",
        description: "always use Angular CLI; avoid manual webpack setup",
        category: "Frontend Framework",
        love: [],
        hate: []
      },
      {
        id: "svelte",
        name: "Svelte",
        version: "4.x",
        description: "use with SvelteKit unless explicitly stated",
        category: "Frontend Framework",
        love: [],
        hate: []
      },
      {
        id: "nextjs",
        name: "Next.js",
        version: "14.x",
        description: "prefer app router unless pages router is requested",
        category: "Frontend Framework",
        love: ["react"],
        hate: []
      },
      {
        id: "remix",
        name: "Remix",
        version: "2.x",
        description: "do not mix with Next.js conventions",
        category: "Frontend Framework",
        love: ["react"],
        hate: []
      },
      {
        id: "astro",
        name: "Astro",
        version: "3.x",
        description: "use content collections and islands architecture when applicable",
        category: "Frontend Framework",
        love: [],
        hate: []
      }
    ]

  },
  {
    title: "Backend Framework",
    type: "checkbox",
    key: "backendFramework",
    category: "Backend Framework",
    required: false,
    options: [
      {
        id: "express",
        name: "Express.js",
        version: "4.x",
        description: "default to this for Node.js unless performance is a concern , consider creating controller , services etc but not for beginners",
        category: "Backend Framework",
        love: ["nodejs"],
        hate: ["deno", "bun"]
      },
      {
        id: "fastify",
        name: "Fastify",
        version: "4.x",
        description: "prefer this over express for better performance in Node.js , choose yourself by considering performance requirement if not specified for other framwork",
        category: "Backend Framework",
        love: ["nodejs"],
        hate: ["deno", "bun"]
      },
      {
        id: "nestjs",
        name: "NestJS",
        version: "10.x",
        description: "use when project structure, DI, or microservices are required",
        category: "Backend Framework",
        love: ["nodejs"],
        hate: ["deno", "bun"]
      },
      {
        id: "hono",
        name: "Hono",
        version: "3.x",
        description: "default to this for Bun or Deno; avoid complex project structure",
        category: "Backend Framework",
        love: ["bun", "deno"],
        hate: ["nodejs"]
      },
      {
        id: "oak",
        name: "Oak",
        version: "12.x",
        description: "use only for Deno; not portable to Node.js or Bun",
        category: "Backend Framework",
        love: ["deno"],
        hate: ["nodejs", "bun"]
      }
    ]
  },
  {
    title: "Database",
    type: "checkbox",
    key: "database",
    category: "Database",
    required: false,
    options: [
      {
        id: "postgresql",
        name: "PostgreSQL",
        version: "16.x",
        description: "use with neon or supabase packages by default",
        category: "Database",
        package: ["neon", "supabase", "pg", "local", "other"],
        love: ["relational", "json", "extensions"],
        hate: ["nosql"]
      },
      {
        id: "mysql",
        name: "MySQL",
        version: "8.x",
        description: "default with mysql2 or prisma client packages",
        category: "Database",
        package: ["mysql2", "prisma"],
        love: ["relational", "performance"],
        hate: ["nosql"]
      },
      {
        id: "mongodb",
        name: "MongoDB",
        version: "7.x",
        description: "use with mongoose or official mongodb driver",
        category: "Database",
        package: ["mongoose", "mongodb", "local", "other"],
        love: ["nosql", "schema-flexible"],
        hate: ["relational"]
      },
      {
        id: "redis",
        name: "Redis",
        version: "7.x",
        description: "default with ioredis or node-redis for caching and sessions",
        category: "Database",
        package: ["ioredis", "redis", "upstash", "local", "other"],
        love: ["cache", "real-time"],
        hate: []
      },
      {
        id: "sqlite",
        name: "SQLite",
        version: "3.x",
        description: "use with better-sqlite3 or knex for lightweight local storage",
        category: "Database",
        package: ["better-sqlite3", "knex"],
        love: ["lightweight", "file-based"],
        hate: []
      },
      {
        id: "planetscale",
        name: "PlanetScale",
        version: "Latest",
        description: "MySQL-compatible serverless db; use with prisma or planetscale packages",
        category: "Database",
        package: ["prisma", "planetscale"],
        love: ["serverless", "scalable"],
        hate: []
      },
      {
        id: "cf-db",
        name: "cloudflare D1/KV",
        version: "compatible",
        description: "add D1 or kV binding in .toml",
        category: "Database",
        package: ["prisma" , "drizzleORM", "wrangler"],
        love: ["serverless", "cloudflare"],
        hate: []
      },
      {
        id: "Other",
        name: "Other cloud GCP, AWS , Azure etc",
        version: "compatible",
        description: "add your db requirement ..... \nuse their own cli if available",
        category: "Database",
        package: ["prisma", "ownCli"],
        love: ["serverless", "scalable"],
        hate: []
      }
    ]

  },
  {
    title: "ORM/ODM",
    type: "radio",
    key: "orm",
    category: "ORM/ODM",
    required: false,
    options: [
      {
        id: "prisma",
        name: "Prisma",
        version: "5.x",
        description: "use for type-safe data modeling and auto migrations; create schema.prisma and migration files if advanced project",
        category: "ORM/ODM",
        package: ["@prisma/client", "prisma"],
        love: ["type-safety", "migrations"],
        hate: []
      },
      {
        id: "typeorm",
        name: "TypeORM",
        version: "0.3.x",
        description: "prefer for decorator-based models; create ormconfig or data-source config files for intermediate+ projects",
        category: "ORM/ODM",
        package: ["typeorm"],
        love: ["decorators", "typescript"],
        hate: ["performance"]
      },
      {
        id: "sequelize",
        name: "Sequelize",
        version: "6.x",
        description: "use when promise-based ORM needed; create models and config files if intermediate+",
        category: "ORM/ODM",
        package: ["sequelize"],
        love: ["transaction", "connection-pooling"],
        hate: ["type-safety"]
      },
      {
        id: "mongoose",
        name: "Mongoose",
        version: "8.x",
        description: "use only with MongoDB; create schemas and connection setup files for intermediate+ projects",
        category: "ORM/ODM",
        package: ["mongoose"],
        love: ["mongodb", "schema-validation"],
        hate: ["relational"]
      },
      {
        id: "drizzle",
        name: "Drizzle ORM",
        version: "0.29",
        description: "prefer lightweight TS ORM; add schema or config files if advanced project",
        category: "ORM/ODM",
        package: ["drizzle-orm"],
        love: ["performance", "typescript"],
        hate: []
      },
      {
        id: "kysely",
        name: "Kysely",
        version: "0.25",
        description: "use for type-safe SQL building; create config and schema files if intermediate+",
        category: "ORM/ODM",
        package: ["kysely"],
        love: ["type-safety", "typescript"],
        hate: []
      }
    ]

  }
  ,
  {
    title: "Authentication",
    type: "checkbox",
    key: "authentication",
    category: "Authentication",
    required: false,
    options: [
      {
        id: "nextauth",
        name: "NextAuth.js",
        version: "4.x",
        description: "use with Next.js; create [...nextauth].js config for intermediate+ projects",
        category: "Authentication",
        package: ["next-auth"],
        love: ["nextjs"],
        hate: []
      },
      {
        id: "auth0",
        name: "Auth0",
        version: "Latest",
        description: "create auth0 config files or document setup in README for complex projects",
        category: "Authentication",
        package: ["auth0"],
        love: [],
        hate: []
      },
      {
        id: "firebase-auth",
        name: "Firebase Auth",
        version: "10.x",
        description: "initialize Firebase config files for intermediate+ projects or document setup",
        category: "Authentication",
        package: ["firebase"],
        love: [],
        hate: []
      },
      {
        id: "passport",
        name: "Passport.js",
        version: "0.7",
        description: "use with Express.js; create strategy and config files for intermediate+ projects",
        category: "Authentication",
        package: ["passport"],
        love: ["express"],
        hate: []
      },
      {
        id: "jwt",
        name: "JWT",
        version: "9.x",
        description: "create token handling and secret config files for intermediate+ projects",
        category: "Authentication",
        package: ["jsonwebtoken"],
        love: [],
        hate: []
      },
      {
        id: "lucia",
        name: "Lucia",
        version: "3.x",
        description: "create adapter and config files if project complexity requires",
        category: "Authentication",
        package: ["lucia-auth"],
        love: [],
        hate: []
      }
    ]


  },
  {
    title: "Styling & UI",
    type: "checkbox",
    key: "styling",
    category: "Styling & UI",
    required: false,
    options: [
      {
        id: "tailwindcss",
        name: "Tailwind CSS",
        version: "3.x",
        description: "use by default unless plain CSS specified",
        category: "Styling & UI",
        love: [],
        hate: []
      },
      {
        id: "styled-components",
        name: "Styled Components",
        version: "6.x",
        description: "use with React for scoped CSS-in-JS styling",
        category: "Styling & UI",
        love: ["react"],
        hate: []
      },
      {
        id: "mui",
        name: "Material-UI",
        version: "5.x",
        description: "use with React when Material Design components needed",
        category: "Styling & UI",
        love: ["react"],
        hate: []
      },
      {
        id: "ShadCn",
        name: "Shadcn",
        version: "2.x",
        description: "use with React for modular accessible components",
        category: "Styling & UI",
        love: ["react"],
        hate: []
      },
      {
        id: "sass",
        name: "Sass",
        version: "1.x",
        description: "",
        category: "Styling & UI",
        love: [],
        hate: []
      },
      {
        id: "emotion",
        name: "Emotion",
        version: "11.x",
        description: "use with React for performant CSS-in-JS styling",
        category: "Styling & UI",
        love: ["react"],
        hate: []
      },
      {
        id: "vanilla-extract",
        name: "Vanilla Extract",
        version: "1.x",
        description: "use for type-safe zero-runtime CSS in TS projects",
        category: "Styling & UI",
        love: [],
        hate: []
      },
      {
        id: "plain-css",
        name: "Plain CSS",
        version: "",
        description: "use when no CSS framework or library preferred",
        category: "Styling & UI",
        love: [],
        hate: []
      }
    ]
  },
  {
    title: "Testing Framework",
    type: "checkbox",
    key: "testing",
    category: "Testing",
    required: false,
    options: [
      {
        id: "jest",
        name: "Jest",
        version: "29.x",
        description: "use unless vite or bun test specified",
        category: "Testing",
        love: [],
        hate: []
      },
      {
        id: "vitest",
        name: "Vitest",
        version: "1.x",
        description: "use with Vite projects by default",
        category: "Testing",
        love: ["vite"],
        hate: []
      },
      {
        id: "cypress",
        name: "Cypress",
        version: "13.x",
        description: "choose for E2E testing unless playwright preferred",
        category: "Testing",
        love: [],
        hate: []
      },
      {
        id: "playwright",
        name: "Playwright",
        version: "1.x",
        description: "prefer for cross-browser E2E with parallelization",
        category: "Testing",
        love: [],
        hate: []
      },
      {
        id: "testing-library",
        name: "Testing Library",
        version: "14.x",
        description: "use with UI frameworks for behavior-focused tests",
        category: "Testing",
        love: ["react", "vue", "angular"],
        hate: []
      },
      {
        id: "bun-test",
        name: "Bun Test",
        version: "1.x",
        description: "use if Bun runtime detected or preferred",
        category: "Testing",
        love: ["bun"],
        hate: []
      }
    ]

  },
  {
    title: "Build Tool",
    type: "radio",
    key: "buildTool",
    category: "Build Tool",
    required: false,
    options: [
      {
        id: "vite",
        name: "Vite",
        version: "5.x",
        description: "Fast build tool with hot module replacement and optimized production builds",
        category: "Build Tool",
        love: [],
        hate: []
      },
      {
        id: "webpack",
        name: "Webpack",
        version: "5.x",
        description: "Static module bundler with extensive plugin ecosystem and code splitting",
        category: "Build Tool",
        love: [],
        hate: []
      },
      {
        id: "rollup",
        name: "Rollup",
        version: "4.x",
        description: "Module bundler for JavaScript with tree-shaking and ES module output",
        category: "Build Tool",
        love: [],
        hate: []
      },
      {
        id: "esbuild",
        name: "esbuild",
        version: "0.19",
        description: "Extremely fast JavaScript bundler and minifier written in Go",
        category: "Build Tool",
        love: [],
        hate: []
      },
      {
        id: "turbopack",
        name: "Turbopack",
        version: "Beta",
        description: "Incremental bundler by Vercel optimized for development speed",
        category: "Build Tool",
        love: ["nextjs"],
        hate: []
      },
      {
        id: "bun-build",
        name: "Bun Build",
        version: "1.x",
        description: "Built-in bundler for Bun with fast performance and simple configuration",
        category: "Build Tool",
        love: ["bun"],
        hate: []
      }
    ]
  },
  {
    title: "Deployment Platform",
    type: "checkbox",
    key: "deployment",
    category: "Deployment",
    required: false,
    options: [
      {
        id: "vercel",
        name: "Vercel",
        version: "Latest",
        description: "use with Next.js; create/vercel.json if missing, else document in README",
        category: "Deployment",
        love: ["nextjs"],
        hate: []
      },
      {
        id: "netlify",
        name: "Netlify",
        version: "Latest",
        description: "create/netlify.toml file if absent, else document deployment steps in README",
        category: "Deployment",
        love: [],
        hate: []
      },
      {
        id: "aws",
        name: "AWS",
        version: "Latest",
        description: "create necessary config files (e.g. cloudformation, terraform) or explain setup in README",
        category: "Deployment",
        love: [],
        hate: []
      },
      {
        id: "docker",
        name: "Docker",
        version: "24.x",
        description: "create Dockerfile and docker-compose.yml if missing, else document usage in README",
        category: "Deployment",
        love: [],
        hate: []
      },
      {
        id: "railway",
        name: "Railway",
        version: "Latest",
        description: "add railway.toml or explain config in README if files are missing",
        category: "Deployment",
        love: [],
        hate: []
      },
      {
        id: "fly-io",
        name: "Fly.io",
        version: "Latest",
        description: "create fly.toml config or document deployment steps in README",
        category: "Deployment",
        love: [],
        hate: []
      },
      {
        id: "cloudflare",
        name: "Cloudflare",
        version: "Latest",
        description: "create wrangler.toml and explain usage if files missing",
        category: "Deployment",
        love: [],
        hate: []
      }
    ]
  },
  {
    title: "Configuration & Environment",
    type: "checkbox",
    key: "configuration",
    category: "Development Tools",
    required: false,
    options: [
      {
        id: "dotenv",
        name: "dotenv",
        version: "16.x",
        description: "use .env files for env management; create sample .env.example to guide developers",
        category: "Development Tools",
        love: [],
        hate: []
      },
      {
        id: "eslint",
        name: "ESLint",
        version: "8.x",
        description: "enforce code quality; create .eslintrc config to teach best practices",
        category: "Development Tools",
        love: [],
        hate: []
      },
      {
        id: "prettier",
        name: "Prettier",
        version: "3.x",
        description: "auto-format code; create .prettierrc config for consistent style",
        category: "Development Tools",
        love: [],
        hate: []
      },
      {
        id: "husky",
        name: "Husky",
        version: "8.x",
        description: "manage git hooks; add husky config and scripts to improve commit process",
        category: "Development Tools",
        love: [],
        hate: []
      },
      {
        id: "commitizen",
        name: "Commitizen",
        version: "4.x",
        description: "standardize commit messages; create commitizen config to guide commits",
        category: "Development Tools",
        love: [],
        hate: []
      },
      {
        id: "lint-staged",
        name: "lint-staged",
        version: "15.x",
        description: "run linters on staged files; configure lint-staged with husky for efficiency",
        category: "Development Tools",
        love: ["husky"],
        hate: []
      },
      {
        id: "changesets",
        name: "Changesets",
        version: "2.x",
        description: "manage monorepo versions; create changeset config to streamline releases",
        category: "Development Tools",
        love: ["monorepo"],
        hate: []
      }
    ]
  }
  ,
  {
    title: "Additional Libraries",
    type: "package",
    key: "additionalLibraries",
    category: "Utilities",
    required: false,
    options: []
  },
  {
    title: "AI Assistant Prompt",
    type: "prompt",
    key: "aiPrompt",
    category: "Configuration",
    required: false,
    options: []
  }
];

export default steps;