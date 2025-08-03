export const steps = [
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
        love: ["runtime=browser", "runtime=nodejs", "id=express", "id=sequelize"],
        hate: ["category=frontend Framework", "typescript", "category=ORM/ODM", "id=nestjs", "id=angular"]
      },
      {
        id: "typescript",
        name: "TypeScript",
        version: "5.3",
        description: "use type , create types in types folder , for beginners add types in same file",
        category: "Core Language",
        love: ["category=ORM/ODM", "id=prisma", "id=typeorm", "id=nestjs", "id=angular", "id=drizzle"],
        hate: ["javascript"]
      },
    ]
  },
  {
    title: "Runtime/Architecture",
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
      love: ["npm", "yarn", "pnpm", "id=express", "id=fastify", "id=nestjs", "id=koa", "id=passport", "id=helmet"],
      hate: [
        "deno",
        "bun",
        "deno-pm",
        "bun-pm",
        "category=Deno Library",
        "category=Bun Library",
        "stackType=static-site",
        "id=hono",
        "id=oak",
        "id=bun-test"
      ]
    },
    {
      id: "deno",
      name: "Deno",
      version: "1.40",
      description: "Deno runtime",
      category: "Runtime",
      love: ["deno-pm", "id=hono", "id=oak", "typescript"],
      hate: [
        "npm",
        "yarn",
        "pnpm",
        "bun-pm",
        "nodejs",
        "category=Node Library",
        "stackType=monorepo",
        "id=express",
        "id=fastify",
        "id=nestjs",
        "id=passport"
      ]
    },
    {
      id: "bun",
      name: "Bun",
      version: "1.0",
      description: "Bun runtime",
      category: "Runtime",
      love: ["bun-pm", "id=hono", "id=bun-test", "id=bun-build", "id=sqlite"],
      hate: [
        "npm",
        "yarn",
        "pnpm",
        "deno-pm",
        "nodejs",
        "category=Node Library",
        "stackType=backend-ejs",
        "id=express",
        "id=fastify",
        "id=nestjs",
        "id=oak"
      ]
    },
    {
      id: "browser",
      name: "Browser",
      version: "Modern",
      description: "Client-side execution environment",
      category: "Runtime",
      love: ["stackType=frontend", "category=Frontend Framework"],
      hate: [
        "category=Backend Framework",
        "category=Database",
        "stackType=backend",
        "stackType=api-only",
        "stackType=microservices",
        "category=ORM/ODM",
        "id=dotenv"
      ]
    },
    {
      id: "wasm",
      name: "WebAssembly",
      version: "latest",
      description: "Low-level runtime for compiled languages",
      category: "Runtime",
      love: [],
      hate: [
        "category=Frontend Framework",
        "category=NPM Package",
        "stackType=frontend",
        "stackType=fullstack",
        "category=Styling & UI",
        "category=Authentication"
      ]
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
      category: "Package Manager",
      love: ["nodejs"],
      hate: ["deno", "bun", "stackType=monorepo", "deno-pm", "bun-pm"]
    },
    {
      id: "yarn",
      name: "Yarn",
      version: "4.x",
      category: "Package Manager",
      love: ["nodejs"],
      hate: ["deno", "bun", "runtime=browser", "deno-pm", "bun-pm"]
    },
    {
      id: "pnpm",
      name: "pnpm",
      version: "8.x",
      category: "Package Manager",
      love: ["nodejs", "stackType=monorepo", "changesets"],
      hate: ["deno", "bun", "runtime=wasm", "deno-pm", "bun-pm"]
    },
    {
      id: "bun-pm",
      name: "Bun",
      version: "1.x",
      category: "Package Manager",
      love: ["bun"],
      hate: ["nodejs", "deno", "stackType=backend-ejs", "npm", "yarn", "pnpm", "deno-pm"]
    },
    {
      id: "deno-pm",
      name: "Deno",
      version: "1.x",
      category: "Package Manager",
      love: ["deno"],
      hate: ["nodejs", "bun", "stackType=frontendBackend", "npm", "yarn", "pnpm", "bun-pm"]
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
      category: "Architecture",
      love: ["category=Frontend Framework" , "id=OtherDB", "runtime=browser", "firebase-auth", "id=supabase", "id=planetscale"],
      hate: [
        "category=Backend Framework",
        "category=Database",
        "runtime=wasm",
        "stackType=api-only",
        "category=ORM/ODM"
      ]
    },
    {
      id: "backend",
      name: "Backend Only",
      category: "Architecture",
      love: ["category=Backend Framework", "category=Database", "category=ORM/ODM", "runtime=nodejs", "runtime=deno", "runtime=bun"],
      hate: [
        "category=Frontend Framework",
        "runtime=browser",
        "stackType=static-site",
        "category=Styling & UI"
      ]
    },
      {
        id: "fullstack",
        name: "Full Stack",
        category: "Architecture",
        love: ['nextjs', 'nuxtjs', 'nestjs', 'remix', 'astro', 'category=Frontend Framework', 'category=Backend Framework', 'category=Database'],
        hate: ["stackType=frontend", "stackType=backend", "stackType=api-only"]
      },
      {
        id: "monorepo",
        name: "Monorepo",
        category: "Architecture",
        love: ["pnpm", "changesets", "stackType=frontendBackend"],
        hate: ["npm"]
      },
      {
        id: "frontendBackend",
        name: "Frontend + Backend",
        category: "Architecture",
        love: ["category=Frontend Framework", "category=Backend Framework", "stackType=monorepo"],
        hate: ["id=nextjs", "id=remix", "id=astro"]
      },
      {
        id: "cli",
        name: "CLI tool",
        category: "Architecture",
        love: ["id=react" ,"id=angular", "id=ink"],
        hate: ["category=Frontend Framework", "category=Backend Framework", "category=Styling & UI", "runtime=browser"]
      },
      {
        id: "static-site",
        name: "Static Site",
        category: "Architecture",
        love: ["id=astro", "id=nextjs"],
        hate: ["category=Backend Framework", "category=Database", "stackType=api-only", "stackType=microservices"]
      },
      {
        id: "serverless",
        name: "Serverless Backend",
        version: "",
        description: "Backend as serverless functions (AWS Lambda, Vercel functions, Netlify , cloudflare etc..), choose based on user ask otherwise choose freely availble best and easy option",
        category: "Architecture",
        tags: ["cloud", "functions"],
        love: ["AWS Lambda", "Vercel", "cloudflare", "Netlify", "supabase", "firebase", "GCP Cloud Functions", "id=hono", "deployment=aws", "deployment=cloudflare"],
        hate: ["category=Frontend Framework", "stackType=backend-ejs", "id=docker"]
      },
      {
        id: "microservices",
        name: "Microservices",
        version: "",
        description: "Multiple small services, separated backend APIs communicating via HTTP or messaging",
        category: "Architecture",
        tags: ["distributed", "scalable"],
        love: ["Docker", "Kubernetes", "RabbitMQ", "docker compose", "id=nestjs", "id=fastify", "category=Database"],
        hate: ["stackType=monorepo", "stackType=frontend", "stackType=backend-ejs", "id=sqlite"]
      },
      {
        id: "backend-ejs",
        name: "Backend with EJS",
        version: "",
        description: "Backend with template engine for frontend use , EJS if user not asked for something else",
        category: "Architecture",
        tags: ["templating", "server-rendered"],
        love: ["Express", "EJS", "id=express", "runtime=nodejs", "id=plain-css"],
        hate: ["category=Frontend Framework", "stackType=frontend", "stackType=api-only", "stackType=serverless"]
      },
      {
        id: "api-only",
        name: "API Only",
        version: "",
        description: "Backend focused on REST or GraphQL API without frontend , create config files and provide support through cli aswell in this case",
        category: "Architecture",
        tags: ["api", "headless"],
        love: ["Express", "Fastify", "Apollo", "category=Backend Framework"],
        hate: ["category=Frontend Framework", "category=Styling & UI", "stackType=frontend", "stackType=backend-ejs"]
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
        love: ["vite", "nextjs", "remix", "stackType=frontend", "styled-components", "mui", "ShadCn", "emotion", "chakra-ui", "testing-library"],
        hate: ["vue", "angular", "svelte", "id=backend-ejs"]
      },
      {
        id: "vue",
        name: "Vue.js",
        version: "3.x",
        description: "prefer Vite over Vue CLI",
        category: "Frontend Framework",
        love: ["vite", "stackType=frontend", "testing-library"],
        hate: ["react", "angular", "svelte", "nextjs", "remix", "mui", "ShadCn", "chakra-ui"]
      },
      {
        id: "angular",
        name: "Angular",
        version: "17.x",
        description: "always use Angular CLI; avoid manual webpack setup",
        category: "Frontend Framework",
        love: ["typescript", "stackType=frontend", "testing-library"],
        hate: ["react", "vue", "svelte", "vite"]
      },
      {
        id: "svelte",
        name: "Svelte",
        version: "4.x",
        description: "use with SvelteKit unless explicitly stated",
        category: "Frontend Framework",
        love: ["vite", "stackType=frontend"],
        hate: ["react", "vue", "angular", "nextjs", "remix"]
      },
      {
        id: "nextjs",
        name: "Next.js",
        version: "14.x",
        description: "prefer app router unless pages router is requested",
        category: "Frontend Framework",
        love: ["react", "vercel", "nextauth", "turbopack", "stackType=fullstack"],
        hate: ["vue", "angular", "svelte", "remix", "astro", "vite"]
      },
      {
        id: "remix",
        name: "Remix",
        version: "2.x",
        description: "do not mix with Next.js conventions",
        category: "Frontend Framework",
        love: ["react", "stackType=fullstack"],
        hate: ["vue", "angular", "svelte", "nextjs", "astro"]
      },
      {
        id: "astro",
        name: "Astro",
        version: "3.x",
        description: "use content collections and islands architecture when applicable",
        category: "Frontend Framework",
        love: ["stackType=static-site", "stackType=fullstack", "tailwindcss", "react", "vue", "svelte"],
        hate: ["nextjs", "remix", "stackType=backend"]
      },
      {
        id: "Otherfrontend",
        name: "Other",
        version: "compatible",
        description: "about your frontend framework ...\n",
        category: "Frontend Framework",
        love: ["stackType=frontend"],
        hate: ["stackType=backend"]
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
        love: ["nodejs", "passport", "helmet", "stackType=backend", "stackType=api-only", "stackType=backend-ejs"],
        hate: ["deno", "bun", "id=hono", "id=oak"]
      },
      {
        id: "fastify",
        name: "Fastify",
        version: "4.x",
        description: "prefer this over express for better performance in Node.js , choose yourself by considering performance requirement if not specified for other framwork",
        category: "Backend Framework",
        love: ["nodejs", "stackType=backend", "stackType=api-only", "stackType=microservices"],
        hate: ["deno", "bun", "id=hono", "id=oak"]
      },
      {
        id: "nestjs",
        name: "NestJS",
        version: "10.x",
        description: "use when project structure, DI, or microservices are required",
        category: "Backend Framework",
        love: ["nodejs", "typescript", "typeorm", "prisma", "stackType=microservices", "stackType=fullstack"],
        hate: ["deno", "bun", "id=hono", "id=oak", "javascript"]
      },
      {
        id: "hono",
        name: "Hono",
        version: "3.x",
        description: "default to this for Bun or Deno; avoid complex project structure",
        category: "Backend Framework",
        love: ["bun", "deno", "deployment=cloudflare", "stackType=serverless"],
        hate: ["nodejs", "id=express", "id=fastify", "id=nestjs", "id=koa", "id=passport"]
      },
      {
        id: "oak",
        name: "Oak",
        version: "12.x",
        description: "use only for Deno; not portable to Node.js or Bun",
        category: "Backend Framework",
        love: ["deno", "typescript"],
        hate: ["nodejs", "bun", "id=hono", "id=express", "id=fastify"]
      },
      {
        id: "koa",
        name: "Koa",
        version: "2.x",
        description: "Minimal and modern Node.js framework; middleware-focused, lightweight alternative to Express",
        category: "Backend Framework",
        love: ["nodejs", "passport", "helmet"],
        hate: ["deno", "bun", "id=hono"]
      },
      {
        id: "Otherbackend",
        name: "Other",
        version: "compatible",
        description: "about your backend framework ...",
        category: "Backend Framework",
        love: ["stackType=backend"],
        hate: ["stackType=frontend"]
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
        description: "use with localsetup machine || based on other stack choice use  neon of supabase if asked to choosed cloud option",
        category: "Database",
        package: ["neon", "supabase", "pg", "local", "other"],
        love: ["relational", "json", "extensions", "prisma", "typeorm", "sequelize", "drizzle", "stackType=backend"],
        hate: ["nosql", "mongodb", "cassandra", "dynamodb", "mongoose"]
      },
      {
        id: "mysql",
        name: "MySQL",
        version: "8.x",
        description: "default with mysql2 or prisma client packages",
        category: "Database",
        package: ["mysql2", "prisma"],
        love: ["relational", "performance", "prisma", "typeorm", "sequelize", "drizzle", "planetscale", "stackType=backend"],
        hate: ["nosql", "mongodb", "cassandra", "dynamodb", "mongoose"]
      },
      {
        id: "mongodb",
        name: "MongoDB",
        version: "7.x",
        description: "use with mongoose or official mongodb driver",
        category: "Database",
        package: ["mongoose", "mongodb", "local", "other"],
        love: ["nosql", "schema-flexible", "mongoose", "stackType=backend"],
        hate: ["relational", "postgresql", "mysql", "cockroachdb", "prisma", "sequelize", "typeorm", "drizzle"]
      },
      {
        id: "redis",
        name: "Redis",
        version: "7.x",
        description: "default with ioredis or redis for caching and sessions , use upstash for cloud options",
        category: "Database",
        package: ["ioredis", "redis", "upstash", "local", "other"],
        love: ["cache", "real-time", "stackType=backend", "stackType=microservices"],
        hate: []
      },
      {
        id: "sqlite",
        name: "SQLite",
        version: "3.x",
        description: "use with better-sqlite3 or knex for lightweight local storage",
        category: "Database",
        package: ["better-sqlite3", "knex"],
        love: ["lightweight", "file-based", "drizzle", "runtime=bun"],
        hate: ["stackType=microservices", "stackType=serverless"]
      },
      {
        id: "planetscale",
        name: "PlanetScale",
        version: "Latest",
        description: "MySQL-compatible serverless db; use with prisma or planetscale packages",
        category: "Database",
        package: ["prisma", "planetscale"],
        love: ["serverless", "scalable", "mysql", "prisma", "drizzle", "stackType=serverless", "stackType=frontend"],
        hate: ["mongodb", "mongoose", "nosql"]
      },
      {
        id: "cloudflare-db",
        name: "cloudflare D1/KV",
        version: "compatible",
        description: "add D1 or kV binding in .toml",
        category: "Database",
        package: ["prisma", "drizzleORM", "wrangler"],
        love: ["serverless", "cloudflare", "deployment=cloudflare", "id=hono", "drizzle", "stackType=frontend"],
        hate: ["runtime=nodejs", "stackType=backend-ejs"]
      },
      {
        id: "cassandra",
        name: "Apache Cassandra",
        version: "4.x",
        description: "distributed NoSQL database for high availability and scalability",
        category: "Database",
        package: ["cassandra-driver"],
        love: ["nosql", "distributed", "scalable", "stackType=microservices"],
        hate: ["relational", "prisma", "sequelize", "typeorm"]
      },
      {
        id: "cockroachdb",
        name: "CockroachDB",
        version: "latest",
        description: "cloud-native SQL database with strong consistency and horizontal scaling",
        category: "Database",
        package: ["pg"],
        love: ["relational", "scalable", "cloud-native", "stackType=microservices", "prisma", "sequelize"],
        hate: ["nosql", "mongoose", "mongodb"]
      },
      {
        id: "dynamodb",
        name: "AWS DynamoDB",
        version: "latest",
        description: "fully managed NoSQL database, serverless, low-latency",
        category: "Database",
        package: ["aws-sdk", "dynamodb-doc-client"],
        love: ["nosql", "serverless", "scalable", "deployment=aws", "stackType=serverless"],
        hate: ["relational", "prisma", "sequelize", "typeorm"]
      },
      {
        id: "elasticsearch",
        name: "Elasticsearch",
        version: "8.x",
        description: "search and analytics engine for structured and unstructured data",
        category: "Database",
        package: ["@elastic/elasticsearch"],
        love: ["search", "analytics", "scalable", "stackType=microservices"],
        hate: []
      },
      {
        id: "OtherDB",
        name: "Other",
        version: "compatible",
        description: "add your db requirement ..... \nuse their own cli if available",
        category: "Database",
        package: ["ORM", "ownCli"],
        love: ["serverless", "scalable", "stackType=frontend", "firebase", "supabase"],
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
        love: ["type-safety", "migrations", "typescript", "postgresql", "mysql", "cockroachdb", "planetscale"],
        hate: ["typeorm", "sequelize", "mongoose", "drizzle", "javascript"]
      },
      {
        id: "typeorm",
        name: "TypeORM",
        version: "0.3.x",
        description: "prefer for decorator-based models; create ormconfig or data-source config files for intermediate+ projects",
        category: "ORM/ODM",
        package: ["typeorm"],
        love: ["decorators", "typescript", "nestjs", "postgresql", "mysql"],
        hate: ["performance", "drizzle", "prisma", "mongoose", "javascript"]
      },
      {
        id: "sequelize",
        name: "Sequelize",
        version: "6.x",
        description: "use when promise-based ORM needed; create models and config files if intermediate+",
        category: "ORM/ODM",
        package: ["sequelize"],
        love: ["transaction", "connection-pooling", "postgresql", "mysql", "javascript"],
        hate: ["type-safety", "prisma", "typeorm", "mongoose", "drizzle"]
      },
      {
        id: "mongoose",
        name: "Mongoose",
        version: "8.x",
        description: "use only with MongoDB; create schemas and connection setup files for intermediate+ projects",
        category: "ORM/ODM",
        package: ["mongoose"],
        love: ["mongodb", "schema-validation"],
        hate: ["relational", "postgresql", "mysql", "prisma", "typeorm", "sequelize", "drizzle"]
      },
      {
        id: "drizzle",
        name: "Drizzle ORM",
        version: "0.29",
        description: "prefer lightweight TS ORM; add schema or config files if advanced project",
        category: "ORM/ODM",
        package: ["drizzle-orm"],
        love: ["performance", "typescript", "sqlite", "postgresql", "mysql", "planetscale", "cloudflare-db"],
        hate: ["typeorm", "sequelize", "mongoose", "javascript"]
      },
      {
        id: "OtherORM",
        name: "Other",
        version: "compatible",
        description: "add your db requirement ..... \nuse their own cli if available",
        category: "ORM/ODM",
        package: ["", ""],
        love: ["database", "orm"],
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
        hate: ["vue", "angular", "svelte", "remix", "astro", "stackType=backend"]
      },
      {
        id: "auth0",
        name: "Auth0",
        version: "Latest",
        description: "create auth0 config files or document setup in README for complex projects",
        category: "Authentication",
        package: ["auth0"],
        love: ["category=Frontend Framework", "category=Backend Framework"],
        hate: []
      },
      {
        id: "firebase-auth",
        name: "Firebase Auth",
        version: "10.x",
        description: "initialize Firebase config files for intermediate+ projects or document setup",
        category: "Authentication",
        package: ["firebase"],
        love: ["firebase", "stackType=frontend", "react", "vue", "angular"],
        hate: ["stackType=backend-ejs", "supabase"]
      },
      {
        id: "passport",
        name: "Passport.js",
        version: "0.7",
        description: "use with Express.js; create strategy and config files for intermediate+ projects",
        category: "Authentication",
        package: ["passport"],
        love: ["express", "runtime=nodejs", "stackType=backend", "koa"],
        hate: ["runtime=deno", "runtime=bun", "id=hono", "nextjs"]
      },
      {
        id: "jwt",
        name: "JWT",
        version: "9.x",
        description: "create token handling and secret config files for intermediate+ projects",
        category: "Authentication",
        package: ["jsonwebtoken"],
        love: ["stackType=api-only", "stackType=backend", "stackType=fullstack"],
        hate: ["stackType=static-site"]
      },
      {
        id: "lucia",
        name: "Lucia",
        version: "3.x",
        description: "create adapter and config files if project complexity requires",
        category: "Authentication",
        package: ["lucia-auth"],
        love: ["svelte", "astro", "vue", "react"],
        hate: []
      },
      {
        id: "otherauth",
        name: "Other",
        version: "compatible",
        description: "add your auth requirement ..... \n",
        category: "auth",
        package: [""],
        love: ["auth", "security"],
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
        love: ["react", "vue", "svelte", "astro", "nextjs"],
        hate: ["plain-css", "mui", "styled-components"]
      },
      {
        id: "styled-components",
        name: "Styled Components",
        version: "6.x",
        description: "use with React for scoped CSS-in-JS styling",
        category: "Styling & UI",
        love: ["react"],
        hate: ["vue", "angular", "svelte", "tailwindcss"]
      },
      {
        id: "mui",
        name: "Material-UI",
        version: "5.x",
        description: "use with React when Material Design components needed",
        category: "Styling & UI",
        love: ["react"],
        hate: ["vue", "angular", "svelte", "tailwindcss"]
      },
      {
        id: "ShadCn",
        name: "Shadcn",
        version: "2.x",
        description: "use with React for modular accessible components",
        category: "Styling & UI",
        love: ["react", "tailwindcss"],
        hate: ["vue", "angular", "svelte", "mui"]
      },
      {
        id: "sass",
        name: "Sass",
        version: "1.x",
        description: "",
        category: "Styling & UI",
        love: ["plain-css"],
        hate: ["tailwindcss", "styled-components"]
      },
      {
        id: "emotion",
        name: "Emotion",
        version: "11.x",
        description: "use with React for performant CSS-in-JS styling",
        category: "Styling & UI",
        love: ["react"],
        hate: ["vue", "angular", "svelte", "tailwindcss"]
      },
      {
        id: "vanilla-extract",
        name: "Vanilla Extract",
        version: "1.x",
        description: "use for type-safe zero-runtime CSS in TS projects",
        category: "Styling & UI",
        love: ["typescript"],
        hate: ["plain-css", "sass"]
      },
      {
        id: "plain-css",
        name: "Plain CSS",
        version: "",
        description: "use when no CSS framework or library preferred",
        category: "Styling & UI",
        love: ["stackType=backend-ejs"],
        hate: ["tailwindcss", "styled-components", "mui", "ShadCn", "emotion", "chakra-ui"]
      },
      {
        id: "chakra-ui",
        name: "Chakra UI",
        version: "2.x",
        description: "accessible, composable React components",
        category: "Styling & UI",
        love: ["react"],
        hate: ["vue", "angular", "svelte", "tailwindcss"]
      },
      {
        id: "otherstyling",
        name: "Other",
        version: "compatible",
        description: "add your styling requirement ..... \n",
        category: "Styling & UI",
        love: ["styling", "UI"],
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
        love: ["react", "nodejs", "typescript"],
        hate: ["vitest", "bun-test", "deno"]
      },
      {
        id: "vitest",
        name: "Vitest",
        version: "1.x",
        description: "use with Vite projects by default",
        category: "Testing",
        love: ["vite"],
        hate: ["jest", "bun-test"]
      },
      {
        id: "cypress",
        name: "Cypress",
        version: "13.x",
        description: "choose for E2E testing unless playwright preferred",
        category: "Testing",
        love: ["category=Frontend Framework", "e2e"],
        hate: ["playwright"]
      },
      {
        id: "playwright",
        name: "Playwright",
        version: "1.x",
        description: "prefer for cross-browser E2E with parallelization",
        category: "Testing",
        love: ["category=Frontend Framework", "e2e"],
        hate: ["cypress"]
      },
      {
        id: "testing-library",
        name: "Testing Library",
        version: "14.x",
        description: "use with UI frameworks for behavior-focused tests",
        category: "Testing",
        love: ["react", "vue", "angular", "svelte", "jest", "vitest"],
        hate: ["stackType=api-only", "stackType=cli"]
      },
      {
        id: "bun-test",
        name: "Bun Test",
        version: "1.x",
        description: "use if Bun runtime detected or preferred",
        category: "Testing",
        love: ["bun"],
        hate: ["jest", "vitest", "deno", "nodejs"]
      },
      {
        id: "otherTesting",
        name: "Other",
        version: "compatible",
        description: "add your testing requirement ..... \n",
        category: "Testing",
        love: ["testing"],
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
        love: ["react", "vue", "svelte", "vitest"],
        hate: ["webpack", "nextjs", "angular", "turbopack", "bun-build"]
      },
      {
        id: "webpack",
        name: "Webpack",
        version: "5.x",
        description: "Static module bundler with extensive plugin ecosystem and code splitting",
        category: "Build Tool",
        love: ["react"],
        hate: ["vite", "rollup", "esbuild", "turbopack", "bun-build"]
      },
      {
        id: "rollup",
        name: "Rollup",
        version: "4.x",
        description: "Module bundler for JavaScript with tree-shaking and ES module output",
        category: "Build Tool",
        love: [],
        hate: ["webpack", "vite", "turbopack"]
      },
      {
        id: "esbuild",
        name: "esbuild",
        version: "0.19",
        description: "Extremely fast JavaScript bundler and minifier written in Go",
        category: "Build Tool",
        love: ["vite"],
        hate: []
      },
      {
        id: "turbopack",
        name: "Turbopack",
        version: "Beta",
        description: "Incremental bundler by Vercel optimized for development speed",
        category: "Build Tool",
        love: ["nextjs"],
        hate: ["vite", "webpack", "rollup", "bun-build"]
      },
      {
        id: "bun-build",
        name: "Bun Build",
        version: "1.x",
        description: "Built-in bundler for Bun with fast performance and simple configuration",
        category: "Build Tool",
        love: ["bun"],
        hate: ["vite", "webpack", "rollup", "turbopack", "esbuild"]
      },
      {
        id: "otherBuild",
        name: "Other",
        version: "compatible",
        description: "add your build requirement ..... \n",
        category: "Build Tool",
        love: ["build"],
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
        love: ["nextjs", "remix", "astro", "svelte", "stackType=frontend", "stackType=fullstack", "stackType=serverless"],
        hate: ["stackType=backend", "docker", "aws"]
      },
      {
        id: "netlify",
        name: "Netlify",
        version: "Latest",
        description: "create/netlify.toml file if absent, else document deployment steps in README",
        category: "Deployment",
        love: ["stackType=static-site", "stackType=frontend", "astro", "remix"],
        hate: ["stackType=backend", "docker", "aws"]
      },
      {
        id: "aws",
        name: "AWS",
        version: "Latest",
        description: "create necessary config files (e.g. cloudformation, terraform) or explain setup in README",
        category: "Deployment",
        love: ["stackType=microservices", "stackType=backend", "dynamodb", "aws_s3", "docker", "serverless"],
        hate: ["vercel", "netlify", "fly-io"]
      },
      {
        id: "docker",
        name: "Docker",
        version: "24.x",
        description: "create Dockerfile and docker-compose.yml(only if user asked for it or using microservices or other stuffs which requires it also consider project complexity then choose accordingly) if missing, else document usage in README",
        category: "Deployment",
        love: ["stackType=microservices", "stackType=backend", "aws", "fly-io", "railway"],
        hate: ["vercel", "netlify", "stackType=serverless"]
      },
      {
        id: "railway",
        name: "Railway",
        version: "Latest",
        description: "add railway.toml or explain config in README if files are missing",
        category: "Deployment",
        love: ["docker", "stackType=backend", "stackType=fullstack"],
        hate: ["vercel", "netlify", "aws"]
      },
      {
        id: "fly-io",
        name: "Fly.io",
        version: "Latest",
        description: "create fly.toml config or document deployment steps in README",
        category: "Deployment",
        love: ["docker", "stackType=backend", "stackType=fullstack", "sqlite"],
        hate: ["vercel", "netlify", "aws"]
      },
      {
        id: "cloudflare",
        name: "Cloudflare",
        version: "Latest",
        description: "create wrangler.toml and explain usage if files missing",
        category: "Deployment",
        love: ["stackType=serverless", "hono", "cloudflare-db", "cloudflare_r2"],
        hate: ["stackType=backend", "docker", "runtime=nodejs", "aws"]
      },
      {
        id: "otherDeployment",
        name: "Other",
        version: "compatible",
        description: "add your deployment requirement ..... \n",
        category: "Deployment",
        love: ["deployment"],
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
        love: ["category=Backend Framework", "category=Fullstack Framework"],
        hate: ["runtime=browser"]
      },
      {
        id: "eslint",
        name: "ESLint",
        version: "8.x",
        description: "enforce code quality; create .eslintrc config to teach best practices",
        category: "Development Tools",
        love: ["prettier", "lint-staged", "typescript", "javascript"],
        hate: []
      },
      {
        id: "prettier",
        name: "Prettier",
        version: "3.x",
        description: "auto-format code; create .prettierrc config for consistent style",
        category: "Development Tools",
        love: ["eslint", "lint-staged"],
        hate: []
      },
      {
        id: "husky",
        name: "Husky",
        version: "8.x",
        description: "manage git hooks; add husky config and scripts to improve commit process",
        category: "Development Tools",
        love: ["lint-staged", "commitizen"],
        hate: []
      },
      {
        id: "commitizen",
        name: "Commitizen",
        version: "4.x",
        description: "standardize commit messages; create commitizen config to guide commits",
        category: "Development Tools",
        love: ["husky"],
        hate: []
      },
      {
        id: "lint-staged",
        name: "lint-staged",
        version: "15.x",
        description: "run linters on staged files; configure lint-staged with husky for efficiency",
        category: "Development Tools",
        love: ["husky", "eslint", "prettier"],
        hate: []
      },
      {
        id: "changesets",
        name: "Changesets",
        version: "2.x",
        description: "manage monorepo versions; create changeset config to streamline releases",
        category: "Development Tools",
        love: ["monorepo", "pnpm"],
        hate: []
      },
      {
        id: "otherConfig",
        name: "Other",
        version: "compatible",
        description: "add your configuration requirement ..... \n",
        category: "Development Tools",
        love: ["configuration"],
        hate: []
      }
    ]
  },
  {
    title: "Additional Services",
    type: "checkbox",
    key: "additionalServices",
    category: "Additional",
    required: false,
    options: [
      {
        title: "Storage Bucket",
        type: "radio",
        id: "storage_bucket",
        key: "storage_bucket",
        category: "Storage",
        required: false,
        options: [
          {
            id: "aws_s3",
            name: "Amazon S3",
            description: "Scalable object storage service",
            category: "Storage",
            love: ["scalability", "integration", "deployment=aws"],
            hate: ["cloudflare_r2"]
          },
          {
            id: "gcs",
            name: "Google Cloud Storage",
            description: "Unified object storage for developers and enterprises",
            category: "Storage",
            love: ["global", "multi-region"],
            hate: []
          },
          {
            id: "azure_blob",
            name: "Azure Blob Storage",
            description: "Massively scalable object storage for unstructured data",
            category: "Storage",
            love: ["microsoft-ecosystem", "scalability"],
            hate: []
          },
          {
            id: "cloudflare_r2",
            name: "Cloudflare R2",
            description: "Low-cost object storage without egress fees",
            category: "Storage",
            love: ["no-egress-fees", "low-cost", "deployment=cloudflare", "hono"],
            hate: ["aws_s3"]
          },
          {
            id: "cloudinary",
            name: "Cloudinary",
            description: "Image and video management platform with CDN",
            category: "Storage",
            love: ["media-optimization", "cdn", "category=Frontend Framework"],
            hate: []
          },
          {
            id: "digitalocean_spaces",
            name: "DigitalOcean Spaces",
            description: "Simple object storage with built-in CDN",
            category: "Storage",
            love: ["simplicity", "cdn"],
            hate: []
          },
          {
            id: "additional/storage_bucket",
            name: "Other/Additional",
            description: "Specify other storage bucket services",
            category: "Storage",
            love: [],
            hate: []
          }
        ]
      },
      {
        title: "Logging & Monitoring",
        type: "radio",
        id: "logging_monitoring",
        key: "logging_monitoring",
        category: "Observability",
        required: false,
        options: [
          {
            id: "sentrylog",
            name: "Sentry",
            description: "Error tracking and performance monitoring",
            category: "Observability",
            love: ["error-tracking", "performance"],
            hate: ["logrocket", "datadog"]
          },
          {
            id: "logrocket",
            name: "LogRocket",
            description: "Session replay and product analytics",
            category: "Observability",
            love: ["session-replay", "analytics", "category=Frontend Framework"],
            hate: ["sentrylog", "datadog"]
          },
          {
            id: "datadog",
            name: "Datadog",
            description: "Full-stack observability platform",
            category: "Observability",
            love: ["metrics", "apm", "stackType=microservices"],
            hate: ["sentrylog", "logrocket"]
          },
          {
            id: "additional/logging_monitoring",
            name: "Other/Additional",
            description: "Specify other logging/monitoring tools",
            category: "Observability",
            love: [],
            hate: []
          }
        ]
      },
      {
        title: "Analytics",
        type: "checkbox",
        id: "analytics",
        description: "Select analytics tools",
        key: "analytics",
        name: "Analytics",
        category: "Insights",
        required: false,
        options: [
          {
            id: "google_analytics",
            name: "Google Analytics",
            description: "Web analytics service",
            category: "Insights",
            love: ["free-tier", "integration"],
            hate: ["privacy", "mixpanel", "amplitude"]
          },
          {
            id: "mixpanel",
            name: "Mixpanel",
            description: "Advanced product analytics",
            category: "Insights",
            love: ["user-journeys", "retention"],
            hate: ["google_analytics", "amplitude"]
          },
          {
            id: "amplitude",
            name: "Amplitude",
            description: "Product analytics for digital products",
            category: "Insights",
            love: ["behavioral-analytics"],
            hate: ["google_analytics", "mixpanel"]
          },
          {
            id: "additional/analytics",
            name: "Other/Additional",
            description: "Specify other analytics tools",
            category: "Insights",
            love: [],
            hate: []
          }
        ]
      },
      {
        title: "Error Handling",
        type: "checkbox",
        id: "errorHandling",
        key: "error_handling",
        name: "Error Handling",
        category: "Resilience",
        required: false,
        options: [
          {
            id: "sentryhandling",
            name: "Sentry",
            description: "Error tracking and monitoring",
            category: "Resilience",
            love: ["real-time", "stack-traces"],
            hate: ["rollbar"]
          },
          {
            id: "rollbar",
            name: "Rollbar",
            description: "Real-time error monitoring",
            category: "Resilience",
            love: ["debugging", "notifications"],
            hate: ["sentryhandling"]
          },
          {
            id: "additional/errorHandling",
            name: "Other/Additional",
            description: "Specify other error handling tools",
            category: "Resilience",
            love: [],
            hate: []
          }
        ]
      },
      {
        title: "Internationalization (i18n)",
        type: "checkbox",
        key: "i18n",
        id: "i18n",
        name: "Internationalization",
        category: "Localization",
        required: false,
        options: [
          {
            id: "i18next",
            name: "i18next",
            description: "Popular i18n framework for JavaScript",
            category: "Localization",
            love: ["react", "vue", "angular", "nextjs"],
            hate: ["polyglot"]
          },
          {
            id: "polyglot",
            name: "Polyglot.js",
            description: "Lightweight i18n helper",
            category: "Localization",
            love: ["simple", "small"],
            hate: ["complex", "i18next", "formatjs"]
          },
          {
            id: "formatjs",
            name: "FormatJS",
            description: "Modular i18n libraries",
            category: "Localization",
            love: ["icu", "standards", "react", "vue"],
            hate: ["polyglot"]
          },
          {
            id: "additional/i18n",
            name: "Other/Additional",
            description: "add your i18n requirement...\n",
            category: "Localization",
            love: [],
            hate: []
          }
        ]
      },
      {
        title: "Security",
        type: "checkbox",
        key: "security",
        id: "security",
        category: "Security",
        required: false,
        name: "Security",
        options: [
          {
            id: "helmet",
            name: "Helmet",
            description: "Secure Express apps with HTTP headers",
            category: "Security",
            love: ["express", "headers", "koa"],
            hate: ["hono", "nextjs"]
          },
          {
            id: "rate_limiting",
            name: "Rate Limiting",
            description: "Protect against brute force attacks",
            category: "Security",
            love: ["ddos-protection", "category=Backend Framework"],
            hate: []
          },
          {
            id: "cors",
            name: "CORS",
            description: "Cross-Origin Resource Sharing",
            category: "Security",
            love: ["security", "flexibility", "stackType=api-only", "stackType=frontendBackend"],
            hate: []
          },
          {
            id: "additional/security",
            name: "Other/Additional",
            description: "Specify other security tools",
            category: "Security",
            love: [],
            hate: []
          }
        ]
      },
      {
        title: "Payment Processing",
        type: "radio",
        key: "payments",
        id: "payment",
        name: "Payment Processing",
        category: "Payments",
        required: false,
        options: [
          {
            id: "stripe/Payment",
            name: "Stripe",
            description: "Online payment processing",
            category: "Payments",
            love: ["api", "subscriptions", "developer-experience"],
            hate: ["paypal", "razorpay"]
          },
          {
            id: "paypal",
            name: "PayPal",
            description: "Online payment system",
            category: "Payments",
            love: ["ubiquity"],
            hate: ["fees", "stripe/Payment", "razorpay"]
          },
          {
            id: "razorpay",
            name: "Razorpay",
            description: "Payment gateway for India",
            category: "Payments",
            love: ["india"],
            hate: ["stripe/Payment", "paypal"]
          },
          {
            id: "additional/payment",
            name: "Other/Additional",
            description: "Specify other payment processors",
            category: "Payments",
            love: [],
            hate: []
          }
        ]
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