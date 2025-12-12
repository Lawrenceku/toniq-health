'use client'

import React, { useState } from 'react'
import { PolicyCard } from '@/features/dashboard/PolicyCard'
import { QuickActions } from '@/features/dashboard/QuickActions'
import { PaymentModal } from '@/features/payments/PaymentModal'
import { useAuthStore } from '@/store/useAuthStore'
import { format } from 'date-fns'
import { Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

import { useUser } from '@/hooks/use-user'
import { Card } from '@/components/ui/card'
import { Wallet } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

export default function DashboardPage() {
    const { user: userProfile, transactions, balance, isLoading } = useUser()
    const { t } = useTranslation()
    const { user } = useAuthStore()
    // Fallback logic for user name
    const finalUser = userProfile || user

    // ... rest of state ...
    const [showPayment, setShowPayment] = useState(false)
    const [daysRemaining, setDaysRemaining] = useState(14)
    const [status, setStatus] = useState<'active' | 'inactive'>('active')

    const handlePaymentSuccess = () => {
        setDaysRemaining(30)
        setStatus('active')
    }

    // Fallback for user name
    const userName = finalUser?.name || 'User'
    const planName = finalUser?.plan ? finalUser?.plan.charAt(0).toUpperCase() + finalUser?.plan.slice(1) : 'Standard'

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{t('dashboard.welcome')}, {userName}</h1>
                    <p className="text-muted-foreground text-sm">{t('dashboard.welcomeBack')}</p>
                </div>
                <div className="relative p-2 bg-muted rounded-full">
                    <Bell className="w-5 h-5 text-foreground" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </div>
            </div>

            <PolicyCard
                status={status}
                daysRemaining={daysRemaining}
                planName={`${planName} Plan`}
                nextPaymentDate={format(new Date(Date.now() + daysRemaining * 24 * 60 * 60 * 1000), 'MMM dd, yyyy')}
                onPayNow={() => setShowPayment(true)}
            />

            {/* Wallet Balance Card - Mobile First */}
            <Card className="p-4 bg-primary text-primary-foreground">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-primary-foreground/80 text-sm">{t('dashboard.balance')}</span>
                    <Wallet className="w-5 h-5 text-primary-foreground/80" />
                </div>
                <div className="text-3xl font-bold">
                    ₦{balance?.toLocaleString() ?? '...'}
                </div>
            </Card>

            <div>
                <h2 className="text-lg font-semibold mb-3">{t('dashboard.quickActions')}</h2>
                <QuickActions />
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-3">{t('dashboard.recentActivity')}</h2>
                <div className="space-y-2">
                    {isLoading ? (
                        <div className="p-4 text-center text-muted-foreground text-sm">{t('common.loading')}</div>
                    ) : transactions?.map((tx: any) => (
                        <div key={tx.id} className="flex items-center justify-between p-3 bg-card border rounded-lg text-sm">
                            <div className="flex flex-col">
                                <span className="font-medium">{tx.title}</span>
                                <span className="text-xs text-muted-foreground">{tx.date}</span>
                            </div>
                            <span className={cn(
                                "font-bold",
                                tx.amount > 0 ? "text-green-500" : "text-red-500"
                            )}>
                                {tx.amount > 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <PaymentModal
                open={showPayment}
                onOpenChange={setShowPayment}
                amount={2500}
                onSuccess={handlePaymentSuccess}
            />
        </div>
    )
}
