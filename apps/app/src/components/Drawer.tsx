/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Cloud, Layers, User, X } from 'lucide-react'
import { Button } from './ui/button'

import { AboutProject } from './Generator'
import StackViewer from './LocalStack'
import SetAPIkey from './Others/SetAPIkey'
import AccessToken from './Others/AcccessToken'
import { cn } from '@/lib/utils'
import UploadedStack from './UploadedStack'

interface DrawerProps {
    open: boolean
    setOpen: React.Dispatch<SetStateAction<boolean>>
    aboutProject: AboutProject
    setAboutProject: Dispatch<SetStateAction<AboutProject>>
}

function Drawer({ setOpen }: DrawerProps) {
    const [activeTab, setActiveTab] = useState("auth")
    const [githubUser, setGithubUser] = useState<any>(null)
    const [userStacks] = useState<any[]>([])
    const [showsavedStack, setshowsavedStack] = useState(true)
    const [showuploadedStack, setshowuploadedStack] = useState(true)
    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-opacity-50" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
                <div className="flex flex-col h-full border-l-2 border-gray-200 shadow">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <Layers />
                            <span className="font-semibold">TGGStack Manager</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

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
                        {
                            githubUser && (
                                <button
                                    onClick={() => setActiveTab("cli")}
                                    className={`flex-1 px-4 py-2 text-sm font-medium ${activeTab === "cli"
                                        ? "border-b-2 border-blue-500 text-blue-600"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    CLI/Guide
                                </button>
                            )
                        }

                    </div>

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
                                                setGithubUser({
                                                    login: "Vinit Nagar",
                                                    email: "vinitnagar@gmail.com",
                                                    avatar_url: "https://github.com/identicons/johndoe.png",
                                                })
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
                                    <div className="flex gap-2 flex-col">
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            {githubUser.imageurl ? <img src={githubUser.avatar_url} alt={githubUser.login} className="w-10 h-10 rounded-full"
                                            /> : <User className='text-black border rounded-full p-2 size-12' />}
                                            <div className="flex-1">
                                                <div className="font-medium">{githubUser.login}</div>
                                                <div className="text-sm text-gray-600">{githubUser.email}</div>
                                            </div>
                                        </div>


                                        {/* User Token */}
                                        <AccessToken />

                                        {/* Logout */}
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setGithubUser(null)
                                            }}
                                            className="w-full"
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                )}

                                <SetAPIkey />
                            </div>
                        )}

                        {activeTab === "stacks" && (
                            <div className="space-y-2">
                                <div className={cn(!showsavedStack && 'border rounded')}>
                                    <div className='flex my-1 items-center cursor-pointer select-none justify-center gap-2' onClick={() => setshowsavedStack(!showsavedStack)}><Layers size={15} />Locally saved stack</div>
                                    {showsavedStack && <StackViewer />}
                                </div>

                                <div className="space-y-2">
                                    <div className={cn(!showuploadedStack && 'border rounded')}>
                                        <div className='flex my-1 items-center cursor-pointer select-none justify-center' onClick={() => setshowuploadedStack(!showuploadedStack)}><Cloud className="h-4 w-4 mr-2" />Uploaded Stacks</div>
                                        {showuploadedStack && <UploadedStack userStacks={userStacks} />}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "cli" && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold">@theggs/cli</h2>

                                {[
                                    { label: "Download package globally", cmd: "npm install -g @theggs/cli" },
                                    { label: "Import the stack", cmd: "tggs import https://tggs.vinitnagar56.workers.dev/api/stack/StackId" },
                                    { label: "Export the stack", cmd: "tggs export --dir ./exportedStack" }
                                ].map(({ label, cmd }, i) => (
                                    <div key={i}>
                                        <p className="mb-1 font-medium">{label}</p>
                                        <div className="relative">
                                            <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-sm overflow-x-auto">
                                                <code>{cmd}</code>
                                            </pre>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(cmd)}
                                                className="cursor-pointer absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Drawer