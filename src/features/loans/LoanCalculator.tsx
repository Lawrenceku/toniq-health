'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

// We will simulate Slider with input range for speed if Slider not installed, 
// but used `shadcn` compatible structure.
// Actually I don't have Slider installed, I will use HTML input range styled.

export function LoanCalculator({ maxAmount }: { maxAmount: number }) {
    const [amount, setAmount] = useState(maxAmount / 2)
    const duration = 3 // months fixed for MVP
    const interest = 0.12 // 12%

    const totalRepayment = amount * (1 + interest)
    const monthlyRepayment = totalRepayment / duration

    const handleApply = () => {
        alert(`Application for ₦${amount.toLocaleString()} submitted!`)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Loan Application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label>Amount Required</Label>
                        <span className="font-bold text-lg">₦{amount.toLocaleString()}</span>
                    </div>
                    <input
                        type="range"
                        min={10000}
                        max={maxAmount}
                        step={5000}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>₦10,000</span>
                        <span>₦{maxAmount.toLocaleString()}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-muted rounded-lg">
                        <span className="block text-muted-foreground text-xs">Interest Rate</span>
                        <span className="font-bold">12%</span>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                        <span className="block text-muted-foreground text-xs">Duration</span>
                        <span className="font-bold">3 Months</span>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-muted-foreground">Monthly Repayment</span>
                        <span className="font-bold text-lg">₦{monthlyRepayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Repayments are automatically added to your monthly premium bill.</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleApply}>Apply for Loan</Button>
            </CardFooter>
        </Card>
    )
}
