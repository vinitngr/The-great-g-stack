import React from "react";
import { Settings2 } from "lucide-react";

interface SelectedStackItem {
  id: string;
  name: string;
  version: string;
  description: string;
  category: string;
  selected: boolean;
}

interface StepData {
  key: string;
  type: "radio" | "checkbox";
  options: SelectedStackItem[];
}

interface Props {
  currentStepData: StepData;
  selectedStack: Record<string, SelectedStackItem | SelectedStackItem[]>;
  handleOptionChange: (key: string, optionId: string, isCheckbox: boolean) => void;
  openEditor: (item: SelectedStackItem) => void;
}

const OptionGrid: React.FC<Props> = ({ currentStepData, selectedStack, handleOptionChange, openEditor }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      {currentStepData.options.map((option) => {
        const isSelected = currentStepData.type === "checkbox"
          ? ((selectedStack[currentStepData.key] as SelectedStackItem[] || []).some(item => item.id === option.id))
          : ((selectedStack[currentStepData.key] as SelectedStackItem)?.id === option.id);

        let displayItem = { ...option, selected: false };
        if (isSelected) {
          if (currentStepData.type === "checkbox") {
            const found = (selectedStack[currentStepData.key] as SelectedStackItem[] || []).find(item => item.id === option.id);
            if (found) displayItem = found;
          } else {
            const found = selectedStack[currentStepData.key] as SelectedStackItem;
            if (found) displayItem = found;
          }
          displayItem.selected = true;
        }

        return (
          <div
            key={option.id}
            className={`relative p-4 border rounded-lg transition-all cursor-pointer ${
              isSelected ? "bg-indigo-50 border-indigo-500" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => {
              handleOptionChange(currentStepData.key, option.id, currentStepData.type === "checkbox");
              // if (!isSelected) openEditor({ ...option, selected: true });
            }}
          >
            <div className="flex items-start gap-3">
              <input
                type={currentStepData.type === "checkbox" ? "checkbox" : "radio"}
                checked={isSelected}
                onChange={() => {}}
                className="mt-1 accent-indigo-500"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{option.name}</h3>
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">{displayItem.version}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-1">{displayItem.description}</p>
              </div>
              {isSelected && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditor(displayItem);
                  }}
                  className="ml-2 text-indigo-600 hover:text-indigo-900"
                  aria-label="Edit"
                  title="Edit"
                >
                  <Settings2 />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OptionGrid;
