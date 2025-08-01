/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Card } from './ui/card'
import { Badge, Plus, X } from 'lucide-react'
import { Button } from './ui/button'
import { Label } from '@radix-ui/react-label'

import { AboutProject } from './Generator'
import { Input } from './ui/input'

interface DrawerProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    aboutProject: AboutProject
    setAboutProject: React.Dispatch<React.SetStateAction<AboutProject>>
}

function Drawer({ open, setOpen, aboutProject, setAboutProject }: DrawerProps) {
    const [apiKey, setApiKey] = useState("")
    const [showApiKeyInput, setShowApiKeyInput] = useState(false)
    const [savedApiKey, setSavedApiKey] = useState("")
    const [activeTab, setActiveTab] = useState("auth")
    const [githubUser, setGithubUser] = useState<any>(null)
    const [userStacks, setUserStacks] = useState<any[]>([])
    const [userToken, setUserToken] = useState("")
    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-opacity-50" onClick={() => setOpen(false)} />
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
                        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
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
                                                        <Badge className="text-xs">
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
    )
}

export default Drawer