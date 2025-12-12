'use client'

import { Card, CardFooter, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, ShieldAlert, CheckCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress' // Need to creating this
import { cn } from '@/lib/utils'

interface PolicyCardProps {
    status: 'active' | 'inactive' | 'grace_period'
    daysRemaining: number
    planName: string
    nextPaymentDate: string
    onPayNow: () => void
}

export function PolicyCard({ status, daysRemaining, planName, nextPaymentDate, onPayNow }: PolicyCardProps) {
    const isDanger = status === 'inactive' || (status === 'grace_period' && daysRemaining < 3)

    return (
        <Card className={cn("overflow-hidden border-2", isDanger ? "border-destructive/50" : "border-primary/20")}>
            <div className={cn(
                "h-2 w-full",
                status === 'active' ? "bg-primary" : "bg-destructive"
            )} />
            <CardHeader className="pb-4 flex flex-row items-start justify-between space-y-0">
                <div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Current Plan</p>
                    <CardTitle className="text-2xl">{planName}</CardTitle>
                </div>
                <div className={cn(
                    "rounded-full p-2",
                    status === 'active' ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                )}>
                    {status === 'active' ? <Shield className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Coverage Status</span>
                        <span className={cn("font-bold flex items-center gap-1", status === 'active' ? "text-green-500" : "text-red-500")}>
                            {status === 'active' ? 'Active' : 'Payment Overdue'}
                            {status === 'active' && <CheckCircle className="w-3 h-3" />}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Days Remaining</span>
                        <span>{daysRemaining} Days</span>
                    </div>
                    {/* Progress bar could go here */}
                    <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${(daysRemaining / 30) * 100}%` }}
                        />
                    </div>
                </div>

                {status !== 'active' && (
                    <div className="bg-destructive/10 text-destructive text-xs p-2 rounded">
                        Your coverage is currently paused. Pay now to reactivate instantly.
                    </div>
                )}
            </CardContent>
            <CardFooter className="bg-muted/50 pt-4">
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Next Payment</span>
                        <span className="font-medium text-sm">{nextPaymentDate}</span>
                    </div>
                    <Button size="sm" onClick={onPayNow} variant={status === 'active' ? "outline" : "default"}>
                        {status === 'active' ? 'Extend' : 'Pay via Monnify'}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
