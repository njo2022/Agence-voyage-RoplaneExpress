import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Générer un nonce unique pour chaque requête
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  
  // CSP adaptée pour Next.js en production
  // Next.js utilise beaucoup d'inline scripts pour l'hydratation React
  const cspHeader = [
    "default-src 'self'",
    // 'unsafe-eval' nécessaire pour Next.js chunks dynamiques
    // 'unsafe-inline' nécessaire pour les event handlers React
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.emailjs.com https://cdnjs.cloudflare.com https://*.tile.openstreetmap.org",
    "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://unpkg.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.emailjs.com https://*.tile.openstreetmap.org",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ].join('; ')
  
  // Cloner la requête avec le nonce dans les headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Headers de sécurité renforcés
  const securityHeaders = {
    'Content-Security-Policy': cspHeader,
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  }

  // Appliquer tous les headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

// Appliquer le middleware à toutes les routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
