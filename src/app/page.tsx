'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShieldCheck, HeartPulse, Coins } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 flex items-center justify-between border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
            <HeartPulse className="w-5 h-5" />
          </div>
          Toniq
        </div>
        <Button variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-6 bg-gradient-to-b from-primary/10 to-transparent">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Health Insurance for <span className="text-primary">Everyone</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md text-balance">
            Instant coverage from ₦800/month. Earn tokens while staying healthy to pay for it.
          </p>
          <div className="flex flex-col w-full max-w-xs gap-3">
            <Button size="lg" className="w-full text-lg h-12" asChild>
              <Link href="/onboarding">Get Insured Now</Link>
            </Button>
            <p className="text-xs text-muted-foreground">No paperwork. Instant activation.</p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 container mx-auto">
          <div className="p-6 rounded-2xl bg-card border shadow-sm">
            <ShieldCheck className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-bold text-lg">Instant Claims</h3>
            <p className="text-muted-foreground text-sm">Get paid in minutes, not weeks, thanks to AI verification.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border shadow-sm">
            <Coins className="w-10 h-10 text-secondary mb-4" />
            <h3 className="font-bold text-lg">Play-to-Earn</h3>
            <p className="text-muted-foreground text-sm">Complete health quizzes and checkups to earn $HEALTH tokens.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border shadow-sm">
            <HeartPulse className="w-10 h-10 text-red-500 mb-4" />
            <h3 className="font-bold text-lg">Community DAO</h3>
            <p className="text-muted-foreground text-sm">We pool resources together. You vote on how funds are used.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
