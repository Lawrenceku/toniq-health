'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Circle, Clock } from 'lucide-react'

const STEPS = [
    { label: 'Submitted', status: 'completed', time: '10:00 AM' },
    { label: 'AI Verification', status: 'completed', time: '10:01 AM' },
    { label: 'Payment Processing', status: 'current', time: 'Now' },
    { label: 'Funds Received', status: 'pending', time: '-' },
]

export function ClaimStatusTracker() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Claim #8821 Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative border-l-2 border-muted ml-4 space-y-6 pb-2">
                    {STEPS.map((step, i) => (
                        <div key={i} className="relative flex items-center gap-4 pl-6">
                            <div className={`absolute -left-[9px] w-4 h-4 rounded-full border-2 bg-background flex items-center justify-center ${step.status === 'completed' ? 'border-primary text-primary' :
                                    step.status === 'current' ? 'border-amber-500 text-amber-500' : 'border-muted text-muted'
                                }`}>
                                {step.status === 'completed' && <div className="w-2 h-2 bg-primary rounded-full" />}
                                {step.status === 'current' && <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />}
                            </div>
                            <div className="flex-1 flex justify-between items-center text-sm">
                                <span className={step.status === 'pending' ? 'text-muted-foreground' : 'font-medium'}>
                                    {step.label}
                                </span>
                                <span className="text-xs text-muted-foreground">{step.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
