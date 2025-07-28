/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RotateCcw, Download, Plus, X, AlertCircle, Sparkles, Settings, Save } from "lucide-react"
import { ImprovedStackBuilder, type StackOption } from "./StackBuilder"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"

interface CustomPackage {
  name: string
  description: string
  category: string
}

export default function UltimateStackBuilderUI() {
  const [apiKey, setApiKey] = useState("")
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [savedApiKey, setSavedApiKey] = useState("")
  const [builder] = useState(() => new ImprovedStackBuilder())
  const [currentStep, setCurrentStep] = useState(0)
  const [allOptions, setAllOptions] = useState<StackOption[]>([])
  const [stepInfo, setStepInfo] = useState({ title: "", description: "", allowMultiple: false })
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [customPackages, setCustomPackages] = useState<CustomPackage[]>([])
  const [newPackage, setNewPackage] = useState({ name: "", description: "", category: "utility" })
  const [aiPrompt, setAiPrompt] = useState("")
  const [generatedStack, setGeneratedStack] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [selectedPromptVersion, setSelectedPromptVersion] = useState("basic")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("auth")
  const [githubUser, setGithubUser] = useState<any>(null)
  const [userStacks, setUserStacks] = useState<any[]>([])
  const [userToken, setUserToken] = useState("")


  // Generate prompt based on version
  const getPromptByVersion = (version: string): string => {
    const stackSummary = builder.getSummary()
    const stackType = stackSummary.stackType || "application"
    const frontend = stackSummary.frontend?.join(", ") || "React"
    const backend = stackSummary.backend?.join(", ") || "Node.js"
    const database = stackSummary.database?.join(", ") || "PostgreSQL"

    const prompts = {
      basic: `Create a ${stackType} using ${frontend}${backend ? ` with ${backend}` : ""}${database ? ` and ${database}` : ""}. Set up the basic project structure with essential configurations.`,

      detailed: `Create a comprehensive ${stackType} application with the following specifications:

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

      production: `Create a production-ready ${stackType} application with enterprise-grade setup:

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

      enterprise: `Create an enterprise-grade ${stackType} application with the following comprehensive setup:

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
    }

    return prompts[version as keyof typeof prompts] || prompts.basic
  }

  // Update UI when step changes
  const updateStep = () => {
    const { step, stepNumber } = builder.getCurrentStep()
    setCurrentStep(stepNumber - 1)

    // Skip steps that don't apply
    if (builder.shouldSkipCurrentStep()) {
      handleNext()
      return
    }

    // Handle custom steps
    if (step === "customPackages") {
      setStepInfo({
        title: "Custom Packages",
        description: "Add any additional packages or tools not listed above",
        allowMultiple: true,
      })
      return
    }

    if (step === "aiPrompt") {
      setStepInfo({
        title: "AI Setup Prompt",
        description: "Provide instructions for AI to generate your project setup and configuration",
        allowMultiple: false,
      })
      return
    }

    const options = builder.getAllOptions(getOptionsCategory(step))
    const info = builder.getStepInfo(step)

    setAllOptions(options)
    setStepInfo(info)
    setValidationErrors([])

    // Get current selections for this step
    const currentStack = builder.getCurrentStack()
    const currentSelections = getCurrentSelections(step, currentStack)
    setSelectedValues(currentSelections)
  }

  // Map step names to option categories
  const getOptionsCategory = (step: string): string => {
    const mapping: Record<string, string> = {
      stackType: "stackTypes",
      runtime: "runtimes",
      packageManager: "packageManagers",
      language: "languages",
      frontend: "frontend",
      backend: "backend",
      database: "databases",
      orm: "orm",
      authentication: "authentication",
      apiTools: "apiTools",
      testing: "testing",
      styling: "styling",
      stateManagement: "stateManagement",
      buildTools: "buildTools",
      monitoring: "monitoring",
      deployment: "deployment",
    }
    return mapping[step] || step
  }

  // Get current selections for a step
  const getCurrentSelections = (step: string, stack: any): string[] => {
    switch (step) {
      case "stackType":
        return stack.stackType ? [stack.stackType] : []
      case "runtime":
        return stack.runtime ? [stack.runtime] : []
      case "packageManager":
        return stack.packageManager ? [stack.packageManager] : []
      case "language":
        return stack.language ? [stack.language] : []
      default:
        return stack[step] || []
    }
  }

  // Handle selection changes
  const handleSelectionChange = (optionId: string, checked: boolean) => {
    if (stepInfo.allowMultiple) {
      setSelectedValues((prev) => (checked ? [...prev, optionId] : prev.filter((id) => id !== optionId)))
    } else {
      setSelectedValues([optionId])
    }
  }

  // Add custom package
  const addCustomPackage = () => {
    if (newPackage.name.trim()) {
      setCustomPackages([...customPackages, { ...newPackage }])
      setNewPackage({ name: "", description: "", category: "utility" })
    }
  }

  // Remove custom package
  const removeCustomPackage = (index: number) => {
    setCustomPackages(customPackages.filter((_, i) => i !== index))
  }

  // Apply selections to builder
  const applySelections = () => {
    const { step } = builder.getCurrentStep()

    if (step === "customPackages") {
      builder.setCustomPackages(customPackages)
      return
    }

    if (step === "aiPrompt") {
      builder.setAiPrompt(aiPrompt)
      return
    }

    const selection = stepInfo.allowMultiple ? selectedValues : selectedValues[0]

    switch (step) {
      case "stackType":
        builder.setStackType(selection as string)
        break
      case "runtime":
        builder.setRuntime(selection as string)
        break
      case "packageManager":
        builder.setPackageManager(selection as string)
        break
      case "language":
        builder.setLanguage(selection as string)
        break
      case "frontend":
        builder.setFrontend(selection as string[])
        break
      case "backend":
        builder.setBackend(selection as string[])
        break
      case "database":
        builder.setDatabase(selection as string[])
        break
      case "orm":
        builder.setOrm(selection as string[])
        break
      case "authentication":
        builder.setAuthentication(selection as string[])
        break
      case "apiTools":
        builder.setApiTools(selection as string[])
        break
      case "testing":
        builder.setTesting(selection as string[])
        break
      case "styling":
        builder.setStyling(selection as string[])
        break
      case "stateManagement":
        builder.setStateManagement(selection as string[])
        break
      case "buildTools":
        builder.setBuildTools(selection as string[])
        break
      case "monitoring":
        builder.setMonitoring(selection as string[])
        break
      case "deployment":
        builder.setDeployment(selection as string[])
        break
    }
  }

  // Navigation handlers
  const handleNext = () => {
    applySelections()

    const { step } = builder.getCurrentStep()

    // Validate AI prompt step
    if (step === "aiPrompt" && !aiPrompt.trim()) {
      setValidationErrors(["Please provide an AI prompt for project setup"])
      return
    }

    const validation = builder.validateCurrentStep()
    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      return
    }

    const hasNext = builder.nextStep()
    if (hasNext) {
      updateStep()
    } else {
      // We've reached the end
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    const hasPrevious = builder.previousStep()
    if (hasPrevious) {
      updateStep()
    }
  }

  const handleReset = () => {
    builder.reset()
    setCustomPackages([])
    setAiPrompt("")
    setShowResult(false)
    updateStep()
  }

  const handleGenerateStack = () => {
    applySelections()
    const stack = builder.generateStack()
    setGeneratedStack(stack)
    setShowResult(true)
  }

  const handleDownload = () => {
    const blob = new Blob([generatedStack], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "stack-config.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSendToAI = async () => {
    if (!savedApiKey) {
      alert("Please add your Gemini API key first!")
      // setApiKeyExpanded(true)
      return
    }

    const stackData = JSON.parse(generatedStack)
    const prompt = `${stackData.aiPrompt}\n\nStack Configuration:\n${JSON.stringify(stackData, null, 2)}`

    // Here you would integrate with your AI service using the savedApiKey
    console.log("Sending to AI with API key:", savedApiKey.substring(0, 10) + "...")
    console.log("Prompt:", prompt)

    // For demo purposes, copy to clipboard
    navigator.clipboard.writeText(prompt)
    alert("AI prompt copied to clipboard! You can now paste it into your preferred AI assistant.")
  }

  // Initialize on mount
  useEffect(() => {
    updateStep()
    // Initialize AI prompt when component mounts
    if (step === "aiPrompt" && !aiPrompt) {
      setAiPrompt(getPromptByVersion(selectedPromptVersion))
    }
  }, [])

  const progress = ((currentStep + 1) / 18) * 100
  const summary = builder.getSummary()
  const { step } = builder.getCurrentStep()

  if (showResult) {
    const stackData = JSON.parse(generatedStack)

    return (
      <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
        {/* Fixed GitHub Widget */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => setDrawerOpen(true)}
            className="w-12 h-12 p-0 bg-gray-900 hover:bg-gray-800 text-white rounded-lg shadow-lg"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Button>
        </div>

        {/* GitHub Drawer */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0  bg-opacity-50" onClick={() => setDrawerOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="font-semibold">GitHub Integration</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setDrawerOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("auth")}
                    className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === "auth"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Authentication
                  </button>
                  <button
                    onClick={() => setActiveTab("stacks")}
                    className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === "stacks"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    My Stacks
                  </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  {activeTab === "auth" && (
                    <div className="space-y-4">
                      {!githubUser ? (
                        <div className="text-center space-y-4">
                          <div className="text-gray-600 text-sm">
                            Connect your GitHub account to save and manage your stacks
                          </div>
                          <Button
                            onClick={() => {
                              // Mock GitHub login
                              setGithubUser({
                                login: "johndoe",
                                email: "john@example.com",
                                avatar_url: "https://github.com/identicons/johndoe.png",
                              })
                              setUserToken("ghp_xxxxxxxxxxxxxxxxxxxx")
                            }}
                            className="w-full bg-gray-900 hover:bg-gray-800"
                          >
                            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Login with GitHub
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* User Info */}
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            {/* <img
                                src={githubUser.avatar_url || "/placeholder.svg"}
                                alt={githubUser.login}
                                className="w-10 h-10 rounded-full"
                              /> */}
                            <div className="flex-1">
                              <div className="font-medium">{githubUser.login}</div>
                              <div className="text-sm text-gray-600">{githubUser.email}</div>
                            </div>
                          </div>

                          {/* API Key Section */}
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Gemini API Key</Label>
                            {!savedApiKey ? (
                              <>
                                {showApiKeyInput ? (
                                  <div className="space-y-2">
                                    <Input
                                      type="password"
                                      placeholder="Enter your Gemini API key"
                                      value={apiKey}
                                      onChange={(e) => setApiKey(e.target.value)}
                                      className="text-sm"
                                    />
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={() => {
                                          if (apiKey.trim()) {
                                            setSavedApiKey(apiKey)
                                            setApiKey("")
                                            setShowApiKeyInput(false)
                                          }
                                        }}
                                        className="flex-1"
                                      >
                                        Save
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setShowApiKeyInput(false)
                                          setApiKey("")
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <Button size="sm" onClick={() => setShowApiKeyInput(true)} className="w-full">
                                      <Plus className="h-4 w-4 mr-2" />
                                      Add API Key
                                    </Button>
                                    <a
                                      href="https://getgeminikey.vinitngr.xyz"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-blue-600 hover:text-blue-800 underline block text-center"
                                    >
                                      How to get API key?
                                    </a>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 bg-green-50 border border-green-200 rounded px-3 py-2">
                                    <span className="text-sm text-green-700">API Key saved ✓</span>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSavedApiKey("")
                                      setApiKey("")
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* User Token */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Your Access Token</Label>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-100 border border-gray-200 rounded px-3 py-2">
                                <span className="text-sm font-mono">{"•".repeat(20)}</span>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  navigator.clipboard.writeText(userToken)
                                  alert("Token copied to clipboard!")
                                }}
                              >
                                Copy
                              </Button>
                            </div>
                          </div>

                          {/* Logout */}
                          <Button
                            variant="outline"
                            onClick={() => {
                              setGithubUser(null)
                              setUserToken("")
                              setSavedApiKey("")
                            }}
                            className="w-full"
                          >
                            Logout
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "stacks" && (
                    <div className="space-y-4">
                      {!githubUser ? (
                        <div className="text-center text-gray-500 text-sm">Please login to view your stacks</div>
                      ) : userStacks.length === 0 ? (
                        <div className="text-center text-gray-500 text-sm">
                          No stacks saved yet. Generate and save your first stack!
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {userStacks.map((stack, index) => (
                            <Card key={index} className="p-3">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-sm">{stack.name}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {stack.type}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-600">{stack.description}</p>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      navigator.clipboard.writeText(`npx tggs ${stack.url}`)
                                      alert("Command copied to clipboard!")
                                    }}
                                    className="text-xs"
                                  >
                                    Copy Command
                                  </Button>
                                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">npx tggs {stack.url}</code>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex-shrink-0 text-center py-4 px-6 bg-white border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">🎉 The-Great-G Stack Generated!</h1>
          <p className="text-sm text-gray-600 mt-1">Your custom development stack configuration is ready</p>
        </div>

        {/* Action Buttons */}
        <div className="flex-shrink-0 px-6 py-3 bg-white border-b border-gray-200">
          <div className="flex gap-3 justify-center">
            <Button onClick={handleDownload} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600">
              <Download className="h-4 w-4" />
              Download Scrip.sh & package.json
            </Button>
            <Button onClick={handleDownload} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4" />
              Download JSON
            </Button>
            <Button onClick={handleSendToAI} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4" />
              Save to Server
            </Button>
            <Button variant="outline" onClick={handleReset} className="flex items-center gap-2 bg-transparent">
              <RotateCcw className="h-4 w-4" />
              Start Over
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* AI Prompt Preview */}
            {stackData.aiPrompt && (
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    AI Setup Prompt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-sm text-gray-800 leading-relaxed">{stackData.aiPrompt}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stack Summary */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Stack Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(summary).map(([key, value]) => {
                    if (key === "aiPrompt") return null
                    return (
                      <div key={key} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <Label className="text-sm font-semibold text-gray-700 capitalize block mb-2">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </Label>
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(value) ? (
                            value.map((item) => (
                              <Badge key={item} variant="secondary" className="text-xs bg-white border border-gray-300">
                                {item}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="secondary" className="text-xs bg-white border border-gray-300">
                              {value}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Custom Packages */}
            {stackData.customPackages && stackData.customPackages.length > 0 && (
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Custom Packages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stackData.customPackages.map((pkg: any, index: number) => (
                      <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Badge variant="outline" className="text-xs mb-2 bg-white">
                              {pkg.category}
                            </Badge>
                            <h4 className="font-semibold text-gray-900 mb-1">{pkg.name}</h4>
                            <p className="text-sm text-gray-600">{pkg.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Full Configuration */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Full Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
                  <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono leading-relaxed">
                    {generatedStack}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
        {/* Fixed GitHub Widget */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => setDrawerOpen(true)}
            className="w-12 h-12 p-0 bg-gray-900 hover:bg-gray-800 text-white rounded-lg shadow-lg"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Button>
        </div>

        {/* GitHub Drawer */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-opacity-50" onClick={() => setDrawerOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span className="font-semibold">GitHub Integration</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setDrawerOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("auth")}
                    className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === "auth"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    Authentication
                  </button>
                  <button
                    onClick={() => setActiveTab("stacks")}
                    className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === "stacks"
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    My Stacks
                  </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  {activeTab === "auth" && (
                    <div className="space-y-4">
                      {!githubUser ? (
                        <div className="text-center space-y-4">
                          <div className="text-gray-600 text-sm">
                            Connect your GitHub account to save and manage your stacks
                          </div>
                          <Button
                            onClick={() => {
                              // Mock GitHub login
                              setGithubUser({
                                login: "johndoe",
                                email: "john@example.com",
                                avatar_url: "https://github.com/identicons/johndoe.png",
                              })
                              setUserToken("ghp_xxxxxxxxxxxxxxxxxxxx")
                            }}
                            className="w-full bg-gray-900 hover:bg-gray-800"
                          >
                            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Login with GitHub
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* User Info */}
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            {/* <img
                              src={githubUser.avatar_url || "/placeholder.svg"}
                              alt={githubUser.login}
                              className="w-10 h-10 rounded-full"
                            /> */}
                            <div className="flex-1">
                              <div className="font-medium">{githubUser.login}</div>
                              <div className="text-sm text-gray-600">{githubUser.email}</div>
                            </div>
                          </div>

                          {/* API Key Section */}
                          <div className="space-y-3">
                            <Label className="text-sm font-medium">Gemini API Key</Label>
                            {!savedApiKey ? (
                              <>
                                {showApiKeyInput ? (
                                  <div className="space-y-2">
                                    <Input
                                      type="password"
                                      placeholder="Enter your Gemini API key"
                                      value={apiKey}
                                      onChange={(e) => setApiKey(e.target.value)}
                                      className="text-sm"
                                    />
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={() => {
                                          if (apiKey.trim()) {
                                            setSavedApiKey(apiKey)
                                            setApiKey("")
                                            setShowApiKeyInput(false)
                                          }
                                        }}
                                        className="flex-1"
                                      >
                                        Save
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setShowApiKeyInput(false)
                                          setApiKey("")
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <Button size="sm" onClick={() => setShowApiKeyInput(true)} className="w-full">
                                      <Plus className="h-4 w-4 mr-2" />
                                      Add API Key
                                    </Button>
                                    <a
                                      href="https://getgeminikey.vinitngr.xyz"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-blue-600 hover:text-blue-800 underline block text-center"
                                    >
                                      How to get API key?
                                    </a>
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 bg-green-50 border border-green-200 rounded px-3 py-2">
                                    <span className="text-sm text-green-700">API Key saved ✓</span>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSavedApiKey("")
                                      setApiKey("")
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* User Token */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Your Access Token</Label>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-100 border border-gray-200 rounded px-3 py-2">
                                <span className="text-sm font-mono">{"•".repeat(20)}</span>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  navigator.clipboard.writeText(userToken)
                                  alert("Token copied to clipboard!")
                                }}
                              >
                                Copy
                              </Button>
                            </div>
                          </div>

                          {/* Logout */}
                          <Button
                            variant="outline"
                            onClick={() => {
                              setGithubUser(null)
                              setUserToken("")
                              setSavedApiKey("")
                            }}
                            className="w-full"
                          >
                            Logout
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "stacks" && (
                    <div className="space-y-4">
                      {!githubUser ? (
                        <div className="text-center text-gray-500 text-sm">Please login to view your stacks</div>
                      ) : userStacks.length === 0 ? (
                        <div className="text-center text-gray-500 text-sm">
                          No stacks saved yet. Generate and save your first stack!
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {userStacks.map((stack, index) => (
                            <Card key={index} className="p-3">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-sm">{stack.name}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {stack.type}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-600">{stack.description}</p>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      navigator.clipboard.writeText(`npx tggs ${stack.url}`)
                                      alert("Command copied to clipboard!")
                                    }}
                                    className="text-xs"
                                  >
                                    Copy Command
                                  </Button>
                                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">npx tggs {stack.url}</code>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-3 overflow-hidden">
          <div className="max-w-4xl mx-auto h-full flex flex-col space-y-3">
            {/* Header */}
            <div className="text-center flex-shrink-0">
              <h1 className="text-2xl font-bold">🚀 The Great-G-Stack </h1>
              <p className="text-sm text-gray-600">
                Build your perfect development stack with AI-powered setup generation
              </p>
            </div>

            {/* Progress */}
            <Card className="flex-shrink-0 py-4">
              <CardContent>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Step {currentStep + 1} of 18</span>
                    <span>{Math.round(progress)}% Complete</span>
                  </div>
                  <Progress value={progress} className="w-full h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Current Selections Summary */}
            {currentStep !== 17 && Object.keys(summary).length > 0 && (
              <div className="flex-shrink bg-white py-4 border-2 rounded-lg p-4">
                <div className="py-2 font-bold">
                  <div className="text-sm">Current Selections</div>
                </div>
                <div className="py-2">
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(summary).map(([key, value]) => {
                      if (key === "aiPrompt") return null
                      return (
                        <div key={key} className="flex flex-wrap gap-1">
                          {Array.isArray(value) ? (
                            value.map((item) => (
                              <Badge key={item} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              {value}
                            </Badge>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Main Step Card */}
            <Card className="flex-1 flex flex-col overflow-hidden">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center gap-1 text-lg">
                  {step === "aiPrompt" && <Sparkles className="h-4 w-4 text-purple-500" />}
                  {stepInfo.title}
                </CardTitle>
                <CardDescription className="text-sm">{stepInfo.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {/* Validation Errors */}
                  {validationErrors.length > 0 && (
                    <Alert variant="destructive" className="flex-shrink-0">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <ul className="list-disc list-inside">
                          {validationErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Custom Packages Step */}
                  {step === "customPackages" && (
                    <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-shrink-0">
                        <Input
                          placeholder="Package name (e.g., lodash)"
                          value={newPackage.name}
                          onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                        />
                        <Input
                          placeholder="Description"
                          value={newPackage.description}
                          onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                        />
                        <div className="flex gap-2">
                          <select
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                            value={newPackage.category}
                            onChange={(e) => setNewPackage({ ...newPackage, category: e.target.value })}
                          >
                            <option value="utility">Utility</option>
                            <option value="ui">UI Component</option>
                            <option value="animation">Animation</option>
                            <option value="validation">Validation</option>
                            <option value="http">HTTP Client</option>
                            <option value="date">Date/Time</option>
                            <option value="other">Other</option>
                          </select>
                          <Button onClick={addCustomPackage} size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {customPackages.length > 0 && (
                        <div className="flex-1 overflow-hidden">
                          <h4 className="font-medium mb-2">Added Packages:</h4>
                          <div className="overflow-y-auto h-full space-y-2">
                            {customPackages.map((pkg, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3"
                              >
                                <div>
                                  <Badge variant="outline" className="text-xs mb-1">
                                    {pkg.category}
                                  </Badge>
                                  <div className="font-medium">{pkg.name}</div>
                                  <div className="text-sm text-gray-600">{pkg.description}</div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => removeCustomPackage(index)}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* AI Prompt Step */}
                  {step === "aiPrompt" && (
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <div className="flex-1 overflow-y-auto pr-2">
                        <div className="space-y-6">
                          {/* AI Prompt Input with Version Selection */}
                          <Card className="shadow-sm">
                            <CardHeader className="pb-0">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-purple-500" />
                                AI Setup Instructions
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {/* Version Selection Dropdown */}
                              <div>
                                <Label className="text-sm font-medium mb-2 block">Select Prompt Version</Label>
                                <select
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500"
                                  value={selectedPromptVersion}
                                  onChange={(e) => {
                                    setSelectedPromptVersion(e.target.value)
                                    setAiPrompt(getPromptByVersion(e.target.value))
                                  }}
                                >
                                  <option value="basic">Basic Setup</option>
                                  <option value="detailed">Detailed Configuration</option>
                                  <option value="production">Production Ready</option>
                                  <option value="enterprise">Enterprise Grade</option>
                                  <option value="custom">Custom Prompt</option>
                                </select>
                              </div>

                              {/* AI Prompt Textarea */}
                              <div>
                                <Label className="text-sm font-medium mb-2 block">Customize Your Prompt</Label>
                                <Textarea
                                  placeholder="Your AI prompt will appear here based on the selected version..."
                                  value={aiPrompt}
                                  onChange={(e) => {
                                    setAiPrompt(e.target.value)
                                    if (selectedPromptVersion !== "custom") {
                                      setSelectedPromptVersion("custom")
                                    }
                                  }}
                                  className="resize-none h-40 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                />
                              </div>
                              <Alert className="flex-shrink-0 mt-4 border-purple-200 bg-purple-50">
                                <Info className="h-4 w-4 text-purple-600" />
                                <AlertDescription className="text-purple-800">
                                  This prompt will be sent to AI along with your complete stack configuration to generate your
                                  project setup, file structure, and initial code.
                                </AlertDescription>
                              </Alert>
                            </CardContent>

                          </Card>

                          <Card className="shadow-sm">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Settings className="h-4 w-4 text-purple-500" />
                                customize Details
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">

                              <table className="w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                  <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-3 py-2 text-left w-48 text-sm font-medium">Type</th>
                                    <th className="border border-gray-300 px-3 py-2 text-left w-36 text-sm font-medium">Version</th>
                                    <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Object.entries(summary).map(([key, value]) => {
                                    if (["stackType", "runtime", "packageManager", "language"].includes(key)) return null;
                                    return (
                                      <tr key={key} className="border border-gray-300">
                                        <td className="border border-gray-300 px-3 py-2 text-sm">{value}</td>
                                        <td className="border border-gray-300 px-3 py-2">
                                          <Input
                                            className="w-full"
                                            readOnly
                                            value={Array.isArray(value) ? 'LTS' : 'LTS'}
                                            placeholder="latest"
                                          />
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2">
                                          <Textarea
                                            className="w-full"
                                            value="Enter your description here..."
                                            placeholder="Enter your text here..."
                                          />
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>

                            </CardContent>
                          </Card>
                        </div>
                      </div>


                    </div>
                  )}

                  {/* Regular Options */}
                  {step !== "customPackages" && step !== "aiPrompt" && (
                    <div className="flex-1 overflow-hidden">
                      {stepInfo.allowMultiple ? (
                        // Multiple selection with checkboxes
                        <div className="h-full overflow-y-auto">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-2">
                            {allOptions.map((option) => {
                              const disabledInfo = builder.isOptionDisabled(option)
                              return (
                                <div key={option.id} className="flex items-start space-x-2">
                                  <Checkbox
                                    id={option.id}
                                    checked={selectedValues.includes(option.id)}
                                    disabled={disabledInfo.disabled}
                                    onCheckedChange={(checked) => handleSelectionChange(option.id, checked as boolean)}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <Label
                                      htmlFor={option.id}
                                      className={`text-sm font-medium leading-none cursor-pointer ${disabledInfo.disabled ? "text-gray-400 cursor-not-allowed" : ""
                                        }`}
                                    >
                                      <div className="flex items-center gap-1">{option.name}</div>
                                    </Label>
                                    {disabledInfo.reason && (
                                      <p className="text-xs mt-1 text-gray-400">{disabledInfo.reason}</p>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ) : (
                        // Single selection with radio buttons
                        <RadioGroup
                          value={selectedValues[0] || ""}
                          onValueChange={(value) => setSelectedValues([value])}
                          className="h-full overflow-y-auto"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {allOptions.map((option) => {
                              const disabledInfo = builder.isOptionDisabled(option)
                              return (
                                <div key={option.id} className="flex items-start space-x-2">
                                  <RadioGroupItem value={option.id} id={option.id} disabled={disabledInfo.disabled} />
                                  <div className="flex-1 min-w-0">
                                    <Label
                                      htmlFor={option.id}
                                      className={`text-sm font-medium leading-none cursor-pointer ${disabledInfo.disabled ? "text-gray-400 cursor-not-allowed" : ""
                                        }`}
                                    >
                                      <div className="flex items-center gap-1">{option.name}</div>
                                    </Label>
                                    {disabledInfo.reason && (
                                      <p className="text-xs mt-1 text-gray-400">{disabledInfo.reason}</p>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </RadioGroup>
                      )}
                    </div>
                  )}
                </div>

                {/* Fixed Navigation at Bottom */}
                <div className="flex justify-between pt-3 mt-2 border-t flex-shrink-0">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleReset} className="flex items-center gap-2 bg-transparent">
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </Button>

                    {currentStep === 17 ? (
                      <Button
                        onClick={handleGenerateStack}
                        className="flex items-center cursor-pointer gap-2 bg-purple-600 hover:bg-purple-700"
                      >
                        Generate the-Great-G Stack
                        <Sparkles className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={handleNext} className="flex items-center gap-2">
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
