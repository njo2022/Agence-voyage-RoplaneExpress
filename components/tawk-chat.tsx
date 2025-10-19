'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Tawk_API?: any
    Tawk_LoadStart?: Date
  }
}

export default function TawkChat() {
  useEffect(() => {
    if (window.Tawk_API || document.querySelector('script[src*="embed.tawk.to"]')) {
      return
    }

    const propertyId = '68de6ccb4a1fae1954581b67'
    const widgetId = '1j6idhv2t'

    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    const script = document.createElement('script')
    script.async = true
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    
    document.head.appendChild(script)
  }, [])

  return null
}