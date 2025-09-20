"use client"

import { useState } from "react"
import emailjs from '@emailjs/browser'
import { emailConfig } from '../lib/email-config'
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
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
} from "lucide-react"

export default function LuxuryTravelAgency() {
  const [activeSection, setActiveSection] = useState("accueil")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
      // Utilisation de la configuration centralisée
      const { serviceId, templateId, publicKey, destinationEmail } = emailConfig

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

      // Envoyer l'email
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      alert("Votre demande de réservation a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.")
      setReservationOpen(false)
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
      console.error('Erreur lors de l\'envoi de l\'email:', error)
      alert("Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer ou nous contacter directement.")
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

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-accent p-2 rounded-lg">
              <Plane className="h-6 w-6 text-accent-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Élite Voyages</span>
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

      <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/a-beach-with-a-hut-on-it.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-balance leading-tight">Voyages d'Exception</h1>
          <p className="text-2xl md:text-3xl mb-12 text-pretty opacity-95 font-light">
            Découvrez le monde avec l'élégance et le raffinement que vous méritez
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-xl px-12 py-6 rounded-full"
              onClick={() => scrollToSection("services")}
            >
              Découvrir nos Services
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-foreground text-xl px-12 py-6 rounded-full bg-transparent"
              onClick={() => scrollToSection("contact")}
            >
              Planifier mon Voyage
            </Button>
          </div>
        </div>
      </section>

      <section id="apropos" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Notre Histoire</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Depuis plus de 15 ans, Élite Voyages redéfinit l'art du voyage de luxe. Nous créons des expériences sur
                mesure qui dépassent vos attentes les plus élevées.
              </p>
              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                Notre équipe d'experts passionnés parcourt le monde pour dénicher les destinations les plus exclusives
                et les expériences les plus authentiques, garantissant à chaque client un voyage inoubliable.
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
                src="livre-histoire-de-voyage-avec-agence-de-voyage.jpg"
                alt="Notre équipe"
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
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
            <h3 className="text-4xl font-bold text-center text-foreground mb-16">Nos Valeurs</h3>
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

      <section id="services" className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Nos Services</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Des expériences sur mesure conçues pour les voyageurs les plus exigeants
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
                features: ["Accès privé", "Guide expert", "Transport de luxe"],
                
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
                        ? "/Voyage-sur-mesure.JPG"
                        : "/chauffeur-et-client-heureux.jpg"
                    }
                    alt={service.title}
                    className="w-full h-full object-cover"
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
                    <span className="text-2xl font-bold text-accent">{service.price}</span>
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
                title: "Aventure de Luxe",
                description: "Expéditions exclusives dans les destinations les plus spectaculaires",
              },
              {
                icon: <Waves className="h-12 w-12 text-accent" />,
                title: "Croisières Privées",
                description: "Yachts de luxe et croisières sur mesure dans les plus belles eaux",
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
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Contactez-Nous</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Prêt à vivre l'expérience de voyage de vos rêves ? Parlons-en ensemble.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="border-0 bg-muted p-8">
              <CardContent className="p-0">
                <h3 className="text-3xl font-bold text-foreground mb-8">Planifiez Votre Voyage</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Prénom</label>
                      <Input className="bg-background border-border focus:ring-accent" placeholder="Votre prénom" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Nom</label>
                      <Input className="bg-background border-border focus:ring-accent" placeholder="Votre nom" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input
                      type="email"
                      className="bg-background border-border focus:ring-accent"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Téléphone</label>
                    <Input className="bg-background border-border focus:ring-accent" placeholder="+33 1 23 45 67 89" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Destination souhaitée</label>
                    <Input
                      className="bg-background border-border focus:ring-accent"
                      placeholder="Où souhaitez-vous voyager ?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Décrivez-nous votre voyage idéal..."
                    />
                  </div>

                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6">
                    Envoyer ma Demande
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-8">Nos Coordonnées</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail className="h-6 w-6 text-accent" />,
                      title: "Email",
                      content: "contact@elitevoyages.fr",
                      subtitle: "Réponse sous 2h en moyenne",
                    },
                    {
                      icon: <Phone className="h-6 w-6 text-accent" />,
                      title: "Téléphone",
                      content: "+33 1 42 86 95 73",
                      subtitle: "Lun-Ven 9h-19h, Sam 10h-16h",
                    },
                    {
                      icon: <MapPin className="h-6 w-6 text-accent" />,
                      title: "Adresse",
                      content: "Dakar - Sénégal",
                      subtitle: "75008 Dakar, Sénégal",
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
                <span className="text-3xl font-bold">Élite Voyages</span>
              </div>
              <p className="text-primary-foreground/80 mb-6 text-lg leading-relaxed">
                Votre partenaire de confiance pour des voyages d'exception depuis 2009. Nous transformons vos rêves de
                voyage en réalités inoubliables.
              </p>
              <div className="flex space-x-4">
                <div className="bg-primary-foreground/10 p-3 rounded-lg">
                  <Award className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="bg-primary-foreground/10 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="bg-primary-foreground/10 p-3 rounded-lg">
                  <Globe className="h-6 w-6 text-primary-foreground" />
                </div>
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
                    Europe de Luxe
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
              &copy; 2024 Élite Voyages. Tous droits réservés. | Conditions Générales | Politique de Confidentialité
            </p>
          </div>
        </div>
      </footer>

      {/* Modal de Réservation */}
      {reservationOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-foreground">Réservation de Voyage</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReservationOpen(false)}
                  className="p-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleReservationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Prénom *</label>
                    <Input
                      name="firstName"
                      value={reservationData.firstName}
                      onChange={handleInputChange}
                      placeholder="Votre prénom"
                      required
                      className="bg-background border-border focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nom *</label>
                    <Input
                      name="lastName"
                      value={reservationData.lastName}
                      onChange={handleInputChange}
                      placeholder="Votre nom"
                      required
                      className="bg-background border-border focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={reservationData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                      required
                      className="bg-background border-border focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Téléphone *</label>
                    <Input
                      name="phone"
                      value={reservationData.phone}
                      onChange={handleInputChange}
                      placeholder="+221 77 123 45 67"
                      required
                      className="bg-background border-border focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Destination souhaitée *</label>
                  <Input
                    name="destination"
                    value={reservationData.destination}
                    onChange={handleInputChange}
                    placeholder="Où souhaitez-vous voyager ?"
                    required
                    className="bg-background border-border focus:ring-accent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date de départ *</label>
                    <Input
                      type="date"
                      name="departureDate"
                      value={reservationData.departureDate}
                      onChange={handleInputChange}
                      required
                      className="bg-background border-border focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date de retour</label>
                    <Input
                      type="date"
                      name="returnDate"
                      value={reservationData.returnDate}
                      onChange={handleInputChange}
                      className="bg-background border-border focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nombre de voyageurs *</label>
                    <select
                      name="travelers"
                      value={reservationData.travelers}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="1">1 personne</option>
                      <option value="2">2 personnes</option>
                      <option value="3">3 personnes</option>
                      <option value="4">4 personnes</option>
                      <option value="5+">5+ personnes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Budget approximatif</label>
                    <select
                      name="budget"
                      value={reservationData.budget}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="5000-10000">5 000€ - 10 000€</option>
                      <option value="10000-25000">10 000€ - 25 000€</option>
                      <option value="25000-50000">25 000€ - 50 000€</option>
                      <option value="50000+">50 000€+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message spécial</label>
                  <textarea
                    name="message"
                    value={reservationData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Décrivez-nous votre voyage idéal, vos préférences, vos attentes..."
                    className="w-full p-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6 disabled:opacity-50"
                  >
                    {isLoading ? "Envoi en cours..." : "Envoyer ma Demande de Réservation"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setReservationOpen(false)}
                    className="flex-1 text-lg py-6"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
