import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Roplane Express - Agence de Voyage de Luxe à Dakar | Voyages Sur Mesure Sénégal',
  description: 'Découvrez l\'Afrique avec Roplane Express, votre agence de voyage de luxe à Dakar. Voyages sur mesure, expériences VIP et destinations exclusives depuis 2009. Réservation voyage Sénégal.',
  keywords: 'agence voyage Dakar, tourisme Sénégal, voyage luxe Afrique, réservation voyage, guide touristique Sénégal, vacances personnalisées',
  authors: [{ name: 'Roplane Express' }],
  creator: 'Roplane Express',
  publisher: 'Roplane Express',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://roplaneexpress.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Roplane Express - Voyages d\'Exception en Afrique',
    description: 'Agence de voyage de luxe à Dakar spécialisée dans les voyages sur mesure et expériences VIP en Afrique. Découvrez nos destinations exclusives.',
    url: 'https://roplaneexpress.com',
    siteName: 'Roplane Express',
    images: [
      {
        url: '/og-image-roplane-express.jpg',
        width: 1200,
        height: 630,
        alt: 'Roplane Express - Agence de Voyage de Luxe Dakar',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roplane Express - Agence Voyage Luxe Dakar',
    description: 'Voyages sur mesure et expériences VIP en Afrique avec Roplane Express, votre agence de confiance à Dakar depuis 2009.',
    images: ['/og-image-roplane-express.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
