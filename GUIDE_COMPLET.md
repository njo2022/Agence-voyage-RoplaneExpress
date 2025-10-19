# 🚀 Guide Complet - Élite Voyages Landing Page

## 📋 Table des Matières

1. [Vue d'ensemble du projet](#vue-densemble-du-projet)
2. [Stack technologique](#stack-technologique)
3. [Structure du projet](#structure-du-projet)
4. [Installation et configuration](#installation-et-configuration)
5. [Fonctionnalités principales](#fonctionnalités-principales)
6. [Gestion des images](#gestion-des-images)
7. [Système de réservation](#système-de-réservation)
8. [Configuration EmailJS](#configuration-emailjs)
9. [Déploiement](#déploiement)
10. [Maintenance et évolutions](#maintenance-et-évolutions)

---

## 🎯 Vue d'ensemble du projet

**Élite Voyages** est une landing page moderne pour une agence de voyage de luxe basée à Dakar, Sénégal. Le site présente les services premium de l'agence avec un système de réservation intégré et un design élégant.

### **Caractéristiques principales :**
- 🎨 Design moderne et responsive
- 📱 Interface mobile-first
- ✈️ Système de réservation intégré
- 📧 Envoi d'emails automatique
- 🖼️ Gestion d'images optimisée

---

## 🛠️ Stack technologique

### **Frontend Framework**
- **Next.js 14.2.16** - Framework React avec App Router
- **React 18** - Bibliothèque UI
- **TypeScript** - Langage de programmation typé

### **Styling & UI**
- **Tailwind CSS 4.1.9** - Framework CSS utility-first
- **shadcn/ui** - Composants UI basés sur Radix UI
- **Radix UI** - Composants primitifs accessibles
- **Lucide React** - Icônes modernes
- **Geist** - Police de caractères

### **Gestionnaire de paquets**
- **npm** - Gestionnaire de paquets (pnpm également supporté)

### **Email & Communication**
- **EmailJS** - Service d'envoi d'emails côté client
- **Templates HTML** - Templates d'emails personnalisés

### **Déploiement & Analytics**
- **Vercel** - Plateforme de déploiement
- **Vercel Analytics** - Analytics intégrées

---

## 📁 Structure du projet

```
v0-travel-agency-landing-page/
├── app/                          # App Router Next.js
│   ├── globals.css              # Styles globaux
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Page d'accueil
├── components/                   # Composants réutilisables
│   ├── theme-provider.tsx       # Provider de thème
│   └── ui/                      # Composants UI shadcn
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
├── lib/                         # Utilitaires
│   └── utils.ts                 # Fonctions utilitaires
├── public/                      # Assets statiques
│   ├── *.jpg                   # Images du site
│   └── *.png                   # Images de placeholder
├── styles/                      # Styles additionnels
│   └── globals.css
├── components.json              # Configuration shadcn/ui
├── next.config.mjs             # Configuration Next.js
├── package.json                # Dépendances du projet
├── postcss.config.mjs          # Configuration PostCSS
├── tsconfig.json               # Configuration TypeScript
└── README.md                   # Documentation de base
```

---

## ⚙️ Installation et configuration

### **Prérequis**
- Node.js 18+ 
- npm ou pnpm
- Git

### **1. Cloner le projet**
```bash
git clone [URL_DU_REPO]
cd v0-travel-agency-landing-page
```

### **2. Installer les dépendances**
```bash
# Avec npm
npm install

# Ou avec pnpm
pnpm install
```

### **3. Lancer le serveur de développement**
```bash
# Avec npm
npm run dev

# Ou avec pnpm
pnpm dev
```

### **4. Accéder au site**
Ouvrez votre navigateur sur `http://localhost:3000`

---

## 🎨 Fonctionnalités principales

### **1. Navigation**
- **Navbar fixe** avec effet de transparence
- **Menu mobile** responsive
- **Navigation fluide** entre les sections
- **Boutons d'action** "Réserver Maintenant"

### **2. Sections du site**

#### **🏠 Section Hero (Accueil)**
- **Image de fond** : `a-beach-with-a-hut-on-it.jpg`
- **Titre principal** : "Voyages d'Exception"
- **Boutons d'action** : "Découvrir nos Services" et "Planifier mon Voyage"

#### **👥 Section "À propos"**
- **Image de l'équipe** : `professional-travel-consultants-luxury-office.jpg`
- **Statistiques** : 500+ voyages, 98% satisfaction
- **Valeurs** : Excellence, Passion, Authenticité

#### **🛎️ Section "Services"**
- **Service 1** : Voyages Sur Mesure (`Voyage-sur-mesure.JPG`)
- **Service 2** : Expériences VIP (`chauffeur-et-client-heureux.jpg`)
- **Catégories** : Aventure, Croisières, Culture, Événements

#### **📞 Section "Contact"**
- **Formulaire de contact** intégré
- **Informations** : Email, Téléphone, Adresse, Horaires
- **Localisation** : Dakar, Sénégal

### **3. Système de réservation**
- **Modal de réservation** avec formulaire complet
- **Champs** : Informations personnelles, détails du voyage, préférences
- **Validation** des champs obligatoires
- **Envoi automatique** par email

---

## 🖼️ Gestion des images

### **Images utilisées dans le site**

#### **Section Hero**
```typescript
// Image de fond principale
backgroundImage: `url('/a-beach-with-a-hut-on-it.jpg')`
```

#### **Section À propos**
```typescript
// Image de l'équipe
src="/professional-travel-consultants-luxury-office.jpg"
```

#### **Section Services**
```typescript
// Service 1 - Voyages Sur Mesure
src="/Voyage-sur-mesure.JPG"

// Service 2 - Expériences VIP  
src="/chauffeur-et-client-heureux.jpg"
```

### **Images disponibles dans /public**
- `a-beach-with-a-hut-on-it.jpg` ✅ (utilisée)
- `Voyage-sur-mesure.JPG` ✅ (utilisée)
- `chauffeur-et-client-heureux.jpg` ✅ (utilisée)
- `professional-travel-consultants-luxury-office.jpg` ✅ (utilisée)
- `cultural-immersion-expert-guide.jpg` (disponible)
- `exclusive-private-event-celebration.jpg` (disponible)
- `luxury-mountain-adventure.jpg` (disponible)
- `private-yacht-cruise.jpg` (disponible)
- `stunning-mountain-landscape-with-crystal-clear-lak.jpg` (disponible)

### **Comment ajouter/modifier des images**

1. **Ajouter une nouvelle image** :
   ```bash
   # Placer l'image dans le dossier public/
   cp nouvelle-image.jpg public/
   ```

2. **Modifier une image existante** :
   ```typescript
   // Dans app/page.tsx, remplacer le chemin
   src="/nouvelle-image.jpg"
   ```

3. **Optimiser les images** :
   - Format recommandé : JPG pour photos, PNG pour transparence
   - Taille recommandée : max 2MB
   - Résolution : 1920x1080 pour les images de fond

---

## 📧 Système de réservation

### **Fonctionnalités du formulaire**

#### **Champs du formulaire**
- **Informations personnelles** : Prénom, Nom, Email, Téléphone
- **Détails du voyage** : Destination, Dates de départ/retour
- **Préférences** : Nombre de voyageurs, Budget
- **Message spécial** : Zone de texte libre

#### **Validation**
- **Champs obligatoires** : Prénom, Nom, Email, Téléphone, Destination, Date de départ, Nombre de voyageurs
- **Validation email** automatique
- **Gestion d'erreurs** avec messages appropriés

#### **États du formulaire**
```typescript
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
```

### **Flux de réservation**

1. **Utilisateur clique** sur "Réserver Maintenant"
2. **Modal s'ouvre** avec le formulaire
3. **Utilisateur remplit** les informations
4. **Validation** des champs obligatoires
5. **Envoi** des données par EmailJS
6. **Confirmation** à l'utilisateur
7. **Fermeture** du modal et réinitialisation

---

## 📨 Configuration EmailJS

### **1. Créer un compte EmailJS**
1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Connectez votre service email (Gmail, Outlook, etc.)

### **2. Configuration sécurisée**

Le projet utilise maintenant une configuration centralisée et sécurisée :

#### **Fichier de configuration** (`lib/email-config.ts`)
```typescript
export const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_elite_voyages',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_reservation_v2',
  acknowledgmentTemplateId: process.env.NEXT_PUBLIC_EMAILJS_ACKNOWLEDGMENT_TEMPLATE_ID || 'template_acknowledgment',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'uLgTGGpZR4O1pZLFo',
  destinationEmail: process.env.NEXT_PUBLIC_DESTINATION_EMAIL || 'dakcarsbcenter@gmail.com',
}
```

#### **Variables d'environnement** (`.env.local`)
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_elite_voyages
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_reservation_v2
NEXT_PUBLIC_EMAILJS_ACKNOWLEDGMENT_TEMPLATE_ID=template_acknowledgment
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=uLgTGGpZR4O1pZLFo
NEXT_PUBLIC_DESTINATION_EMAIL=dakcarsbcenter@gmail.com
```

### **3. Templates d'emails**

#### **Template de notification (pour l'agence)**
```html
<!-- Template pour dakcarsbcenter@gmail.com -->
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
  <div style="background-color: #2c3e50; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
    <h2 style="margin: 0; font-size: 24px;">✈️ Nouvelle Demande de Réservation</h2>
  </div>
  
  <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    
    <!-- Informations du client -->
    <div style="margin-bottom: 25px; padding: 20px; background-color: #e8f4fd; border-radius: 8px; border-left: 4px solid #3498db;">
      <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px;">👤 Informations du Client</h3>
      <div style="margin-bottom: 8px;"><strong>Nom complet:</strong> {{from_name}}</div>
      <div style="margin-bottom: 8px;"><strong>Email:</strong> {{from_email}}</div>
      <div style="margin-bottom: 8px;"><strong>Téléphone:</strong> {{phone}}</div>
    </div>

    <!-- Détails du voyage -->
    <div style="margin-bottom: 25px; padding: 20px; background-color: #f0f8f0; border-radius: 8px; border-left: 4px solid #27ae60;">
      <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px;">🌍 Détails du Voyage</h3>
      <div style="margin-bottom: 8px;"><strong>Destination:</strong> {{destination}}</div>
      <div style="margin-bottom: 8px;"><strong>Date de départ:</strong> {{departure_date}}</div>
      <div style="margin-bottom: 8px;"><strong>Date de retour:</strong> {{return_date}}</div>
      <div style="margin-bottom: 8px;"><strong>Nombre de voyageurs:</strong> {{travelers}}</div>
      <div style="margin-bottom: 8px;"><strong>Budget approximatif:</strong> {{budget}}</div>
    </div>

    <!-- Message spécial -->
    <div style="margin-bottom: 25px; padding: 20px; background-color: #fff8e1; border-radius: 8px; border-left: 4px solid #f39c12;">
      <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px;">💬 Message Spécial</h3>
      <div style="background-color: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd; font-style: italic; line-height: 1.6;">
        {{message}}
      </div>
    </div>

    <!-- Actions -->
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px dashed #bdc3c7;">
      <p style="color: #7f8c8d; font-size: 14px; margin-bottom: 15px;">
        <strong>📧 Répondre à:</strong> {{reply_to}}
      </p>
    </div>
  </div>
</div>
```

#### **Template d'accusé de réception (pour le client)**
```html
<!-- Template pour l'accusé de réception -->
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
    <div style="font-size: 48px; margin-bottom: 15px;">✈️</div>
    <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Élite Voyages</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Votre partenaire de confiance pour des voyages d'exception</p>
  </div>
  
  <div style="background-color: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <!-- Message de confirmation -->
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="font-size: 48px; margin-bottom: 20px;">✅</div>
      <h2 style="color: #2c3e50; font-size: 24px; margin: 0 0 15px 0;">Demande de Réservation Reçue</h2>
      <p style="color: #7f8c8d; font-size: 16px; line-height: 1.6; margin: 0;">
        Bonjour <strong>{{from_name}}</strong>,<br>
        Nous avons bien reçu votre demande de réservation et nous vous remercions de votre confiance.
      </p>
    </div>

    <!-- Récapitulatif de la demande -->
    <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 30px; border-left: 4px solid #3498db;">
      <h3 style="color: #2c3e50; font-size: 18px; margin: 0 0 20px 0;">📋 Récapitulatif de votre demande</h3>
      
      <div style="display: grid; gap: 12px;">
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
          <span style="color: #7f8c8d; font-weight: 500;">Destination:</span>
          <span style="color: #2c3e50; font-weight: 600;">{{destination}}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
          <span style="color: #7f8c8d; font-weight: 500;">Date de départ:</span>
          <span style="color: #2c3e50; font-weight: 600;">{{departure_date}}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
          <span style="color: #7f8c8d; font-weight: 500;">Date de retour:</span>
          <span style="color: #2c3e50; font-weight: 600;">{{return_date}}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
          <span style="color: #7f8c8d; font-weight: 500;">Nombre de voyageurs:</span>
          <span style="color: #2c3e50; font-weight: 600;">{{travelers}}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0;">
          <span style="color: #7f8c8d; font-weight: 500;">Budget:</span>
          <span style="color: #2c3e50; font-weight: 600;">{{budget}}</span>
        </div>
      </div>
    </div>

    <!-- Prochaines étapes -->
    <div style="background-color: #e8f5e8; padding: 25px; border-radius: 10px; margin-bottom: 30px; border-left: 4px solid #27ae60;">
      <h3 style="color: #2c3e50; font-size: 18px; margin: 0 0 15px 0;">🚀 Prochaines étapes</h3>
      <div style="color: #2c3e50; line-height: 1.8;">
        <div style="margin-bottom: 12px;">
          <strong>1.</strong> Notre équipe d'experts va étudier votre demande
        </div>
        <div style="margin-bottom: 12px;">
          <strong>2.</strong> Nous vous contacterons dans les <strong>24 heures</strong> pour discuter de vos besoins
        </div>
        <div style="margin-bottom: 12px;">
          <strong>3.</strong> Nous vous proposerons un itinéraire personnalisé adapté à vos souhaits
        </div>
        <div>
          <strong>4.</strong> Nous organiserons votre voyage d'exception dans les moindres détails
        </div>
      </div>
    </div>

    <!-- Contact d'urgence -->
    <div style="background-color: #fff3cd; padding: 20px; border-radius: 10px; margin-bottom: 30px; border-left: 4px solid #ffc107;">
      <h3 style="color: #2c3e50; font-size: 16px; margin: 0 0 10px 0;">📞 Besoin d'aide immédiate ?</h3>
      <p style="color: #2c3e50; margin: 0; line-height: 1.6;">
        Notre équipe est disponible pour vous accompagner :<br>
        <strong>📧 Email:</strong> dakcarsbcenter@gmail.com<br>
        <strong>📱 Téléphone:</strong> +221 77 123 45 67<br>
        <strong>🕒 Horaires:</strong> Lundi - Vendredi: 9h - 19h, Samedi: 10h - 16h
      </p>
    </div>

    <!-- Signature -->
    <div style="text-align: center; padding-top: 20px; border-top: 2px solid #ecf0f1;">
      <div style="color: #7f8c8d; font-size: 14px; margin-bottom: 15px;">
        <strong>Merci de votre confiance</strong><br>
        L'équipe Élite Voyages
      </div>
      <div style="background-color: #2c3e50; color: white; padding: 15px; border-radius: 8px; font-size: 12px;">
        <strong>🏢 Élite Voyages</strong> - Agence de Voyage de Luxe<br>
        📍 Dakar, Sénégal | ✈️ Voyages d'Exception depuis 2009
      </div>
    </div>
  </div>
</div>
```

### **Variables EmailJS utilisées**
- `{{from_name}}` - Nom complet du client
- `{{from_email}}` - Email du client
- `{{phone}}` - Téléphone
- `{{destination}}` - Destination souhaitée
- `{{departure_date}}` - Date de départ
- `{{return_date}}` - Date de retour
- `{{travelers}}` - Nombre de voyageurs
- `{{budget}}` - Budget approximatif
- `{{message}}` - Message spécial
- `{{reply_to}}` - Email de réponse
- `{{time}}` - Timestamp

---

## 🚀 Déploiement

### **Déploiement sur Vercel**

1. **Connecter le repository**
   ```bash
   # Le projet est déjà connecté à Vercel
   # URL: https://vercel.com/njo2022s-projects/v0-travel-agency-landing-page
   ```

2. **Déploiement automatique**
   - Chaque push sur la branche principale déclenche un déploiement
   - Les changements sont automatiquement déployés

3. **Variables d'environnement**
   ```bash
   # Ajouter dans Vercel Dashboard > Settings > Environment Variables
   EMAILJS_SERVICE_ID=service_elite_voyages
   EMAILJS_TEMPLATE_ID=template_reservation
   EMAILJS_PUBLIC_KEY=uLgTGGpZR4O1pZLFo
   ```

### **Déploiement local pour production**
```bash
# Build du projet
npm run build

# Lancer en mode production
npm start
```

---

## 🔧 Maintenance et évolutions

### **Scripts disponibles**
```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linter ESLint
```

### **Ajout de nouvelles fonctionnalités**

#### **1. Ajouter une nouvelle section**
```typescript
// Dans app/page.tsx
<section id="nouvelle-section" className="py-24 bg-background">
  <div className="container mx-auto px-4">
    {/* Contenu de la nouvelle section */}
  </div>
</section>
```

#### **2. Ajouter un nouveau composant**
```typescript
// Créer components/nouveau-composant.tsx
import { Button } from "@/components/ui/button"

export function NouveauComposant() {
  return (
    <div>
      {/* Contenu du composant */}
    </div>
  )
}
```

#### **3. Modifier les styles**
```css
/* Dans app/globals.css */
.nouvelle-classe {
  @apply bg-accent text-accent-foreground;
}
```

### **Optimisations recommandées**

#### **Performance**
- **Images** : Optimiser les images avec Next.js Image
- **Bundle** : Analyser avec `npm run build`
- **Lighthouse** : Tester les performances

#### **SEO**
- **Métadonnées** : Ajouter dans `app/layout.tsx`
- **Sitemap** : Générer automatiquement
- **Schema.org** : Ajouter des données structurées

#### **Accessibilité**
- **ARIA** : Ajouter les attributs ARIA
- **Contraste** : Vérifier les couleurs
- **Navigation** : Tester au clavier

### **Monitoring et analytics**

#### **Vercel Analytics**
```typescript
// Déjà intégré dans app/layout.tsx
import { Analytics } from '@vercel/analytics/next'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

#### **Logs et erreurs**
- **Console** : Vérifier les erreurs JavaScript
- **Network** : Vérifier les requêtes
- **EmailJS** : Vérifier les logs d'envoi

---

## 📞 Support et contact

### **Informations de contact**
- **Email** : dakcarsbcenter@gmail.com
- **Téléphone** : +221 77 123 45 67
- **Adresse** : Dakar, Sénégal
- **Horaires** : Lundi - Vendredi: 9h - 19h, Samedi: 10h - 16h

### **Ressources utiles**
- **Next.js** : [https://nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS** : [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **shadcn/ui** : [https://ui.shadcn.com/](https://ui.shadcn.com/)
- **EmailJS** : [https://www.emailjs.com/docs](https://www.emailjs.com/docs)
- **Vercel** : [https://vercel.com/docs](https://vercel.com/docs)

---

## 🎯 Conclusion

Ce guide complet couvre tous les aspects du projet Élite Voyages. Le site est prêt pour la production avec :

✅ **Design moderne et responsive**  
✅ **Système de réservation fonctionnel**  
✅ **Envoi d'emails automatique**  
✅ **Gestion d'images optimisée**  
✅ **Déploiement automatisé**  

Pour toute question ou modification, consultez ce guide ou contactez l'équipe de développement.

**Bon voyage avec Élite Voyages ! ✈️**
