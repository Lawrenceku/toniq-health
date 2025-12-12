// 'use client'

// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'
// import { PlusCircle, MapPin, Gamepad2, Landmark } from 'lucide-react'

// const ACTIONS = [
//     { label: 'New Claim', icon: PlusCircle, href: '/dashboard/claims/new', color: 'text-primary' },
//     { label: 'Find Hospital', icon: MapPin, href: '/dashboard/hospitals', color: 'text-blue-500' },
//     { label: 'Play & Earn', icon: Gamepad2, href: '/dashboard/earn', color: 'text-secondary' },
//     { label: 'Get Loan', icon: Landmark, href: '/dashboard/loans', color: 'text-amber-600' },
// ]

// export function QuickActions() {
//     return (
//         <div className="grid grid-cols-2 gap-4">
//             {ACTIONS.map((action) => (
//                 <Link key={action.label} href={action.href}>
//                     <Card className="p-4 flex flex-col items-center justify-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer border shadow-sm h-32">
//                         <action.icon className={`w-8 h-8 ${action.color}`} />
//                         <span className="font-semibold text-sm">{action.label}</span>
//                     </Card>
//                 </Link>
//             ))}
//         </div>
//     )
// }


'use client'

import Link from 'next/link'
import { PlusCircle, MapPin, Gamepad2, Landmark } from 'lucide-react'

const ACTIONS = [

    { label: 'New Claim', icon: PlusCircle, href: '/dashboard/claims/new', bgColor: 'bg-green-500', iconColor: 'text-white' },
    { label: 'Find Hospital', icon: MapPin, href: '/dashboard/hospitals', bgColor: 'bg-green-500', iconColor: 'text-white' },
    { label: 'Play & Earn', icon: Gamepad2, href: '/dashboard/earn', bgColor: 'bg-green-500', iconColor: 'text-white' },
    { label: 'Get Loan', icon: Landmark, href: '/dashboard/loans', bgColor: 'bg-green-500', iconColor: 'text-white' },
]

const ICON_SIZE_CLASS = 'w-14 h-14 md:w-16 md:h-16' 

export function QuickActions() {
    return (
        <div className="flex justify-between md:justify-start md:gap-8 overflow-x-auto p-2">
            {ACTIONS.map((action) => (
                <Link key={action.label} href={action.href} className="flex-shrink-0">
                    <div className="flex flex-col items-center justify-center gap-2 text-center w-[70px] md:w-[80px]">
                        {/* Circular Icon Container */}
                        <div className={`
                            ${ICON_SIZE_CLASS} 
                            ${action.bgColor} 
                            rounded-full 
                            flex 
                            items-center 
                            justify-center 
                            shadow-md 
                            hover:opacity-80 
                            transition-opacity
                        `}>
                            {/* Icon inside the circle */}
                            <action.icon className={`w-8 h-8 ${action.iconColor}`} />
                        </div>
                        
                        {/* Label below the icon */}
                        <span className="text-xs font-medium text-foreground whitespace-nowrap">
                            {action.label}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    )
}