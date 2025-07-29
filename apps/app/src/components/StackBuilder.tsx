/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StackOption {
  customPrompt?: string | number | readonly string[] | undefined
  id: string
  name: string
  category: string
  dependencies?: string[]
  conflicts?: string[]
  requiresBackend?: boolean
  requiresFrontend?: boolean
  stackTypes?: string[]
  description?: string
}

export interface SelectedStack {
  stackType: string
  runtime?: string
  packageManager?: string
  language?: string
  frontend?: string[]
  backend?: string[]
  database?: string[]
  orm?: string[]
  authentication?: string[]
  apiTools?: string[]
  testing?: string[]
  styling?: string[]
  stateManagement?: string[]
  buildTools?: string[]
  monitoring?: string[]
  deployment?: string[]
  customPackages?: Array<{ name: string; description: string; category: string }>
  aiPrompt?: string
  dependencies: Record<string, string[]>
  metadata: {
    createdAt: string
    isFullStack: boolean
    hasBackend: boolean
    hasFrontend: boolean
  }
}

export class ImprovedStackBuilder {
  private selectedStack: SelectedStack
  private currentStep = 0
  private steps: string[] = [
    "stackType",
    "runtime",
    "packageManager",
    "language",
    "frontend",
    "backend",
    "database",
    "orm",
    "authentication",
    "apiTools",
    "testing",
    "styling",
    "stateManagement",
    "buildTools",
    "monitoring",
    "deployment",
    "customPackages",
    "aiPrompt",
  ]

