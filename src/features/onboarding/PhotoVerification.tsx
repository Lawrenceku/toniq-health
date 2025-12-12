'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Camera, ChevronRight, Loader2, RefreshCw } from 'lucide-react'

interface PhotoVerificationProps {
    onComplete: () => void
}

export function PhotoVerification({ onComplete }: PhotoVerificationProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [stream, setStream] = useState<MediaStream | null>(null)
    const [capturedImage, setCapturedImage] = useState<string | null>(null)
    const [isVerifying, setIsVerifying] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        startCamera()
        return () => stopCamera()
    }, [])

    const startCamera = async () => {
        setError(null)
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: false
            })
            setStream(mediaStream)
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream
            }
        } catch (err) {
            console.error("Error accessing camera:", err)
            setError("Could not access camera. Please check permissions.")
        }
    }

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop())
            setStream(null)
        }
    }

    const takePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current
            const canvas = canvasRef.current

            // Set canvas dimensions to match video
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight

            // Draw current video frame to canvas
            const context = canvas.getContext('2d')
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height)
                const dataUrl = canvas.toDataURL('image/jpeg')
                setCapturedImage(dataUrl)
                // We can stop the camera now to save battery/resource
                // stopCamera() // Optional: keep it running or stop it. Let's keep it running for retries implicitly or stop to freeze.
                // Actually, stopping it makes sense if we have the image.
            }
        }
    }

    const retake = () => {
        setCapturedImage(null)
        setIsVerifying(false)
        // startCamera() // If we stopped it
    }

    const handleConfirm = async () => {
        if (!capturedImage) return

        setIsVerifying(true)

        // Mock comparison delay
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Save to local storage
        localStorage.setItem('userProfileImage', capturedImage)

        // Success
        onComplete()
    }

    const handleSkip = () => {
        stopCamera()
        onComplete()
    }

    return (
        <div className="max-w-md mx-auto pt-4 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
            {/* Skip Button */}
            <div className="absolute -top-12 right-0">
                <Button variant="ghost" className="text-muted-foreground" onClick={handleSkip}>
                    Skip <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>

            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Face Verification</h2>
                <p className="text-muted-foreground">
                    {capturedImage ? "Confirm this is you" : "Let's capture your photo for your profile"}
                </p>
            </div>

            <div className="relative aspect-[3/4] bg-black rounded-2xl overflow-hidden border-4 border-muted shadow-xl">
                {/* Camera View */}
                {!capturedImage && (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover transform -scale-x-100" // Mirror effect
                    />
                )}

                {/* Captured Image View */}
                {capturedImage && (
                    <img
                        src={capturedImage}
                        alt="Captured"
                        className="w-full h-full object-cover transform -scale-x-100"
                    />
                )}

                {/* Overlays */}
                {isVerifying && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 space-y-4">
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                        <div>
                            <h3 className="text-xl font-bold">Verifying Identity...</h3>
                            <p className="text-sm text-muted-foreground">Comparing with NIN records</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-destructive bg-background">
                        <p>{error}</p>
                    </div>
                )}

                {/* Hidden Canvas for Capture */}
                <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="flex gap-4">
                {!capturedImage ? (
                    <Button className="w-full h-14 text-lg rounded-full" onClick={takePhoto} disabled={!!error}>
                        <Camera className="w-6 h-6 mr-2" /> Take Photo
                    </Button>
                ) : (
                    <>
                        <Button variant="outline" className="flex-1 h-14 rounded-full" onClick={retake} disabled={isVerifying}>
                            <RefreshCw className="w-5 h-5 mr-2" /> Retake
                        </Button>
                        <Button className="flex-1 h-14 rounded-full" onClick={handleConfirm} disabled={isVerifying}>
                            {isVerifying ? "Verifying..." : "Confirm Photo"}
                        </Button>
                    </>
                )}
            </div>

            <p className="text-xs text-center text-muted-foreground px-6">
                We'll match this photo against the image on your National ID to verify your identity.
            </p>
        </div>
    )
}
