"use client"

import { useEffect } from 'react'

interface TawkChatProps {
  propertyId?: string
  widgetId?: string
}

declare global {
  interface Window {
    Tawk_API?: any
    Tawk_LoadStart?: Date
  }
}

export default function TawkChat({ 
  propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID,
  widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID 
}: TawkChatProps) {
  
  useEffect(() => {
    // Vérifier si Tawk.to est déjà chargé
    if (window.Tawk_API) {
      return
    }

    // Configuration par défaut (vous devrez remplacer ces valeurs)
    const defaultPropertyId = propertyId || "YOUR_PROPERTY_ID"
    const defaultWidgetId = widgetId || "default"

    // Initialiser Tawk_API
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    // Configuration personnalisée pour votre agence de voyage
    window.Tawk_API.onLoad = function() {
      console.log('Tawk.to chat chargé avec succès pour Roplane Express')
      // Laisser Tawk.to gérer les attributs par défaut
    }

    // Message de bienvenue personnalisé
    window.Tawk_API.onChatMessageVisitor = function(message: string) {
      console.log('Message du visiteur:', message)
    }

    // Notification quand un chat commence
    window.Tawk_API.onChatStarted = function() {
      console.log('Chat démarré - Roplane Express')
      
      // Vous pouvez ajouter ici une logique supplémentaire
      // comme l'envoi d'une notification personnalisée
    }

    // Charger le script Tawk.to
    const script = document.createElement('script')
    script.async = true
    script.src = `https://embed.tawk.to/${defaultPropertyId}/${defaultWidgetId}`
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    
    // Ajouter le script au document
    const firstScript = document.getElementsByTagName('script')[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    }

    // Nettoyage lors du démontage du composant
    return () => {
      // Optionnel: nettoyer Tawk.to si nécessaire
      if (window.Tawk_API) {
        try {
          window.Tawk_API.hideWidget()
        } catch (error) {
          console.log('Erreur lors du nettoyage Tawk.to:', error)
        }
      }
    }
  }, [propertyId, widgetId])

  // Ce composant ne rend rien visuellement car Tawk.to s'injecte automatiquement
  return null
}

// Hook personnalisé pour interagir avec Tawk.to
export const useTawkChat = () => {
  const showWidget = () => {
    if (window.Tawk_API) {
      window.Tawk_API.showWidget()
    }
  }

  const hideWidget = () => {
    if (window.Tawk_API) {
      window.Tawk_API.hideWidget()
    }
  }

  const maximize = () => {
    if (window.Tawk_API) {
      window.Tawk_API.maximize()
    }
  }

  const minimize = () => {
    if (window.Tawk_API) {
      window.Tawk_API.minimize()
    }
  }

  const toggle = () => {
    if (window.Tawk_API) {
      window.Tawk_API.toggle()
    }
  }

  const setAttributes = (attributes: Record<string, string>) => {
    if (window.Tawk_API) {
      // Filtrer les valeurs vides pour éviter les erreurs INVALID_EMAIL
      const validAttributes = Object.fromEntries(
        Object.entries(attributes).filter(([key, value]) => value && value.trim() !== '')
      )
      
      if (Object.keys(validAttributes).length > 0) {
        window.Tawk_API.setAttributes(validAttributes, function(error: any) {
          if (error) {
            console.error('Erreur lors de la mise à jour des attributs:', error)
          } else {
            console.log('Attributs mis à jour avec succès:', validAttributes)
          }
        })
      }
    }
  }

  return {
    showWidget,
    hideWidget,
    maximize,
    minimize,
    toggle,
    setAttributes
  }
}