  private stackOptions: Record<string, StackOption[]> = {
    stackTypes: [
      {
        id: "full-stack",
        name: "Full Stack",
        category: "stackType",
        description: "Complete web application with frontend and backend",
      },
      { id: "backend", name: "Backend Only", category: "stackType", description: "API or server-side application" },
      {
        id: "frontend",
        name: "Frontend Only",
        category: "stackType",
        description: "Client-side application or static site",
      },
      {
        id: "backend-frontend",
        name: "Backend + Frontend",
        category: "stackType",
        description: "Separate backend and frontend applications",
      },
      {
        id: "turbo-repo",
        name: "Turbo Repo (Monorepo)",
        category: "stackType",
        description: "Monorepo with multiple applications",
      },
    ],

    runtimes: [
      { id: "bun", name: "Bun", category: "runtime", description: "Fast all-in-one JavaScript runtime" },
      { id: "deno", name: "Deno", category: "runtime", description: "Secure runtime for JavaScript and TypeScript" },
      {
        id: "node",
        name: "Node.js",
        category: "runtime",
        description: "JavaScript runtime built on Chrome's V8 engine",
      },
    ],

    packageManagers: [
      {
        id: "npm",
        name: "npm",
        category: "packageManager",
        conflicts: ["bun", "deno"],
        description: "Node.js package manager",
      },
      {
        id: "pnpm",
        name: "pnpm",
        category: "packageManager",
        conflicts: ["bun", "deno"],
        description: "Fast, disk space efficient package manager",
      },
      {
        id: "yarn",
        name: "Yarn",
        category: "packageManager",
        conflicts: ["bun", "deno"],
        description: "Fast, reliable, and secure dependency management",
      },
      {
        id: "bun-pm",
        name: "Bun Package Manager",
        category: "packageManager",
        dependencies: ["bun"],
        description: "Built-in Bun package manager",
      },
      {
        id: "deno-pm",
        name: "Deno Package Manager",
        category: "packageManager",
        dependencies: ["deno"],
        description: "Built-in Deno package manager",
      },
    ],

    languages: [
      {
        id: "typescript",
        name: "TypeScript",
        category: "language",
        description: "JavaScript with static type definitions",
      },
      { id: "javascript", name: "JavaScript", category: "language", description: "Dynamic programming language" },
    ],

    frontend: [
      {
        id: "react",
        name: "React",
        category: "frontend",
        requiresFrontend: true,
        description: "Library for building user interfaces",
      },
      {
        id: "nextjs",
        name: "Next.js",
        category: "frontend",
        requiresFrontend: true,
        description: "React framework with SSR and SSG",
      },
      {
        id: "remix",
        name: "Remix",
        category: "frontend",
        requiresFrontend: true,
        description: "Full stack web framework focused on web standards",
      },
      {
        id: "gatsby",
        name: "Gatsby",
        category: "frontend",
        requiresFrontend: true,
        description: "Static site generator for React",
      },
      {
        id: "vite-react",
        name: "Vite + React",
        category: "frontend",
        requiresFrontend: true,
        description: "Fast build tool with React",
      },
      {
        id: "create-react-app",
        name: "Create React App",
        category: "frontend",
        requiresFrontend: true,
        description: "Set up a modern React app",
      },
    ],

    backend: [
      {
        id: "express",
        name: "Express.js",
        category: "backend",
        requiresBackend: true,
        description: "Fast, unopinionated web framework",
      },
      {
        id: "fastify",
        name: "Fastify",
        category: "backend",
        requiresBackend: true,
        description: "Fast and low overhead web framework",
      },
      {
        id: "koa",
        name: "Koa.js",
        category: "backend",
        requiresBackend: true,
        description: "Expressive middleware for Node.js",
      },
      {
        id: "nestjs",
        name: "NestJS",
        category: "backend",
        requiresBackend: true,
        description: "Progressive Node.js framework",
      },
      {
        id: "hapi",
        name: "Hapi.js",
        category: "backend",
        requiresBackend: true,
        description: "Rich framework for building applications",
      },
      {
        id: "nextjs-api",
        name: "Next.js API Routes",
        category: "backend",
        dependencies: ["nextjs"],
        description: "API routes in Next.js",
      },
      {
        id: "trpc-server",
        name: "tRPC Server",
        category: "backend",
        requiresBackend: true,
        description: "End-to-end typesafe APIs",
      },
    ],

    databases: [
      // Backend databases
      {
        id: "postgresql",
        name: "PostgreSQL",
        category: "database",
        requiresBackend: true,
        description: "Advanced open source relational database",
      },
      {
        id: "mysql",
        name: "MySQL",
        category: "database",
        requiresBackend: true,
        description: "Popular open source relational database",
      },
      {
        id: "mongodb",
        name: "MongoDB",
        category: "database",
        requiresBackend: true,
        description: "Document-oriented NoSQL database",
      },
      {
        id: "redis",
        name: "Redis",
        category: "database",
        requiresBackend: true,
        description: "In-memory data structure store",
      },
      {
        id: "sqlite",
        name: "SQLite",
        category: "database",
        requiresBackend: true,
        description: "Lightweight embedded database",
      },
      // Cloud databases
      { id: "supabase", name: "Supabase", category: "database", description: "Open source Firebase alternative" },
      {
        id: "firebase",
        name: "Firebase",
        category: "database",
        description: "Google's mobile and web development platform",
      },
      {
        id: "planetscale",
        name: "PlanetScale",
        category: "database",
        description: "MySQL-compatible serverless database",
      },
      { id: "neon", name: "Neon", category: "database", description: "Serverless PostgreSQL" },
      // Frontend-specific databases
      {
        id: "indexeddb",
        name: "IndexedDB",
        category: "database",
        requiresFrontend: true,
        description: "Browser-based database",
      },
      {
        id: "localstorage",
        name: "LocalStorage",
        category: "database",
        requiresFrontend: true,
        description: "Browser local storage",
      },
    ],

    orm: [
      {
        id: "prisma",
        name: "Prisma",
        category: "orm",
        requiresBackend: true,
        description: "Next-generation ORM for Node.js and TypeScript",
      },
      {
        id: "drizzle",
        name: "Drizzle ORM",
        category: "orm",
        requiresBackend: true,
        description: "TypeScript ORM that is production ready",
      },
      {
        id: "typeorm",
        name: "TypeORM",
        category: "orm",
        requiresBackend: true,
        description: "ORM for TypeScript and JavaScript",
      },
      {
        id: "sequelize",
        name: "Sequelize",
        category: "orm",
        requiresBackend: true,
        description: "Promise-based Node.js ORM",
      },
      {
        id: "mongoose",
        name: "Mongoose",
        category: "orm",
        requiresBackend: true,
        dependencies: ["mongodb"],
        description: "MongoDB object modeling for Node.js",
      },
      {
        id: "kysely",
        name: "Kysely",
        category: "orm",
        requiresBackend: true,
        description: "Type-safe SQL query builder",
      },
    ],

    authentication: [
      // Universal auth
      { id: "clerk", name: "Clerk", category: "authentication", description: "Complete user management platform" },
      { id: "auth0", name: "Auth0", category: "authentication", description: "Identity platform for developers" },
      {
        id: "firebase-auth",
        name: "Firebase Auth",
        category: "authentication",
        dependencies: ["firebase"],
        description: "Firebase authentication service",
      },
      {
        id: "supabase-auth",
        name: "Supabase Auth",
        category: "authentication",
        dependencies: ["supabase"],
        description: "Supabase authentication service",
      },
      {
        id: "nextauth",
        name: "NextAuth.js",
        category: "authentication",
        dependencies: ["nextjs"],
        description: "Authentication for Next.js",
      },
      // Backend auth
      {
        id: "passport",
        name: "Passport.js",
        category: "authentication",
        requiresBackend: true,
        description: "Authentication middleware for Node.js",
      },
      { id: "jwt", name: "JWT", category: "authentication", requiresBackend: true, description: "JSON Web Tokens" },
      {
        id: "oauth2",
        name: "OAuth 2.0",
        category: "authentication",
        requiresBackend: true,
        description: "Authorization framework",
      },
    ],

    apiTools: [
      {
        id: "graphql",
        name: "GraphQL",
        category: "apiTools",
        requiresBackend: true,
        description: "Query language for APIs",
      },
      {
        id: "apollo-server",
        name: "Apollo Server",
        category: "apiTools",
        requiresBackend: true,
        dependencies: ["graphql"],
        description: "GraphQL server implementation",
      },
      { id: "trpc", name: "tRPC", category: "apiTools", description: "End-to-end typesafe APIs" },
      {
        id: "swagger",
        name: "Swagger/OpenAPI",
        category: "apiTools",
        requiresBackend: true,
        description: "API documentation and design tools",
      },
      { id: "postman", name: "Postman", category: "apiTools", description: "API development environment" },
      { id: "insomnia", name: "Insomnia", category: "apiTools", description: "API client and design tool" },
      {
        id: "rest",
        name: "REST API",
        category: "apiTools",
        requiresBackend: true,
        description: "RESTful web services",
      },
    ],

    testing: [
      { id: "jest", name: "Jest", category: "testing", description: "JavaScript testing framework" },
      { id: "vitest", name: "Vitest", category: "testing", description: "Fast unit test framework" },
      {
        id: "react-testing-library",
        name: "React Testing Library",
        category: "testing",
        requiresFrontend: true,
        description: "Testing utilities for React",
      },
      { id: "cypress", name: "Cypress", category: "testing", description: "End-to-end testing framework" },
      { id: "playwright", name: "Playwright", category: "testing", description: "Cross-browser automation library" },
      {
        id: "supertest",
        name: "Supertest",
        category: "testing",
        requiresBackend: true,
        description: "HTTP assertion library",
      },
      {
        id: "storybook",
        name: "Storybook",
        category: "testing",
        requiresFrontend: true,
        description: "Tool for building UI components",
      },
    ],

    styling: [
      {
        id: "tailwindcss",
        name: "Tailwind CSS",
        category: "styling",
        requiresFrontend: true,
        description: "Utility-first CSS framework",
      },
      {
        id: "styled-components",
        name: "Styled Components",
        category: "styling",
        requiresFrontend: true,
        description: "CSS-in-JS library",
      },
      { id: "emotion", name: "Emotion", category: "styling", requiresFrontend: true, description: "CSS-in-JS library" },
      {
        id: "css-modules",
        name: "CSS Modules",
        category: "styling",
        requiresFrontend: true,
        description: "Localized CSS",
      },
      {
        id: "sass",
        name: "Sass/SCSS",
        category: "styling",
        requiresFrontend: true,
        description: "CSS extension language",
      },
      {
        id: "chakra-ui",
        name: "Chakra UI",
        category: "styling",
        requiresFrontend: true,
        description: "Modular and accessible component library",
      },
      {
        id: "material-ui",
        name: "Material-UI",
        category: "styling",
        requiresFrontend: true,
        description: "React components implementing Material Design",
      },
      {
        id: "ant-design",
        name: "Ant Design",
        category: "styling",
        requiresFrontend: true,
        description: "Enterprise-class UI design language",
      },
    ],

    stateManagement: [
      {
        id: "redux",
        name: "Redux Toolkit",
        category: "stateManagement",
        requiresFrontend: true,
        description: "Predictable state container",
      },
      {
        id: "zustand",
        name: "Zustand",
        category: "stateManagement",
        requiresFrontend: true,
        description: "Small, fast state management",
      },
      {
        id: "jotai",
        name: "Jotai",
        category: "stateManagement",
        requiresFrontend: true,
        description: "Primitive and flexible state management",
      },
      {
        id: "recoil",
        name: "Recoil",
        category: "stateManagement",
        requiresFrontend: true,
        description: "Experimental state management for React",
      },
      {
        id: "context-api",
        name: "React Context API",
        category: "stateManagement",
        requiresFrontend: true,
        description: "Built-in React state management",
      },
      {
        id: "react-query",
        name: "TanStack Query",
        category: "stateManagement",
        requiresFrontend: true,
        description: "Data fetching and caching library",
      },
      {
        id: "swr",
        name: "SWR",
        category: "stateManagement",
        requiresFrontend: true,
        description: "Data fetching library",
      },
    ],

    buildTools: [
      { id: "webpack", name: "Webpack", category: "buildTools", description: "Module bundler" },
      { id: "vite", name: "Vite", category: "buildTools", description: "Fast build tool" },
      { id: "rollup", name: "Rollup", category: "buildTools", description: "Module bundler for JavaScript" },
      { id: "esbuild", name: "esbuild", category: "buildTools", description: "Extremely fast JavaScript bundler" },
      {
        id: "turbopack",
        name: "Turbopack",
        category: "buildTools",
        dependencies: ["nextjs"],
        description: "Incremental bundler optimized for JavaScript and TypeScript",
      },
      { id: "parcel", name: "Parcel", category: "buildTools", description: "Zero configuration build tool" },
    ],

    monitoring: [
      {
        id: "sentry",
        name: "Sentry",
        category: "monitoring",
        description: "Error tracking and performance monitoring",
      },
      { id: "datadog", name: "Datadog", category: "monitoring", description: "Monitoring and analytics platform" },
      { id: "newrelic", name: "New Relic", category: "monitoring", description: "Application performance monitoring" },
      { id: "logflare", name: "Logflare", category: "monitoring", description: "Centralized logging for Vercel" },
      {
        id: "winston",
        name: "Winston",
        category: "monitoring",
        requiresBackend: true,
        description: "Logging library for Node.js",
      },
      {
        id: "pino",
        name: "Pino",
        category: "monitoring",
        requiresBackend: true,
        description: "Fast JSON logger for Node.js",
      },
      {
        id: "prometheus",
        name: "Prometheus",
        category: "monitoring",
        requiresBackend: true,
        description: "Monitoring system and time series database",
      },
    ],

    deployment: [
      {
        id: "vercel",
        name: "Vercel",
        category: "deployment",
        description: "Platform for frontend frameworks and static sites",
      },
      {
        id: "netlify",
        name: "Netlify",
        category: "deployment",
        requiresFrontend: true,
        description: "Platform for modern web projects",
      },
      { id: "aws", name: "AWS", category: "deployment", description: "Amazon Web Services cloud platform" },
      { id: "docker", name: "Docker", category: "deployment", description: "Containerization platform" },
      { id: "railway", name: "Railway", category: "deployment", description: "Infrastructure platform" },
      { id: "render", name: "Render", category: "deployment", description: "Cloud platform for developers" },
      { id: "heroku", name: "Heroku", category: "deployment", description: "Cloud platform as a service" },
      {
        id: "digitalocean",
        name: "DigitalOcean",
        category: "deployment",
        description: "Cloud infrastructure provider",
      },
    ],
  }

