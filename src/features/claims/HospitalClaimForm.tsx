'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Upload, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react'
import { api } from '@/lib/api-client'
import { Progress } from '@/components/ui/progress' // Assuming Progress component exists or using mock

// Status steps for the demo
type ClaimStep = 'idle' | 'analyzing' | 'contract' | 'paid' | 'error'

export function HospitalClaimForm() {
    const [patientId, setPatientId] = useState('')
    const [amount, setAmount] = useState('')
    const [diagnosis, setDiagnosis] = useState('')

    const [status, setStatus] = useState<ClaimStep>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('analyzing')

        try {
            // 1. AI Analyzing (Visual Delay)
            await new Promise(r => setTimeout(r, 2000));
            setStatus('contract');

            // 2. Smart Contract (Visual Delay)
            await new Promise(r => setTimeout(r, 2000));

            // 3. Actual API Call (which might be mock)
            // Note: The MockService in api-client already has delays, but we want granular control for UI.
            // So we might want to bypass the mock delays or just await the result.
            // Since our `api.hospital.submitClaim` points to safeFetch -> mockService.submitClaim (which has delays),
            // we will just call it.

            await api.hospital.submitClaim({ diagnosis, cost: Number(amount) });

            setStatus('paid');
        } catch (error) {
            console.error("Claim failed", error);
            setStatus('error');
        }
    }

    const reset = () => {
        setPatientId('')
        setAmount('')
        setDiagnosis('')
        setStatus('idle')
    }

    if (status === 'analyzing' || status === 'contract') {
        return (
            <Card className="border-blue-500/20">
                <CardContent className="flex flex-col items-center justify-center p-12 space-y-6">
                    <div className="w-full max-w-xs space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span>Processing Claim...</span>
                            <span>{status === 'analyzing' ? '45%' : '90%'}</span>
                        </div>
                        {/* Fallback progress bar if UI component missing, using simple div */}
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-1000 ease-in-out"
                                style={{ width: status === 'analyzing' ? '45%' : '90%' }}
                            />
                        </div>
                    </div>

                    <div className="text-center space-y-1">
                        <h3 className="text-xl font-bold animate-pulse">
                            {status === 'analyzing' && <span className="text-amber-500">AI Analyzing Diagnosis...</span>}
                            {status === 'contract' && <span className="text-blue-500">Smart Contract Triggered...</span>}
                        </h3>
                        <p className="text-muted-foreground text-sm">Verifying coverage and releasing liquidity.</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (status === 'paid') {
        return (
            <Card className="border-green-500 bg-green-500/5">
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <CardTitle className="text-center text-green-700">FUNDS RECEIVED</CardTitle>
                    <CardDescription className="text-center text-green-600">
                        ₦{Number(amount).toLocaleString()} has been instantly deposited.
                    </CardDescription>
                    <Button onClick={reset} variant="outline" className="border-green-600 text-green-700">Submit Another Claim</Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Submit New Claim</CardTitle>
                <CardDescription>Enter patient details and upload bill.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Patient Information</Label>
                        <Input
                            placeholder="Patient ID or Phone"
                            value={patientId}
                            onChange={e => setPatientId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Diagnosis Code</Label>
                            <Input
                                placeholder="e.g. A09 (Malaria)"
                                value={diagnosis}
                                onChange={e => setDiagnosis(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Total Bill (₦)</Label>
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Upload Bill/Invoice</Label>
                        <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer">
                            <Upload className="w-8 h-8 mb-2" />
                            <span className="text-xs">Click to upload PDF or Image</span>
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        Submit Claim
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
