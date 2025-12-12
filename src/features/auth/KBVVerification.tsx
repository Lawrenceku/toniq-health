'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function KBVVerification() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Identity Verification</CardTitle>
                <CardDescription>Answer security questions to recover your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>What is your mother's maiden name?</Label>
                    <Input placeholder="Answer" />
                </div>
                <Button className="w-full">Verify Identity</Button>
            </CardContent>
        </Card>
    )
}