  constructor() {
    this.selectedStack = {
      stackType: "",
      dependencies: {},
      metadata: {
        createdAt: new Date().toISOString(),
        isFullStack: false,
        hasBackend: false,
        hasFrontend: false,
      },
    }
  }

  // Get ALL options for a category (including disabled ones)
  getAllOptions(category: string): StackOption[] {
    return this.stackOptions[category] || []
  }

  // Check if an option should be disabled
  isOptionDisabled(option: StackOption): { disabled: boolean; reason?: string; severity?: "warning" | "error" } {
    // Performance conflicts
    if (option.id === "webpack" && this.hasDependency("bun")) {
      return { disabled: false, reason: "Webpack may be slower with Bun runtime", severity: "warning" }
    }

    if (option.id === "create-react-app" && this.hasDependency("bun")) {
      return { disabled: true, reason: "CRA has known compatibility issues with Bun", severity: "error" }
    }

    // Database-ORM specific conflicts
    if (option.id === "mongoose" && !this.hasDependency("mongodb")) {
      return { disabled: true, reason: "Mongoose only works with MongoDB", severity: "error" }
    }

    if (
      option.id === "prisma" &&
      this.hasDependency("mongodb") &&
      !this.hasDependency("postgresql") &&
      !this.hasDependency("mysql")
    ) {
      return {
        disabled: false,
        reason: "Prisma with MongoDB has limited features compared to SQL databases",
        severity: "warning",
      }
    }

    // Deployment platform limitations
    if (option.id === "netlify" && this.selectedStack.backend?.length) {
      return { disabled: true, reason: "Netlify is primarily for frontend/JAMstack apps", severity: "error" }
    }

    // State management conflicts
    if (option.id === "redux" && this.hasDependency("nextjs")) {
      return {
        disabled: false,
        reason: "Consider Zustand or built-in Next.js state for simpler setup",
        severity: "warning",
      }
    }

    // Build tool conflicts
    if (option.id === "turbopack" && !this.hasDependency("nextjs")) {
      return { disabled: true, reason: "Turbopack is only available in Next.js", severity: "error" }
    }

    if (option.id === "vite" && this.hasDependency("nextjs")) {
      return { disabled: true, reason: "Next.js has its own build system", severity: "error" }
    }

    // Runtime-specific package manager conflicts
    if (option.conflicts) {
      const conflictingDeps = option.conflicts.filter((conflict) => this.hasDependency(conflict))
      if (conflictingDeps.length > 0) {
        return { disabled: true, reason: `Conflicts with: ${conflictingDeps.join(", ")}`, severity: "error" }
      }
    }

    // Original logic...
    if (option.requiresBackend && !this.selectedStack.metadata.hasBackend) {
      return { disabled: true, reason: "Requires backend functionality", severity: "error" }
    }

    if (option.requiresFrontend && !this.selectedStack.metadata.hasFrontend) {
      return { disabled: true, reason: "Requires frontend functionality", severity: "error" }
    }

    if (option.dependencies) {
      const missingDeps = option.dependencies.filter((dep) => !this.hasDependency(dep))
      if (missingDeps.length > 0) {
        return { disabled: true, reason: `Requires: ${missingDeps.join(", ")}`, severity: "error" }
      }
    }

    return { disabled: false }
  }

