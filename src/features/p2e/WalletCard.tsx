'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Coins, TrendingUp } from 'lucide-react'

export function WalletCard({ balance }: { balance: number }) {
    const nairaValue = (balance / 1.5).toFixed(2) // 1.5 tokens = 1 naira approx

    return (
        <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-secondary-foreground">
                    Health Token Balance
                </CardTitle>
                <Coins className="w-5 h-5 text-secondary-foreground" />
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-secondary-foreground">{balance.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">$HEALTH</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>Worth ≈ ₦{nairaValue}</span>
                </div>
            </CardContent>
        </Card>
    )
}
