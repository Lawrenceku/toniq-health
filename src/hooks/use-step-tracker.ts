'use client'

import { useState, useEffect } from 'react'

interface StepTrackerReturn {
    steps: number;
    isSupported: boolean;
    requestPermission: () => Promise<void>;
    permissionGranted: boolean;
    resetSteps: () => void;
}

export function useStepTracker(): StepTrackerReturn {
    const [steps, setSteps] = useState(0)
    const [permissionGranted, setPermissionGranted] = useState(false)
    const [isSupported, setIsSupported] = useState(false)

    useEffect(() => {
        // Check if DeviceMotionEvent is defined
        if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
            setIsSupported(true)

            // Check for saved steps
            const saved = localStorage.getItem('toniq-steps')
            if (saved) setSteps(parseInt(saved, 10))

            // Check if permission was already granted (conceptually)
            // Note: iOS requires explicit interaction each session usually
        }
    }, [])

    useEffect(() => {
        if (!permissionGranted) return;

        let lastMagnitude = 0
        let lastStepTime = 0
        const THRESHOLD = 12 // m/s^2 (Gravity is ~9.8, so peak of 12 implies movement)
        const STEP_DELAY = 400 // ms

        const handleMotion = (event: DeviceMotionEvent) => {
            const acc = event.accelerationIncludingGravity
            if (!acc) return

            const x = acc.x || 0
            const y = acc.y || 0
            const z = acc.z || 0

            // Calculate magnitude of acceleration vector
            const magnitude = Math.sqrt(x * x + y * y + z * z)

            // Peak detection logic
            if (magnitude > THRESHOLD && lastMagnitude <= THRESHOLD) {
                const now = Date.now()
                if (now - lastStepTime > STEP_DELAY) {
                    setSteps(prev => {
                        const newSteps = prev + 1
                        localStorage.setItem('toniq-steps', newSteps.toString())
                        return newSteps
                    })
                    lastStepTime = now
                }
            }
            lastMagnitude = magnitude
        }

        window.addEventListener('devicemotion', handleMotion)
        return () => window.removeEventListener('devicemotion', handleMotion)
    }, [permissionGranted])

    const requestPermission = async () => {
        // For iOS 13+
        if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
            try {
                const response = await (DeviceMotionEvent as any).requestPermission()
                if (response === 'granted') {
                    setPermissionGranted(true)
                } else {
                    alert("Permission denied for motion sensors.")
                }
            } catch (e) {
                console.error(e)
                // Fallback for non-iOS or error
                setPermissionGranted(true)
            }
        } else {
            // Non-iOS devices typically don't need requestPermission
            setPermissionGranted(true)
        }
    }

    const resetSteps = () => {
        setSteps(0)
        localStorage.setItem('toniq-steps', '0')
    }

    return { steps, isSupported, requestPermission, permissionGranted, resetSteps }
}