  private hasDependency(dependency: string): boolean {
    const allSelections = [
      this.selectedStack.stackType,
      this.selectedStack.runtime,
      this.selectedStack.packageManager,
      this.selectedStack.language,
      ...(this.selectedStack.frontend || []),
      ...(this.selectedStack.backend || []),
      ...(this.selectedStack.database || []),
      ...(this.selectedStack.orm || []),
      ...(this.selectedStack.authentication || []),
      ...(this.selectedStack.apiTools || []),
      ...(this.selectedStack.testing || []),
      ...(this.selectedStack.styling || []),
      ...(this.selectedStack.stateManagement || []),
      ...(this.selectedStack.buildTools || []),
      ...(this.selectedStack.monitoring || []),
      ...(this.selectedStack.deployment || []),
      ...(this.selectedStack.customPackages?.map((pkg) => pkg.name) || []),
      this.selectedStack.aiPrompt,
    ].filter(Boolean)

    return allSelections.includes(dependency)
  }

  // Set stack type and update metadata
  setStackType(stackType: string): void {
    this.selectedStack.stackType = stackType

    // Update metadata based on stack type
    this.selectedStack.metadata.hasBackend = ["full-stack", "backend", "backend-frontend", "turbo-repo"].includes(
      stackType,
    )
    this.selectedStack.metadata.hasFrontend = ["full-stack", "frontend", "backend-frontend", "turbo-repo"].includes(
      stackType,
    )
    this.selectedStack.metadata.isFullStack = stackType === "full-stack"

    this.updateDependencies("stackType", [stackType])
  }

