import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Info, Plus } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'

const STORAGE_KEY = 'TGGS-useGeminiApiKey'

export default function SetAPIkey() {
    const [apiKey, setApiKey] = useState('')
    const [showInput, setShowInput] = useState(false)
    const [savedKey, setSavedKey] = useState<string | null>(null)

    useEffect(() => {
        setSavedKey(localStorage.getItem(STORAGE_KEY))
    }, [])

    const saveKey = () => {
        if (!apiKey.trim()) return
        localStorage.setItem(STORAGE_KEY, apiKey.trim())
        setSavedKey(apiKey.trim())
        setApiKey('')
        setShowInput(false)
    }

    const removeKey = () => {
        localStorage.removeItem(STORAGE_KEY)
        setSavedKey(null)
    }

    return (
        <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium">Gemini API Key</Label>
            {savedKey ? (
                <div className="flex items-center gap-2">
                    <div className="flex-1 bg-teal-50 border border-green-200 rounded px-3 py-2 flex items-center">
                        <span className="text-sm text-black-700 ">API Key saved</span>
                    </div>
                    <Button variant="outline" onClick={removeKey} className="cursor-pointer h-full flex items-center">
                        remove
                    </Button>
                </div>
            ) : showInput ? (
                <div className="space-y-2">
                    <Input
                        type="password"
                        placeholder="Enter your Gemini API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="text-sm"
                    />
                    <div className="flex gap-2">
                        <Button size="sm" onClick={saveKey} className="flex-1">Save</Button>
                        <Button size="sm" variant="outline" onClick={() => setShowInput(false)}>Cancel</Button>
                    </div>
                </div>
            ) : (
                <div className="space-y-2">
                    <Button size="sm" variant={'secondary'} onClick={() => setShowInput(true)} className="w-full">
                        <Plus className="h-4 w-4 mr-2" /> Add API Key
                    </Button>
                    <a
                        title="It's free to use any you can remove it anytime After One time use"
                        href="#"
                        // target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs items-center flex gap-1 text-blue-600 hover:text-blue-800 underline"
                    >
                        <Info size={15} />
                        How to get API key?
                    </a>
                </div>
            )}
        </div>
    )
}
