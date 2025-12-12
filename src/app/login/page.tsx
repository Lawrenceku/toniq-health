'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { User, Activity, Wallet, ArrowRight, Loader2, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | null>(null)
    const [isConnecting, setIsConnecting] = useState(false)

    const handlePatientLogin = () => {
        // Simulate login delay if needed, or just redirect
        router.push('/dashboard')
    }

    const handleDoctorLogin = async () => {
        setIsConnecting(true)
        // Simulate wallet connection delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        router.push('/hospital/dashboard')
    }

    return (
        <div className="bg-background border rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 min-h-[600px]">
                {/* Left Side - Visual/Info */}
                <div className="bg-primary p-8 md:p-12 flex flex-col justify-between text-primary-foreground relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 font-bold text-2xl mb-2">
                            <Activity className="w-8 h-8" />
                            ToniqHealth
                        </div>
                        <p className="text-primary-foreground/80">Next Gen Health Insurance</p>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            {selectedRole === 'doctor'
                                ? "Provider Portal Access"
                                : "Your Health, Your Wealth"}
                        </h2>
                        <p className="text-lg text-primary-foreground/80 max-w-sm">
                            {selectedRole === 'doctor'
                                ? "Manage claims, verify patients, and receive instant payouts securely."
                                : "Access instant coverage, earn rewards, and manage your health journey."}
                        </p>
                    </div>

                    {/* Abstract decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl z-0" />
                </div>

                {/* Right Side - Action/Form */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    {selectedRole === null ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Welcome Back</h3>
                                <p className="text-muted-foreground">Choose how you want to continue</p>
                            </div>

                            <div className="grid gap-4">
                                <Card
                                    className="cursor-pointer hover:border-primary transition-all hover:bg-muted/50 group"
                                    onClick={() => setSelectedRole('patient')}
                                >
                                    <CardContent className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold">Patient</h4>
                                                <p className="text-sm text-muted-foreground">Personal health account</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </CardContent>
                                </Card>

                                <Card
                                    className="cursor-pointer hover:border-primary transition-all hover:bg-muted/50 group"
                                    onClick={() => setSelectedRole('doctor')}
                                >
                                    <CardContent className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                                <Activity className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold">Doctor / Provider</h4>
                                                <p className="text-sm text-muted-foreground">Hospital management</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="text-center">
                                <Link href="/" className="text-sm text-muted-foreground hover:text-primary underline">
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <button
                                onClick={() => setSelectedRole(null)}
                                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" /> Back
                            </button>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">
                                    {selectedRole === 'patient' ? 'Patient Login' : 'Provider Access'}
                                </h3>
                                <p className="text-muted-foreground">
                                    {selectedRole === 'patient'
                                        ? 'Access your dashboard securely'
                                        : 'Connect your secure wallet to continue'}
                                </p>
                            </div>

                            {selectedRole === 'patient' ? (
                                <div className="space-y-4">
                                    {/* Mock Patient Form - or just a button for MVP */}
                                    <div className="space-y-3">
                                        <div className="h-12 bg-muted/50 rounded-md border w-full flex items-center px-4 text-muted-foreground text-sm">
                                        <input className=' outline-0 w-full h-full' placeholder='example@gmail.com'>
                                        </input>
                                        </div>
                                        <Button onClick={handlePatientLogin} className="w-full h-12 text-lg">
                                            Continue to Dashboard
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Doctor Wallet Connect */}
                                    <div className="p-6 border rounded-xl bg-muted/10 flex flex-col items-center justify-center gap-4 text-center">
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Wallet className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-bold">Secure Connection</h4>
                                            <p className="text-sm text-muted-foreground">Connect your authorized hospital wallet</p>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleDoctorLogin}
                                        className="w-full h-12 text-lg"
                                        disabled={isConnecting}
                                    >
                                        {isConnecting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Verifying Credentials...
                                            </>
                                        ) : (
                                            "Connect Wallet"
                                        )}
                                    </Button>

                                    <p className="text-xs text-center text-muted-foreground">
                                        By connecting, you verify your status as an authorized healthcare provider.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
