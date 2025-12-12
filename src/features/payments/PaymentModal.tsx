'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CreditCard, Wallet, Banknote, Copy, CheckCircle2, Phone, GraduationCap, Building2 } from 'lucide-react'

interface PaymentModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    amount: number
    onSuccess: () => void
}

export function PaymentModal({ open, onOpenChange, amount, onSuccess }: PaymentModalProps) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [tab, setTab] = useState("card")

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
            }, 2000)
        }, 2000)
    }

    if (success) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <div className="flex flex-col items-center justify-center p-6 space-y-4 animate-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <DialogTitle className="text-center text-xl">Payment Successful!</DialogTitle>
                        <DialogDescription className="text-center">
                            Your payment of <span className="font-bold text-foreground">₦{amount.toLocaleString()}</span> has been processed securely.
                        </DialogDescription>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden">
                <div className="p-6 pb-0">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-xl">Make Payment</DialogTitle>
                        <DialogDescription>
                            Complete your subscription of <span className="font-bold text-primary">₦{amount.toLocaleString()}</span>
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <Tabs defaultValue="card" onValueChange={setTab} className="w-full">
                    <div className="px-6">
                        <TabsList className="grid w-full grid-cols-4 h-12">
                            <TabsTrigger value="card" className="flex flex-col gap-1 text-[10px] h-full">
                                <CreditCard className="w-4 h-4" /> Card
                            </TabsTrigger>
                            <TabsTrigger value="ussd" className="flex flex-col gap-1 text-[10px] h-full">
                                <Phone className="w-4 h-4" /> USSD
                            </TabsTrigger>
                            <TabsTrigger value="transfer" className="flex flex-col gap-1 text-[10px] h-full">
                                <Building2 className="w-4 h-4" /> Transfer
                            </TabsTrigger>
                            <TabsTrigger value="crypto" className="flex flex-col gap-1 text-[10px] h-full">
                                <Wallet className="w-4 h-4" /> Crypto
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="p-6 pt-4 bg-muted/20 min-h-[300px]">
                        {/* CARD PAYMENT */}
                        <TabsContent value="card" className="space-y-4 mt-0">
                            <div className="space-y-2">
                                <Label>Card Number</Label>
                                <Input placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Expiry</Label>
                                    <Input placeholder="MM/YY" />
                                </div>
                                <div className="space-y-2">
                                    <Label>CVV</Label>
                                    <Input placeholder="123" />
                                </div>
                            </div>
                            <Button className="w-full h-11 mt-2" onClick={handlePayment} disabled={loading}>
                                {loading ? 'Processing...' : `Pay ₦${amount.toLocaleString()}`}
                            </Button>
                            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-green-500" /> Secured by Paystack
                            </p>
                        </TabsContent>

                        {/* USSD PAYMENT */}
                        <TabsContent value="ussd" className="space-y-4 mt-0">
                            <div className="space-y-2">
                                <Label>Select Bank</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose your bank" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="gtb">GTBank (*737#)</SelectItem>
                                        <SelectItem value="zenith">Zenith Bank (*966#)</SelectItem>
                                        <SelectItem value="uba">UBA (*919#)</SelectItem>
                                        <SelectItem value="access">Access Bank (*901#)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="p-4 border-2 border-dashed rounded-lg bg-background text-center space-y-2">
                                <p className="text-sm text-muted-foreground">Dial the code below to pay:</p>
                                <p className="text-2xl font-mono font-bold text-primary">*737*2*5000*2500#</p>
                            </div>

                            <Button className="w-full h-11" variant="outline" onClick={handlePayment} disabled={loading}>
                                {loading ? 'Confirming...' : 'I have completed the payment'}
                            </Button>
                        </TabsContent>

                        {/* TRANSFER PAYMENT */}
                        <TabsContent value="transfer" className="space-y-4 mt-0">
                            <div className="p-4 border rounded-lg bg-white dark:bg-zinc-950 space-y-4">
                                <div className="flex justify-between items-center pb-2 border-b">
                                    <span className="text-sm text-muted-foreground">Bank Name</span>
                                    <span className="font-bold flex items-center gap-1">
                                        <Building2 className="w-4 h-4 text-purple-600" /> Moniepoint MFB
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b">
                                    <span className="text-sm text-muted-foreground">Account Number</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono font-bold text-lg">8231023901</span>
                                        <Copy className="w-4 h-4 text-muted-foreground cursor-pointer" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Beneficiary</span>
                                    <span className="font-medium">Toniq Health Ltd</span>
                                </div>
                            </div>

                            <div className="text-xs text-amber-600 bg-amber-100 dark:bg-amber-900/30 p-3 rounded-md">
                                ⚠️ Make transfer of exactly ₦{amount.toLocaleString()} to the account above. It expires in 30 minutes.
                            </div>

                            <Button className="w-full h-11" onClick={handlePayment} disabled={loading}>
                                {loading ? 'Verifying Transfer...' : 'I have sent the money'}
                            </Button>
                        </TabsContent>

                        {/* CRYPTO PAYMENT */}
                        <TabsContent value="crypto" className="space-y-4 mt-0">
                            <div className="space-y-4">
                                <div className="flex justify-center">
                                    {/* Mock QR */}
                                    <div className="w-32 h-32 bg-white p-2 rounded-lg">
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0x71C7656EC7ab88b098defB751B7401B5f6d89A21" alt="QR" className="w-full h-full" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Wallet Address (Polygon/Celo/Base)</Label>
                                    <div className="flex items-center gap-2">
                                        <Input readOnly value="0x71C...9A21" className="bg-background font-mono text-xs" />
                                        <Button size="icon" variant="outline"><Copy className="w-4 h-4" /></Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground text-center">Send <span className="font-bold text-white">USDT/USDC</span> to this address.</p>
                                </div>
                            </div>

                            <Button className="w-full h-11" onClick={handlePayment} disabled={loading}>
                                {loading ? 'Scanning Blockchain...' : 'Verify Transaction'}
                            </Button>

                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Or connect wallet</span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full">
                                <Wallet className="mr-2 w-4 h-4" /> Connect Metamask / Rainbow
                            </Button>
                        </TabsContent>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
