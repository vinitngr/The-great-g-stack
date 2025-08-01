
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles } from "lucide-react";

interface Props {
  currentStep: number;
  prevStep: () => void;
  nextStep: () => void;
}

export default function StepControls({
  currentStep,
  prevStep,
  nextStep
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

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>

        {currentStep === 17 ? (
          <Button
            className="flex items-center cursor-pointer gap-2 bg-purple-600 hover:bg-purple-700"
          >
            Generate the-Great-G Stack
            <Sparkles className="h-4 w-4" />
          </Button>
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
