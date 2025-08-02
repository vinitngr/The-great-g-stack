/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import { Edit3, Save, X, Sparkles, Settings2, Layers } from 'lucide-react';
import steps from '../data/steps';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { TooltipProvider } from './ui/tooltip';
import EditStackModal from './EditStackModel';
import StepControls from './Navigator';
import Header from './Others/Headerr';
import StepMeter from './Others/StepMeter';
import SelectedStackPrew from './SelectedStackPrew';
import AiPromptEditor, { generateAbovePrompt, generateBelowPrompt } from './AiPromptEditor';
import AboutProjectForm from './FirstStep';
import CustomPackage from './CustomPackage';
import { aiResponse } from '@/lib/aiGenerate';
import { ResultPage } from './TggsResult';
import { Button } from './ui/button';
import Drawer from './Drawer';
import { parse } from 'jsonc-parser';
import AdditionalServices from './AdditionalService';
import { cn } from '@/lib/utils';

type AiResult = Record<string, string>;


export interface SelectedStackItem {
  id: string;
  name: string;
  version: string;
  description: string;
  category: string;
  selected: boolean;
}

export interface SelectedStack {
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
  customPackages?: SelectedStackItem[];
  additionalServices?: SelectedStackItem[];
}

export type ProjectType = 'personal' | 'portfolio' | 'ecommerce' | 'healthcare' | 'education' | 'finance' | 'social' | 'entertainment' | 'productivity' | 'startup-saas' | 'enterprise' | 'logistics' | 'travel' | 'real-estate' | 'gaming' | 'blog' | 'news' | 'crypto' | 'ai' | 'iot' | 'open-source' | 'internal-tool' | 'other';

export interface AboutProject {
  projectName: string;
  description?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  projectType?: ProjectType;
  moduleFormat?: 'esm' | 'cjs';
  includeStructure?: boolean;
  includeReadme?: boolean;
}
export interface StepOption {
  id: string;
  name: string;
  version?: string;
  description: string;
  category?: string;
  love?: string[];
  hate?: string[];
  package?: string[];
  options?: StepOption[];
}

