'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, dictionaries } from '@/lib/i18n';

// Helper to get nested object value by string path (e.g. "dashboard.welcome")
function getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || path;
}

type LanguageContextType = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Default to English, or check localStorage if persisted
    const [locale, setLocaleState] = useState<Locale>('en');

    useEffect(() => {
        const stored = localStorage.getItem('toniq-locale') as Locale;
        if (stored && ['en', 'ha', 'yo', 'ig'].includes(stored)) {
            setLocaleState(stored);
        }
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('toniq-locale', newLocale);
    };

    const t = (key: string) => {
        const dict = dictionaries[locale];
        return getNestedValue(dict, key);
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
}
