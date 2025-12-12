'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { WorldIDConnect } from '@/features/auth/WorldIDConnect'
import { ShieldAlert, UserCheck, Users } from 'lucide-react'

interface IdentificationFormProps {
    onComplete: () => void
}

export function IdentificationForm({ onComplete }: IdentificationFormProps) {
    const [nin, setNin] = useState('')
    const [socialKey, setSocialKey] = useState('')

    // Basic validation: NIN should be present (e.g., 11 chars)
    const isValid = nin.length >= 11

    return (
        <div className="space-y-8 max-w-md mx-auto pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Verify Your Identity</h2>
                <p className="text-muted-foreground">Complete these steps to unlock full benefits</p>
            </div>

            <div className="space-y-6">
                {/* 1. National Identity */}
                <Card>
                    <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center gap-2 font-semibold text-primary">
                            <ShieldAlert className="w-5 h-5" />
                            <span>National Identity</span>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nin">NIN / BVN Number</Label>
                            <Input
                                id="nin"
                                placeholder="Enter your 11-digit NIN or BVN"
                                value={nin}
                                onChange={(e) => setNin(e.target.value.replace(/\D/g, '').slice(0, 11))}
                                type="tel"
                            />
                            <p className="text-xs text-muted-foreground">
                                Your ID is encrypted and used only for verification.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Social Statement (Optional) */}
                <Card>
                    <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center gap-2 font-semibold text-primary">
                            <Users className="w-5 h-5" />
                            <span>Social Voucher (Optional)</span>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="social">Vouch Key</Label>
                            <Input
                                id="social"
                                placeholder="Enter code from a friend"
                                value={socialKey}
                                onChange={(e) => setSocialKey(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                                Get extra rewards if someone referred you.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. World ID */}
                <Card>
                    <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center gap-2 font-semibold text-primary">
                            <UserCheck className="w-5 h-5" />
                            <span>World ID Verification</span>
                        </div>
                        <div className="py-2">
                            <WorldIDConnect />
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                            Verify your uniqueness as a human.
                        </p>
                    </CardContent>
                </Card>

                <Button
                    className="w-full h-12 text-lg"
                    disabled={!isValid}
                    onClick={onComplete}
                >
                    Continue
                </Button>
            </div>
        </div>
    )
}
