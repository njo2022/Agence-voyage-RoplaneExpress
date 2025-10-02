# 🚀 Guide d'installation Tawk.to pour Roplane Express

## 📋 Étapes d'installation

### 1. 🔐 Créer un compte Tawk.to

1. Allez sur [https://www.tawk.to](https://www.tawk.to)
2. Cliquez sur **"Sign Up Free"**
3. Créez votre compte avec vos informations

### 2. 🏗️ Configurer votre propriété

1. Une fois connecté, cliquez sur **"Add New Property"**
2. Nom de la propriété : **"Roplane Express"**
3. URL du site : **votre-domaine.com**
4. Catégorie : **"Travel & Tourism"**

### 3. 🔑 Obtenir vos identifiants

1. Dans le dashboard Tawk.to, allez dans **"Administration" > "Chat Widget"**
2. Copiez votre **Property ID** (format: `5f8a9b2c3d4e5f6789abcdef`)
3. Le **Widget ID** est généralement `"default"` sauf si vous en créez plusieurs

### 4. ⚙️ Configuration dans votre projet

1. Copiez le fichier `env.example` vers `.env.local` :
   ```bash
   cp env.example .env.local
   ```

2. Modifiez `.env.local` avec vos vraies valeurs :
   ```env
   # Configuration Tawk.to Chat
   NEXT_PUBLIC_TAWK_PROPERTY_ID=5f8a9b2c3d4e5f6789abcdef
   NEXT_PUBLIC_TAWK_WIDGET_ID=default
   ```

### 5. 🎨 Personnalisation de l'apparence

Dans le dashboard Tawk.to :

1. **"Administration" > "Chat Widget" > "Appearance"**
2. **Couleurs recommandées pour Roplane Express :**
   - Couleur principale : `#1e40af` (bleu professionnel)
   - Couleur secondaire : `#f8fafc` (gris clair)
   - Couleur du texte : `#1f2937` (gris foncé)

3. **Message de bienvenue :**
   ```
   🌍 Bonjour ! Bienvenue chez Roplane Express.
   
   Je suis là pour vous aider à planifier votre voyage de rêve. 
   Comment puis-je vous assister aujourd'hui ?
   
   ✈️ Destinations exclusives
   🏨 Hébergements de luxe  
   🚗 Transport premium
   ```

4. **Avatar et nom :**
   - Nom de l'agent : **"Conseiller Roplane"**
   - Avatar : Utilisez le logo de votre agence

### 6. 📧 Configuration des notifications

1. **"Administration" > "Alerts & Notifications"**
2. **Email notifications :**
   - ✅ New chat started
   - ✅ New message received
   - ✅ Chat missed
   - ✅ Visitor left contact details

3. **Email de notification :** Votre email professionnel

4. **Mobile App :** Téléchargez l'app Tawk.to pour recevoir les notifications push

### 7. 🤖 Configuration des réponses automatiques

1. **"Administration" > "Shortcuts"**
2. Créez des raccourcis pour les questions fréquentes :

   **Raccourci : `/destinations`**
   ```
   🌍 Nos destinations phares :
   
   🏝️ Îles Maldives - À partir de 2500€
   🗾 Japon authentique - À partir de 3200€
   🏛️ Grèce antique - À partir de 1800€
   🦘 Australie sauvage - À partir de 4500€
   
   Quelle destination vous intéresse ?
   ```

   **Raccourci : `/contact`**
   ```
   📞 Nos coordonnées :
   
   ☎️ Téléphone : +33 1 23 45 67 89
   📧 Email : contact@roplane-express.com
   🕒 Horaires : Lun-Ven 9h-18h, Sam 9h-12h
   
   Préférez-vous être rappelé ?
   ```

### 8. 📊 Tableau de bord et rapports

1. **Dashboard principal :** Vue d'ensemble des chats en temps réel
2. **Rapports :** Statistiques détaillées des conversations
3. **Historique :** Toutes les conversations sauvegardées automatiquement

### 9. 📱 Application mobile

1. Téléchargez **"Tawk.to Live Chat"** sur votre smartphone
2. Connectez-vous avec vos identifiants
3. Recevez les notifications push en temps réel
4. Répondez aux clients même en déplacement

### 10. 🔧 Options avancées

#### Intégration avec votre CRM
- Connectez Tawk.to à votre système de gestion client
- Export automatique des leads

#### Chatbots (optionnel)
- Créez des réponses automatiques intelligentes
- Qualification automatique des prospects

#### Horaires d'ouverture
```
Lundi - Vendredi : 9h00 - 18h00
Samedi : 9h00 - 12h00
Dimanche : Fermé

Message hors horaires :
"Nous sommes actuellement fermés. Laissez-nous un message et nous vous répondrons dès notre retour !"
```

## ✅ Vérification de l'installation

1. Démarrez votre serveur de développement :
   ```bash
   npm run dev
   ```

2. Ouvrez votre site dans le navigateur
3. Vous devriez voir le widget de chat Tawk.to en bas à droite
4. Testez en envoyant un message - vous devriez recevoir une notification

## 🎯 Avantages de Tawk.to pour votre agence

- ✅ **100% gratuit** - Aucun coût caché
- ✅ **Professionnel** - Interface moderne et élégante  
- ✅ **Temps réel** - Conversations instantanées
- ✅ **Multi-agents** - Plusieurs conseillers peuvent répondre
- ✅ **Mobile** - Application pour répondre partout
- ✅ **Historique** - Toutes les conversations sauvegardées
- ✅ **Analytics** - Statistiques détaillées
- ✅ **Personnalisable** - Couleurs et messages sur mesure
- ✅ **Notifications** - Email + push + son
- ✅ **Intégrations** - CRM, email marketing, etc.

## 🆘 Support

- **Documentation :** [https://help.tawk.to](https://help.tawk.to)
- **Support Tawk.to :** Chat directement sur leur site
- **Communauté :** Forum d'entraide actif

---

🎉 **Félicitations !** Votre chat professionnel est maintenant opérationnel !
