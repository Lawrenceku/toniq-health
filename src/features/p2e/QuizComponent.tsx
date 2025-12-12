'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check, X as XIcon } from 'lucide-react'

interface Question {
    id: number
    text: string
    options: string[]
    correctIndex: number
}

interface QuizModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    questions: Question[]
    onComplete: (score: number) => void
}

export function QuizModal({ open, onOpenChange, questions, onComplete }: QuizModalProps) {
    const [currentQ, setCurrentQ] = useState(0)
    const [score, setScore] = useState(0)
    const [selected, setSelected] = useState<number | null>(null)
    const [showResult, setShowResult] = useState(false)
    const [completed, setCompleted] = useState(false)

    const handleAnswer = (index: number) => {
        setSelected(index)
        const isCorrect = index === questions[currentQ].correctIndex
        if (isCorrect) setScore(s => s + 1)

        setShowResult(true)

        setTimeout(() => {
            if (currentQ < questions.length - 1) {
                setCurrentQ(c => c + 1)
                setSelected(null)
                setShowResult(false)
            } else {
                setCompleted(true)
                setTimeout(() => {
                    onComplete(isCorrect ? score + 1 : score)
                    handleClose()
                }, 1500)
            }
        }, 1500)
    }

    const handleClose = () => {
        onOpenChange(false)
        // Reset state after animation
        setTimeout(() => {
            setCurrentQ(0)
            setScore(0)
            setCompleted(false)
            setShowResult(false)
            setSelected(null)
        }, 500)
    }

    const question = questions[currentQ]

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                {completed ? (
                    <div className="text-center py-6 space-y-4">
                        <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto animate-bounce">
                            <Check className="w-8 h-8 text-secondary" />
                        </div>
                        <h3 className="text-2xl font-bold">Quiz Complete!</h3>
                        <p>You scored {score}/{questions.length}</p>
                        <p className="text-muted-foreground">Tokens added to your wallet.</p>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>Daily Health Quiz</DialogTitle>
                            <DialogDescription>
                                Question {currentQ + 1} of {questions.length}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                            <h3 className="font-semibold text-lg">{question.text}</h3>
                            <div className="space-y-2">
                                {question.options.map((option, idx) => {
                                    const isSelected = selected === idx
                                    const isCorrect = idx === question.correctIndex
                                    let variant = "outline"
                                    let icon = null

                                    if (showResult) {
                                        if (isCorrect) {
                                            variant = "success" // We'll fake this with className
                                            icon = <Check className="w-4 h-4" />
                                        } else if (isSelected && !isCorrect) {
                                            variant = "destructive"
                                            icon = <XIcon className="w-4 h-4" />
                                        }
                                    }

                                    return (
                                        <Button
                                            key={idx}
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-between h-auto py-3 px-4",
                                                showResult && isCorrect && "bg-green-100 border-green-500 text-green-700 hover:bg-green-100",
                                                showResult && isSelected && !isCorrect && "bg-red-100 border-red-500 text-red-700 hover:bg-red-100",
                                                !showResult && isSelected && "border-primary bg-primary/5"
                                            )}
                                            onClick={() => !showResult && handleAnswer(idx)}
                                            disabled={showResult}
                                        >
                                            <span className="text-left">{option}</span>
                                            {icon}
                                        </Button>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
