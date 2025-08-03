import React from "react";
import { SelectedStackItem, Step, StepOption } from "./Generator";
import { Settings2 } from "lucide-react";

interface Props {
    additionalServices: SelectedStackItem[];
    setAdditionalServices: (services: SelectedStackItem[]) => void;
    stack: Step;
    openEditor: (item: SelectedStackItem) => void;
}

export default function AdditionalServices({
    additionalServices,
    setAdditionalServices,
    stack,
    openEditor,
}: Props) {
    const toggleOption = (option: StepOption) => {
        if (stack.type === "checkbox") {
            const exists = additionalServices.some((item) => item.id === option.id);
            if (exists) {
                setAdditionalServices(additionalServices.filter((item) => item.id !== option.id));
            } else {
                const newItem: SelectedStackItem = {
                    id: option.id,
                    name: option.name ?? "",
                    version: option.version ?? "",
                    description: option.description ?? "",
                    category: option.category ?? "",
                    selected: true,
                };
                if (newItem.name.startsWith("Other")) {
                    openEditor(newItem)
                }
                setAdditionalServices([...additionalServices, newItem]);
            }
        } else {
            const newItem: SelectedStackItem = {
                id: option.id,
                name: option.name ?? "",
                version: option.version ?? "",
                description: option.description ?? "",
                category: option.category ?? "",
                selected: true,
            };
            setAdditionalServices([newItem]);
        }
    };

    return (
        <div>
            {stack.options.map((category) => (
                <div key={category.id || category.name} className="mb-4">
                    <h3 className="font-semibold mb-2">{category.name ?? ""}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {category.options?.map(option => {
                            const isSelected = additionalServices.some(item => item.id === option.id);

                            let displayItem: SelectedStackItem = {
                                id: option.id,
                                name: option.name ?? "",
                                version: option.version ?? "",
                                description: option.description ?? "",
                                category: option.category ?? "",
                                selected: isSelected,
                            };

                            if (isSelected) {
                                const found = additionalServices.find((item) => item.id === option.id);
                                if (found) displayItem = { ...found };
                            }

                            return (
                                <div
                                    key={option.id}
                                    className={`relative p-2 border rounded-lg transition-all cursor-pointer ${isSelected
                                        ? "bg-indigo-50 border-indigo-500"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    onClick={() => toggleOption(option)}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type={stack.type === "radio" ? "radio" : "checkbox"}
                                            checked={isSelected}
                                            onChange={() => { }}
                                            className="mt-1 accent-indigo-500"
                                            onClick={(e) => e.stopPropagation()}
                                            name={stack.type === "radio" ? stack.key : undefined}
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-gray-900">{option.name ?? ""}</h3>
                                                {displayItem.version && (
                                                    <div className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                                                        {displayItem.version}
                                                    </div>
                                                )}
                                            </div>
                                            {displayItem.description && (
                                                <p className="text-gray-600 text-sm line-clamp-1">{displayItem.description}</p>
                                            )}
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
                </div>
            ))}
        </div>
    )
}
