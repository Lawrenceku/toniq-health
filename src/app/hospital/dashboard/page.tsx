'use client'

import React from 'react'
import { HospitalClaimForm } from '@/features/claims/HospitalClaimForm'
import { ScannerMock } from '@/features/claims/ScannerMock'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Archive, CheckCircle } from 'lucide-react'

export default function HospitalDashboard() {
    return (
        <div className="container mx-auto p-4 space-y-6 max-w-4xl">
            <header className="flex items-center justify-between pb-6 border-b">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Activity className="text-primary" /> Hospital Portal
                </h1>
                <div className="text-sm font-mono bg-muted px-3 py-1 rounded">
                    Wallet: ₦850,000.00
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <ScannerMock />
                    <HospitalClaimForm />
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Recent Claims</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { id: 'CLM-8832', patient: 'John Doe', amount: '12,500', status: 'Paid', time: '2 mins ago' },
                                { id: 'CLM-8831', patient: 'Sarah Oba', amount: '45,000', status: 'Paid', time: '15 mins ago' },
                                { id: 'CLM-8830', patient: 'Musa Ibrahim', amount: '120,000', status: 'In Review', time: '1 hour ago' },
                            ].map((claim) => (
                                <div key={claim.id} className="flex items-center justify-between p-3 border rounded-lg bg-card shadow-sm">
                                    <div>
                                        <p className="font-bold text-sm">{claim.patient}</p>
                                        <p className="text-xs text-muted-foreground">{claim.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">₦{claim.amount}</p>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${claim.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {claim.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-primary/5 border-primary/20">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <CheckCircle className="w-8 h-8 text-primary mb-2" />
                                <span className="text-2xl font-bold">142</span>
                                <span className="text-xs text-muted-foreground">Claims Paid (Today)</span>
                            </CardContent>
                        </Card>
                        <Card className="bg-muted">
                            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                <Archive className="w-8 h-8 text-muted-foreground mb-2" />
                                <span className="text-2xl font-bold">5</span>
                                <span className="text-xs text-muted-foreground">Pending Review</span>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
