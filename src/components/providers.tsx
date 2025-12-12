'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/hooks/use-translation'
import React from 'react'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}
