"use client"

import dynamic from 'next/dynamic'

interface MapProps {
  className?: string
}

function MapComponent({ className = "" }: MapProps) {
  // Import dynamique du CSS de Leaflet
  if (typeof window !== 'undefined') {
    require('leaflet/dist/leaflet.css')
  }
  
  // Import dynamique des composants Leaflet
  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet')
  
  // Import dynamique de Leaflet
  const L = require('leaflet')
  
  // Fix pour les icônes Leaflet avec Next.js
  if (typeof window !== 'undefined') {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  }

  // Coordonnées de QG2P+93R Passerelle nord foire, Dakar
  const position = [14.750966932516116, -17.46474820569469] as [number, number]

  return (
    <div className={`w-full h-96 rounded-lg overflow-hidden ${className}`}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-lg">Roplane Express</h3>
              <p className="text-sm text-gray-600">Agence de Voyage de Luxe</p>
              <p className="text-sm">QG2P+93R Passerelle nord foire</p>
              <p className="text-sm">Dakar, Sénégal</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

// Export dynamique pour éviter les erreurs SSR
const Map = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 rounded-lg bg-muted flex items-center justify-center">
      <p className="text-muted-foreground">Chargement de la carte...</p>
    </div>
  )
})

export default Map
