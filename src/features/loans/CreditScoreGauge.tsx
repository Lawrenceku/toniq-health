'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface CreditScoreGaugeProps {
    score: number
}

export function CreditScoreGauge({ score }: CreditScoreGaugeProps) {
    // Score 0-1000
    // Angle -90 to +90 (180 deg)
    const percentage = Math.min(Math.max(score / 1000, 0), 1)
    const angle = percentage * 180 - 90

    let color = "text-red-500"
    if (score > 500) color = "text-amber-500"
    if (score > 700) color = "text-green-500"

    // Animate number
    const [displayScore, setDisplayScore] = React.useState(score)

    React.useEffect(() => {
        // Simple easing or stepping
        let start = displayScore
        const end = score
        if (start === end) return

        const duration = 1000
        const startTime = performance.now()

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1) // 0 to 1

            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3)

            const current = Math.floor(start + (end - start) * ease)
            setDisplayScore(current)

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [score])

    return (
        <Card className="flex flex-col items-center">
            <CardHeader className="text-center pb-2">
                <CardTitle>Insurance Credit Score</CardTitle>
                <CardDescription>Based on payments & claims history</CardDescription>
            </CardHeader>
            <CardContent className="relative flex flex-col items-center justify-center pb-8">
                <div className="relative w-48 h-24 overflow-hidden">
                    {/* Background Arc */}
                    <div className="absolute w-48 h-48 rounded-full border-[12px] border-muted top-0 box-border" />

                    {/* Needle/Arc */}
                    <svg viewBox="0 0 100 50" className="w-full h-full transform translate-y-[2px]">
                        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" strokeLinecap="round" />
                        <path
                            d="M 10 50 A 40 40 0 0 1 90 50"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray="126" // approx length of arc
                            strokeDashoffset={126 * (1 - percentage)}
                            className={`transition-all duration-1000 ${color}`}
                        />
                    </svg>
                </div>
                <div className="absolute top-[60%] flex flex-col items-center">
                    <span className={`text-4xl font-bold ${color}`}>{displayScore}</span>
                    <span className="text-sm font-medium text-muted-foreground">{
                        score > 700 ? 'Excellent' : score > 500 ? 'Good' : 'Needs Work'
                    }</span>
                </div>
            </CardContent>
        </Card>
    )
}
