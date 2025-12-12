'use client'

import React from 'react'
import Link from 'next/link'
import { PlusCircle, MapPin, Gamepad2, Landmark } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

const ICON_SIZE_CLASS = 'w-14 h-14 md:w-16 md:h-16'

export function QuickActions() {
    const { t } = useTranslation()

    const ACTIONS = [
        { label: t('actions.newClaim'), icon: PlusCircle, href: '/dashboard/claims/new', bgColor: 'bg-green-500', iconColor: 'text-white' },
        { label: t('actions.findHospital'), icon: MapPin, href: '/dashboard/hospitals', bgColor: 'bg-green-500', iconColor: 'text-white' },
        { label: t('actions.playEarn'), icon: Gamepad2, href: '/dashboard/earn', bgColor: 'bg-green-500', iconColor: 'text-white' },
        { label: t('actions.getLoan'), icon: Landmark, href: '/dashboard/loans', bgColor: 'bg-green-500', iconColor: 'text-white' },
    ]

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