
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Label } from "./ui/label";
import { AboutProject } from "./Generator";

interface Props {
  currentStep: number;
  prevStep: () => void;
  nextStep: () => void;
  generateGStack: () => void;
  aboutProject: AboutProject;
  setAboutProject: React.Dispatch<React.SetStateAction<AboutProject>>
}

export default function StepControls({
  currentStep,
  prevStep,
  nextStep,
  generateGStack,
  aboutProject,
  setAboutProject
}: Props) {
  return (
    <div className="flex justify-between pt-3 mt-2 border-t flex-shrink-0">
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 0}
        className="flex items-center gap-2 bg-transparent"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex ">
        {currentStep === 18 ? (
          <div className="flex">
            <div className="space-y-2">
              <Select
                value={aboutProject.level}
                onValueChange={value => setAboutProject(prev => ({ ...prev, level: value as AboutProject["level"] }))}
              >
                <SelectTrigger id="level" className="w-full">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {LEVEL_OPTIONS.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-y-2 gap-2 mr-2">
              <Label></Label>
              <Select
                value={aboutProject.model}
                onValueChange={value => setAboutProject(prev => ({ ...prev, model: value as AboutProject["model"] }))}
              >
                <SelectTrigger id="model" className="w-full">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini-2.5-pro">
                    gemini 2.5 pro (best)
                  </SelectItem>
                  <SelectItem value="gemini-2.5-flash">
                    gemini 2.5 flash
                  </SelectItem>
                  <SelectItem value="gemini-2.0-flash">
                    gemini 2.0 flash
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => {
                if (!localStorage.getItem("TGGS-useGeminiApiKey")) {
                  const key = prompt("Enter your Gemini API Key:");
                  if (!key) return;
                  localStorage.setItem("TGGS-useGeminiApiKey", key);
                }
                generateGStack();
              }}
              className="flex items-center cursor-pointer gap-2 bg-purple-600 hover:bg-purple-700"
            >
              Generate the-Great-G Stack
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={nextStep}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

const LEVEL_OPTIONS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];