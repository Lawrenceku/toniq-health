'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ArrowRight, Phone, Lock, RefreshCcw } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

// --- Custom OTP Input Component ---

/**
 * Custom 6-digit OTP input component with separate fields and auto-focus.
 * NOTE: This assumes you have the 'Input' component from Shadcn UI.
 */
interface OtpInputProps {
    length: number
    value: string
    onChange: (value: string) => void
    disabled?: boolean
}

const OtpInput: React.FC<OtpInputProps> = ({ length, value, onChange, disabled }) => {
    const inputRefs = useRef<Array<HTMLInputElement | null>>([])
    const valueArray = value.split('').concat(Array(length).fill(''))
    // Only take the first 'length' characters
    const otpValue = valueArray.slice(0, length)

    const focusInput = (index: number) => {
        const input = inputRefs.current[index]
        if (input) {
            input.focus()
            input.select() // Select the current text if any
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const char = e.target.value.slice(-1) // Get the last character typed
        const newValue = value.slice(0, index) + char + value.slice(index + 1)
        
        // Update the state
        if (char && char.match(/[0-9]/)) {
            onChange(newValue)

            // Auto-focus to the next input
            if (index < length - 1) {
                focusInput(index + 1)
            }
        } else if (char === '') {
            // Handle clearing a character
            onChange(newValue.replace(/\s/g, ''))
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // Backspace key
        if (e.key === 'Backspace' && index > 0 && !otpValue[index]) {
            e.preventDefault() // Prevent default backspace action
            // Move back and clear the previous input
            const newValue = value.slice(0, index - 1) + value.slice(index)
            onChange(newValue)
            focusInput(index - 1)
        }
    }
    
    // Handle paste event
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pasteData = e.clipboardData.getData('text/plain').trim()
        if (pasteData.match(/^\d+$/) && pasteData.length >= length) {
            // Only take the first 'length' digits
            onChange(pasteData.slice(0, length))
        }
    }

    return (
        <div className="flex justify-between space-x-2" onPaste={handlePaste}>
            {otpValue.map((char, index) => (
                <Input
                    key={index}
                    ref={el => {inputRefs.current[index] = el}}
                    type="tel" // Use 'tel' for better mobile keyboard experience
                    maxLength={1}
                    className="w-1/6 text-center text-xl font-bold p-0 h-14"
                    value={char || ''}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    disabled={disabled}
                    // Custom styles to remove the default focus ring if you want
                    style={{ 
                        WebkitAppearance: 'none', 
                        MozAppearance: 'textfield',
                        // Optional: Ensure all inputs are visually distinct for an OTP field
                        boxShadow: '0 0 0 1px hsl(var(--input))',
                    }}
                />
            ))}
        </div>
    )
}


// --- Main OTPLogin Component ---

const RESEND_TIMEOUT_SECONDS = 60 // 1 minute timeout

export function OTPLogin({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState<'phone' | 'otp'>('phone')
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [resendTimer, setResendTimer] = useState(0) // Seconds left for resend

    const login = useAuthStore(state => state.login)
    
    // Timer Effect
    useEffect(() => {
        let timerId: NodeJS.Timeout | null = null
        if (step === 'otp' && resendTimer > 0) {
            timerId = setTimeout(() => {
                setResendTimer(prev => prev - 1)
            }, 1000)
        }
        return () => {
            if (timerId) clearTimeout(timerId)
        }
    }, [step, resendTimer])

    const handleSendCode = async () => {
        if (phone.length < 10) return
        setIsLoading(true)
        
        // Mock API call to send code
        setTimeout(() => {
            setIsLoading(false)
            setStep('otp')
            setOtp('') // Clear any previous OTP
            setResendTimer(RESEND_TIMEOUT_SECONDS) // Start the timer
        }, 1500)
    }

    const handleResendCode = async () => {
        if (resendTimer > 0) return
        setIsLoading(true)
        
        // Mock API call to resend code
        setTimeout(() => {
            setIsLoading(false)
            setOtp('') // Clear OTP field
            setResendTimer(RESEND_TIMEOUT_SECONDS) // Reset and start timer
        }, 1000)
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
            })
            onComplete()
        }, 1500)
    }
    
    // Function to handle OTP change from the new component
    const handleOtpChange = useCallback((newOtp: string) => {
        setOtp(newOtp)
        if (newOtp.length === 6 && !isLoading) {
            // Optional: Auto-submit when 6 digits are entered
            // handleVerify() 
        }
    }, [isLoading])


    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>{step === 'phone' ? 'Welcome to Toniq' : 'Verify Phone'}</CardTitle>
                <CardDescription>
                    {step === 'phone'
                        ? 'Enter your phone number to access affordable health insurance.'
                        : `Enter the 6-digit code sent to ${phone}`}
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
                                type="tel"
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
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="otp">One-Time Password</Label>
                            <OtpInput
                                length={6}
                                value={otp}
                                onChange={handleOtpChange}
                                disabled={isLoading}
                            />
                        </div>
                        
                        <Button
                            className="w-full"
                            onClick={handleVerify}
                            disabled={otp.length !== 6 || isLoading}
                        >
                            {isLoading ? 'Verifying...' : 'Verify & Login'}
                        </Button>
                        
                        <div className="flex justify-between items-center pt-2">
                            {resendTimer > 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Resend code in **{resendTimer}s**
                                </p>
                            ) : (
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-sm"
                                    onClick={handleResendCode}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Sending...' : (
                                        <>
                                            <RefreshCcw className="mr-1 h-3 w-3" />
                                            Resend Code
                                        </>
                                    )}
                                </Button>
                            )}
                            
                            <Button
                                variant="link"
                                className="p-0 h-auto text-sm"
                                onClick={() => {
                                    setStep('phone')
                                    setOtp('')
                                    setResendTimer(0) // Stop timer on phone change
                                }}
                            >
                                Change Phone Number
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

// NOTE: You must include the new OtpInput component in the same file or import it correctly.