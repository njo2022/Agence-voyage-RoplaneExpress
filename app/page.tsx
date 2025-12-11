"use client"

import { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from 'embla-carousel-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
import emailjs from '@emailjs/browser'
import { emailConfig } from '../lib/email-config'
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import Map from "../components/map"
import JsonLdScript from "../components/json-ld"
import {
  MapPin,
  Users,
  Award,
  Plane,
  Camera,
  Mountain,
  Waves,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  Globe,
  Shield,
  Heart,
  Menu,
  X,
  Facebook,
  Instagram,
  Linkedin,
  Music,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Composant Carrousel des Destinations
function DestinationsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Données des destinations - facile à étendre
  const destinations = [
    {
      id: 1,
      title: "Chine",
      description: "7 jours • Vol inclus",
      image: "/visiter-chine.webp",
      alt: "CHINE - Voyage organisé",
      badge: "Populaire",
      badgeColor: "bg-green-500"
    },
    {
      id: 2,
      title: "Paris, France",
      description: "3 jours • Hotel 5*",
      image: "/paris.webp",
      alt: "Paris, France - Tour Eiffel",
      badge: null,
      badgeColor: ""
    },
    {
      id: 3,
      title: "Abidjan, Côte d'Ivoire",
      description: "10 jours • Circuit découverte",
      image: "/cote-d_ivoire.webp",
      alt: "Abidjan, Côte d'Ivoire - zone touristique",
      badge: null,
      badgeColor: ""
    },
    {
      id: 4,
      title: "Dubai, EAU",
      description: "5 jours • Luxe & Shopping",
      image: "/dubai-tourisme-dramadaire.webp",
      alt: "Dubai - Ville moderne",
      badge: "Nouveauté",
      badgeColor: "bg-blue-500"
    },
    {
      id: 5,
      title: "Tokyo, Japon",
      description: "8 jours • Culture & Gastronomie",
      image: "/Rwanda-Cultural-Tourism.webp",
      alt: "Tokyo, Japon - Tradition et modernité",
      badge: null,
      badgeColor: ""
    },
    {
      id: 6,
      title: "New York, USA",
      description: "6 jours • Ville qui ne dort jamais",
      image: "/new-york-touriste.webp",
      alt: "New York - Big Apple",
      badge: "Tendance",
      badgeColor: "bg-purple-500"
    }
  ]

  return (
    <div className="relative">
      {/* Boutons de navigation */}
      <div className="absolute -top-20 right-0 flex gap-2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className="h-12 w-12 rounded-full border-2 hover:bg-blue-50"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="h-12 w-12 rounded-full border-2 hover:bg-blue-50"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Carrousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {destinations.map((destination) => (
            <div key={destination.id} className="flex-[0_0_100%] md:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0">
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group h-full">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {destination.badge && (
                    <div className="absolute top-4 right-4">
                      <Badge className={`${destination.badgeColor} text-white px-3 py-1`}>
                        {destination.badge}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{destination.title}</h3>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-blue-600">Sur devis</span>
                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                      Réserver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Indicateurs de points (optionnel) */}
      <div className="flex justify-center gap-2 mt-8">
        {destinations.map((_, index) => (
          <button
            key={index}
            className="w-2 h-2 rounded-full bg-gray-300 hover:bg-blue-600 transition-colors"
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default function LuxuryTravelAgency() {
  const [activeSection, setActiveSection] = useState("accueil")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false)
  const [reservationSuccess, setReservationSuccess] = useState(false)
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    destination: "",
    message: ""
  })
  const [reservationData, setReservationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: "",
    budget: "",
    message: ""
  })

  // Initialiser EmailJS au montage du composant
  useEffect(() => {
    if (typeof window !== 'undefined' && emailjs) {
      try {
        emailjs.init(emailConfig.publicKey)
        console.log('EmailJS initialisé avec succès')
      } catch (error) {
        console.error('Erreur lors de l\'initialisation d\'EmailJS:', error)
      }
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Vérifier que emailjs est disponible
      if (!emailjs || typeof emailjs.send !== 'function') {
        throw new Error('EmailJS n\'est pas correctement initialisé')
      }

      // Utilisation de la configuration centralisée
      const { serviceId, templateId, publicKey, destinationEmail } = emailConfig

      // Debug: Log de la configuration pour réservation
      console.log('Configuration EmailJS (Réservation):', {
        serviceId: serviceId ? `${serviceId} (longueur: ${serviceId.length})` : 'Manquant',
        templateId: templateId ? `${templateId} (longueur: ${templateId.length})` : 'Manquant', 
        publicKey: publicKey ? `${publicKey.substring(0, 10)}... (longueur: ${publicKey.length})` : 'Manquant',
        destinationEmail: destinationEmail ? `${destinationEmail}` : 'Manquant'
      })

      // Vérifier que toutes les configurations sont présentes
      if (!serviceId || !templateId || !publicKey || !destinationEmail) {
        const missing = []
        if (!serviceId) missing.push('serviceId')
        if (!templateId) missing.push('templateId')
        if (!publicKey) missing.push('publicKey')
        if (!destinationEmail) missing.push('destinationEmail')
        throw new Error(`Configuration EmailJS incomplète: ${missing.join(', ')} manquant(s)`)
      }

      // Préparer les données pour l'email
      const templateParams = {
        to_email: destinationEmail,
        from_name: `${reservationData.firstName} ${reservationData.lastName}`,
        from_email: reservationData.email,
        phone: reservationData.phone,
        destination: reservationData.destination,
        departure_date: reservationData.departureDate,
        return_date: reservationData.returnDate,
        travelers: reservationData.travelers,
        budget: reservationData.budget,
        message: reservationData.message,
        reply_to: reservationData.email
      }

      console.log('Envoi email avec les paramètres:', templateParams)

      // Envoyer l'email
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey)
      console.log('Email envoyé avec succès:', result)
      
      // Afficher le message de succès moderne
      setReservationSuccess(true)
      
      // Fermer la modale après 3 secondes
      setTimeout(() => {
        setReservationOpen(false)
        setReservationSuccess(false)
      }, 3000)
      
      setReservationData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        destination: "",
        departureDate: "",
        returnDate: "",
        travelers: "",
        budget: "",
        message: ""
      })
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de réservation:', error)
      console.error('Type d\'erreur:', typeof error)
      console.error('Détails de l\'erreur:', JSON.stringify(error, null, 2))
      
      // Message d'erreur plus informatif
      let errorMessage = "Une erreur est survenue lors de l'envoi de votre demande de réservation."
      
      if (error instanceof Error) {
        console.error('Message d\'erreur:', error.message)
        console.error('Stack trace:', error.stack)
        
        if (error.message.includes('EmailJS')) {
          errorMessage = "Problème de configuration du service d'email. Veuillez nous contacter directement."
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = "Problème de connexion. Vérifiez votre connexion internet et réessayez."
        } else {
          errorMessage = `Erreur: ${error.message}`
        }
      } else if (typeof error === 'object' && error !== null) {
        // Gérer les erreurs EmailJS qui peuvent être des objets
        const errorObj = error as any
        if (errorObj.status) {
          errorMessage = `Erreur EmailJS: ${errorObj.status} - ${errorObj.text || 'Erreur inconnue'}`
        } else {
          errorMessage = "Erreur de configuration EmailJS. Vérifiez les paramètres."
        }
      }
      
      // Créer une notification d'erreur moderne
      const errorNotification = document.createElement('div')
      errorNotification.className = 'fixed top-4 right-4 z-[60] bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-top-4 duration-300 max-w-md'
      errorNotification.innerHTML = `
        <div class="flex items-start space-x-3">
          <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p class="font-semibold mb-1">Erreur d'envoi</p>
            <p class="text-sm opacity-90">${errorMessage}</p>
            <p class="text-xs opacity-75 mt-2">Contact: adasarr03@gmail.com ou 78 131 91 91</p>
          </div>
        </div>
      `
      document.body.appendChild(errorNotification)
      setTimeout(() => errorNotification.remove(), 8000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setReservationData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Vérifier que emailjs est disponible
      if (!emailjs || typeof emailjs.send !== 'function') {
        throw new Error('EmailJS n\'est pas correctement initialisé')
      }

      // Utilisation de la configuration centralisée
      const { serviceId, templateId, publicKey, destinationEmail } = emailConfig

      // Debug: Log de la configuration pour contact
      console.log('Configuration EmailJS (Contact):', {
        serviceId: serviceId ? 'Défini' : 'Manquant',
        templateId: templateId ? 'Défini' : 'Manquant', 
        publicKey: publicKey ? 'Défini' : 'Manquant',
        destinationEmail: destinationEmail ? 'Défini' : 'Manquant'
      })

      // Vérifier que toutes les configurations sont présentes
      if (!serviceId || !templateId || !publicKey || !destinationEmail) {
        throw new Error('Configuration EmailJS incomplète')
      }

      // Préparer les données pour l'email de contact
      const templateParams = {
        to_email: destinationEmail,
        from_name: `${contactData.firstName} ${contactData.lastName}`,
        from_email: contactData.email,
        phone: contactData.phone,
        destination: contactData.destination,
        message: contactData.message,
        reply_to: contactData.email
      }

      console.log('Envoi email contact avec les paramètres:', templateParams)

      // Envoyer l'email
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey)
      console.log('Email contact envoyé avec succès:', result)
      
      setContactFormSubmitted(true)
      setContactData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        destination: "",
        message: ""
      })

      // Cacher le message après 5 secondes
      setTimeout(() => {
        setContactFormSubmitted(false)
      }, 5000)

    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email de contact:', error)
      
      // Message d'erreur plus informatif
      let errorMessage = "Une erreur est survenue lors de l'envoi de votre message."
      
      if (error instanceof Error) {
        if (error.message.includes('EmailJS')) {
          errorMessage = "Problème de configuration du service d'email. Veuillez nous contacter directement."
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = "Problème de connexion. Vérifiez votre connexion internet et réessayez."
        } else {
          errorMessage = `Erreur: ${error.message}`
        }
      }
      
      alert(errorMessage + " Vous pouvez nous contacter directement à adasarr03@gmail.com ou au 78 131 91 91.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-accent p-2 rounded-lg">
              <Plane className="h-6 w-6 text-accent-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Roplane Express</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: "accueil", label: "Accueil" },
              { id: "apropos", label: "À propos" },
              { id: "services", label: "Services" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-lg font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-accent border-b-2 border-accent pb-1"
                    : "text-foreground hover:text-accent"
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-border">
              <a 
                href="https://www.facebook.com/share/19oEV1sKdA/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                title="Facebook"
              >
                <Facebook className="h-5 w-5 text-foreground hover:text-accent" />
              </a>
              <a 
                href="https://instagram.com/roplaneexpress" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                title="Instagram"
              >
                <Instagram className="h-5 w-5 text-foreground hover:text-accent" />
              </a>
              <a 
                href="https://tiktok.com/@roplane_express" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                title="TikTok"
              >
                <Music className="h-5 w-5 text-foreground hover:text-accent" />
              </a>
              <a 
                href="https://sn.linkedin.com/in/roplane-express-13b39a249" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-foreground hover:text-accent" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Button 
            className="hidden md:block bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => setReservationOpen(true)}
          >
            Réserver Maintenant
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {[
                { id: "accueil", label: "Accueil" },
                { id: "apropos", label: "À propos" },
                { id: "services", label: "Services" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-lg font-medium text-foreground hover:text-accent"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Social Media Icons for Mobile */}
              <div className="flex justify-center space-x-6 py-4 border-t border-border">
                <a 
                  href="https://www.facebook.com/share/19oEV1sKdA/?mibextid=wwXIfr"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg hover:bg-accent/10 transition-colors"
                  title="Facebook"
                >
                  <Facebook className="h-6 w-6 text-foreground hover:text-accent" />
                </a>
                <a 
                  href="https://www.instagram.com/roplaneexpress?utm_source=qr&igsh=MXdjaTB4czBqNWdoag==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg hover:bg-accent/10 transition-colors"
                  title="Instagram"
                >
                  <Instagram className="h-6 w-6 text-foreground hover:text-accent" />
                </a>
                <a 
                  href="https://tiktok.com/@roplaneexpress" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg hover:bg-accent/10 transition-colors"
                  title="TikTok"
                >
                  <Music className="h-6 w-6 text-foreground hover:text-accent" />
                </a>
                <a 
                  href="https://sn.linkedin.com/in/roplane-express-13b39a249" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg hover:bg-accent/10 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-foreground hover:text-accent" />
                </a>
              </div>
              
              <Button 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => setReservationOpen(true)}
              >
                Réserver Maintenant
              </Button>
            </div>
          </div>
        )}
      </nav>

      <section id="accueil" className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            
            <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
              Explorez le Monde <span className="text-blue-600">Autrement</span>
            </h1>
            <p className="max-w-md mx-auto mt-6 text-base leading-7 text-gray-600 font-inter">
              Une nouvelle façon de voyager. Découvrez des destinations inoubliables, loin des sentiers battus avec notre expertise.
            </p>

            <div className="relative inline-flex mt-10 group">
              <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"></div>

              <Button
                onClick={() => {
                  const element = document.querySelector('.py-20.bg-white');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Découvrir nos destinations
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative group">
            {/* Bordure avec effet de gradient animé */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            
            {/* Conteneur de l'image */}
            <div className="relative bg-white rounded-2xl p-1">
              <img 
                className="object-cover object-top w-full h-auto rounded-xl shadow-2xl" 
                src="/cap-skirring-casamance-senegal.webp" 
                alt="Destinations de voyage Roplane Express" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Populaires Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide mb-2">INSPIRATION</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Destinations Populaires</h2>
            </div>
            <Button variant="ghost" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
              Voir tout
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>

          {/* Carrousel */}
          <DestinationsCarousel />
        </div>
      </section>

      {/* Section Voyagez sans contraintes */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image avec design moderne */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/rwanda.jpg"
                  alt="Montgolfières au coucher du soleil - Voyagez librement"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg">
                  <p className="text-gray-800 font-medium text-lg">
                    "Une expérience client inoubliable, nos experts passionnés vous accompagnent"
                  </p>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Voyagez sans contraintes
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Nous nous occupons de tout pour que vous n'ayez qu'à profiter. De la réservation des vols aux expériences locales exclusives, votre confort est notre priorité absolue.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ),
                    text: "Assistance 24/7 partout dans le monde",
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ),
                    text: "Remboursement flexible et tarifs négociés",
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ),
                    text: "Itinéraires personnalisés sur mesure",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      {item.icon}
                    </div>
                    <p className="text-lg text-gray-700 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button 
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-10 py-6 rounded-xl flex items-center gap-3"
                  onClick={() => scrollToSection("contact")}
                >
                  En savoir plus
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="apropos" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">À Propos de Roplane Express - Agence de Voyage Dakar</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Depuis 2009, Roplane Express est votre agence de voyage de confiance à Dakar, spécialisée dans le tourisme au Sénégal et en Afrique. Nous créons des expériences sur
                mesure qui dépassent vos attentes les plus élevées.
              </p>
              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                Notre équipe d'experts passionnés en voyage sur mesure parcourt l'Afrique pour dénicher les destinations les plus exclusives
                du Sénégal et de l'Afrique de l'Ouest, garantissant à chaque client un voyage inoubliable avec notre service VIP.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">500+</div>
                  <div className="text-muted-foreground">Voyages Organisés</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">98%</div>
                  <div className="text-muted-foreground">Satisfaction Client</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="livre-histoire-de-voyage-avec-agence-de-voyage.webp"
                alt="Équipe professionnelle Roplane Express - Consultants voyage Dakar Sénégal"
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -bottom-8 -left-8 bg-accent text-accent-foreground p-8 rounded-2xl">
                <Award className="h-12 w-12 mb-4" />
                <div className="text-2xl font-bold">Prix d'Excellence</div>
                <div className="text-accent-foreground/80">Agence de l'Année 2024</div>
              </div>
            </div>
          </div>

          {/* Team Values */}
          <div className="mt-24">
            <h3 className="text-4xl font-bold text-center text-foreground mb-16">Nos Valeurs - Excellence en Tourisme Sénégal</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: <Shield className="h-16 w-16 text-accent" />,
                  title: "Excellence",
                  description: "Nous nous engageons à fournir un service irréprochable à chaque étape de votre voyage.",
                },
                {
                  icon: <Heart className="h-16 w-16 text-accent" />,
                  title: "Passion",
                  description: "Notre amour du voyage et de la découverte guide chacune de nos recommandations.",
                },
                {
                  icon: <Globe className="h-16 w-16 text-accent" />,
                  title: "Authenticité",
                  description:
                    "Nous privilégions les expériences authentiques qui vous connectent vraiment aux destinations.",
                },
              ].map((value, index) => (
                <Card
                  key={index}
                  className="text-center p-8 border-0 bg-muted hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <div className="mb-6 flex justify-center">{value.icon}</div>
                    <h4 className="text-2xl font-bold text-foreground mb-4">{value.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages - Ce qu'ils en disent */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ce qu'ils en disent</h2>
            <p className="text-xl text-gray-600">Des milliers de voyageurs nous font confiance pour leurs aventures</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Témoignage 1 - Sophie Ndiaye */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <CardContent className="p-0">
                <div className="flex items-start gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "L'organisation était impeccable. J'ai pu découvrir des endroits secrets que je n'aurais jamais trouvés seul. Équipe très professionnelle."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">SN</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Sophie Ndiaye</h4>
                    <p className="text-sm text-gray-500">Voyage Saly, Sénégal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Témoignage 2 - Thomas de Brek */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <CardContent className="p-0">
                <div className="flex items-start gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "Un service client exceptionnel. Ils ont géré un changement de vol de dernière minute avec une efficacité remarquable."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-lg">TB</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Thomas de Brek</h4>
                    <p className="text-sm text-gray-500">Voyage New York</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Témoignage 3 - Aida Faye */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <CardContent className="p-0">
                <div className="flex items-start gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "Le meilleur investissement pour mes vacances. Tout était parfait, de l'hôtel au guide Vivalde."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">AF</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Aida Faye</h4>
                    <p className="text-sm text-gray-500">Escapade Nice</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Nos Services de Voyage Sur Mesure au Sénégal</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Des expériences de voyage sur mesure au Sénégal conçues pour les voyageurs les plus exigeants. Réservation voyage personnalisée avec guide touristique expert.
            </p>
          </div>

          {/* Premium Services */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {[
              {
                title: "Voyages Sur Mesure",
                description: "Itinéraires personnalisés créés exclusivement selon vos désirs et préférences.",
                image: "luxury travel planner working on custom itinerary with world map and premium materials",
                features: ["Consultation privée", "Itinéraire exclusif", "Conciergerie 24/7"],
                
              },
              {
                title: "Expériences VIP",
                description: "Accès privilégié aux événements exclusifs et aux lieux les plus prestigieux.",
                image: "VIP access to exclusive cultural event with private guide and champagne service",
                features: ["Accès privé", "Guide expert", "Transport"],
                
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 bg-background shadow-2xl hover:shadow-3xl transition-all duration-500"
              >
                <div className="relative h-80">
                  <img
                    src={
                      index === 0
                        ? "/Voyage-sur-mesure.webp"
                        : "/chauffeur-et-client-heureux.webp"
                    }
                    alt={
                      index === 0
                        ? "Voyage sur mesure personnalisé Sénégal - Roplane Express agence de voyage Dakar"
                        : "Expérience VIP chauffeur privé Dakar - Service premium Roplane Express Sénégal"
                    }
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-6 right-6">
                    <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">Premium</Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-foreground mb-4">{service.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-accent">Sur devis</span>
                    <Button 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                      onClick={() => scrollToSection("contact")}
                    >
                      En Savoir Plus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Service Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Mountain className="h-12 w-12 text-accent" />,
                title: "Aventure",
                description: "Expéditions exclusives dans les destinations les plus spectaculaires",
              },
              {
                icon: <Waves className="h-12 w-12 text-accent" />,
                title: "Croisières Privées",
                description: "Yachts et croisières sur mesure dans les plus belles eaux",
              },
              {
                icon: <Camera className="h-12 w-12 text-accent" />,
                title: "Voyages Culturels",
                description: "Immersion authentique dans les cultures locales avec guides experts",
              },
              {
                icon: <Users className="h-12 w-12 text-accent" />,
                title: "Événements Privés",
                description: "Organisation complète de célébrations dans des lieux d'exception",
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="text-center p-8 border-0 bg-background hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-0">
                  <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-4">{category.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Contactez Roplane Express - Agence Voyage Dakar</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Prêt à vivre l'expérience de voyage de vos rêves ? Parlons-en ensemble.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="border-0 bg-muted p-8">
              <CardContent className="p-0">
                <h3 className="text-3xl font-bold text-foreground mb-8">Planifiez Votre Voyage</h3>
                
                {/* Message de succès */}
                {contactFormSubmitted && (
                  <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="font-medium">Votre message est envoyé avec succès!</span>
                    </div>
                    <p className="mt-1 text-sm">Nous vous contacterons dans les plus brefs délais.</p>
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Prénom</label>
                      <Input 
                        name="firstName"
                        value={contactData.firstName}
                        onChange={handleContactInputChange}
                        className="bg-background border-border focus:ring-accent" 
                        placeholder="Votre prénom" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Nom</label>
                      <Input 
                        name="lastName"
                        value={contactData.lastName}
                        onChange={handleContactInputChange}
                        className="bg-background border-border focus:ring-accent" 
                        placeholder="Votre nom" 
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={contactData.email}
                      onChange={handleContactInputChange}
                      className="bg-background border-border focus:ring-accent"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Téléphone</label>
                    <Input 
                      name="phone"
                      value={contactData.phone}
                      onChange={handleContactInputChange}
                      className="bg-background border-border focus:ring-accent" 
                      placeholder="+221 77 123 45 67" 
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Destination souhaitée</label>
                    <Input
                      name="destination"
                      value={contactData.destination}
                      onChange={handleContactInputChange}
                      className="bg-background border-border focus:ring-accent"
                      placeholder="Où souhaitez-vous voyager ?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      name="message"
                      value={contactData.message}
                      onChange={handleContactInputChange}
                      className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Décrivez-nous votre voyage idéal..."
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6 disabled:opacity-50"
                  >
                    {isLoading ? "Envoi en cours..." : "Envoyer ma Demande"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-8">Nos Coordonnées</h3>
                
                {/* Carte interactive */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-foreground mb-4">Notre Localisation</h4>
                  <Map className="w-full" />
                </div>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail className="h-6 w-6 text-accent" />,
                      title: "Email",
                      content: "adasarr03@gmail.com",
                      subtitle: "Réponse sous 2h en moyenne",
                    },
                    {
                      icon: <Phone className="h-6 w-6 text-accent" />,
                      title: "Téléphone",
                      content: "78 131 91 91 / 78 688 91 91",
                      subtitle: "Lun-Ven 9h-19h, Sam 10h-16h",
                    },
                    {
                      icon: <MapPin className="h-6 w-6 text-accent" />,
                      title: "Adresse",
                      content: "Dakar - Sénégal",
                      subtitle: "Nord Foire, Cité BCEAO, Route de Yoff",
                    },
                    {
                      icon: <Clock className="h-6 w-6 text-accent" />,
                      title: "Horaires",
                      content: "Lundi - Vendredi: 9h - 19h",
                      subtitle: "Samedi: 10h - 16h",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-6 bg-muted rounded-xl">
                      <div className="bg-accent/10 p-3 rounded-lg">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{item.title}</h4>
                        <p className="text-foreground font-medium">{item.content}</p>
                        <p className="text-muted-foreground text-sm">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-accent p-2 rounded-lg">
                  <Plane className="h-6 w-6 text-accent-foreground" />
                </div>
                <span className="text-3xl font-bold">Roplane Express</span>
              </div>
              <p className="text-primary-foreground/80 mb-6 text-lg leading-relaxed">
                Votre partenaire de confiance pour des voyages d'exception depuis 2009. Nous transformons vos rêves de
                voyage en réalités inoubliables.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/share/19oEV1sKdA/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary-foreground/10 p-3 rounded-lg hover:bg-accent/20 transition-colors"
                >
                  <Facebook className="h-6 w-6 text-primary-foreground hover:text-accent" />
                </a>
                <a 
                  href="https://instagram.com/roplaneexpress" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary-foreground/10 p-3 rounded-lg hover:bg-accent/20 transition-colors"
                >
                  <Instagram className="h-6 w-6 text-primary-foreground hover:text-accent" />
                </a>
                <a 
                  href="https://tiktok.com/@roplane_express"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary-foreground/10 p-3 rounded-lg hover:bg-accent/20 transition-colors"
                >
                  <Music className="h-6 w-6 text-primary-foreground hover:text-accent" />
                </a>
                <a 
                  href="https://sn.linkedin.com/in/roplane-express-13b39a249"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary-foreground/10 p-3 rounded-lg hover:bg-accent/20 transition-colors"
                >
                  <Linkedin className="h-6 w-6 text-primary-foreground hover:text-accent" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6">Services</h3>
              <ul className="space-y-3 text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Voyages Sur Mesure
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Expériences VIP
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Croisières Privées
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Événements Exclusifs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6">Destinations</h3>
              <ul className="space-y-3 text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Europe
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Asie Exclusive
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Amériques Premium
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Afrique Safari
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60">
            <p>
              &copy; 2025 Roplane Express. Tous droits réservés. | Conditions Générales | Politique de Confidentialité
            </p>
          </div>
        </div>
      </footer>

      {/* Modal de Réservation - Design UX Premium 2.0 */}
      {reservationOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-blue-900/30 to-purple-900/30 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-500">
          <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-[2rem] max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.2)] border border-white/20 dark:border-gray-700/50 animate-in slide-in-from-bottom-8 duration-500">
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
            
            {/* Header Redesigné */}
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white overflow-hidden">
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-4 left-8 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 right-12 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-8 w-8 h-8 bg-white/10 rounded-full animate-pulse delay-500"></div>
              </div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl border border-white/30">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text">
                      Créez Votre Voyage de Rêve
                    </h2>
                    <p className="text-white/90 text-lg font-medium mt-1">
                      Laissez-nous transformer vos idées en aventures inoubliables
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setReservationOpen(false)}
                  className="text-white hover:bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/30 transition-all duration-200 hover:scale-105"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Message de succès premium */}
            {reservationSuccess && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                <div className="text-center px-8 py-12 animate-in fade-in zoom-in duration-500">
                  <div className="relative inline-block mb-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full animate-ping opacity-30"></div>
                  </div>
                  
                  <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Demande Envoyée avec Succès !
                  </h3>
                  
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                    Votre demande de réservation a bien été reçue. Nous vous contacterons dans les plus brefs délais pour concrétiser votre voyage de rêve.
                  </p>
                  
                  <div className="flex items-center justify-center space-x-3 text-gray-500 dark:text-gray-400">
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm font-medium">Fermeture automatique...</span>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>adasarr03@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>78 131 91 91</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contenu avec scroll amélioré */}
            <div className="relative overflow-y-auto max-h-[calc(95vh-140px)] custom-scrollbar-premium">
              <form onSubmit={handleReservationSubmit} className="p-8 space-y-8">
                
                {/* Section 1: Informations Personnelles */}
                <div className="group relative bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20 rounded-3xl p-8 shadow-lg border border-blue-100 dark:border-blue-800/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-3xl"></div>
                  
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Vos Informations</h3>
                      <p className="text-gray-600 dark:text-gray-400">Dites-nous qui vous êtes</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group">
                      <Input
                        name="firstName"
                        value={reservationData.firstName}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                        className="peer h-14 px-4 pt-6 pb-2 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-200 placeholder-transparent"
                      />
                      <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 dark:text-gray-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500">
                        Prénom *
                      </label>
                    </div>
                    
                    <div className="relative group">
                      <Input
                        name="lastName"
                        value={reservationData.lastName}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                        className="peer h-14 px-4 pt-6 pb-2 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-200 placeholder-transparent"
                      />
                      <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 dark:text-gray-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500">
                        Nom *
                      </label>
                    </div>
                    
                    <div className="relative group">
                      <Input
                        type="email"
                        name="email"
                        value={reservationData.email}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                        className="peer h-14 px-4 pt-6 pb-2 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-200 placeholder-transparent"
                      />
                      <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 dark:text-gray-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500">
                        Email *
                      </label>
                    </div>
                    
                    <div className="relative group">
                      <Input
                        name="phone"
                        value={reservationData.phone}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                        className="peer h-14 px-4 pt-6 pb-2 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-200 placeholder-transparent"
                      />
                      <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 dark:text-gray-400 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500">
                        Téléphone *
                      </label>
                    </div>
                  </div>
                </div>

                {/* Section 2: Destination et Dates */}
                <div className="group relative bg-gradient-to-br from-white to-green-50/50 dark:from-gray-800 dark:to-green-900/20 rounded-3xl p-8 shadow-lg border border-green-100 dark:border-green-800/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-t-3xl"></div>
                  
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-green-500 to-blue-600 p-4 rounded-2xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Votre Destination</h3>
                      <p className="text-gray-600 dark:text-gray-400">Où rêvez-vous d'aller ?</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="relative group">
                      <Input
                        name="destination"
                        value={reservationData.destination}
                        onChange={handleInputChange}
                        placeholder=" "
                        required
                        className="peer h-16 px-4 pt-6 pb-2 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-green-500 focus:ring-0 transition-all duration-200 placeholder-transparent text-lg"
                      />
                      <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 dark:text-gray-400 transition-all duration-200 peer-placeholder-shown:text-lg peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-xs peer-focus:text-green-500">
                        Destination de rêve *
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative group">
                        <Input
                          type="date"
                          name="departureDate"
                          value={reservationData.departureDate}
                          onChange={handleInputChange}
                          required
                          className="h-14 px-4 pt-6 pb-2 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-green-500 focus:ring-0 transition-all duration-200"
                        />
                        <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                          Date de départ *
                        </label>
                      </div>
                      
                      <div className="relative group">
                        <Input
                          type="date"
                          name="returnDate"
                          value={reservationData.returnDate}
                          onChange={handleInputChange}
                          className="h-14 px-4 pt-6 pb-2 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-green-500 focus:ring-0 transition-all duration-200"
                        />
                        <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                          Date de retour
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Préférences Premium */}
                <div className="group relative bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-800 dark:to-purple-900/20 rounded-3xl p-8 shadow-lg border border-purple-100 dark:border-purple-800/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-3xl"></div>
                  
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Vos Préférences</h3>
                      <p className="text-gray-600 dark:text-gray-400">Personnalisez votre expérience</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <select
                        name="travelers"
                        value={reservationData.travelers}
                        onChange={handleInputChange}
                        required
                        className="w-full h-14 px-4 pt-6 pb-2 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-purple-500 focus:ring-0 text-gray-900 dark:text-gray-100 appearance-none cursor-pointer transition-all duration-200"
                      >
                        <option value="">Sélectionnez</option>
                        <option value="1">1 personne</option>
                        <option value="2">2 personnes</option>
                        <option value="3">3 personnes</option>
                        <option value="4">4 personnes</option>
                        <option value="5+">5+ personnes</option>
                      </select>
                      <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Nombre de voyageurs *
                      </label>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <select
                        name="budget"
                        value={reservationData.budget}
                        onChange={handleInputChange}
                        className="w-full h-14 px-4 pt-6 pb-2 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-purple-500 focus:ring-0 text-gray-900 dark:text-gray-100 appearance-none cursor-pointer transition-all duration-200"
                      >
                        <option value="">Sélectionnez</option>
                        <option value="5000-10000">5 000€ - 10 000€</option>
                        <option value="10000-25000">10 000€ - 25 000€</option>
                        <option value="25000-50000">25 000€ - 50 000€</option>
                        <option value="50000+">50 000€+</option>
                      </select>
                      <label className="absolute left-4 top-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Budget approximatif
                      </label>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 relative">
                    <textarea
                      name="message"
                      value={reservationData.message}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Partagez vos rêves de voyage avec nous... Quels sont vos souhaits particuliers ? Avez-vous des activités en tête ? Des expériences que vous aimeriez vivre ?"
                      className="w-full p-6 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:border-purple-500 focus:ring-0 resize-none text-gray-900 dark:text-gray-100 transition-all duration-200"
                    />
                    <label className="absolute left-6 top-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Vos souhaits particuliers
                    </label>
                  </div>
                </div>

                {/* Boutons d'action redesignés */}
                <div className="flex flex-col sm:flex-row gap-6 pt-8">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white text-xl py-8 rounded-2xl disabled:opacity-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-3 relative z-10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="font-semibold">Création en cours...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3 relative z-10">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span className="font-semibold">Créer Mon Voyage de Rêve</span>
                      </div>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setReservationOpen(false)}
                    className="flex-1 text-xl py-8 rounded-2xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="font-semibold">Peut-être plus tard</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Script JSON-LD pour le SEO */}
      <JsonLdScript />
    </div>
  )
}
