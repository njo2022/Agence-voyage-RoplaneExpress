// Configuration Google Analytics pour Roplane Express
export const analyticsConfig = {
  // Remplacez par votre ID Google Analytics réel
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX',
  
  // Configuration des événements personnalisés
  events: {
    // Événements de conversion
    RESERVATION_STARTED: 'reservation_started',
    RESERVATION_COMPLETED: 'reservation_completed',
    CONTACT_FORM_SUBMITTED: 'contact_form_submitted',
    
    // Événements d'engagement
    SERVICE_VIEWED: 'service_viewed',
    SOCIAL_MEDIA_CLICK: 'social_media_click',
    PHONE_CLICK: 'phone_click',
    EMAIL_CLICK: 'email_click',
    
    // Événements de navigation
    SECTION_VIEWED: 'section_viewed',
    CTA_CLICKED: 'cta_clicked',
  }
}

// Fonction pour envoyer des événements personnalisés
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters?.label || '',
      value: parameters?.value || 0,
      ...parameters
    })
  }
}

// Fonction pour suivre les conversions
export const trackConversion = (conversionType: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: analyticsConfig.GA_MEASUREMENT_ID,
      event_category: 'conversion',
      event_label: conversionType,
      value: value || 0,
      currency: 'XOF' // Franc CFA
    })
  }
}

// Types TypeScript pour gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
  }
}
