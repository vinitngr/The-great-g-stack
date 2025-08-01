import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { SelectedStackItem } from './Generator'
import { Badge } from './ui/badge'
interface SelectedStackPrewProps {
    selectedStack: SelectedStackItem[];
}

function SelectedStackPrew({ selectedStack }: SelectedStackPrewProps) {
    return (
        <Card className="shadow-sm gap-0">
            <CardHeader>
                <CardTitle className="text-lg">Stack Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {selectedStack.map((key: SelectedStackItem) => {
                        return (
                            <Badge key={key.id} variant="secondary" className="text-xs bg-white border border-gray-300">
                                {key.name}
                            </Badge>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

export default SelectedStackPrew