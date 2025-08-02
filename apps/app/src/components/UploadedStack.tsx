import React from 'react'
import { Card } from './ui/card'
import { Badge } from 'lucide-react'
import { Button } from './ui/button'

function UploadedStack({ userStacks }: { userStacks: { type: string; name: string; description: string; url: string; }[] }) {
    return (
        <div>
            {userStacks.length === 0 && (
                <div className="text-gray-500 text-center text-sm py-3 bg-gray-50 border border-gray-200 rounded-md">
                    No locally stored stack
                </div>
            )}
            {userStacks.length > 0 && (
                userStacks.map((stack, index) => (
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
                )))
            }
        </div>
    )
}

export default UploadedStack