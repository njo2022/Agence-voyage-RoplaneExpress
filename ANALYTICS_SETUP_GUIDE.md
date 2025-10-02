# Guide Configuration Google Analytics & Search Console - Roplane Express

## 🚀 Configuration Google Analytics 4 (GA4)

### **Étape 1: Création du compte**
1. Aller sur [Google Analytics](https://analytics.google.com/)
2. Cliquer sur "Commencer gratuitement"
3. Créer un compte avec les informations suivantes:

```
Nom du compte: Roplane Express
Nom de la propriété: Site Web Roplane Express
Secteur d'activité: Voyage et tourisme
Pays: Sénégal
Devise: Franc CFA (XOF)
Fuseau horaire: (GMT+00:00) Heure de Greenwich
```

### **Étape 2: Configuration du flux de données**
```
Type de plateforme: Web
URL du site web: https://roplaneexpress.com
Nom du flux: Site Web Principal Roplane Express
```

### **Étape 3: Récupération de l'ID de mesure**
- Copier l'ID de mesure (format: G-XXXXXXXXXX)
- L'ajouter dans le fichier `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-VOTRE-ID-ICI
```

### **Étape 4: Intégration dans le site**
Le composant Analytics est déjà créé. Pour l'activer:

1. **Modifier `app/layout.tsx`** pour inclure Analytics:
```tsx
import Analytics from '../components/analytics'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Schema markup existant */}
      </head>
      <body>
        {children}
        <Analytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </body>
    </html>
  )
}
```

## 📊 Événements personnalisés configurés

### **Événements de conversion**
- `reservation_started` - Ouverture du modal de réservation
- `reservation_completed` - Soumission du formulaire de réservation
- `contact_form_submitted` - Envoi du formulaire de contact

### **Événements d'engagement**
- `service_viewed` - Consultation d'un service spécifique
- `social_media_click` - Clic sur les réseaux sociaux
- `phone_click` - Clic sur le numéro de téléphone
- `email_click` - Clic sur l'adresse email

### **Utilisation dans le code**
```tsx
import { trackEvent, trackConversion } from '../lib/analytics-config'

// Exemple: Suivi d'une réservation
const handleReservationSubmit = () => {
  trackConversion('reservation_completed', 1)
  // ... reste du code
}

// Exemple: Suivi d'un clic social
const handleSocialClick = (platform: string) => {
  trackEvent('social_media_click', { platform })
}
```

## 🔍 Configuration Google Search Console

### **Étape 1: Ajout de la propriété**
1. Aller sur [Google Search Console](https://search.google.com/search-console/)
2. Cliquer sur "Ajouter une propriété"
3. Choisir "Préfixe d'URL"
4. Saisir: `https://roplaneexpress.com`

### **Étape 2: Vérification de propriété**
**Méthode recommandée: Balise HTML**
1. Copier la balise de vérification fournie
2. L'ajouter dans `app/layout.tsx` dans les métadonnées:

```tsx
export const metadata: Metadata = {
  // ... métadonnées existantes
  verification: {
    google: 'VOTRE-CODE-DE-VERIFICATION-ICI',
  },
}
```

### **Étape 3: Soumission du sitemap**
1. Dans Search Console, aller dans "Sitemaps"
2. Ajouter l'URL: `https://roplaneexpress.com/sitemap.xml`
3. Cliquer sur "Envoyer"

## 📈 Objectifs et conversions à configurer

### **Objectifs GA4 recommandés**

#### **1. Réservation de voyage**
```
Nom: Réservation voyage
Type: Événement personnalisé
Conditions: event_name = reservation_completed
Valeur: 1 (par réservation)
```

#### **2. Demande de contact**
```
Nom: Demande de contact
Type: Événement personnalisé
Conditions: event_name = contact_form_submitted
Valeur: 0.5 (lead qualifié)
```

#### **3. Engagement social**
```
Nom: Engagement réseaux sociaux
Type: Événement personnalisé
Conditions: event_name = social_media_click
Valeur: 0.1 (engagement)
```

### **4. Consultation services**
```
Nom: Consultation services
Type: Pages vues
Conditions: page_location contient "#services"
Valeur: 0.2 (intérêt)
```

