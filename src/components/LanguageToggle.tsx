'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

// Actually, let's use a simple Dialog/Select for MVP or just a cycle button 
// to avoid installing more heavy deps if possible. 
// But DropdownMenu is standard. I'll check if I have it. I don't think so.
// I'll use a simple cycle button for MVP speed.

export function LanguageToggle() {
    const [lang, setLang] = React.useState<'EN' | 'HA' | 'YO' | 'IG'>('EN')

    const toggle = () => {
        const next = lang === 'EN' ? 'HA' : lang === 'HA' ? 'YO' : lang === 'YO' ? 'IG' : 'EN'
        setLang(next)
        // alert(`Language switched to ${next === 'HA' ? 'Hausa' : next === 'YO' ? 'Yoruba' : next === 'IG' ? 'Igbo' : 'English'}`)
    }

    return (
        <Button variant="ghost" size="sm" onClick={toggle} className="w-9 px-0">
            <span className="font-bold text-xs mr-1">{lang}</span>
            <Globe className="h-4 w-4" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
