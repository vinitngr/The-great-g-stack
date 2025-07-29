"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Code, Layers, Zap, Edit3, Save, X } from 'lucide-react';
import steps from './steps';
// interface StackOption {
//   id: string;
//   name: string;
//   version: string;
//   description: string;
//   category: string;
//   required?: boolean;
// }

interface SelectedStackItem {
  id: string;
  name: string;
  version: string;
  description: string;
  category: string;
  selected: boolean;
}

interface SelectedStack {
  language?: SelectedStackItem;
  runtime?: SelectedStackItem;
  stackType?: SelectedStackItem;
  frontendFramework?: SelectedStackItem[];
  backendFramework?: SelectedStackItem[];
  packageManager?: SelectedStackItem;
  database?: SelectedStackItem[];
  orm?: SelectedStackItem;
  authentication?: SelectedStackItem[];
  styling?: SelectedStackItem[];
  testing?: SelectedStackItem[];
  buildTool?: SelectedStackItem;
  deployment?: SelectedStackItem[];
  monitoring?: SelectedStackItem[];
  additionalLibraries?: SelectedStackItem[];
  configuration?: SelectedStackItem[];
  aiPrompt?: string;
}

const StackGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStack, setSelectedStack] = useState<SelectedStack>({});
  const [showResults, setShowResults] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [tempEdit, setTempEdit] = useState<{ version: string; description: string }>({ version: '', description: '' });


  const handleOptionChange = (stepKey: string, optionId: string, isMultiSelect: boolean) => {
    const currentStepData = steps.find(step => step.key === stepKey);
    if (!currentStepData) return;

    const option = currentStepData.options.find(opt => opt.id === optionId);
    if (!option) return;

    const stackItem: SelectedStackItem = {
      id: option.id,
      name: option.name,
      version: option.version,
      description: option.description,
      category: option.category,
      selected: true
    };

    setSelectedStack(prev => {
      if (isMultiSelect) {
        const currentSelections = prev[stepKey as keyof SelectedStack] as SelectedStackItem[] || [];
        const existingIndex = currentSelections.findIndex(item => item.id === optionId);
        
        let newSelections;
        if (existingIndex >= 0) {
          newSelections = currentSelections.filter(item => item.id !== optionId);
        } else {
          newSelections = [...currentSelections, stackItem];
        }
        return { ...prev, [stepKey]: newSelections };
      } else {
        return { ...prev, [stepKey]: stackItem };
      }
    });
  };

  const canProceed = () => {
    const currentStepData = steps[currentStep - 1];
    if (!currentStepData.required) return true;
    
    const selection = selectedStack[currentStepData.key as keyof SelectedStack];
    return selection && (Array.isArray(selection) ? selection.length > 0 : selection);
  };

  const nextStep = () => {
    if (currentStep < 17 && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getAllSelectedItems = (): SelectedStackItem[] => {
    const allItems: SelectedStackItem[] = [];
    
    Object.entries(selectedStack).forEach(([key, value]) => {
      if (key === 'aiPrompt') return;
      
      if (Array.isArray(value)) {
        allItems.push(...value);
      } else if (value && typeof value === 'object') {
        allItems.push(value);
      }
    });
    
    return allItems.sort((a, b) => a.category.localeCompare(b.category));
  };

  const updateStackItem = (itemId: string, field: 'version' | 'description', newValue: string) => {
    setSelectedStack(prev => {
      const newStack = { ...prev };
      
      Object.keys(newStack).forEach(key => {
        if (key === 'aiPrompt') return;
        
        const value = newStack[key as keyof SelectedStack];
        if (Array.isArray(value)) {
          const itemIndex = value.findIndex(item => item.id === itemId);
          if (itemIndex >= 0) {
            const updatedItems = [...value];
            updatedItems[itemIndex] = { ...updatedItems[itemIndex], [field]: newValue };
            (newStack as any)[key] = updatedItems;
          }
        } else if (value && typeof value === 'object' && value.id === itemId) {
          (newStack as any)[key] = { ...value, [field]: newValue };
        }
      });
      
      return newStack;
    });
  };

  const startEdit = (itemId: string, currentVersion: string, currentDescription: string) => {
    setEditingItem(itemId);
    setTempEdit({ version: currentVersion, description: currentDescription });
  };

  const saveEdit = (itemId: string) => {
    updateStackItem(itemId, 'version', tempEdit.version);
    updateStackItem(itemId, 'description', tempEdit.description);
    setEditingItem(null);
    setTempEdit({ version: '', description: '' });
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setTempEdit({ version: '', description: '' });
  };

  const handleSendToBackend = () => {
    const dataToSend = {
      selectedStack,
      aiPrompt: selectedStack.aiPrompt,
      allSelectedItems: getAllSelectedItems(),
      timestamp: new Date().toISOString()
    };
    
    // Here you would send dataToSend to your backend
    console.log('Sending to backend:', dataToSend);
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-green-100 rounded-xl">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Stack Configuration Complete</h1>
                <p className="text-gray-600">Your technology stack has been processed and sent to backend</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Prompt</h2>
                <div className="bg-gray-50 rounded-lg p-4 border max-h-64 overflow-y-auto">
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedStack.aiPrompt || "No prompt provided"}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Complete Stack JSON</h2>
                <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-64">
                  <pre className="text-green-400 text-xs">
                    {JSON.stringify({
                      selectedStack,
                      allSelectedItems: getAllSelectedItems()
                    }, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowResults(false)}
              className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Generator
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep - 1];

  if (currentStep === 17) {
    const allSelectedItems = getAllSelectedItems();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-indigo-600 rounded-xl">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Stack Generator</h1>
            </div>
            <p className="text-xl text-gray-600">Review and customize your technology stack</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-indigo-600">17 of 17</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full w-full"></div>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Zap className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Final Configuration</h2>
              </div>
            </div>

            {/* AI Prompt Section */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Prompt for Code Generation:
              </label>
              <textarea
                value={selectedStack.aiPrompt || ''}
                onChange={(e) => setSelectedStack(prev => ({ ...prev, aiPrompt: e.target.value }))}
                placeholder="e.g., Create a user authentication system with login and registration forms using the selected stack..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Selected Stack Table */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Technologies ({allSelectedItems.length} items)</h3>
              
              {allSelectedItems.length > 0 ? (
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selected</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allSelectedItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingItem === item.id ? (
                              <input
                                type="text"
                                value={tempEdit.version}
                                onChange={(e) => setTempEdit(prev => ({ ...prev, version: e.target.value }))}
                                className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
                              />
                            ) : (
                              <span className="text-sm text-gray-900">{item.version}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {editingItem === item.id ? (
                              <textarea
                                value={tempEdit.description}
                                onChange={(e) => setTempEdit(prev => ({ ...prev, description: e.target.value }))}
                                className="text-sm border border-gray-300 rounded px-2 py-1 w-full resize-none"
                                rows={2}
                              />
                            ) : (
                              <div className="text-sm text-gray-600 max-w-md">{item.description}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {editingItem === item.id ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => saveEdit(item.id)}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => startEdit(item.id, item.version, item.description)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No technologies selected. Go back to previous steps to make selections.</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={handleSendToBackend}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Zap className="w-4 h-4" />
                Send to Backend
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-indigo-600 rounded-xl">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Stack Generator</h1>
          </div>
          <p className="text-xl text-gray-600">Build your perfect technology stack in 17 steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-indigo-600">{currentStep} of 17</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 17) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Code className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {currentStepData.title}
                {currentStepData.required && <span className="text-red-500 ml-1">*</span>}
              </h2>
            </div>
          </div>

          {/* Step Content */}
          <div className="space-y-4 mb-8">
            {currentStepData.options.map((option) => {
              const isSelected = currentStepData.type === 'checkbox' 
                ? (selectedStack[currentStepData.key as keyof SelectedStack] as SelectedStackItem[] || []).some(item => item.id === option.id)
                : (selectedStack[currentStepData.key as keyof SelectedStack] as SelectedStackItem)?.id === option.id;

              return (
                <div
                  key={option.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleOptionChange(currentStepData.key, option.id, currentStepData.type === 'checkbox')}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type={currentStepData.type === 'checkbox' ? 'checkbox' : 'radio'}
                      checked={isSelected}
                      onChange={() => {}}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{option.name}</h3>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                          {option.version}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{option.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Required field notice */}
          {currentStepData.required && !canProceed() && (
            <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-400 rounded">
              <p className="text-red-700 text-sm">This field is required to continue.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StackGenerator;