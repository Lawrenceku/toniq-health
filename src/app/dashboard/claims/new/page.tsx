'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronLeft, Upload, Loader2, CheckCircle2, ScanLine, Sparkles, FileText } from 'lucide-react'

export default function NewClaimPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    // AI Scanning States
    const [isScanning, setIsScanning] = useState(false)
    const [scanProgress, setScanProgress] = useState(0)
    const [scanStatus, setScanStatus] = useState("Initializing AI...")
    const [scannedData, setScannedData] = useState<any>(null)
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)

    // Form Data
    const [formData, setFormData] = useState({
        type: "",
        amount: "",
        date: "",
        provider: "",
        desc: ""
    })

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setUploadedFile(file)
            startAIScan(file)
        }
    }

    const startAIScan = async (file: File) => {
        setIsScanning(true)
        setScanProgress(0)

        // Step 1: Uploading
        setScanStatus("Uploading receipt securely...")
        await new Promise(r => setTimeout(r, 800))
        setScanProgress(30)

        // Step 2: OCR
        setScanStatus("Extracting text with AI...")
        await new Promise(r => setTimeout(r, 1200))
        setScanProgress(60)

        // Step 3: Analyzing
        setScanStatus("Analyzing medical codes & prices...")
        await new Promise(r => setTimeout(r, 1000))
        setScanProgress(100)

        // Complete
        setIsScanning(false)

        // Mock Extracted Data
        const mockData = {
            amount: "45000",
            date: new Date().toISOString().split('T')[0],
            provider: "Lagoon Hospital, Ikoyi",
            type: "consultation",
            desc: "General consultation and malaria treatment based on attached invoice."
        }

        setScannedData(mockData)
        setFormData(prev => ({ ...prev, ...mockData })) // Autofill
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 2000))

        setIsLoading(false)
        setIsSuccess(true)

        // Redirect after showing success
        setTimeout(() => {
            router.push('/dashboard')
        }, 2000)
    }

    if (isSuccess) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold">Claim Submitted!</h2>
                <p className="text-muted-foreground max-w-xs mx-auto">
                    Your claim #CLM-{Math.floor(Math.random() * 10000)} has been received. You will be notified once reviewed.
                </p>
                <Button onClick={() => router.push('/dashboard')} variant="outline">
                    Return to Dashboard
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">New Claim</h1>
                    <p className="text-muted-foreground text-sm">Submit a reimbursement request</p>
                </div>
            </div>

            <Card className="border-primary/20 shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-500" />
                        AI Auto-Fill
                    </CardTitle>
                    <CardDescription>Upload your receipt first. Our AI will extract the details for you.</CardDescription>
                </CardHeader>
                <CardContent>
                    {!uploadedFile ? (
                        <div className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors relative"
                            onClick={() => document.getElementById('receipt-upload')?.click()}
                        >
                            <Input id="receipt-upload" type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />
                            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-3 shadow-sm text-primary">
                                <ScanLine className="w-8 h-8" />
                            </div>
                            <span className="font-bold text-lg text-primary">Scan Receipt with AI</span>
                            <span className="text-sm text-muted-foreground mt-1">Supports JPG, PNG, PDF</span>
                        </div>
                    ) : (
                        <div className="border border-border rounded-xl p-4 bg-muted/30">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center border shadow-sm">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between">
                                        <p className="font-medium text-sm truncate max-w-[200px]">{uploadedFile.name}</p>
                                        {isScanning && <span className="text-xs text-purple-600 font-bold animate-pulse">{Math.round(scanProgress)}%</span>}
                                    </div>

                                    {isScanning ? (
                                        <div className="space-y-1.5">
                                            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-purple-500 transition-all duration-300 ease-out"
                                                    style={{ width: `${scanProgress}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground">{scanStatus}</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-xs text-green-600 font-bold gap-1">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            Analysis Complete • Details Extracted
                                        </div>
                                    )}
                                </div>
                                {!isScanning && (
                                    <Button variant="ghost" size="sm" onClick={() => { setUploadedFile(null); setFormData({ type: "", amount: "", date: "", provider: "", desc: "" }); }}>
                                        Remove
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Claim Details</CardTitle>
                    <CardDescription>Verify the extracted information below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="type">Service Type</Label>
                                <select
                                    id="type"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="">Select type...</option>
                                    <option value="consultation">General Consultation</option>
                                    <option value="medication">Medication / Drugs</option>
                                    <option value="lab">Lab Test / Diagnostics</option>
                                    <option value="emergency">Emergency Care</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount (₦)</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="0.00"
                                    required
                                    min="100"
                                    value={formData.amount}
                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Date of Service</Label>
                            <Input
                                id="date"
                                type="date"
                                required
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="provider">Hospital / Pharmacy Name</Label>
                            <Input
                                id="provider"
                                placeholder="e.g. Lagoon Hospital"
                                required
                                value={formData.provider}
                                onChange={e => setFormData({ ...formData, provider: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="desc">Description / Diagnosis</Label>
                            <textarea
                                id="desc"
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Briefly describe the reason for visit..."
                                required
                                value={formData.desc}
                                onChange={e => setFormData({ ...formData, desc: e.target.value })}
                            />
                        </div>

                        <div className="pt-4">
                            <Button className="w-full h-11 text-lg" disabled={isLoading || isScanning}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Submitting Claim...
                                    </>
                                ) : (
                                    "Submit Claim Request"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
