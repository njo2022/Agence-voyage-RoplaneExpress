# Configuration des Headers de Sécurité

## Content Security Policy (CSP)

La CSP a été renforcée pour prévenir efficacement les attaques XSS :

### Améliorations apportées

1. **Suppression de `'unsafe-inline'` et `'unsafe-eval'`** pour les scripts
   - Utilisation de nonces dynamiques générés par le middleware
   - Directive `'strict-dynamic'` pour permettre le chargement de scripts depuis des scripts de confiance

2. **Configuration par directive** :
   - `default-src 'self'` : Seules les ressources du même origine par défaut
   - `script-src` : Nonces + strict-dynamic + domaines de confiance (EmailJS, Leaflet)
   - `style-src` : 'unsafe-inline' autorisé pour les styles (moins risqué que les scripts)
   - `img-src` : Autorise data:, https:, blob: pour flexibilité des images
   - `connect-src` : API EmailJS et tiles OpenStreetMap
   - `object-src 'none'` : Bloque Flash et autres plugins
   - `base-uri 'self'` : Prévient l'injection de base href
   - `form-action 'self'` : Les formulaires ne peuvent soumettre qu'à notre domaine
   - `frame-ancestors 'self'` : Prévient le clickjacking
   - `upgrade-insecure-requests` : Force HTTPS

### Implémentation

La CSP est gérée par deux couches :

1. **Middleware (`middleware.ts`)** :
   - Génère un nonce unique par requête
   - Applique la CSP avec le nonce dynamique
   - Ajoute d'autres headers de sécurité

2. **Next.js Config (`next.config.mjs`)** :
   - Configure les headers Cross-Origin (COOP, COEP, CORP)
   - Configure les permissions et autres politiques de sécurité

## Autres Headers de Sécurité

### X-Frame-Options
`SAMEORIGIN` : Empêche l'intégration du site dans des iframes externes (protection clickjacking)

### X-Content-Type-Options
`nosniff` : Empêche le navigateur de deviner le type MIME (protection XSS)

### X-XSS-Protection
`1; mode=block` : Active la protection XSS du navigateur (backup pour anciens navigateurs)

### Referrer-Policy
`origin-when-cross-origin` : Contrôle les informations de référent envoyées

### Permissions-Policy
Désactive camera, microphone, geolocation pour réduire la surface d'attaque

### Strict-Transport-Security (HSTS)
`max-age=31536000; includeSubDomains` : Force HTTPS pendant 1 an

### Cross-Origin-Opener-Policy (COOP)
`same-origin-allow-popups` : Isole le contexte de navigation

### Cross-Origin-Embedder-Policy (COEP)
`credentialless` : Mode sans credentials pour les ressources cross-origin

### Cross-Origin-Resource-Policy (CORP)
`cross-origin` : Autorise le partage de ressources cross-origin contrôlé

## Tests de Sécurité

Pour tester la configuration :

1. **Outils en ligne** :
   - [Mozilla Observatory](https://observatory.mozilla.org/)
   - [Security Headers](https://securityheaders.com/)
   - [CSP Evaluator](https://csp-evaluator.withgoogle.com/)

2. **PageSpeed Insights** :
   - Vérifier l'audit "Fiabilité et Sécurité"
   - Score CSP doit être élevé

3. **Console du navigateur** :
   - Vérifier qu'il n'y a pas d'erreurs CSP
   - Tester que les fonctionnalités (EmailJS, carte) fonctionnent

## Maintenance

- Le nonce CSP est généré automatiquement à chaque requête
- Aucune modification manuelle nécessaire pour les scripts inline
- Si ajout de nouveaux domaines externes, les ajouter dans `middleware.ts`
