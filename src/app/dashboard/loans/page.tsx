'use client'

import React, { useState } from 'react'
import { CreditScoreGauge } from '@/features/loans/CreditScoreGauge'
import { LoanCalculator } from '@/features/loans/LoanCalculator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert' // Need Alert
import { Info, Lock } from 'lucide-react'

import { useUser } from '@/hooks/use-user'

export default function LoansPage() {
    const { user } = useUser()
    const USER_SCORE = user?.insuranceCreditScore || 680

    // Logic: 680 is initial (eligible for basic), 690 (after claim) unlocks higher tier
    const isEligible = USER_SCORE >= 600
    // Unlock "Card B" (500k) if score > 685 (Mock update goes to 690)
    const maxLoan = USER_SCORE > 685 ? 500000 : 100000
    const isTier2Unlocked = USER_SCORE > 685

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">Health Loans</h1>
                <p className="text-muted-foreground">Access low-interest loans based on your health & payment history.</p>
            </div>

            <CreditScoreGauge score={USER_SCORE} />

            {isEligible ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <LoanCalculator maxAmount={maxLoan} />
                    {isTier2Unlocked && (
                        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md text-sm text-green-700 font-medium text-center animate-pulse">
                            🎉 Claim Payment detected! Your loan limit increased to ₦500,000.
                        </div>
                    )}
                </div>
            ) : (
                <Alert className="border-amber-500/50 bg-amber-500/10">
                    <Lock className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-800">Loan Access Locked</AlertTitle>
                    <AlertDescription className="text-amber-700">
                        You need a credit score of at least 600 to access loans. Keep paying premiums on time and completing health tasks to boost your score.
                    </AlertDescription>
                </Alert>
            )}

            <div className="bg-blue-500/10 p-4 rounded-lg flex gap-3 items-start border border-blue-500/20">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <h4 className="font-semibold text-blue-800 text-sm">How to improve your score?</h4>
                    <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                        <li>Pay premiums on time (+5 pts)</li>
                        <li>Complete daily health quiz (+1 pt)</li>
                        <li>Don't make fraudulent claims</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