  // Set single selection options
  setRuntime(runtime: string): void {
    this.selectedStack.runtime = runtime
    this.updateDependencies("runtime", [runtime])
  }

  setPackageManager(packageManager: string): void {
    this.selectedStack.packageManager = packageManager
    this.updateDependencies("packageManager", [packageManager])
  }

  setLanguage(language: string): void {
    this.selectedStack.language = language
    this.updateDependencies("language", [language])
  }

  // Set multiple selection options
  setFrontend(frontend: string[]): void {
    this.selectedStack.frontend = frontend
    this.updateDependencies("frontend", frontend)
  }

  setBackend(backend: string[]): void {
    this.selectedStack.backend = backend
    this.updateDependencies("backend", backend)
  }

  setDatabase(database: string[]): void {
    this.selectedStack.database = database
    this.updateDependencies("database", database)
  }

  setOrm(orm: string[]): void {
    this.selectedStack.orm = orm
    this.updateDependencies("orm", orm)
  }

  setAuthentication(authentication: string[]): void {
    this.selectedStack.authentication = authentication
    this.updateDependencies("authentication", authentication)
  }

  setApiTools(apiTools: string[]): void {
    this.selectedStack.apiTools = apiTools
    this.updateDependencies("apiTools", apiTools)
  }

  setTesting(testing: string[]): void {
    this.selectedStack.testing = testing
    this.updateDependencies("testing", testing)
  }

