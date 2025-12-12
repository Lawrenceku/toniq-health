'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, Search, MapPin, Star, Phone, Calendar } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import dynamic from 'next/dynamic'

// Dynamically import LeafletMap with no SSR
const LeafletMap = dynamic(() => import('@/components/ui/LeafletMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center text-muted-foreground">
            Loading Map...
        </div>
    )
})

// Mock Data
const HOSPITALS = [
    { id: 1, name: "Lagoon Hospital", address: "17B Bourdillon Rd, Ikoyi", rating: 4.8, distance: "1.2 km", open: true, lat: 6.4549, lng: 3.4246 },
    { id: 2, name: "Reddington Hospital", address: "39 Isaac John St, Ikeja", rating: 4.6, distance: "5.4 km", open: true, lat: 6.5765, lng: 3.3557 },
    { id: 3, name: "St. Nicholas Hospital", address: "57 Campbell St, Lagos Island", rating: 4.5, distance: "3.2 km", open: false, lat: 6.4531, lng: 3.3958 },
    { id: 4, name: "Evercare Hospital", address: "Lekki Phase 1, Lekki", rating: 4.9, distance: "8.1 km", open: true, lat: 6.4416, lng: 3.4839 },
    { id: 5, name: "First Cardiology", address: "Thompson Ave, Ikoyi", rating: 4.7, distance: "2.0 km", open: true, lat: 6.4584, lng: 3.4354 },
]

export default function HospitalsPage() {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [bookingOpen, setBookingOpen] = useState(false)
    const [selectedHospital, setSelectedHospital] = useState<typeof HOSPITALS[0] | null>(null)

    const filteredHospitals = HOSPITALS.filter(h =>
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.address.toLowerCase().includes(search.toLowerCase())
    )

    const handleBook = (hospital: typeof HOSPITALS[0]) => {
        setSelectedHospital(hospital)
        setBookingOpen(true)
    }

    const confirmBooking = () => {
        setBookingOpen(false)
        alert(`Appointment request sent to ${selectedHospital?.name}. You will receive a confirmation SMS shortly.`)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Find Care</h1>
                        <p className="text-muted-foreground text-sm">Locate verified providers near you</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search hospital, specialty, or location..."
                        className="pl-10 h-12 text-lg"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Map Container */}
            <div className="h-64 md:h-80 bg-muted rounded-xl relative overflow-hidden group shadow-inner border">
                <LeafletMap
                    hospitals={filteredHospitals}
                    selectedHospital={selectedHospital}
                />
            </div>

            {/* Hospital List */}
            <div className="space-y-4">
                <h2 className="font-semibold text-lg">Nearby Providers</h2>

                {filteredHospitals.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                        No hospitals found matching "{search}"
                    </div>
                ) : (
                    filteredHospitals.map(hospital => (
                        <Card key={hospital.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setSelectedHospital(hospital)}>
                            <CardContent className="p-4 flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <h3 className="font-bold text-lg">{hospital.name}</h3>
                                    <div className="flex items-center text-sm text-muted-foreground gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {hospital.address} • {hospital.distance}
                                    </div>
                                    <div className="flex items-center gap-4 pt-1">
                                        <div className="flex items-center gap-1 text-amber-500 font-medium text-sm">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            {hospital.rating}
                                        </div>
                                        {hospital.open ? (
                                            <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full">Open Now</span>
                                        ) : (
                                            <span className="text-xs text-red-600 font-medium bg-red-100 px-2 py-0.5 rounded-full">Closed</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button size="sm" onClick={(e) => { e.stopPropagation(); handleBook(hospital); }}>
                                        Book
                                    </Button>
                                    <Button size="sm" variant="outline" className="w-full">
                                        <Phone className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Book Appointment</DialogTitle>
                        <DialogDescription>
                            Schedule a visit with <span className="font-semibold text-foreground">{selectedHospital?.name}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-primary hover:text-primary-foreground">
                                <Calendar className="w-6 h-6" />
                                <span>General Visit</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-primary hover:text-primary-foreground">
                                <Star className="w-6 h-6" />
                                <span>Specialist</span>
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <Label>Preferred Date</Label>
                            <Input type="datetime-local" />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setBookingOpen(false)}>Cancel</Button>
                        <Button onClick={confirmBooking}>Confirm Booking</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
