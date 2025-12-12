'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress' // Need to implement progress or use div
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Vote, Coins, ThumbsUp, ThumbsDown } from 'lucide-react'

// Mock Data
const PROPOSALS = [
    { id: 1, title: 'Fund Emergency Heart Surgery for #User882', description: 'Patient requires ₦2.5m for valve replacement. Community pool reserves sufficient.', for: 85, against: 15, status: 'Active' },
    { id: 2, title: 'Increase Premium Discount for Stakers to 25%', description: 'Proposal to increase incentives for long-term holding.', for: 40, against: 60, status: 'Active' },
]

export default function DaoPage() {
    const [staked, setStaked] = useState(0)
    const [amount, setAmount] = useState('')
    const [voting, setVoting] = useState<number | null>(null)

    const handleStake = () => {
        setStaked(s => s + Number(amount))
        setAmount('')
    }

    const [showConfetti, setShowConfetti] = useState(false)

    const handleVote = (id: number) => {
        setVoting(id)
        setTimeout(() => {
            setVoting(null)
            setShowConfetti(true)
            // Reset confetti after animation
            setTimeout(() => setShowConfetti(false), 3000)
            alert("Pledge Submitted. Vote Logged. You own 0.0001% of the Protocol.")
        }, 1500)
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Vote className="text-primary" /> Community DAO
                </h1>
                <p className="text-muted-foreground">Stake tokens to govern the platform and earn yields.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Coins className="w-5 h-5" /> Staking Vault
                        </CardTitle>
                        <CardDescription>Earn 6% APY + Voting Power (xHEALTH)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-end border-b pb-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Your Stake</p>
                                <p className="text-3xl font-bold">{staked.toLocaleString()} HEALTH</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Rewards Earned</p>
                                <p className="text-xl font-bold text-green-500">+{Math.floor(staked * 0.06 / 12).toLocaleString()} HEALTH</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Amount to stake"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <Button onClick={handleStake}>Stake</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Governance Power</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span>Voting Weight</span>
                            <span className="font-bold">{staked} xHEALTH</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Total DAO Treasury</span>
                            <span className="font-bold">₦45,200,500</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Treasury held in Gnosis Safe Multisig (5-of-9).</p>
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-3">Active Proposals</h2>
                <div className="space-y-4">
                    {PROPOSALS.map((prop) => (
                        <Card key={prop.id}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between">
                                    <CardTitle className="text-base">{prop.title}</CardTitle>
                                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded h-fit">
                                        {prop.status}
                                    </span>
                                </div>
                                <CardDescription>{prop.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="py-2">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-green-600">For {prop.for}%</span>
                                        <span className="text-red-600">Against {prop.against}%</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden flex">
                                        <div className="h-full bg-green-500" style={{ width: `${prop.for}%` }} />
                                        <div className="h-full bg-red-500" style={{ width: `${prop.against}%` }} />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="gap-2 pt-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                                    onClick={() => handleVote(prop.id)}
                                >
                                    <ThumbsUp className="w-4 h-4 mr-2" /> Vote For
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                                    onClick={() => handleVote(prop.id)}
                                >
                                    <ThumbsDown className="w-4 h-4 mr-2" /> Vote Against
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="animate-bounce text-6xl">🎉</div>
                    <div className="absolute top-10 left-1/4 animate-ping text-4xl">🎊</div>
                    <div className="absolute top-20 right-1/4 animate-bounce text-5xl">✨</div>
                    <div className="absolute bottom-1/3 left-10 animate-pulse text-4xl">🎈</div>
                    <div className="absolute bottom-1/4 right-10 animate-ping text-5xl">🥂</div>
                </div>
            )}
        </div>
    )
}
