// ... imports
'use client';

import { useTranslation } from '@/hooks/use-translation'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OTPLogin } from '@/features/auth/OTPLogin'
import { PlanSelection } from '@/features/onboarding/PlanSelection'
import { IdentificationForm } from '@/features/onboarding/IdentificationForm'
import { PhotoVerification } from '@/features/onboarding/PhotoVerification'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { PaymentModal } from '@/features/payments/PaymentModal'

type Step = 'otp' | 'identification' | 'photo' | 'plan'


export default function OnboardingPage() {
    const { t } = useTranslation()
    const [step, setStep] = useState<Step>('otp')
    const [isPaymentOpen, setIsPaymentOpen] = useState(false)
    const router = useRouter()

    // ... handleNext logic ...

    // ... handlePaymentSuccess logic ...
    const handleNext = (nextStep: Step | 'done') => {
        if (nextStep === 'done') {
            // Instead of redirecting immediately, open payment modal
            setIsPaymentOpen(true)
        } else {
            setStep(nextStep)
        }
    }

    const handlePaymentSuccess = () => {
        setIsPaymentOpen(false)
        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="p-4 flex items-center">
                {step !== 'otp' && (
                    <Button variant="ghost" size="icon" onClick={() => {
                        if (step === 'plan') setStep('photo')
                        if (step === 'photo') setStep('identification')
                        if (step === 'identification') setStep('otp')
                    }}>
                        <ChevronLeft className="w-6 h-6" />
                    </Button>
                )}
                <div className="mx-auto font-bold text-lg">
                    {step === 'otp' && t('onboarding.createAccount')}
                    {step === 'identification' && t('onboarding.verifyIdentity')}
                    {step === 'photo' && t('onboarding.biometricCapture')}
                    {step === 'plan' && t('onboarding.selectPlan')}
                </div>
                <div className="w-10" /> {/* Spacer */}
            </div>

            <div className="flex-1 p-4 container mx-auto mb-10">
                {step === 'otp' && (
                    <OTPLogin onComplete={() => handleNext('identification')} />
                )}

                {step === 'identification' && (
                    <IdentificationForm onComplete={() => handleNext('photo')} />
                )}

                {step === 'photo' && (
                    <PhotoVerification onComplete={() => handleNext('plan')} />
                )}

                {step === 'plan' && (
                    <PlanSelection onComplete={() => handleNext('done')} />
                )}
            </div>

            <PaymentModal
                open={isPaymentOpen}
                onOpenChange={setIsPaymentOpen}
                amount={2500} // Mock amount or dynamic based on plan
                onSuccess={handlePaymentSuccess}
            />
        </div>
    )
}
