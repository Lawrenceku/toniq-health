'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTheme } from 'next-themes'
import { useTranslation } from '@/hooks/use-translation'
import { Moon, Sun, Monitor, Languages, Palette } from 'lucide-react'

export default function SettingsPage() {
    const { theme, setTheme } = useTheme()
    const { locale, setLocale, t } = useTranslation()

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your preferences and application settings.</p>
            </div>

            {/* Appearance Section */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Palette className="w-5 h-5 text-primary" />
                        <CardTitle>Appearance</CardTitle>
                    </div>
                    <CardDescription>Customize how Toniq Health looks on your device.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Theme Mode</Label>
                            <p className="text-sm text-muted-foreground">
                                Select your preferred interface style.
                            </p>
                        </div>
                        <div className="flex bg-muted p-1 rounded-lg">
                            <button
                                onClick={() => setTheme('light')}
                                className={`p-2 rounded-md transition-all ${theme === 'light' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}
                                title="Light Mode"
                            >
                                <Sun className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`p-2 rounded-md transition-all ${theme === 'dark' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}
                                title="Dark Mode"
                            >
                                <Moon className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setTheme('system')}
                                className={`p-2 rounded-md transition-all ${theme === 'system' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}
                                title="System Default"
                            >
                                <Monitor className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Language Section */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Languages className="w-5 h-5 text-primary" />
                        <CardTitle>Language (Yare)</CardTitle>
                    </div>
                    <CardDescription>Select your preferred language for the interface.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Display Language</Label>
                            <p className="text-sm text-muted-foreground">
                                This will adjust text across the dashboard.
                            </p>
                        </div>
                        <Select value={locale} onValueChange={(val: any) => setLocale(val)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">🇺🇸 English</SelectItem>
                                <SelectItem value="ha">🇳🇬 Hausa</SelectItem>
                                <SelectItem value="yo">🇳🇬 Yoruba</SelectItem>
                                <SelectItem value="ig">🇳🇬 Igbo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