export interface Step {
  title: string;
  type: string;
  key: string;
  category: string;
  required?: boolean;
  options: StepOption[];
}
const StackGenerator = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingOption, setEditingOption] = useState<SelectedStackItem | null>(null);
  const [tempDesc, setTempDesc] = useState('');
  const [tempVersion, setTempVersion] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStack, setSelectedStack] = useState<SelectedStack>({});
  const [showResults, setShowResults] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [tempEdit, setTempEdit] = useState<{ version: string; description: string }>({ version: '', description: '' });
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [airesponseLoading, setairesponseLoading] = useState(false)
  const [aboutProject, setAboutProject] = useState<AboutProject>({
    projectName: "",
    description: "",
    level: "intermediate",
    projectType: "personal",
    moduleFormat: "esm",
    includeStructure: true,
    includeReadme: true
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleOptionChange = (stepKey: string, optionId: string, isMultiSelect: boolean) => {
    const currentStepData = (steps as Step[]).find(step => step.key === stepKey);
    if (!currentStepData) {
      return 
    };

    
    const option = currentStepData.options.find(opt => opt.id === optionId);
    if (!option) return;

    const stackItem: SelectedStackItem = {
      id: option.id,
      name: option.name,
      version: option.version || 'compatible',
      description: option.description,
      category: option.category || '',
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
        if(stackItem.name.startsWith("Other")){
          openEditor(stackItem);
        }
        return { ...prev, [stepKey]: newSelections };
      } else {
        if(stackItem.name.startsWith("Other")){
          openEditor(stackItem);
        }
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
    if (currentStep < 18 && canProceed()) {
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

  const getPrompt = () => {
    const fullPrompt = `${generateAbovePrompt(selectedStack, aboutProject)}\n${selectedStack.aiPrompt}\n${generateBelowPrompt(getAllSelectedItems())}\n`;
    return fullPrompt
  }

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

  const openEditor = (option: SelectedStackItem) => {
    setEditingOption(option);
    setTempDesc(option.description);
    setTempVersion(option.version);
  };

  const saveChanges = () => {
    if (!editingOption) return;
    const key = currentStepData.key as keyof typeof selectedStack;
    setSelectedStack(prev => {
      if (currentStepData.type === 'checkbox') {
        const updatedArray = ((prev[key] as SelectedStackItem[]) || []).map(item =>
          item.id === editingOption.id
            ? { ...item, description: tempDesc, version: tempVersion }
            : item
        );
        return { ...prev, [key]: updatedArray };
      } else {
        const updatedItem = { ...(prev[key] as SelectedStackItem), description: tempDesc, version: tempVersion };
        return { ...prev, [key]: updatedItem };
      }
    });
    setEditingOption(null);
  };

  const generateGStack = async () => {
    setShowResults(true);
    setairesponseLoading(true);
    setErrorMessage(null);

    const prompt = getPrompt();

    try {
      const res = await aiResponse(prompt);

      let text = res?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      text = text.trim().replace(/^```(?:json)?\s*/, '').replace(/```$/, '');

      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      if (firstBrace === -1 || lastBrace === -1) {
        setAiResult({});
        setErrorMessage('No valid JSON braces found in response');
        return;
      }

      const jsonSubstring = text.slice(firstBrace, lastBrace + 1);

      try {
        const parsed = parse(jsonSubstring, [], { allowTrailingComma: true, disallowComments: false });
        parsed.prompt = prompt;
        setAiResult(parsed);
      } catch (err) {
        setErrorMessage((err as Error)?.message || 'Failed to parse AI response');
        setAiResult({ prompt });
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to fetch AI response');
      setAiResult({});
    } finally {
      setairesponseLoading(false);
    }
  };


  const handlePublish = () => {
    console.log('Publish clicked');
  };

  if (showResults) {
    return (
      <ResultPage
        loading={airesponseLoading}
        aiResult={aiResult as AiResult || {}}
        projectName={aboutProject.projectName || 'GStack'}
        stackDetails={getAllSelectedItems()}
        onPublish={handlePublish}
        aboutProject={aboutProject}
        error={errorMessage || undefined}
      />
    );

  }

  const currentStepData = steps[currentStep - 1];

  return (
    <TooltipProvider>
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setDrawerOpen(true)}
          className="w-12 h-12 p-0 bg-gray-900 hover:bg-gray-800 text-white rounded-lg shadow-lg"
        >
          <Layers className='size-6' />
        </Button>
      </div>
      {
        drawerOpen && <Drawer open={drawerOpen} setOpen={setDrawerOpen} aboutProject={aboutProject} setAboutProject={setAboutProject} />
      }
      <div className="box-border bg-gradient-to-br">
        <div className="max-w-4xl py-2  h-screen mx-auto flex flex-col gap-4">
          <Header />
          <StepMeter currentStep={currentStep} />
          {getAllSelectedItems().length > 0 && currentStep !== 18 && <SelectedStackPrew selectedStack={getAllSelectedItems()} />}

          <Card className='flex-1 gap-2 relative'>
            <CardHeader className="flex-shrink-0 gap-0">
              <CardTitle className="flex items-center gap-1 text-lg">
                <div className='flex gap-2 items-center'>{currentStep == 18 && <Sparkles className="h-5 w-5 text-purple-500" />} {currentStepData.title}</div>

              </CardTitle>
              <CardDescription className="text-sm">{currentStepData.category}</CardDescription>
            </CardHeader>

            <CardContent className='flex flex-col justify-between flex-1 gap-0' >
              <div className={cn('py-2 overflow-auto', (currentStep !== 18 && currentStep !== 1) && 'h-60')}>
                {currentStep === 1 ? (
                  <AboutProjectForm aboutProject={aboutProject} setAboutProject={setAboutProject} />
                ) : currentStep === 16 ? (
                  <AdditionalServices
                    additionalServices={selectedStack.additionalServices || []}
                    setAdditionalServices={(services) =>
                      setSelectedStack(prev => ({ ...prev, additionalServices: services as SelectedStackItem[] }))
                    }
                    openEditor={(item) => {
                      openEditor(item as SelectedStackItem);
                    }}
                    stack={currentStepData as Step}
                  />
                ) : currentStep === 17 ? (
                  <CustomPackage
                    customPackages={selectedStack.customPackages || []}
                    setCustomPackages={(packages) => setSelectedStack(prev => ({ ...prev, customPackages: packages as SelectedStackItem[] }))}
                  />
                ) : currentStep === 18 ? (
                  <div className="gap-4 mb-8">
                    <div className="mb-8">
                      <AiPromptEditor
                        aiPrompt={selectedStack.aiPrompt || ''}
                        setAiPrompt={(val) => setSelectedStack(prev => ({ ...prev, aiPrompt: val }))}
                        stack={getAllSelectedItems()}
                        selectedStack={selectedStack}
                        aboutProject={aboutProject}
                      />
                    </div>

                    <div className="mb-8">
                      {(() => {
                        const allSelectedItems = getAllSelectedItems();
                        return (
                          <>
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
                                            {item.category || "Custom Package"}
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
                          </>
                        );
                      })()}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {currentStepData.options.map((option) => {
                      if (currentStep == 16) return null;
                      const isSelected = currentStepData.type === 'checkbox'
                        ? (selectedStack[currentStepData.key as keyof typeof selectedStack] as SelectedStackItem[] || []).some(item => item.id === option.id)
                        : (selectedStack[currentStepData.key as keyof typeof selectedStack] as SelectedStackItem)?.id === option.id;

                      let displayItem = { version: '', ...option, selected: false };
                      if (isSelected) {
                        if (currentStepData.type === 'checkbox') {
                          const found = (selectedStack[currentStepData.key as keyof typeof selectedStack] as SelectedStackItem[] || []).find(item => item.id === option.id);
                          if (found) displayItem = { ...found, love: [], hate: [], package: [] };
                        } else {
                          const found = selectedStack[currentStepData.key as keyof typeof selectedStack] as SelectedStackItem;
                          if (found) displayItem = { ...found, love: [], hate: [], package: [] };
                        }
                        displayItem.selected = true;
                      }

                      return (
                        <div
                          key={option.id}
                          className={`relative p-2 border rounded-lg transition-all cursor-pointer ${isSelected ? 'bg-indigo-50 border-indigo-500' : 'border-gray-200 hover:border-gray-300'
                            }`}
                          onClick={() => {
                            handleOptionChange(currentStepData.key, option.id, currentStepData.type === 'checkbox');
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type={currentStepData.type === 'checkbox' ? 'checkbox' : 'radio'}
                              checked={isSelected}
                              onChange={() => { }}
                              className="mt-1 accent-indigo-500"
                              onClick={e => e.stopPropagation()}
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900">{option.name}</h3>
                                <div className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">{displayItem.version}</div>
                                {/* <p className="text-gray-600 text-sm line-clamp-1">{displayItem.description}</p> */}
                              </div>
                            </div>
                            {isSelected && (
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  openEditor(displayItem as SelectedStackItem);
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
                )
                }
              </div>

              {editingOption && <EditStackModal editingOption={editingOption} tempDesc={tempDesc} tempVersion={tempVersion} setTempDesc={setTempDesc} setTempVersion={setTempVersion} onCancel={() => setEditingOption(null)} onSave={saveChanges} />}

              <div>
                {currentStepData.required && !canProceed() && (
                  <div className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-yellow-700 text-sm">This field is required to continue.</p>
                  </div>
                )}
                <StepControls currentStep={currentStep} prevStep={prevStep} nextStep={nextStep} generateGStack={generateGStack} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StackGenerator;