// Configuration EmailJS
// Ce fichier contient les clés de configuration pour l'envoi d'emails

export const emailConfig = {
  // Service ID EmailJS (depuis les variables d'environnement)
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_elite_voyages',
  
  // Template ID pour les notifications de réservation
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_reservation_v2',
  
  // Template ID pour l'accusé de réception
  acknowledgmentTemplateId: process.env.NEXT_PUBLIC_EMAILJS_ACKNOWLEDGMENT_TEMPLATE_ID || 'template_acknowledgment',
  
  // Clé publique EmailJS
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'uLgTGGpZR4O1pZLFo',
  
  // Email de destination pour les réservations
  destinationEmail: process.env.NEXT_PUBLIC_DESTINATION_EMAIL || 'dakcarsbcenter@gmail.com',
  
  // Configuration des templates
  templates: {
    reservation: {
      id: 'template_reservation_v2',
      name: 'Notification de Réservation',
      description: 'Email envoyé à l\'agence lors d\'une nouvelle réservation'
    },
    acknowledgment: {
      id: 'template_acknowledgment', 
      name: 'Accusé de Réception',
      description: 'Email de confirmation envoyé au client'
    }
  }
} as const

// Types pour la sécurité
export type EmailConfig = typeof emailConfig
export type EmailTemplate = keyof typeof emailConfig.templates
