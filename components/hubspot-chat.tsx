"use client"

import { useEffect } from 'react'

export default function HubspotChat() {
  useEffect(() => {
    // Vérifier si le script est déjà chargé
    if (document.getElementById('hs-script-loader')) {
      console.log('Hubspot script already exists')
      return
    }

    // Créer le script Hubspot
    const script = document.createElement('script')
    script.id = 'hs-script-loader'
    script.src = 'https://js-eu1.hs-scripts.com/147415293.js'
    script.async = true
    script.defer = true
    
    script.onload = () => {
      console.log('✅ Hubspot chat widget loaded successfully')
      console.log('Window.HubSpotConversations:', window.HubSpotConversations)
    }
    
    script.onerror = (error) => {
      console.error('❌ Failed to load Hubspot:', error)
    }

    // Ajouter le script au document
    document.body.appendChild(script)
    console.log('📝 Hubspot script added to page')

    // Cleanup
    return () => {
      const existingScript = document.getElementById('hs-script-loader')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return null
}

// Déclaration TypeScript
declare global {
  interface Window {
    HubSpotConversations?: any
  }
}
