'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge' // Need Badge
import { ShieldAlert, Check, X } from 'lucide-react'

// Mock Data
const FLAGGED_CLAIMS = [
    { id: 'CLM-8830', hospital: 'Lagoon Hospital', patient: 'Musa Ibrahim', amount: 120000, reason: 'High Value (>50k)', time: '1 hour ago' },
    { id: 'CLM-8821', hospital: 'Reddington', patient: 'Grace Eze', amount: 15000, reason: 'Duplicate Submission', time: '3 hours ago' },
]

export default function AdminDashboard() {
    return (
        <div className="container mx-auto p-4 space-y-6 max-w-5xl">
            <header className="pb-6 border-b">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Review flagged claims and manage system parameters.</p>
            </header>

            <div className="grid gap-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <ShieldAlert className="text-amber-500" />
                    Requires Attention ({FLAGGED_CLAIMS.length})
                </h2>

                {FLAGGED_CLAIMS.map((claim) => (
                    <Card key={claim.id}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{claim.hospital}</CardTitle>
                                    <CardDescription>Patient: {claim.patient} • ID: {claim.id}</CardDescription>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-xl">₦{claim.amount.toLocaleString()}</span>
                                    <div className="text-xs text-destructive font-semibold bg-destructive/10 px-2 py-0.5 rounded mt-1">
                                        {claim.reason}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="py-2">
                            <div className="bg-muted p-3 rounded text-sm font-mono text-muted-foreground">
                                diagnosis_code: A09 <br />
                                ai_confidence: 0.45 <br />
                                prev_claims_total: 450,000
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end gap-2 bg-muted/20 py-3">
                            <Button variant="destructive" size="sm">
                                <X className="w-4 h-4 mr-1" /> Reject
                            </Button>
                            <Button variant="default" className="bg-green-600 hover:bg-green-700" size="sm">
                                <Check className="w-4 h-4 mr-1" /> Approve
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