  setStyling(styling: string[]): void {
    this.selectedStack.styling = styling
    this.updateDependencies("styling", styling)
  }

  setStateManagement(stateManagement: string[]): void {
    this.selectedStack.stateManagement = stateManagement
    this.updateDependencies("stateManagement", stateManagement)
  }

  setBuildTools(buildTools: string[]): void {
    this.selectedStack.buildTools = buildTools
    this.updateDependencies("buildTools", buildTools)
  }

  setMonitoring(monitoring: string[]): void {
    this.selectedStack.monitoring = monitoring
    this.updateDependencies("monitoring", monitoring)
  }

  setDeployment(deployment: string[]): void {
    this.selectedStack.deployment = deployment
    this.updateDependencies("deployment", deployment)
  }

  setCustomPackages(customPackages: Array<{ name: string; description: string; category: string }>): void {
    this.selectedStack.customPackages = customPackages
    this.updateDependencies(
      "customPackages",
      customPackages.map((pkg) => pkg.name),
    )
  }

  setAiPrompt(aiPrompt: string): void {
    this.selectedStack.aiPrompt = aiPrompt
    this.updateDependencies("aiPrompt", [aiPrompt])
  }

  private updateDependencies(category: string, selections: string[]): void {
    this.selectedStack.dependencies[category] = selections
  }

