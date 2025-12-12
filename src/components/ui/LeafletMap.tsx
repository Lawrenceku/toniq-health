'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons in Next.js/Leaflet
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png'
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

interface Hospital {
    id: number
    name: string
    address: string
    rating: number
    distance: string
    lat?: number // Mock coordinates
    lng?: number
}

// Mock coordinates for demo (Lagos area roughly)
const LAGOS_CENTER = [6.5244, 3.3792]

interface LeafletMapProps {
    hospitals: Hospital[]
    selectedHospital?: Hospital | null
}

function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap()
    useEffect(() => {
        map.setView(center, map.getZoom())
    }, [center, map])
    return null
}

export default function LeafletMap({ hospitals, selectedHospital }: LeafletMapProps) {
    // Generate mock coords if missing or just use random near center
    // In a real app, these would come from the DB
    const markers = hospitals.map((h, i) => ({
        ...h,
        lat: h.lat || 6.5244 + (Math.random() - 0.5) * 0.1,
        lng: h.lng || 3.3792 + (Math.random() - 0.5) * 0.1
    }))

    const centerPos = selectedHospital && selectedHospital.lat && selectedHospital.lng
        ? [selectedHospital.lat, selectedHospital.lng] as [number, number]
        : LAGOS_CENTER as [number, number]

    return (
        <MapContainer
            center={centerPos}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full h-full rounded-xl z-0"
            style={{ minHeight: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((hospital) => (
                <Marker key={hospital.id} position={[hospital.lat, hospital.lng]}>
                    <Popup>
                        <div className="text-sm">
                            <strong className="block text-base">{hospital.name}</strong>
                            <span className="text-muted-foreground">{hospital.address}</span>
                            <div className="mt-1 flex items-center gap-1 font-bold text-amber-500">
                                ★ {hospital.rating}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
            <MapUpdater center={centerPos} />
        </MapContainer>
    )
}
