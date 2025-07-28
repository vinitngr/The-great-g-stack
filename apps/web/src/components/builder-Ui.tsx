"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronLeft, ChevronRight, RotateCcw, Download, Info } from "lucide-react"
import { ImprovedStackBuilder, type StackOption } from "./stackBuilder"

export default function ImprovedStackBuilderUI() {
  const [builder] = useState(() => new ImprovedStackBuilder())
  const [currentStep, setCurrentStep] = useState(0)
  const [allOptions, setAllOptions] = useState<StackOption[]>([])
  const [stepInfo, setStepInfo] = useState({ title: "", description: "", allowMultiple: false })
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [generatedStack, setGeneratedStack] = useState<string>("")
  const [showResult, setShowResult] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  // Update UI when step changes
  const updateStep = () => {
    const { step, stepNumber } = builder.getCurrentStep()
    setCurrentStep(stepNumber - 1)

    // Skip steps that don't apply
    if (builder.shouldSkipCurrentStep()) {
      handleNext()
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // Apply selections to builder
  const applySelections = () => {
    const { step } = builder.getCurrentStep()
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

  // Initialize on mount
  useEffect(() => {
    updateStep()
  }, [])

  const progress = ((currentStep + 1) / 16) * 100
  const summary = builder.getSummary()

  if (showResult) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🎉 Stack Generated Successfully!</CardTitle>
            <CardDescription>Your custom development stack configuration is ready</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={handleDownload} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download JSON
              </Button>
              <Button variant="outline" onClick={handleReset} className="flex items-center gap-2 bg-transparent">
                <RotateCcw className="h-4 w-4" />
                Start Over
              </Button>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Stack Summary:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(summary).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <Label className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</Label>
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(value) ? (
                        value.map((item) => (
                          <Badge key={item} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          {value}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Full Configuration:</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">{generatedStack}</pre>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Advanced Stack Builder</h1>
          <p className="text-gray-600">Build your perfect development stack with smart dependency management</p>
        </div>

        {/* Progress */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Step {currentStep + 1} of 16</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Current Selections Summary */}
        {Object.keys(summary).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Selections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Object.entries(summary).map(([key, value]) => (
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
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Step Card */}
        <Card>
          <CardHeader>
            <CardTitle>{stepInfo.title}</CardTitle>
            <CardDescription>{stepInfo.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <h4 className="font-medium text-red-800 mb-1">Please fix the following:</h4>
                <ul className="text-sm text-red-700 list-disc list-inside">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              {stepInfo.allowMultiple ? (
                // Multiple selection with checkboxes
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                            className={`text-sm font-medium leading-none cursor-pointer ${
                              disabledInfo.disabled ? "text-gray-400 cursor-not-allowed" : ""
                            }`}
                          >
                            <div className="flex items-center gap-1">
                              {option.name}
                              {option.description && (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-3 w-3 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">{option.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </Label>
                          {disabledInfo.disabled && <p className="text-xs text-gray-400 mt-1">{disabledInfo.reason}</p>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                // Single selection with radio buttons
                <RadioGroup value={selectedValues[0] || ""} onValueChange={(value) => setSelectedValues([value])}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {allOptions.map((option) => {
                      const disabledInfo = builder.isOptionDisabled(option)
                      return (
                        <div key={option.id} className="flex items-start space-x-2">
                          <RadioGroupItem value={option.id} id={option.id} disabled={disabledInfo.disabled} />
                          <div className="flex-1 min-w-0">
                            <Label
                              htmlFor={option.id}
                              className={`text-sm font-medium leading-none cursor-pointer ${
                                disabledInfo.disabled ? "text-gray-400 cursor-not-allowed" : ""
                              }`}
                            >
                              <div className="flex items-center gap-1">
                                {option.name}
                                {option.description && (
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="h-3 w-3 text-gray-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="max-w-xs">{option.description}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                            </Label>
                            {disabledInfo.disabled && (
                              <p className="text-xs text-gray-400 mt-1">{disabledInfo.reason}</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </RadioGroup>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
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

                {currentStep === 15 ? (
                  <Button onClick={handleGenerateStack} className="flex items-center gap-2">
                    Generate Stack
                    <Download className="h-4 w-4" />
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
    </TooltipProvider>
  )
}
