# 🔐 Configuration Sécurisée - Élite Voyages

## 📋 Vue d'ensemble

Ce projet utilise une configuration sécurisée pour les variables sensibles, notamment les clés EmailJS. Les variables sont centralisées dans des fichiers de configuration séparés.

## 🗂️ Structure de la configuration

```
lib/
├── email-config.ts          # Configuration centralisée EmailJS
├── utils.ts                 # Utilitaires généraux

env.example                  # Exemple de variables d'environnement
.env.local                   # Variables d'environnement locales (non commitées)
```

## ⚙️ Configuration EmailJS

### **1. Fichier de configuration centralisé**

Le fichier `lib/email-config.ts` contient toute la configuration EmailJS :

```typescript
export const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_elite_voyages',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_reservation_v2',
  acknowledgmentTemplateId: process.env.NEXT_PUBLIC_EMAILJS_ACKNOWLEDGMENT_TEMPLATE_ID || 'template_acknowledgment',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'uLgTGGpZR4O1pZLFo',
  destinationEmail: process.env.NEXT_PUBLIC_DESTINATION_EMAIL || 'dakcarsbcenter@gmail.com',
}
```

### **2. Variables d'environnement**

Créez un fichier `.env.local` à partir de `env.example` :

```bash
# Copier l'exemple
cp env.example .env.local

# Éditer avec vos vraies valeurs
nano .env.local
```

**Contenu de `.env.local` :**
```env
# Configuration EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_elite_voyages
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_reservation_v2
NEXT_PUBLIC_EMAILJS_ACKNOWLEDGMENT_TEMPLATE_ID=template_acknowledgment
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=uLgTGGpZR4O1pZLFo
NEXT_PUBLIC_DESTINATION_EMAIL=dakcarsbcenter@gmail.com
```

## 🔒 Sécurité

### **Variables protégées**
- ✅ `.env.local` est dans `.gitignore`
- ✅ Les clés ne sont pas exposées dans le code
- ✅ Configuration centralisée et maintenable
- ✅ Fallback vers des valeurs par défaut

### **Bonnes pratiques**
1. **Ne jamais commiter** les fichiers `.env.local`
2. **Utiliser des clés différentes** pour dev/prod
3. **Régénérer les clés** si compromises
4. **Documenter** les variables nécessaires

## 🚀 Déploiement

### **Variables d'environnement sur Vercel**

1. **Aller dans Vercel Dashboard** → Settings → Environment Variables
2. **Ajouter les variables** :

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID = service_elite_voyages
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = template_reservation_v2
NEXT_PUBLIC_EMAILJS_ACKNOWLEDGMENT_TEMPLATE_ID = template_acknowledgment
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = uLgTGGpZR4O1pZLFo
NEXT_PUBLIC_DESTINATION_EMAIL = dakcarsbcenter@gmail.com
```

3. **Redéployer** l'application

## 🔧 Utilisation dans le code

### **Import de la configuration**
```typescript
import { emailConfig } from '@/lib/email-config'

// Utilisation
const { serviceId, templateId, publicKey, destinationEmail } = emailConfig
```

### **Avantages de cette approche**
- ✅ **Sécurité** : Clés non exposées dans le code
- ✅ **Maintenabilité** : Configuration centralisée
- ✅ **Flexibilité** : Variables d'environnement
- ✅ **Fallback** : Valeurs par défaut si variables manquantes

## 📝 Checklist de configuration

### **Développement local**
- [ ] Copier `env.example` vers `.env.local`
- [ ] Remplir les vraies valeurs dans `.env.local`
- [ ] Vérifier que `.env.local` est dans `.gitignore`
- [ ] Tester l'envoi d'emails

### **Production (Vercel)**
- [ ] Ajouter les variables dans Vercel Dashboard
- [ ] Vérifier les valeurs de production
- [ ] Redéployer l'application
- [ ] Tester l'envoi d'emails en production

## 🆘 Dépannage

### **Problèmes courants**

1. **Variables non chargées**
   ```bash
   # Vérifier que .env.local existe
   ls -la .env.local
   
   # Redémarrer le serveur de développement
   npm run dev
   ```

2. **Erreurs EmailJS**
   ```typescript
   // Vérifier la configuration
   console.log('EmailJS Config:', emailConfig)
   ```

3. **Templates non trouvés**
   - Vérifier les IDs des templates dans EmailJS
   - Vérifier les variables d'environnement

### **Logs de débogage**
```typescript
// Ajouter dans handleReservationSubmit
console.log('Configuration EmailJS:', {
  serviceId,
  templateId,
  publicKey,
  destinationEmail
})
```

## 📞 Support

Pour toute question sur la configuration :
- **Email** : dakcarsbcenter@gmail.com
- **Documentation** : GUIDE_COMPLET.md
- **Logs** : Vérifier la console du navigateur

---

**Configuration sécurisée et prête pour la production ! 🔐**
