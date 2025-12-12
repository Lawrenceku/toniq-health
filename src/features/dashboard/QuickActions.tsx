'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PlusCircle, MapPin, Gamepad2, Landmark } from 'lucide-react'

const ACTIONS = [
    { label: 'New Claim', icon: PlusCircle, href: '/dashboard/claims/new', color: 'text-primary' },
    { label: 'Find Hospital', icon: MapPin, href: '/dashboard/hospitals', color: 'text-blue-500' },
    { label: 'Play & Earn', icon: Gamepad2, href: '/dashboard/earn', color: 'text-secondary' },
    { label: 'Get Loan', icon: Landmark, href: '/dashboard/loans', color: 'text-amber-600' },
]

export function QuickActions() {
    return (
        <div className="grid grid-cols-2 gap-4">
            {ACTIONS.map((action) => (
                <Link key={action.label} href={action.href}>
                    <Card className="p-4 flex flex-col items-center justify-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer border shadow-sm h-32">
                        <action.icon className={`w-8 h-8 ${action.color}`} />
                        <span className="font-semibold text-sm">{action.label}</span>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
