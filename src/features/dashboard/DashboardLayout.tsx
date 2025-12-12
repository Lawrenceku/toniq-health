'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Coins, Banknote, History, ExternalLink, User as UserIcon, Vote, HeartPulse, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useUser } from '@/hooks/use-user'
import { useTranslation } from '@/hooks/use-translation'
import { useState, useEffect } from 'react'
import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'


export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { balance, isLoading } = useUser()
    const { t } = useTranslation()
    const [userImage, setUserImage] = useState<string | null>(null)

    useEffect(() => {
        const storedImage = localStorage.getItem('userProfileImage')
        if (storedImage) {
            setUserImage(storedImage)
        }
    }, [])

    const NAV_ITEMS = [
        { label: t('dashboard.tabs.home'), href: '/dashboard', icon: Home },
        { label: t('dashboard.tabs.health'), href: '/dashboard/health', icon: HeartPulse },
        { label: t('dashboard.tabs.loans'), href: '/dashboard/loans', icon: Banknote },
        { label: t('dashboard.tabs.earn'), href: '/dashboard/earn', icon: Coins },
        { label: t('dashboard.tabs.community'), href: '/dashboard/dao', icon: Vote },
        { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-muted/20">
            {/* Mobile-first Header */}
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between">
                    <Link href="/dashboard" className="font-bold flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary rounded-full" />
                        <span><span className="text-foreground">Toniq</span><span className="text-primary">Health</span></span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="text-xs font-mono bg-muted px-2 py-1 rounded hidden md:block">
                            {isLoading ? '...' : (balance ?? 0)} Tokens
                        </div>
                        <Link href="/dashboard/profile">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                                {userImage ? (
                                    <img src={userImage} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                    <UserIcon className="h-4 w-4" />
                                )}
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 container pb-20 pt-4">
                {children}
            </main>

            {/* Bottom Navigation for Mobile */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background h-16 pb-safe">
                <div className="container h-full flex items-center justify-around">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
                                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive && "fill-current")} />
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </div>
    )
}

