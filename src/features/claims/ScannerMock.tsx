'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { QrCode, ShieldCheck, Loader2, ScanLine } from 'lucide-react'
import { api } from '@/lib/api-client'

export function ScannerMock() {
    const [status, setStatus] = useState<'idle' | 'scanning' | 'verified'>('idle')

    const handleScan = async () => {
        setStatus('scanning')
        // Simulate scanning and ZKP verification
        try {
            await api.hospital.verify('mock_zk_token_123');
            setStatus('verified');
        } catch (e) {
            console.error(e);
            setStatus('idle');
        }
    }

    const reset = () => setStatus('idle')

    if (status === 'verified') {
        return (
            <Card className="border-green-500 bg-green-500/10 transition-all duration-500">
                <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                        <ShieldCheck className="w-12 h-12 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl text-green-700">COVERAGE VERIFIED</CardTitle>
                    <p className="text-center text-sm text-green-800 font-medium">
                        Zero-Knowledge Proof Validated.
                        <br />
                        <span className="opacity-75 font-normal">No identity or balance revealed.</span>
                    </p>
                    <Button onClick={reset} size="sm" variant="ghost" className="text-green-700 hover:text-green-800 hover:bg-green-200">
                        Scan Next Patient
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="h-full flex flex-col justify-center">
            <CardHeader className="text-center pb-2">
                <CardTitle className="flex items-center justify-center gap-2">
                    <ScanLine className="w-5 h-5 text-primary" />
                    Patient Scanner
                </CardTitle>
                <CardDescription>Scan patient QR code to verify coverage privately.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 pt-4">
                <div className="relative group cursor-pointer" onClick={status === 'idle' ? handleScan : undefined}>
                    <div className="w-48 h-48 border-4 border-dashed border-muted-foreground/30 rounded-xl flex items-center justify-center bg-muted/20 relative overflow-hidden transition-colors group-hover:bg-muted/30">
                        {status === 'scanning' ? (
                            <>
                                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                                <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                                <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_20px_rgba(37,99,235,0.5)] animate-[scan_2s_linear_infinite]" />
                            </>
                        ) : (
                            <QrCode className="w-20 h-20 text-muted-foreground/50 group-hover:text-primary/50 transition-colors" />
                        )}
                    </div>
                </div>

                <Button
                    size="lg"
                    className="w-full max-w-xs font-bold"
                    onClick={handleScan}
                    disabled={status === 'scanning'}
                >
                    {status === 'scanning' ? 'Verifying ZK Proof...' : 'Simulate Scan'}
                </Button>
            </CardContent>
        </Card>
    )
}
