import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/webp'],
  },
  outputFileTracingRoot: __dirname,
  // Optimisations pour les performances
  compress: true,
  poweredByHeader: false,
  // Headers de sécurité renforcés
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          // Cross-Origin-Opener-Policy
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups'
          },
          // Cross-Origin-Resource-Policy
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin'
          },
          // Content Security Policy autorisant Hubspot et autres scripts nécessaires
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js-eu1.hs-scripts.com https://js.hs-scripts.com https://js-eu1.usemessages.com https://js.usemessages.com https://js-eu1.hs-analytics.net https://js.hs-analytics.net https://js-eu1.hscollectedforms.net https://js.hscollectedforms.net https://js-eu1.hs-banner.com https://js.hs-banner.com https://js.hsforms.net https://cdn.emailjs.com https://*.hubspot.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https: http:",
              "connect-src 'self' https://api.hubspot.com https://api.hubapi.com https://forms.hubspot.com https://api.emailjs.com https://tile.openstreetmap.org https://*.hs-sites.com https://*.hsforms.com https://*.hubspot.com https://*.hs-analytics.net https://*.usemessages.com wss://*.hubspot.com wss://*.usemessages.com https://*.hscollectedforms.net https://*.hs-banner.com",
              "frame-src 'self' https://app.hubspot.com https://app-eu1.hubspot.com https://*.hubspot.com",
              "worker-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
        ],
      },
    ]
  },
}

export default nextConfig
