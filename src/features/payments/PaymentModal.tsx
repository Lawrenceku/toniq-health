'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { CreditCard, Wallet, Banknote, Copy, CheckCircle2 } from 'lucide-react'

interface PaymentModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    amount: number
    onSuccess: () => void
}

export function PaymentModal({ open, onOpenChange, amount, onSuccess }: PaymentModalProps) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handlePayment = () => {
        setLoading(true)
        // Mock payment delay
        setTimeout(() => {
            setLoading(false)
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                onSuccess()
                onOpenChange(false)
            }, 1500)
        }, 2000)
    }

    if (success) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <div className="flex flex-col items-center justify-center p-6 space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <DialogTitle className="text-center">Payment Successful!</DialogTitle>
                        <DialogDescription className="text-center">
                            Your payment of ₦{amount.toLocaleString()} has been processed.
                        </DialogDescription>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Make Payment</DialogTitle>
                    <DialogDescription>
                        Pay your monthly premium of ₦{amount.toLocaleString()}
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="fiat" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="fiat">Monnify (Naira)</TabsTrigger>
                        <TabsTrigger value="crypto">Crypto (USDT)</TabsTrigger>
                    </TabsList>

                    <TabsContent value="fiat" className="space-y-4 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={handlePayment}>
                                <Banknote className="w-6 h-6" />
                                Transfer
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={handlePayment}>
                                <CreditCard className="w-6 h-6" />
                                Card
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or pay via USSD</span>
                            </div>
                        </div>
                        <Button variant="secondary" className="w-full" onClick={handlePayment}>
                            *737*... Dial USSD
                        </Button>
                    </TabsContent>

                    <TabsContent value="crypto" className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label>Wallet Address (Polygon/Celo)</Label>
                            <div className="flex items-center gap-2">
                                <Input readOnly value="0x71C...9A21" className="bg-muted font-mono text-xs" />
                                <Button size="icon" variant="outline"><Copy className="w-4 h-4" /></Button>
                            </div>
                            <p className="text-xs text-muted-foreground">Send USDT/USDC/cUSD to this address.</p>
                        </div>
                        <Button className="w-full" onClick={handlePayment} disabled={loading}>
                            {loading ? 'Confirming Transaction...' : 'I have sent the funds'}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Or connect wallet</span>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full">
                            <Wallet className="mr-2 w-4 h-4" /> Connect Wallet
                        </Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
