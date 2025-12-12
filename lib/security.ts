/**
 * Utilitaires de sécurité pour l'application
 */

/**
 * Sanitise une chaîne de caractères pour éviter les attaques XSS
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''
  
  // Remplacer les caractères dangereux
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Valide un email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valide un numéro de téléphone
 */
export function isValidPhone(phone: string): boolean {
  // Accepte les formats internationaux et locaux
  const phoneRegex = /^[\d\s\+\-\(\)]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 8
}

/**
 * Sanitise un objet de données de formulaire
 */
export function sanitizeFormData<T extends Record<string, any>>(data: T): T {
  const sanitized = {} as T
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeInput(value) as T[keyof T]
    } else {
      sanitized[key as keyof T] = value
    }
  }
  
  return sanitized
}

/**
 * Valide les données de contact
 */
export function validateContactData(data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  destination: string
  message: string
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.firstName || data.firstName.length < 2) {
    errors.push('Le prénom doit contenir au moins 2 caractères')
  }

  if (!data.lastName || data.lastName.length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères')
  }

  if (!isValidEmail(data.email)) {
    errors.push('L\'adresse email n\'est pas valide')
  }

  if (!isValidPhone(data.phone)) {
    errors.push('Le numéro de téléphone n\'est pas valide')
  }

  if (!data.destination || data.destination.length < 2) {
    errors.push('La destination doit être spécifiée')
  }

  if (!data.message || data.message.length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Génère un nonce pour CSP
 */
export function generateNonce(): string {
  if (typeof window !== 'undefined' && window.crypto) {
    const array = new Uint8Array(16)
    window.crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }
  // Fallback pour le serveur
  return Math.random().toString(36).substring(2, 15)
}
