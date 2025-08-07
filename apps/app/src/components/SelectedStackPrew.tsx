import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { SelectedStackItem } from './Generator'
import { Badge } from './ui/badge'
interface SelectedStackPrewProps {
    selectedStack: SelectedStackItem[];
    setcurrentStep: React.Dispatch<React.SetStateAction<number>>
}

function SelectedStackPrew({ selectedStack, setcurrentStep }: SelectedStackPrewProps) {
    return (
        <Card className="shadow-sm gap-0">
            <CardHeader>
                <CardTitle className="text-lg">Stack Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {selectedStack.map((key: SelectedStackItem) => {
                        return (
                            <Badge
                                onClick={() => {
                                    if (categorystep[key.category]) {
                                        setcurrentStep(categorystep[key.category]);
                                    }
                                }}
                                key={key.id} variant="secondary" className="text-xs cursor-pointer select-none bg-white border border-gray-300">
                                {key.id}
                            </Badge>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

export default SelectedStackPrew

const categorystep: Record<string, number> = {
    "Core Language": 2,
    "Runtime": 3,
    "Package Manager": 4,
    "Architecture": 5,
    "Frontend Framework": 6,
    "Backend Framework": 7,
    "Database": 8,
    "ORM/ODM": 9,
    "Authentication": 10,
    "Styling & UI": 11,
    "Testing": 12,
    "State Management": 13,
    "Deployment": 14,
    "Development Tools": 15,
    "Additional": 16,
    "Utilities": 17,
}