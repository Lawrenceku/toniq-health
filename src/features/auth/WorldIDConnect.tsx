'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScanFace, CheckCircle2 } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

export function WorldIDConnect() {
    const [status, setStatus] = useState<'idle' | 'verifying' | 'verified'>('idle')
    const updateUser = useAuthStore(state => state.updateUser)

    const handleVerify = async () => {
        setStatus('verifying')
        // Mock simulation delay
        setTimeout(() => {
            setStatus('verified')
            updateUser({ worldIdVerified: true })
        }, 2000)
    }

    if (status === 'verified') {
        return (
            <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-semibold">World ID Verified</span>
            </div>
        )
    }

    return (
        <Card className="border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <ScanFace className="w-5 h-5" />
                    Verify Unique Personhood
                </CardTitle>
                <CardDescription>
                    Prevent fraud and claim your unique identity to earn $HEALTH.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button
                    onClick={handleVerify}
                    disabled={status === 'verifying'}
                    className="w-full bg-black hover:bg-black/80 text-white"
                >
                    {status === 'verifying' ? 'Verifying...' : 'Sign in with World ID'}
                </Button>
            </CardContent>
        </Card>
    )
}
