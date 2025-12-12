'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OTPLogin } from '@/features/auth/OTPLogin'
import { WorldIDConnect } from '@/features/auth/WorldIDConnect'
import { PlanSelection } from '@/features/onboarding/PlanSelection'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

type Step = 'otp' | 'world-id' | 'plan'

export default function OnboardingPage() {
    const [step, setStep] = useState<Step>('otp')
    const router = useRouter()

    const handleNext = (nextStep: Step | 'done') => {
        if (nextStep === 'done') {
            router.push('/dashboard') // Redirect to dashboard
        } else {
            setStep(nextStep)
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="p-4 flex items-center">
                {step !== 'otp' && (
                    <Button variant="ghost" size="icon" onClick={() => {
                        if (step === 'plan') setStep('world-id')
                        if (step === 'world-id') setStep('otp')
                    }}>
                        <ChevronLeft className="w-6 h-6" />
                    </Button>
                )}
                <div className="mx-auto font-bold text-lg">
                    {step === 'otp' && 'Create Account'}
                    {step === 'world-id' && 'Verification'}
                    {step === 'plan' && 'Select Plan'}
                </div>
                <div className="w-10" /> {/* Spacer */}
            </div>

            <div className="flex-1 p-4 container mx-auto">
                {step === 'otp' && (
                    <OTPLogin onComplete={() => handleNext('world-id')} />
                )}

                {step === 'world-id' && (
                    <div className="space-y-6 max-w-md mx-auto pt-10">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-bold">One Person, One ID</h2>
                            <p className="text-muted-foreground">We use World ID to ensure fair distribution of rewards.</p>
                        </div>
                        <WorldIDConnect />
                        <div className="flex flex-col gap-3">
                            <Button variant="outline" onClick={() => handleNext('plan')}>
                                Skip for now
                            </Button>
                            <p className="text-xs text-center text-muted-foreground">
                                Skipping limits your Play-to-Earn rewards.
                            </p>
                        </div>
                    </div>
                )}

                {step === 'plan' && (
                    <PlanSelection onComplete={() => handleNext('done')} />
                )}
            </div>
        </div>
    )
}
