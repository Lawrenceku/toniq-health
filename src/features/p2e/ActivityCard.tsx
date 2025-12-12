'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Clock } from 'lucide-react'

interface ActivityProps {
    title: string
    description: string
    reward: number
    icon: React.ReactNode
    completed?: boolean
    onStart?: () => void
}

export function ActivityCard({ title, description, reward, icon, completed, onStart }: ActivityProps) {
    return (
        <Card className={`overflow-hidden transition-colors ${completed ? 'bg-muted/50 opacity-70' : 'hover:border-primary/50'}`}>
            <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${completed ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">{description}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-secondary-foreground bg-secondary/20 px-2 py-0.5 rounded-full">
                            +{reward} $HEALTH
                        </span>
                        {completed && (
                            <span className="text-xs flex items-center gap-1 text-green-500">
                                <CheckCircle2 className="w-3 h-3" /> Done
                            </span>
                        )}
                    </div>
                </div>
                {!completed && (
                    <Button size="sm" onClick={onStart}>
                        Start
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}
