'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, UserPlus, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore, UserPlan } from '@/store/useAuthStore'

const PLANS = [
    {
        id: 'basic' as UserPlan,
        name: 'Basic',
        price: 1000,
        features: ['Malaria & Typhoid', 'General Consultation', 'Basic Medications'],
        color: 'bg-stone-500',
    },
    {
        id: 'standard' as UserPlan,
        name: 'Standard',
        price: 2500,
        features: ['All Basic +', 'Specialist Care', 'Dental & Eye Care (Basic)', 'X-Rays & Tests'],
        color: 'bg-primary',
        popular: true,
    },
    {
        id: 'premium' as UserPlan,
        name: 'Premium',
        price: 5000,
        features: ['All Standard +', 'Surgeries (Minor)', 'Antenatal Care', 'Gym Membership'],
        color: 'bg-amber-500',
    },
]

export function PlanSelection({ onComplete }: { onComplete: () => void }) {
    const [selected, setSelected] = useState<UserPlan>('standard')
    const [familyMembers, setFamilyMembers] = useState(0)

    const updateUser = useAuthStore(state => state.updateUser)

    const selectedPlanPrice = PLANS.find(p => p.id === selected)?.price || 0
    const total = selectedPlanPrice + (selectedPlanPrice * 0.5 * familyMembers)

    const handleContinue = () => {
        updateUser({
            plan: selected,
            // Mock generating IDs for family members
            familyMembers: Array(familyMembers).fill('family-id')
        })
        onComplete()
    }

    return (
        <div className="space-y-6 w-full max-w-lg mx-auto pb-20">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Choose Your Health Plan</h2>
                <p className="text-muted-foreground">Plans start from just ₦1,000/month.</p>
            </div>

            <div className="grid gap-4">
                {PLANS.map((plan) => (
                    <Card
                        key={plan.id}
                        className={cn(
                            "cursor-pointer transition-all border-2 relative overflow-hidden",
                            selected === plan.id ? "border-primary shadow-lg scale-105" : "border-border opacity-80 hover:opacity-100"
                        )}
                        onClick={() => setSelected(plan.id)}
                    >
                        {plan.popular && (
                            <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                                POPULAR
                            </div>
                        )}
                        <CardHeader className="pb-2">
                            <CardTitle className="flex justify-between items-center">
                                <span>{plan.name}</span>
                                <span className="text-xl">₦{plan.price.toLocaleString()}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-muted/50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                        <Users className="w-4 h-4" /> Add Family Members
                    </CardTitle>
                    <CardDescription>
                        Get 50% discount for each additional family member.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline" size="icon"
                            onClick={() => setFamilyMembers(Math.max(0, familyMembers - 1))}
                            disabled={familyMembers === 0}
                        >
                            -
                        </Button>
                        <span className="text-xl font-bold w-4 text-center">{familyMembers}</span>
                        <Button
                            variant="outline" size="icon"
                            onClick={() => setFamilyMembers(familyMembers + 1)}
                        >
                            +
                        </Button>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Extra Cost</p>
                        <p className="font-bold">₦{(selectedPlanPrice * 0.5 * familyMembers).toLocaleString()}</p>
                    </div>
                </CardContent>
            </Card>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
                <div className="container max-w-lg flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground">Total Monthly</p>
                        <p className="text-xl font-bold text-primary">₦{total.toLocaleString()}</p>
                    </div>
                    <Button size="lg" onClick={handleContinue}>
                        Continue to Payment
                    </Button>
                </div>
            </div>
        </div>
    )
}