  // Get current step information
  getCurrentStep(): { step: string; stepNumber: number; totalSteps: number } {
    return {
      step: this.steps[this.currentStep],
      stepNumber: this.currentStep + 1,
      totalSteps: this.steps.length,
    }
  }

  // Get step display information
  getStepInfo(step: string): { title: string; description: string; allowMultiple: boolean } {
    const stepInfo: Record<string, { title: string; description: string; allowMultiple: boolean }> = {
      stackType: {
        title: "Stack Type",
        description: "Choose the type of application you want to build",
        allowMultiple: false,
      },
      runtime: {
        title: "Runtime Environment",
        description: "Select your JavaScript runtime",
        allowMultiple: false,
      },
      packageManager: {
        title: "Package Manager",
        description: "Choose your package manager",
        allowMultiple: false,
      },
      language: {
        title: "Programming Language",
        description: "Select your primary language",
        allowMultiple: false,
      },
      frontend: {
        title: "Frontend Framework",
        description: "Select your frontend technologies",
        allowMultiple: true,
      },
      backend: {
        title: "Backend Framework",
        description: "Choose your backend technologies",
        allowMultiple: true,
      },
      database: {
        title: "Database",
        description: "Select your data storage solutions",
        allowMultiple: true,
      },
      orm: {
        title: "ORM / Database Layer",
        description: "Choose your Object-Relational Mapping tools",
        allowMultiple: true,
      },
      authentication: {
        title: "Authentication",
        description: "Choose your authentication providers",
        allowMultiple: true,
      },
      apiTools: {
        title: "API Tools",
        description: "Select your API development and documentation tools",
        allowMultiple: true,
      },
      testing: {
        title: "Testing Frameworks",
        description: "Choose your testing tools",
        allowMultiple: true,
      },
      styling: {
        title: "Styling Solutions",
        description: "Select your CSS and styling approaches",
        allowMultiple: true,
      },
      stateManagement: {
        title: "State Management",
        description: "Choose your state management solutions",
        allowMultiple: true,
      },
      buildTools: {
        title: "Build Tools",
        description: "Select your build and bundling tools",
        allowMultiple: true,
      },
      monitoring: {
        title: "Monitoring & Logging",
        description: "Choose your monitoring and logging solutions",
        allowMultiple: true,
      },
      deployment: {
        title: "Deployment Platforms",
        description: "Choose your deployment targets",
        allowMultiple: true,
      },
      customPackages: {
        title: "Custom Packages",
        description: "Add any additional packages or tools not listed above",
        allowMultiple: true,
      },
      aiPrompt: {
        title: "AI Setup Prompt",
        description: "Provide instructions for AI to generate your project setup",
        allowMultiple: false,
      },
    }

    return stepInfo[step] || { title: step, description: "", allowMultiple: false }
  }

