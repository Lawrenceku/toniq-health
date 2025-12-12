'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ArrowRight, Phone, Lock } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

export function OTPLogin({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState<'phone' | 'otp'>('phone')
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const login = useAuthStore(state => state.login)

    const handleSendCode = async () => {
        if (phone.length < 10) return
        setIsLoading(true)
        // Mock API call
        setTimeout(() => {
            setIsLoading(false)
            setStep('otp')
        }, 1500)
    }

    const handleVerify = async () => {
        if (otp.length !== 6) return
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            // Mock Login User
            login({
                id: 'user-' + Math.random().toString(36).substr(2, 9),
                phoneNumber: phone,
                name: 'New User',
                worldIdVerified: false,
                // Plans are selected in next step
            })
            onComplete()
        }, 1500)
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>{step === 'phone' ? 'Welcome to Toniq' : 'Verify Phone'}</CardTitle>
                <CardDescription>
                    {step === 'phone'
                        ? 'Enter your phone number to access affordable health insurance.'
                        : `Enter the code sent to ${phone}`}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {step === 'phone' ? (
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="phone"
                                placeholder="080 1234 5678"
                                className="pl-9"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <Button
                            className="w-full mt-4"
                            onClick={handleSendCode}
                            disabled={phone.length < 10 || isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Send Code'}
                            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <Label htmlFor="otp">One-Time Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="otp"
                                placeholder="123456"
                                className="pl-9 tracking-widest"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <Button
                            className="w-full mt-4"
                            onClick={handleVerify}
                            disabled={otp.length !== 6 || isLoading}
                        >
                            {isLoading ? 'Verifying...' : 'Verify & Login'}
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full"
                            onClick={() => setStep('phone')}
                        >
                            Change Phone Number
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
