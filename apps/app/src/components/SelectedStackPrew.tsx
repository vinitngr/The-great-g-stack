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
                    <Badge
                        onClick={() => setcurrentStep(1)}
                        variant="secondary" className="text-xs cursor-pointer select-none bg-black  text-white border border-gray-300">
                        start : metadata
                    </Badge>
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
                    <Badge
                        onClick={() => setcurrentStep(18)}
                        variant="secondary" className="text-xs cursor-pointer select-none bg-black text-white border border-gray-300">
                        End : prompt
                    </Badge>
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
    "Storage": 16,
    "Build Tool": 16,
    "Documentation": 16,
    "Observability": 16,
    "Insights": 16,
    "Resilience": 16,
    "Security": 16,
    "Localization": 16,
    "Payments": 16,
    "Utilities": 17,
}