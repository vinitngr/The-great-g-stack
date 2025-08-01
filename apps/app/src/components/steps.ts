
  const steps = [
    {
      title: "Language",
      type: "radio",
      key: "language",
      category: "Core Language",
      required: true,
      options: [
        { id: "javascript", name: "JavaScript", version: "ES2023", description: "Dynamic, versatile language for web development with excellent ecosystem support", category: "Core Language" },
        { id: "typescript", name: "TypeScript", version: "5.3", description: "JavaScript with static type definitions for better development experience and error prevention", category: "Core Language" },
      ]
    },
    {
      title: "Runtime",
      type: "radio",
      key: "runtime",
      category: "Runtime",
      required: true,
      options: [
        { id: "nodejs", name: "Node.js", version: "20.x", description: "JavaScript runtime built on Chrome's V8 engine with extensive package ecosystem", category: "Runtime" },
        { id: "deno", name: "Deno", version: "1.40", description: "Modern runtime for JavaScript and TypeScript with built-in security and TypeScript support", category: "Runtime" },
        { id: "bun", name: "Bun", version: "1.0", description: "Fast all-in-one JavaScript runtime with built-in bundler, test runner, and package manager", category: "Runtime" },
        { id: "browser", name: "Browser", version: "Modern", description: "Client-side execution environment supporting modern web standards and APIs", category: "Runtime" }
      ]
    },
    {
      title: "Stack Type",
      type: "radio",
      key: "stackType",
      category: "Architecture",
      required: true,
      options: [
        { id: "frontend", name: "Frontend Only", version: "", description: "Client-side application with API consumption, focusing on user interface and experience", category: "Architecture" },
        { id: "backend", name: "Backend Only", version: "", description: "Server-side API and business logic handling data processing and external integrations", category: "Architecture" },
        { id: "fullstack", name: "Full Stack", version: "", description: "Complete application with both frontend and backend components in a unified codebase", category: "Architecture" },
        { id: "monorepo(turbo Repo)", name: "monorepo", version: "", description: "Mobile application development targeting iOS, Android, or cross-platform solutions", category: "Architecture" },
        { id: "backend + frontend", name: "fb", version: "", description: "Mobile application development targeting iOS, Android, or cross-platform solutions", category: "Architecture" },
      ]
    },
    {
      title: "Frontend Framework",
      type: "checkbox",
      key: "frontendFramework",
      category: "Frontend Framework",
      required: false,
      options: [
        { id: "react", name: "React", version: "18.x", description: "Component-based UI library by Facebook with virtual DOM and extensive ecosystem", category: "Frontend Framework" },
        { id: "vue", name: "Vue.js", version: "3.x", description: "Progressive JavaScript framework with intuitive API and excellent developer experience", category: "Frontend Framework" },
        { id: "angular", name: "Angular", version: "17.x", description: "Full-featured TypeScript framework by Google with dependency injection and CLI tools", category: "Frontend Framework" },
        { id: "svelte", name: "Svelte", version: "4.x", description: "Compile-time optimized framework that generates vanilla JavaScript with no runtime overhead", category: "Frontend Framework" },
        { id: "nextjs", name: "Next.js", version: "14.x", description: "React framework with server-side rendering, routing, and full-stack capabilities", category: "Frontend Framework" }
      ]
    },
    {
      title: "Backend Framework",
      type: "checkbox",
      key: "backendFramework",
      category: "Backend Framework",
      required: false,
      options: [
        { id: "express", name: "Express.js", version: "4.x", description: "Minimal and flexible Node.js web framework with robust middleware ecosystem", category: "Backend Framework" },
        { id: "fastify", name: "Fastify", version: "4.x", description: "Fast and low overhead web framework with built-in JSON schema validation", category: "Backend Framework" },
        { id: "nestjs", name: "NestJS", version: "10.x", description: "Progressive Node.js framework with TypeScript, decorators, and dependency injection", category: "Backend Framework" },
        { id: "fastapi", name: "FastAPI", version: "0.104", description: "Modern, fast Python API framework with automatic API documentation and type hints", category: "Backend Framework" }
      ]
    },
    {
      title: "Package Manager",
      type: "radio",
      key: "packageManager",
      category: "Package Manager",
      required: false,
      options: [
        { id: "npm", name: "npm", version: "10.x", description: "Default Node.js package manager with extensive registry and CLI tools", category: "Package Manager" },
        { id: "yarn", name: "Yarn", version: "4.x", description: "Fast, reliable package manager with workspaces and zero-installs support", category: "Package Manager" },
        { id: "pnpm", name: "pnpm", version: "8.x", description: "Efficient, disk space saving package manager with content-addressable storage", category: "Package Manager" },
        { id: "bun-pm", name: "Bun", version: "1.x", description: "Ultra-fast package manager and bundler with native performance", category: "Package Manager" },
        { id: "deno-pm", name: "Deno", version: "1.x", description: "Ultra-fast package manager and bundler with native performance", category: "Package Manager" }
      ]
    },
    {
      title: "Database",
      type: "checkbox",
      key: "database",
      category: "Database",
      required: false,
      options: [
        { id: "postgresql", name: "PostgreSQL", version: "16.x", description: "Advanced open-source relational database with JSON support and extensive extensions", category: "Database" },
        { id: "mysql", name: "MySQL", version: "8.x", description: "Popular open-source relational database with high performance and reliability", category: "Database" },
        { id: "mongodb", name: "MongoDB", version: "7.x", description: "Document-oriented NoSQL database with flexible schema and horizontal scaling", category: "Database" },
        { id: "redis", name: "Redis", version: "7.x", description: "In-memory data structure store used for caching, sessions, and real-time applications", category: "Database" },
        { id: "sqlite", name: "SQLite", version: "3.x", description: "Lightweight, file-based SQL database perfect for development and small applications", category: "Database" }
      ]
    },
    {
      title: "ORM/ODM",
      type: "radio",
      key: "orm",
      category: "ORM/ODM",
      required: false,
      options: [
        { id: "prisma", name: "Prisma", version: "5.x", description: "Next-generation ORM with type safety, migrations, and intuitive data modeling", category: "ORM/ODM" },
        { id: "typeorm", name: "TypeORM", version: "0.3", description: "ORM for TypeScript and JavaScript with decorators and Active Record pattern", category: "ORM/ODM" },
        { id: "sequelize", name: "Sequelize", version: "6.x", description: "Promise-based Node.js ORM with transaction support and connection pooling", category: "ORM/ODM" },
        { id: "mongoose", name: "Mongoose", version: "8.x", description: "MongoDB object modeling for Node.js with schema validation and middleware", category: "ORM/ODM" },
        { id: "drizzle", name: "Drizzle ORM", version: "0.29", description: "Lightweight TypeScript ORM with SQL-like syntax and excellent performance", category: "ORM/ODM" }
      ]
    },
    {
      title: "Authentication",
      type: "checkbox",
      key: "authentication",
      category: "Authentication",
      required: false,
      options: [
        { id: "nextauth", name: "NextAuth.js", version: "4.x", description: "Complete authentication solution with multiple providers and session management", category: "Authentication" },
        { id: "auth0", name: "Auth0", version: "Latest", description: "Identity platform for developers with social logins and enterprise features", category: "Authentication" },
        { id: "firebase-auth", name: "Firebase Auth", version: "10.x", description: "Google's authentication service with real-time database integration", category: "Authentication" },
        { id: "passport", name: "Passport.js", version: "0.7", description: "Simple authentication middleware with 500+ authentication strategies", category: "Authentication" },
        { id: "jwt", name: "JWT", version: "9.x", description: "JSON Web Token implementation for stateless authentication", category: "Authentication" }
      ]
    },
    {
      title: "Styling & UI",
      type: "checkbox",
      key: "styling",
      category: "Styling & UI",
      required: false,
      options: [
        { id: "tailwindcss", name: "Tailwind CSS", version: "3.x", description: "Utility-first CSS framework with customizable design system and JIT compilation", category: "Styling & UI" },
        { id: "styled-components", name: "Styled Components", version: "6.x", description: "CSS-in-JS library for React with dynamic styling and theming support", category: "Styling & UI" },
        { id: "mui", name: "Material-UI", version: "5.x", description: "React components implementing Google's Material Design with extensive customization", category: "Styling & UI" },
        { id: "ShadCn", name: "Shadcn", version: "2.x", description: "Modular and accessible component library with dark mode support", category: "Styling & UI" },
        { id: "sass", name: "Sass", version: "1.x", description: "CSS extension language with variables, nesting, and mixins for maintainable styles", category: "Styling & UI" }
      ]
    },
    {
      title: "Testing Framework",
      type: "checkbox",
      key: "testing",
      category: "Testing",
      required: false,
      options: [
        { id: "jest", name: "Jest", version: "29.x", description: "JavaScript testing framework by Facebook with snapshot testing and mocking", category: "Testing" },
        { id: "vitest", name: "Vitest", version: "1.x", description: "Fast unit testing framework powered by Vite with native ES modules support", category: "Testing" },
        { id: "cypress", name: "Cypress", version: "13.x", description: "End-to-end testing framework with real browser testing and time-travel debugging", category: "Testing" },
        { id: "playwright", name: "Playwright", version: "1.x", description: "Cross-browser automation library with parallel testing and auto-wait features", category: "Testing" },
        { id: "testing-library", name: "Testing Library", version: "14.x", description: "Simple and complete testing utilities focused on user behavior testing", category: "Testing" }
      ]
    },
    {
      title: "Build Tool",
      type: "radio",
      key: "buildTool",
      category: "Build Tool",
      required: false,
      options: [
        { id: "vite", name: "Vite", version: "5.x", description: "Fast build tool with hot module replacement and optimized production builds", category: "Build Tool" },
        { id: "webpack", name: "Webpack", version: "5.x", description: "Static module bundler with extensive plugin ecosystem and code splitting", category: "Build Tool" },
        { id: "rollup", name: "Rollup", version: "4.x", description: "Module bundler for JavaScript with tree-shaking and ES module output", category: "Build Tool" },
        { id: "esbuild", name: "esbuild", version: "0.19", description: "Extremely fast JavaScript bundler and minifier written in Go", category: "Build Tool" },
        { id: "turbopack", name: "Turbopack", version: "Beta", description: "Incremental bundler by Vercel optimized for development speed", category: "Build Tool" }
      ]
    },
    {
      title: "Deployment Platform",
      type: "checkbox",
      key: "deployment",
      category: "Deployment",
      required: false,
      options: [
        { id: "vercel", name: "Vercel", version: "Latest", description: "Platform for frontend frameworks with edge functions and automatic deployments", category: "Deployment" },
        { id: "netlify", name: "Netlify", version: "Latest", description: "All-in-one platform for web projects with continuous deployment and serverless functions", category: "Deployment" },
        { id: "aws", name: "AWS", version: "Latest", description: "Amazon Web Services cloud platform with comprehensive infrastructure services", category: "Deployment" },
        { id: "docker", name: "Docker", version: "24.x", description: "Containerization platform for consistent deployment across environments", category: "Deployment" },
        { id: "railway", name: "Railway", version: "Latest", description: "Modern deployment platform with database hosting and automatic scaling", category: "Deployment" }
      ]
    },
    {
      title: "Monitoring & Analytics",
      type: "checkbox",
      key: "monitoring",
      category: "Monitoring",
      required: false,
      options: [
        { id: "sentry", name: "Sentry", version: "7.x", description: "Application monitoring and error tracking with performance insights and alerting", category: "Monitoring" },
        { id: "datadog", name: "Datadog", version: "Latest", description: "Monitoring and analytics platform with APM, logs, and infrastructure monitoring", category: "Monitoring" },
        { id: "google-analytics", name: "Google Analytics", version: "GA4", description: "Web analytics service by Google with event tracking and audience insights", category: "Monitoring" },
        { id: "mixpanel", name: "Mixpanel", version: "Latest", description: "Product analytics platform with funnel analysis and user segmentation", category: "Monitoring" },
        { id: "posthog", name: "PostHog", version: "3.x", description: "Open-source product analytics with feature flags and session recordings", category: "Monitoring" }
      ]
    },
    {
      title: "Additional Libraries",
      type: "checkbox",
      key: "additionalLibraries",
      category: "Utilities",
      required: false,
      options: [
        { id: "lodash", name: "Lodash", version: "4.x", description: "Modern JavaScript utility library with functional programming helpers and performance optimizations", category: "Utilities" },
        { id: "axios", name: "Axios", version: "1.x", description: "Promise-based HTTP client with request/response interceptors and automatic JSON parsing", category: "Utilities" },
        { id: "date-fns", name: "date-fns", version: "3.x", description: "Modern JavaScript date utility library with immutable functions and tree-shaking support", category: "Utilities" },
        { id: "zod", name: "Zod", version: "3.x", description: "TypeScript-first schema validation with static type inference and runtime checking", category: "Utilities" },
        { id: "react-query", name: "TanStack Query", version: "5.x", description: "Data fetching and caching library with background updates and optimistic updates", category: "Utilities" }
      ]
    },
    {
      title: "Configuration & Environment",
      type: "checkbox",
      key: "configuration",
      category: "Development Tools",
      required: false,
      options: [
        { id: "dotenv", name: "dotenv", version: "16.x", description: "Loads environment variables from .env file with support for multiple environments", category: "Development Tools" },
        { id: "eslint", name: "ESLint", version: "8.x", description: "JavaScript linting utility with customizable rules and automatic code fixing", category: "Development Tools" },
        { id: "prettier", name: "Prettier", version: "3.x", description: "Opinionated code formatter with support for multiple languages and editor integration", category: "Development Tools" },
        { id: "husky", name: "Husky", version: "8.x", description: "Git hooks manager for running scripts on commit, push, and other Git events", category: "Development Tools" },
        { id: "commitizen", name: "Commitizen", version: "4.x", description: "Tool for writing conventional commit messages with interactive prompts", category: "Development Tools" }
      ]
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


  export default steps