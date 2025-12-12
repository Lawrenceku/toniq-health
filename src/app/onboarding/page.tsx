// ... imports
import { useTranslation } from '@/hooks/use-translation'

// ... existing code

export default function OnboardingPage() {
    const { t } = useTranslation()
    const [step, setStep] = useState<Step>('otp')
    const [isPaymentOpen, setIsPaymentOpen] = useState(false)
    const router = useRouter()

    // ... handleNext logic ...

    // ... handlePaymentSuccess logic ...

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
