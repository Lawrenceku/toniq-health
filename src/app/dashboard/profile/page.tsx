'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { User, Mail, Shield, Camera, Save } from 'lucide-react'

export default function ProfilePage() {
    const [userImage, setUserImage] = useState<string | null>(null)
    const [name, setName] = useState("Chioma Adebayo")
    const [email, setEmail] = useState("chioma@example.com")
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const storedImage = localStorage.getItem('userImage')
        if (storedImage) {
            setUserImage(storedImage)
        }

        // Load other details if they exist, else defaults
        const storedName = localStorage.getItem('userName')
        if (storedName) setName(storedName)
    }, [])

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result as string
                setUserImage(base64String)
                localStorage.setItem('userImage', base64String)
                // Force a reload or event dispatch to update the nav bar immediately would be ideal, 
                // but for now a refresh works or if the Nav listens to storage events. 
                // To make it instant without refresh, we can dispatch a custom event or just let the user refresh.
                // Let's reload to be simple and robust for this demo.
                window.location.reload()
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSave = () => {
        localStorage.setItem('userName', name)
        setIsEditing(false)
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold">My Profile</h1>
                <p className="text-muted-foreground">Manage your personal information and account settings.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>Click the image to upload a new photo.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative group cursor-pointer">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-muted bg-muted flex items-center justify-center">
                            {userImage ? (
                                <img src={userImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-16 h-16 text-muted-foreground" />
                            )}
                        </div>
                        <label htmlFor="image-upload" className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                            <Camera className="w-8 h-8" />
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">Supported formats: JPG, PNG, WEBP</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-9"
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="email" value={email} disabled className="pl-9 bg-muted" />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Account Status</Label>
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-md border border-green-100">
                            <Shield className="w-4 h-4" />
                            <span>Verified Member (Tier 1)</span>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        {isEditing ? (
                            <Button onClick={handleSave} className="gap-2">
                                <Save className="w-4 h-4" /> Save Changes
                            </Button>
                        ) : (
                            <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
