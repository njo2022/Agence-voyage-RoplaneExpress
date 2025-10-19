"use client"

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

interface MapProps {
  className?: string
}

// Composant de carte utilisant Leaflet natif (pas React-Leaflet)
function MapComponent({ className = "" }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    // Empêcher la double initialisation en mode Strict
    if (initializedRef.current || !mapContainerRef.current) return
    
    let L: any
    
    try {
      // Vérifier que nous sommes côté client
      if (typeof window === 'undefined') return

      // Import CSS et Leaflet avec vérification
      require('leaflet/dist/leaflet.css')
      L = require('leaflet')
      
      // Vérifier que Leaflet a bien été chargé
      if (!L || typeof L.map !== 'function') {
        console.error('Leaflet n\'a pas pu être chargé correctement')
        return
      }
      
      // Fix des icônes Leaflet
      if (L && L.Icon && L.Icon.Default) {
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        })
      }

      initializedRef.current = true

      // Créer la carte avec Leaflet natif
      const map = L.map(mapContainerRef.current, {
        center: [14.750966932516116, -17.46474820569469],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: true,
      })

      // Ajouter les tuiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      // Ajouter le marqueur
      const marker = L.marker([14.750966932516116, -17.46474820569469]).addTo(map)
      
      // Popup pour le marqueur
      marker.bindPopup(`
        <div style="text-align: center;">
          <h3 style="font-weight: bold; font-size: 1.125rem; margin-bottom: 0.5rem;">Roplane Express</h3>
          <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.25rem;">Agence de Voyage de Luxe</p>
          <p style="font-size: 0.875rem; margin-bottom: 0.25rem;">QG2P+93R Passerelle nord foire</p>
          <p style="font-size: 0.875rem;">Dakar, Sénégal</p>
        </div>
      `)

      mapInstanceRef.current = map

    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la carte:', error)
    }

    // Nettoyage
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove()
          mapInstanceRef.current = null
        } catch (e) {
          console.warn('Erreur lors du nettoyage:', e)
        }
      }
      initializedRef.current = false
    }
  }, [])

  return (
    <div className={`w-full h-96 rounded-lg overflow-hidden ${className}`}>
      <div 
        ref={mapContainerRef} 
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      />
    </div>
  )
}

// Export avec Next.js dynamic import pour désactiver le SSR
const Map = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 rounded-lg bg-muted flex items-center justify-center">
      <p className="text-muted-foreground">Chargement de la carte...</p>
    </div>
  )
})

export default Map
