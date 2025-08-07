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
    required: false,
    options: [
      {
        id: "javascript",
        name: "JavaScript",
        version: "ES2023",
        description: "",
        category: "Core Language",
        love: ["stackType=quick-prototype"],
        hate: ["category=TypeSafe", "stackType=enterprise"]
      },
      {
        id: "typescript",
        name: "TypeScript",
        version: "5.3",
        description: "use type , create types in types folder , for beginners add types in same file",
        category: "Core Language",
        love: ["stackType=large-scale"],
        hate: []
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
        love: ["npm"],
        hate: [
          "deno-pm",
          "bun-pm",
          "category=Deno Library",
          "category=Bun Library",
          "stackType=static-site", "oak"
        ]
      },
      {
        id: "deno",
        name: "Deno",
        version: "1.40",
        description: "Deno runtime",
        category: "Runtime",
        love: ["deno-pm", "oak", "hono"],
        hate: [
          "npm-pm",
          "yarn-pm",
          "pnpm-pm",
          "bun-pm",
          "category=Node Library",
          "stackType=monorepo", "express", "nestjs", "vite"
        ]
      },
      {
        id: "bun",
        name: "Bun",
        version: "1.0",
        description: "Bun runtime",
        category: "Runtime",
        love: ["bun-pm", "hono"],
        hate: [
          "npm-pm",
          "yarn-pm",
          "pnpm-pm",
          "deno-pm",
          "category=Node Library",
          "stackType=backend-ejs", "express", "nestjs", "vite", "rollup", "deno"
        ]
      },
      {
        id: "browser",
        name: "Browser",
        version: "Modern",
        description: "Client-side execution environment",
        category: "Runtime",
        love: [],
        hate: [
          "category=Backend Framework",
          "category=Database",
          "stackType=backend",
          "stackType=api-only",
          "stackType=microservices"
        ]
      },
      // {
      //   id: "wasm",
      //   name: "WebAssembly",
      //   version: "latest",
      //   description: "Low-level runtime for compiled languages",
      //   category: "Runtime",
      //   love: [],
      //   hate: [
      //     "category=Backend Framework",
      //     "category=NPM Package",
      //     "backend",
      //     "Serverless",
      //     "Microservices",
      //     "Backend-ejs",
      //     "api-only",
      //     "cli"
      //     // "stackType=frontend",
      //     // "stackType=fullstack"
      //   ]
      // }
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
        id: "npm-pm",
        name: "npm",
        version: "10.x",
        category: "Package Manager",
        love: ["nodejs"],
        hate: ["deno", "bun", "stackType=monorepo"]
      },
      {
        id: "yarn-pm",
        name: "Yarn",
        version: "4.x",
        category: "Package Manager",
        love: ["nodejs"],
        hate: ["deno", "bun", "runtime=browser"]
      },
      {
        id: "pnpm-pm",
        name: "pnpm",
        version: "8.x",
        category: "Package Manager",
        love: ["nodejs", "stackType=monorepo", "monorepo"],
        hate: ["deno", "bun", "runtime=wasm"]
      },
      {
        id: "bun-pm",
        name: "Bun",
        version: "1.x",
        category: "Package Manager",
        love: ["bun"],
        hate: ["nodejs", "deno", "stackType=backend-ejs", "vite"]
      },
      {
        id: "deno-pm",
        name: "Deno",
        version: "1.x",
        category: "Package Manager",
        love: ["deno"],
        hate: ["nodejs", "bun", "stackType=frontendBackend", "vite"]
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
        love: ["react", "tailwindcss"],
        hate: [
          "category=Backend Framework",
          "express",
          "kao",
          "fastify",
          "nestjs",
          "hono",
          "oak",
          "category=ORM/ODM",
          "nextauth",
          "auth0",
          "jwt",
          "passport",
          "lucia", "category=Database"
        ]
      },
      {
        id: "backend",
        name: "Backend Only",
        category: "Architecture",
        love: ["express"],
        hate: [
          "category=Frontend Framework",
          "runtime=browser",
          "category=Styling & UI",
          "browser"
        ]
      },
      {
        id: "fullstack",
        name: "Full Stack",
        description: "prefer nextjs etc ssr application if no other stack information mentioned below",
        category: "Architecture",
        love: ['nextjs', "tailwindcss"],
        hate: []
      },
      {
        id: "monorepo",
        name: "Monorepo",
        description: "use with turbo repo ",
        category: "Architecture",
        love: ["pnpm", "changesets"],
        hate: []
      },
      {
        id: "frontendBackend",
        name: "Frontend + Backend",
        category: "Architecture",
        description: "try to create folder like frontend and backend or client or server if no other information are provided",
        love: ["express", "react", "zustand", "nextjs", "tailwindcss"],
        hate: []
      },
      {
        id: "cli",
        name: "CLI tool",
        category: "Architecture",
        love: [],
        hate: ["category=Frontend Framework", "category=Styling & UI", "category=statemanagement"]
      },
      {
        id: "static-site",
        name: "Static Site(HTML/CSS/JS)",
        description: "its a plain html css js project , based on project compleixity create this , try to give all in one .html file for normal small prototype otherwise for full product craete multiple files and folder based on level compelixty",
        category: "Architecture",
        love: ["plain-css"],
        hate: ["category=Backend Framework", "category=authentication", "category=Frontend Framework", "category=Database", "category=ORM/ODM", "category=StateManagement", "category=testing", "category=Development Tools"]
      },
      {
        id: "serverless",
        name: "Serverless Backend",
        version: "",
        description: "use framworks adaptor if they offically dont support serverless , like adaptor with express , fastify only if user say use these frameworks otherwise if nothing said then use famous serverless like hono cloudflare vercel etc",
        category: "Architecture",
        tags: ["cloud", "functions"],
        love: [],
        hate: ["category=Frontend Framework", "category=Styling & UI", "kao"]
      },
      {
        id: "microservices",
        name: "Microservices",
        version: "",
        description: "Multiple small services, separated backend APIs communicating via HTTP or messaging",
        category: "Architecture",
        tags: ["distributed", "scalable"],
        love: ["Docker", "Kubernetes", "RabbitMQ", "docker compose"],
        hate: []
      },
      {
        id: "backend-ejs",
        name: "Backend with EJS",
        version: "",
        description: "Backend with template engine for frontend use , EJS if user not asked for something else",
        category: "Architecture",
        tags: ["templating", "server-rendered"],
        love: ["Express", "EJS", "plain-css"],
        hate: ["category=Frontend Framework"]
      },
      {
        id: "api-only",
        name: "API Only",
        version: "",
        description: "Backend focused on REST or GraphQL API without frontend , create config files and provide support through cli aswell in this case",
        category: "Architecture",
        tags: ["api", "headless"],
        love: ["Express", "Fastify", "Apollo"],
        hate: ["category=Frontend Framework", "category=Styling & UI"]
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
        love: [
          "vite", "nextjs", "remix",
          "redux", "zustand", "tailwindcss"
        ],
        hate: [
          "jquery", "angularjs"
        ]
      },
      {
        id: "vue",
        name: "Vue.js",
        version: "3.x",
        description: "prefer Vite over Vue CLI",
        category: "Frontend Framework",
        love: [
          "vite", "nuxt"
        ],
        hate: ["stackType=monorepo", "jquery", "angularjs"]
      },
      {
        id: "angular",
        name: "Angular",
        version: "17.x",
        description: "always use Angular CLI; avoid manual webpack setup",
        category: "Frontend Framework",
        love: ["angular-cli"],
        hate: ["vite", "jquery", "react"]
      },
      {
        id: "svelte",
        name: "Svelte",
        version: "4.x",
        description: "use with SvelteKit unless explicitly stated",
        category: "Frontend Framework",
        love: ["rollup"],
        hate: []
      },
      {
        id: "nextjs",
        name: "Next.js",
        version: "14.x",
        must: ["nodejs"],
        description: "prefer app router unless pages router is requested",
        category: "Frontend Framework",
        love: ["react", "shadcn", "vercel", "nextauth", "zustand", "tailwindcss"],
        hate: []
      },
      {
        id: "remix",
        name: "Remix",
        version: "2.x",
        description: "do not mix with Next.js conventions",
        category: "Frontend Framework",
        love: ["react", "tailwindcss"],
        hate: []
      },
      {
        id: "astro",
        name: "Astro",
        version: "3.x",
        description: "use content collections and islands architecture when applicable",
        category: "Frontend Framework",
        love: ["mdx"],
        hate: []
      },
      {
        id: "Otherfrontend",
        name: "Other",
        version: "compatible",
        description: "about your frontend framework ...\n",
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
        description: "default for Node.js unless performance is a concern; for intermediate+ create src/controllers, src/services, src/routes; setup app.js|ts with express.json() middleware",
        must: ['nodejs'],
        category: "Backend Framework",
        love: ["nodejs", "passport"],
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
        must: ["nodejs"],
        description: "use when project structure, DI, or microservices are required; initialize with nest new; use src/modules, src/controllers, src/services",
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
        must: ["deno"],
        description: "use only for Deno; not portable to Node.js or Bun",
        category: "Backend Framework",
        love: ["deno"],
        hate: ["nodejs", "bun"]
      },
      {
        id: "koa",
        name: "Koa",
        version: "2.x",
        description: "Minimal and modern Node.js framework; middleware-focused, lightweight alternative to Express",
        category: "Backend Framework",
        love: ["nodejs"],
        hate: ["deno", "bun"]
      },
      {
        id: "workers",
        name: "Cloudflare Workers",
        version: "compatible",
        description: "V8-based serverless functions. Requires wrangler.toml with main entry. Add bindings if using DO/ KV etc.",
        category: "Backend Framework",
        love: ["cloudflare_r2", "cloudflare-db", "cloudflare"],
        hate: []
      },
      {
        id: "Otherbackend",
        name: "Other",
        version: "compatible",
        description: "about your backend framework ...",
        category: "Backend Framework",
        love: [],
        hate: []
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
        description: "create connection setup file (e.g., src/db.ts) and config if ORM not auto-handling; match driver with ORM choice",
        category: "Database",
        package: ["default", "pg", "slonik", "other"],
        service: ["default", "Neon", "local", "Supabase", "Railway", "Render", "Fly.io", "Vercel Postgres"],
        love: ["relational", "json", "extensions", "supabase", "neon", "drizzle"],
        hate: ["nosql"]
      },
      {
        id: "mysql",
        name: "MySQL",
        version: "8.x",
        description: "default with mysql2 or Prisma client; create connection setup file if ORM not handling",
        category: "Database",
        package: ["default", "mysql2"],
        service: ["default", "PlanetScale", "ClearDB", "Railway", "Render"],
        love: ["relational", "performance"],
        hate: ["nosql"]
      },
      {
        id: "mongodb",
        name: "MongoDB",
        version: "7.x",
        description: "use with mongoose or official mongodb driver(if other not provided); create models and db connection file (src/db.ts) if not handled by framework; choose Atlas if cloud option requested",
        category: "Database",
        package: ["default", "mongodb", "mongoose", "prisma"],
        service: ["default", "MongoDB Atlas", "Render", "ScaleGrid", "ObjectRocket"],
        hate: ["category=SQL"]
      },
      {
        id: "redis",
        name: "Redis",
        version: "7.x",
        description: "default with ioredis or redis; use for caching and sessions; create cache client setup file; use Upstash for cloud option",
        category: "Database",
        package: ["default", "ioredis", "redis", "upstash"],
        service: ["default", "Upstash", "Redis Enterprise", "Render", "Railway"],
        love: ["cache", "real-time"],
        hate: []
      },
      {
        id: "sqlite",
        name: "SQLite",
        version: "3.x",
        description: "use with better-sqlite3 or knex for local lightweight storage; create single file DB (db.sqlite) and connection file",
        category: "Database",
        package: ["default", "better-sqlite3", "sqlite3"],
        service: ["default", "Turso", "local"],
        hate: []
      },
      {
        id: "planetscale",
        name: "PlanetScale",
        version: "Latest",
        description: "MySQL-compatible serverless DB; use with planetscale packages(if other service or package not specified); create related file equivalent and handle connection string from dashboard",
        category: "Database",
        package: ["default", "@planetscale/database"],
        service: ["default", "PlanetScale"],
        love: ["serverless", "scalable"],
        hate: []
      },
      {
        id: "cloudflare-db",
        name: "Cloudflare D1/KV/DO",
        version: "compatible",
        description: "Add service bindings in wrangler.toml. Use D1 anywhere; KV and Durable Objects only if Cloudflare Workers is selected in backend framwork. Create schema/migration if using ORM; else use raw SQL/KV methods. Provided by Wrangler.",
        category: "Database",
        package: ["default", "wrangler"],
        service: ["default", "Cloudflare D1", "Cloudflare KV", "Durable Objects"],
        love: ["serverless", "cloudflare"],
        hate: [],
        must: ["workers"]
      }

      ,
      {
        id: "firebase-db",
        name: "Firebase (Firestore/Realtime DB)",
        version: "latest",
        description: "NoSQL database by Google. Use with Firebase SDK. Works well with auth and storage. Real-time updates built-in.",
        category: "Database",
        package: ["default", "firebase", "firebase-admin"],
        service: ["default", "Firebase Realtime DB", "Firebase Firestore"],
        love: ["nosql", "realtime", "auth"],
        hate: ["relational"]
      }

      ,
      {
        id: "cassandra",
        name: "Apache Cassandra",
        version: "4.x",
        description: "Use cassandra-driver. Create DB client setup file. Use cloud providers like DataStax Astra if remote hosting is needed.",
        category: "Database",
        package: ["default", "cassandra-driver"],
        service: ["default", "DataStax Astra", "ScyllaDB", "Amazon Keyspaces"],
        love: ["nosql", "distributed", "scalable"],
        hate: ["relational"]
      }
      ,
      {
        id: "cockroachdb",
        name: "CockroachDB",
        version: "latest",
        description: "PostgreSQL-compatible, cloud-native DB. Use with pg driver or ORM. Create DB connection config and handle TLS settings if required.",
        category: "Database",
        package: ["default", "pg"],
        service: ["default", "CockroachDB Serverless", "Cockroach Cloud"],
        love: ["relational", "scalable", "cloud-native"],
        hate: ["nosql"]
      }
      ,
      {
        id: "dynamodb",
        name: "AWS DynamoDB",
        version: "latest",
        description: "Serverless NoSQL DB. Use aws-sdk or dynamodb-doc-client. Create a separate service file for read/write operations.",
        category: "Database",
        package: ["default", "aws-sdk", "@aws-sdk/client-dynamodb", "dynamodb-doc-client"],
        service: ["default", "AWS DynamoDB"],
        love: ["nosql", "serverless", "scalable"],
        hate: ["relational"]
      }
      ,
      {
        id: "elasticsearch",
        name: "Elasticsearch",
        version: "8.x",
        description: "Use @elastic/elasticsearch client. Create a search service file. Handle index creation/mapping before queries. Follow setup guide if mentioned.",
        category: "Database",
        package: ["default", "@elastic/elasticsearch"],
        service: ["default", "Elastic Cloud", "Bonsai", "Searchly", "Qbox"],
        love: ["search", "analytics", "scalable"],
        hate: []
      }
      ,
      {
        id: "OtherDB",
        name: "Other",
        version: "compatible",
        description: "add required DB; use their own CLI if available; create necessary config/connection/migration files as per vendor",
        category: "Database",
        package: ["default", "ORM", "ownCli"],
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
    description: "for Orm = cli command and necessary files if choosen , also add how to use in guide if its a beginner or intermediate level project",
    required: false,
    options: [
      {
        id: "prisma",
        name: "Prisma",
        version: "5.x",
        description: "use for type-safe data modeling and auto migrations; create schema.prisma and prisma/migrations files if advanced project",
        category: "ORM/ODM",
        package: ["@prisma/client", "prisma"],
        love: ["type-safety", "migrations"],
        hate: []
      },
      {
        id: "typeorm",
        name: "TypeORM",
        version: "0.3.x",
        description: "prefer for decorator-based models; create ormconfig.json|.ts, data-source.ts, and entities/*.ts files for intermediate+ projects",
        category: "ORM/ODM",
        package: ["typeorm"],
        love: ["decorators", "typescript"],
        hate: ["performance"]
      },
      {
        id: "sequelize",
        name: "Sequelize",
        version: "6.x",
        description: "use when promise-based ORM needed; create models/*.js|ts and config/database.js|ts files if intermediate+",
        category: "ORM/ODM",
        package: ["sequelize"],
        love: ["transaction", "connection-pooling"],
        hate: ["type-safety"]
      },
      {
        id: "mongoose",
        name: "Mongoose",
        version: "8.x",
        must: ["mongodb", "nodejs"],
        description: "use only with MongoDB; create models/*.js|ts and config/db.js|ts files for intermediate+ projects",
        category: "ORM/ODM",
        package: ["mongoose"],
        love: ["mongodb", "schema-validation"],
        hate: ["relational"]
      },
      {
        id: "drizzle",
        name: "Drizzle ORM",
        version: "0.29",
        description: "add drizzle.config.ts, schema.ts, db.ts, and cli to use",
        category: "ORM/ODM",
        package: ["drizzle-orm"],
        love: ["performance", "typescript"],
        hate: []
      },
      {
        id: "OtherORM",
        name: "Other",
        version: "compatible",
        description: "add your db requirement ..... \nuse their own cli if available",
        category: "ORM/ODM",
        package: [],
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
        must: ["nextjs"],
        description: "use with Next.js; create pages/api/auth/[...nextauth].js|ts and nextauth config for intermediate+ projects",
        category: "Authentication",
        package: ["next-auth"],
        love: ["nextjs"],
        hate: []
      },
      {
        id: "auth0",
        name: "Auth0",
        version: "Latest",
        description: "create auth0 config file (auth0.config.js|ts) and add .env keys; document setup in README if minimal",
        category: "Authentication",
        package: ["auth0"],
        love: [],
        hate: []
      },
      {
        id: "firebase-auth",
        name: "Firebase Auth",
        version: "10.x",
        description: "initialize Firebase in src/firebase.js|ts; include auth setup and .env keys",
        category: "Authentication",
        package: ["firebase"],
        love: ["firebase"],
        hate: []
      },
      {
        id: "betterauth",
        name: "better Auth",
        version: "compatible",
        description: "add better-auth boilerplate in src/auth.ts and env config",
        category: "Authentication",
        package: ["batterauth"],
        love: ["express"],
        hate: []
      },
      {
        id: "passport",
        name: "Passport.js",
        version: "0.7",
        must: ["nodejs"],
        description: "use with Express.js; create strategies/*.js|ts and passport.config.js|ts for intermediate+ projects",
        category: "Authentication",
        package: ["passport"],
        love: ["express"],
        hate: []
      },
      {
        id: "jwt",
        name: "JWT",
        version: "9.x",
        description: "create src/auth/jwt.js|ts for token generation/verification and store secret in .env",
        category: "Authentication",
        package: ["jsonwebtoken"],
        love: [],
        hate: []
      },
      {
        id: "lucia",
        name: "Lucia",
        version: "3.x",
        description: "create lucia.config.ts and adapter file; add .env keys for providers if used",
        category: "Authentication",
        package: ["lucia-auth"],
        love: [],
        hate: []
      },
      {
        id: "clerk",
        name: "clerk",
        version: "compatible",
        description: "create clerk.config.ts and adapter file; add .env keys for providers if used",
        category: "Authentication",
        package: ["@clerk/clerk-sdk-node", "@clerk/clerk-react"],
        love: [],
        hate: []
      },
      {
        id: "otherauth",
        name: "Other",
        version: "compatible",
        description: "add your auth requirement ..... \n",
        category: "auth",
        package: [],
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
      },
      {
        id: "chakra-ui",
        name: "Chakra UI",
        version: "2.x",
        description: "accessible, composable React components",
        category: "Styling & UI",
        love: ["react"],
        hate: []
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
    title: "State Management Library",
    type: "radio",
    name: "StateManagement",
    id: "state_management_lib",
    key: "state_management_lib",
    category: "State Management",
    required: false,
    options: [
      {
        id: "redux",
        name: "Redux",
        description: "Predictable state container with strong ecosystem",
        category: "State Management",
        love: ["react", "typescript", "middleware"],
        hate: ["boilerplate", "verbose"]
      },
      {
        id: "zustand",
        name: "Zustand",
        description: "Minimal and scalable state management with hooks",
        category: "State Management",
        love: ["react-hooks", "minimal", "performance"],
        hate: []
      },
      {
        id: "recoil",
        name: "Recoil",
        description: "React state management with atoms and selectors",
        category: "State Management",
        love: ["react", "concurrent-mode", "fine-grained-control"],
        hate: ["experimental", "small-community"]
      },
      {
        id: "otherstatemanagement",
        name: "other",
        description: "Specify other state management libraries",
        category: "State Management",
        love: [],
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
        description: "create Dockerfile and docker-compose.yml(only if user asked for it or using microservices or other stuffs which requires it also consider project complexity then choose accordingly) if missing, else document usage in README",
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
            love: ["vitest"],
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
            hate: ["react", "vue", "svelte", "angular"],
            must: ["nextjs"]
          },
          {
            id: "bun-build",
            name: "Bun Build",
            version: "1.x",
            must: ['bun'],
            description: "Built-in bundler for Bun with fast performance and simple configuration",
            category: "Build Tool",
            love: ["bun"],
            hate: []
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
      ,
      {
        title: "Storage Bucket",
        type: "radio",
        name: "Storage",
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
            love: ["scalability", "integration"],
            hate: []
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
            must: ["workers"],
            love: ["no-egress-fees", "low-cost"],
            hate: []
          },
          {
            id: "cloudinary",
            name: "Cloudinary",
            description: "Image and video management platform with CDN",
            category: "Storage",
            love: ["media-optimization", "cdn"],
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
        name: "logging",
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
            hate: []
          },
          {
            id: "logrocket",
            name: "LogRocket",
            description: "Session replay and product analytics",
            category: "Observability",
            love: ["session-replay", "analytics"],
            hate: []
          },
          {
            id: "datadog",
            name: "Datadog",
            description: "Full-stack observability platform",
            category: "Observability",
            love: ["metrics", "apm"],
            hate: []
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
            hate: ["privacy"]
          },
          {
            id: "mixpanel",
            name: "Mixpanel",
            description: "Advanced product analytics",
            category: "Insights",
            love: ["user-journeys", "retention"],
            hate: []
          },
          {
            id: "amplitude",
            name: "Amplitude",
            description: "Product analytics for digital products",
            category: "Insights",
            love: ["behavioral-analytics"],
            hate: []
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
            hate: []
          },
          {
            id: "rollbar",
            name: "Rollbar",
            description: "Real-time error monitoring",
            category: "Resilience",
            love: ["debugging", "notifications"],
            hate: []
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
            love: ["react", "vue", "angular"],
            hate: []
          },
          {
            id: "polyglot",
            name: "Polyglot.js",
            description: "Lightweight i18n helper",
            category: "Localization",
            love: ["simple", "small"],
            hate: ["complex"]
          },
          {
            id: "formatjs",
            name: "FormatJS",
            description: "Modular i18n libraries",
            category: "Localization",
            love: ["icu", "standards"],
            hate: []
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
            must: ["express"],
            love: ["express", "headers"],
            hate: []
          },
          {
            id: "rate_limiting",
            name: "Rate Limiting",
            description: "Protect against brute force attacks",
            category: "Security",
            love: ["ddos-protection"],
            hate: []
          },
          {
            id: "cors",
            name: "CORS",
            description: "Cross-Origin Resource Sharing",
            category: "Security",
            love: ["security", "flexibility"],
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
            love: ["api", "subscriptions"],
            hate: []
          },
          {
            id: "paypal",
            name: "PayPal",
            description: "Online payment system",
            category: "Payments",
            love: ["ubiquity"],
            hate: ["fees"]
          },
          {
            id: "razorpay",
            name: "Razorpay",
            description: "Payment gateway for India",
            category: "Payments",
            love: ["india"],
            hate: []
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