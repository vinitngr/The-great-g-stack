export interface StackOption {
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