## 🎯 Audiences personnalisées

### **1. Visiteurs intéressés par voyages sur mesure**
- Ont visité la section services
- Temps sur la page > 30 secondes
- Ont consulté les tarifs

### **2. Prospects chauds**
- Ont ouvert le modal de réservation
- Ont cliqué sur le téléphone/email
- Visiteurs récurrents (2+ sessions)

### **3. Clients potentiels locaux**
- Géolocalisation: Dakar, Sénégal
- Langue: Français
- Appareil: Mobile (pour ciblage local)

## 📊 Rapports personnalisés à créer

### **1. Rapport Performance SEO**
**Dimensions:**
- Source/Medium
- Page de destination
- Mot-clé (si disponible)

**Métriques:**
- Sessions organiques
- Taux de conversion
- Durée moyenne des sessions
- Pages par session

### **2. Rapport Conversions par Service**
**Dimensions:**
- Titre de la page
- Événement de conversion
- Source de trafic

**Métriques:**
- Nombre de conversions
- Taux de conversion
- Valeur des conversions

### **3. Rapport Mobile vs Desktop**
**Dimensions:**
- Catégorie d'appareil
- Système d'exploitation
- Navigateur

**Métriques:**
- Sessions
- Taux de rebond
- Conversions
- Revenus

## 🔔 Alertes à configurer

### **1. Baisse de trafic organique**
- Condition: Sessions organiques < 80% de la moyenne sur 7 jours
- Fréquence: Quotidienne
- Destinataires: Équipe marketing

### **2. Pic de conversions**
- Condition: Conversions > 150% de la moyenne sur 1 jour
- Fréquence: Immédiate
- Destinataires: Équipe commerciale

### **3. Erreurs 404**
- Condition: Pages 404 > 10 par jour
- Fréquence: Quotidienne
- Destinataires: Équipe technique

## 📱 Configuration Google Tag Manager (optionnel)

### **Avantages pour Roplane Express**
- Gestion centralisée des tags
- Suivi avancé des interactions
- Tests A/B facilités
- Intégration avec d'autres outils marketing

### **Tags recommandés**
1. **Suivi des clics téléphone**
2. **Suivi des téléchargements PDF** (brochures)
3. **Suivi du scroll** (engagement contenu)
4. **Suivi des vidéos** (si ajoutées)
5. **Pixels Facebook/Instagram** (remarketing)

## 🎯 KPIs à surveiller mensuellement

### **Trafic et acquisition**
- Sessions organiques (+20% objectif)
- Trafic direct (+15% objectif)
- Trafic réseaux sociaux (+30% objectif)
- Taux de rebond (<60% objectif)

### **Conversions**
- Réservations complétées (objectif: 10/mois)
- Demandes de contact (objectif: 25/mois)
- Téléchargements brochures (objectif: 50/mois)
- Appels téléphoniques (objectif: 40/mois)

### **Engagement**
- Durée moyenne session (>2 minutes)
- Pages par session (>2.5)
- Retour des visiteurs (>25%)
- Partages sociaux (>20/mois)

## ✅ Checklist de mise en œuvre

### **Phase 1: Configuration de base (Semaine 1)**
- [ ] Créer compte Google Analytics 4
- [ ] Configurer la propriété et le flux de données
- [ ] Intégrer le code de suivi sur le site
- [ ] Vérifier que les données arrivent
- [ ] Configurer Google Search Console
- [ ] Soumettre le sitemap

### **Phase 2: Configuration avancée (Semaine 2)**
- [ ] Créer les objectifs de conversion
- [ ] Configurer les audiences personnalisées
- [ ] Mettre en place les événements personnalisés
- [ ] Créer les rapports personnalisés
- [ ] Configurer les alertes

### **Phase 3: Optimisation (Semaine 3-4)**
- [ ] Analyser les premières données
- [ ] Ajuster les objectifs si nécessaire
- [ ] Créer un tableau de bord exécutif
- [ ] Former l'équipe à l'utilisation
- [ ] Planifier les rapports mensuels

---

**Note**: Cette configuration Analytics permettra de mesurer précisément l'efficacité SEO et l'impact des optimisations sur les conversions de Roplane Express.
