import { ImprovedStackBuilder } from "@/components/StackBuilder"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getPromptByVersion = (version: string , builder: ImprovedStackBuilder): string => {
    const stackSummary = builder.getSummary()
    const stackType = stackSummary.stackType || "application"
    const frontend = stackSummary.frontend?.join(", ") || "React"
    const backend = stackSummary.backend?.join(", ") || "Node.js"
    const database = stackSummary.database?.join(", ") || "PostgreSQL"

    const prompts = {
      basic: `
      Create a ${stackType} using ${frontend}${backend ? ` with ${backend}` : ""}${database ? ` and ${database}` : ""}. Set up the basic project structure with essential configurations.
      `,

      detailed: `
      Create a comprehensive ${stackType} application with the following specifications:
      Frontend: ${frontend}
      ${backend ? `Backend: ${backend}` : ""}
      ${database ? `Database: ${database}` : ""}
      ${stackSummary.authentication?.length ? `Authentication: ${stackSummary.authentication.join(", ")}` : ""}
      ${stackSummary.styling?.length ? `Styling: ${stackSummary.styling.join(", ")}` : ""}

      Please include:
      - Complete project structure
      - Configuration files
      - Basic routing setup
      - Environment variables setup
      - README with setup instructions`,

      production: `
      Create a production-ready ${stackType} application with enterprise-grade setup:
      Tech Stack:
      - Frontend: ${frontend}
      ${backend ? `- Backend: ${backend}` : ""}
      ${database ? `- Database: ${database}` : ""}
      ${stackSummary.testing?.length ? `- Testing: ${stackSummary.testing.join(", ")}` : ""}
      ${stackSummary.deployment?.length ? `- Deployment: ${stackSummary.deployment.join(", ")}` : ""}

      Requirements:
      - Complete project structure with proper folder organization
      - TypeScript configuration with strict mode
      - ESLint and Prettier setup
      - Comprehensive error handling
      - Security best practices
      - Performance optimizations
      - Docker configuration
      - CI/CD pipeline setup
      - Monitoring and logging
      - Comprehensive documentation`,

      enterprise: `
      Create an enterprise-grade ${stackType} application with the following comprehensive setup:
      Architecture: ${stackType}
      Frontend Stack: ${frontend}
      ${backend ? `Backend Stack: ${backend}` : ""}
      ${database ? `Database: ${database}` : ""}
      ${stackSummary.orm?.length ? `ORM: ${stackSummary.orm.join(", ")}` : ""}
      ${stackSummary.authentication?.length ? `Authentication: ${stackSummary.authentication.join(", ")}` : ""}
      ${stackSummary.testing?.length ? `Testing Framework: ${stackSummary.testing.join(", ")}` : ""}
      ${stackSummary.monitoring?.length ? `Monitoring: ${stackSummary.monitoring.join(", ")}` : ""}

      Enterprise Requirements:
      - Microservices architecture (if applicable)
      - Complete project structure with domain-driven design
      - Advanced TypeScript configuration with custom types
      - Comprehensive testing strategy (unit, integration, e2e)
      - Advanced security implementation (OWASP compliance)
      - Performance monitoring and optimization
      - Scalable database design with migrations
      - Advanced error handling and logging
      - Multi-environment configuration
      - Docker containerization with multi-stage builds
      - Kubernetes deployment manifests
      - Advanced CI/CD with automated testing and deployment
      - API documentation with OpenAPI/Swagger
      - Code quality gates and automated reviews
      - Comprehensive monitoring and alerting
      - Backup and disaster recovery procedures
      - Complete documentation including architecture diagrams`,

      custom: "",
    } as const

    type PromptKey = keyof typeof prompts;
    return prompts[version as PromptKey] || prompts.basic
  }