  // Navigation methods
  nextStep(): boolean {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++
      return true
    }
    return false
  }

  previousStep(): boolean {
    if (this.currentStep > 0) {
      this.currentStep--
      return true
    }
    return false
  }

  goToStep(stepIndex: number): boolean {
    if (stepIndex >= 0 && stepIndex < this.steps.length) {
      this.currentStep = stepIndex
      return true
    }
    return false
  }

  // Check if current step should be skipped
  shouldSkipCurrentStep(): boolean {
    const currentStep = this.steps[this.currentStep]

    switch (currentStep) {
      case "frontend":
        return !this.selectedStack.metadata.hasFrontend
      case "backend":
      case "orm":
        return !this.selectedStack.metadata.hasBackend
      case "styling":
      case "stateManagement":
        return !this.selectedStack.metadata.hasFrontend
      default:
        return false
    }
  }

  // Validate current selections
  validateCurrentStep(): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    const currentStep = this.steps[this.currentStep]

    switch (currentStep) {
      case "stackType":
        if (!this.selectedStack.stackType) {
          errors.push("Stack type is required")
        }
        break
      case "runtime":
        if (!this.selectedStack.runtime) {
          errors.push("Runtime is required")
        }
        break
      case "packageManager":
        if (!this.selectedStack.packageManager) {
          errors.push("Package manager is required")
        }
        break
      case "language":
        if (!this.selectedStack.language) {
          errors.push("Language is required")
        }
        break
      case "frontend":
        if (
          this.selectedStack.metadata.hasFrontend &&
          (!this.selectedStack.frontend || this.selectedStack.frontend.length === 0)
        ) {
          errors.push("At least one frontend framework is required")
        }
        break
      case "backend":
        if (
          this.selectedStack.metadata.hasBackend &&
          (!this.selectedStack.backend || this.selectedStack.backend.length === 0)
        ) {
          errors.push("At least one backend framework is required")
        }
        break
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // Generate final stack configuration
  generateStack(): string {
    this.selectedStack.metadata.createdAt = new Date().toISOString()
    return JSON.stringify(this.selectedStack, null, 2)
  }

  // Get current stack state
  getCurrentStack(): SelectedStack {
    return { ...this.selectedStack }
  }

  // Reset builder
  reset(): void {
    this.selectedStack = {
      stackType: "",
      dependencies: {},
      metadata: {
        createdAt: new Date().toISOString(),
        isFullStack: false,
        hasBackend: false,
        hasFrontend: false,
      },
    }
    this.currentStep = 0
  }

  // Get summary of current selections
  getSummary(): Record<string, any> {
    const summary: Record<string, any> = {}

    if (this.selectedStack.stackType) summary.stackType = this.selectedStack.stackType
    if (this.selectedStack.runtime) summary.runtime = this.selectedStack.runtime
    if (this.selectedStack.packageManager) summary.packageManager = this.selectedStack.packageManager
    if (this.selectedStack.language) summary.language = this.selectedStack.language
    if (this.selectedStack.frontend?.length) summary.frontend = this.selectedStack.frontend
    if (this.selectedStack.backend?.length) summary.backend = this.selectedStack.backend
    if (this.selectedStack.database?.length) summary.database = this.selectedStack.database
    if (this.selectedStack.orm?.length) summary.orm = this.selectedStack.orm
    if (this.selectedStack.authentication?.length) summary.authentication = this.selectedStack.authentication
    if (this.selectedStack.apiTools?.length) summary.apiTools = this.selectedStack.apiTools
    if (this.selectedStack.testing?.length) summary.testing = this.selectedStack.testing
    if (this.selectedStack.styling?.length) summary.styling = this.selectedStack.styling
    if (this.selectedStack.stateManagement?.length) summary.stateManagement = this.selectedStack.stateManagement
    if (this.selectedStack.buildTools?.length) summary.buildTools = this.selectedStack.buildTools
    if (this.selectedStack.monitoring?.length) summary.monitoring = this.selectedStack.monitoring
    if (this.selectedStack.deployment?.length) summary.deployment = this.selectedStack.deployment
    if (this.selectedStack.customPackages?.length)
      summary.customPackages = this.selectedStack.customPackages.map((pkg) => pkg.name)
    if (this.selectedStack.aiPrompt) summary.aiPrompt = this.selectedStack.aiPrompt

    return summary
  }
}
