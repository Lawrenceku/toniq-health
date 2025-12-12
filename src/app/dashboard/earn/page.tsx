'use client'

import React, { useState } from 'react'
import { WalletCard } from '@/features/p2e/WalletCard'
import { ActivityFeed, ActivityType } from '@/features/p2e/ActivityFeed'
import { QuizModal } from '@/features/p2e/QuizComponent'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, Activity, Database } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useStepTracker } from '@/hooks/use-step-tracker'
import { Footprints } from 'lucide-react'
// Mock Questions
const QUESTIONS = [
    { id: 1, text: "Which of these is a symptom of Malaria?", options: ["High Fever", "Broken Bone", "Toothache", "Hair Loss"], correctIndex: 0 },
    { id: 2, text: "How often should you drink water?", options: ["Once a week", "Only when sick", "Daily (Recommended 2-3L)", "Never"], correctIndex: 2 },
    { id: 3, text: "What protects you from Typhoid?", options: ["Eating raw meat", "Washing hands & proper hygiene", "Sharing spoons", "Walking barefoot"], correctIndex: 1 },
]

export default function EarnPage() {
    const { steps, isSupported, requestPermission, permissionGranted, resetSteps } = useStepTracker()
    const [balance, setBalance] = useState(450)
    const [quizOpen, setQuizOpen] = useState(false)
    const [uploadOpen, setUploadOpen] = useState(false)

    const handleStartActivity = (type: ActivityType) => {
        if (type === 'quiz') setQuizOpen(true)
        if (type === 'checkup') setUploadOpen(true)
        if (type === 'referral') {
            // Implement share logic or copy link
            alert("Referral link copied to clipboard!")
        }
    }

    const handleQuizComplete = (score: number) => {
        if (score >= 2) { // 2/3 pass
            setBalance(b => b + 50)
        }
    }

    const handleUpload = () => {
        // Mock upload
        setUploadOpen(false)
        // In real app, pending verification. For MVP we can just say "Under Review"
        alert("Report uploaded! You will receive 300 $HEALTH after AI verification.")
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">Play to Earn</h1>
                <p className="text-muted-foreground">Complete tasks, stay healthy, and pay your premiums.</p>
            </div>

            <WalletCard balance={balance} />

            {/* Move to Earn Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-green-500" /> Move-to-Earn
                    </CardTitle>
                    <CardDescription>Sync your steps to earn tokens.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <div>
                        <div className="flex items-baseline gap-1">
                            <p className="text-3xl font-bold transition-all">{steps.toLocaleString()}</p>
                            <span className="text-xs text-muted-foreground uppercase">Steps</span>
                        </div>
                        {!permissionGranted && isSupported && (
                            <p className="text-xs text-amber-600 mt-1 cursor-pointer hover:underline" onClick={requestPermission}>
                                ⚠️ Tap to enable step counting
                            </p>
                        )}
                        {!isSupported && <p className="text-xs text-muted-foreground mt-1">Sensor not available</p>}
                    </div>
                    <Button onClick={() => {
                        if (steps < 100) {
                            alert("Walk at least 100 steps to claim!")
                            return
                        }
                        const earned = Math.floor(steps / 100) // 1 token per 100 steps
                        setBalance(b => b + earned)
                        resetSteps()
                        alert(`${earned} Tokens Claimed! Keep walking!`)
                    }}>
                        <Footprints className="w-4 h-4 mr-2" /> Sync & Claim
                    </Button>
                </CardContent>
            </Card>

            {/* ... Rest of code ... */}

            {/* DeSci Data Share */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database className="w-5 h-5 text-blue-500" /> DeSci Data Vault
                    </CardTitle>
                    <CardDescription>Share anonymized health data for research.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="font-medium">Pfizer Malaria Research</p>
                        <p className="text-xs text-muted-foreground">Pays ₦500 / week</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Off</span>
                        <Switch onChange={(e) => {
                            if (e.target.checked) {
                                setTimeout(() => alert("Pfizer Research paid ₦500 for your data. Your wallet was credited."), 1000)
                            }
                        }} />
                        <span className="text-sm font-medium">On</span>
                    </div>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-lg font-semibold mb-3">Other Activities</h2>
                <ActivityFeed onStartActivity={handleStartActivity} />
            </div>

            <QuizModal
                open={quizOpen}
                onOpenChange={setQuizOpen}
                questions={QUESTIONS} // Should be randomized daily
                onComplete={handleQuizComplete}
            />

            <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload Medical Report</DialogTitle>
                        <DialogDescription>Take a clear photo of your hospital card/report.</DialogDescription>
                    </DialogHeader>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <div className="flex items-center gap-2 border-2 border-dashed rounded-lg p-6 justify-center cursor-pointer hover:bg-muted/50">
                            <Upload className="w-6 h-6 text-muted-foreground" />
                            <span className="text-muted-foreground text-sm">Tap to capture</span>
                        </div>
                        <Input id="picture" type="file" className="hidden" />
                    </div>
                    <Button onClick={handleUpload}>Submit for Verification</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}
