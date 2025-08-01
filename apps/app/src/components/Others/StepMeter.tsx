import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Progress } from '../ui/progress'

function StepMeter({ currentStep }: { currentStep: number }) {
    return (
        <Card className="flex-shrink-0 py-4">
            <CardContent>
                <div className="space-y-1">
                    <div className="flex justify-between text-xs mb-2">
                        <span>Step {currentStep} of 18</span>
                        <span>{Math.round(((currentStep) / 18) * 100)}% Complete</span>
                    </div>
                    <Progress value={((currentStep) / 18) * 100} className="w-full h-2" />
                </div>
            </CardContent>
        </Card>
    )
}

export default StepMeter