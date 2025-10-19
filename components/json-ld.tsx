"use client"

import { useEffect } from 'react'

export default function JsonLdScript() {
  useEffect(() => {
    // Ajouter le script JSON-LD côté client pour éviter les erreurs d'hydratation
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Roplane Express",
      "description": "Agence de voyage de luxe spécialisée dans les voyages sur mesure en Afrique",
      "url": "https://roplaneexpress.com",
      "telephone": "+221781319191",
      "email": "adasarr03@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nord Foire, Cité BCEAO, Route de Yoff",
        "addressLocality": "Dakar",
        "addressRegion": "Dakar",
        "addressCountry": "SN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "14.750966932516116",
        "longitude": "-17.46474820569469"
      },
      "priceRange": "€€€",
      "foundingDate": "2009",
      "areaServed": [
        {
          "@type": "Country",
          "name": "Sénégal"
        },
        {
          "@type": "Continent",
          "name": "Afrique"
        }
      ],
      "serviceType": [
        "Voyages sur mesure",
        "Expériences VIP",
        "Croisières privées",
        "Événements exclusifs"
      ],
      "sameAs": [
        "https://www.facebook.com/share/19oEV1sKdA/?mibextid=wwXIfr",
        "https://www.instagram.com/roplaneexpress?utm_source=qr&igsh=MXdjaTB4czBqNWdoag==",
        "https://tiktok.com/@roplaneexpress",
        "https://linkedin.com/company/roplaneexpress"
      ]
    })

    document.head.appendChild(script)

    // Nettoyage
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return null // Ce composant ne rend rien visuellement
}