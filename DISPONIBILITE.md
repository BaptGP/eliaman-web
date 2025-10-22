# 📅 Gestion des Disponibilités à Distance

## 🎯 Comment ça marche ?

Votre site lit automatiquement vos disponibilités depuis un fichier JSON hébergé en ligne.
Vous pouvez mettre à jour ce fichier à tout moment, et votre site se mettra à jour automatiquement (rafraîchissement toutes les 5 minutes).

## 🚀 Configuration

### Option 1 : GitHub Gist (Gratuit et Simple) ⭐ RECOMMANDÉ

1. **Créer un Gist**
   - Allez sur https://gist.github.com
   - Créez un nouveau Gist public
   - Nommez le fichier : `availability.json`
   - Collez le contenu du fichier `/public/availability.json`
   - Cliquez sur "Create public gist"

2. **Obtenir l'URL**
   - Cliquez sur "Raw" dans votre Gist
   - Copiez l'URL (format : `https://gist.githubusercontent.com/USERNAME/GIST_ID/raw/availability.json`)

3. **Configurer le site**
   - Ouvrez `/src/hooks/useAvailability.js`
   - Ligne 6, remplacez l'URL par votre URL Gist :
   ```javascript
   const AVAILABILITY_URL = 'https://gist.githubusercontent.com/VOTRE_USERNAME/VOTRE_GIST_ID/raw/availability.json';
   ```
   - Décommentez les lignes 24-26

4. **Mettre à jour vos disponibilités**
   - Éditez votre Gist sur GitHub
   - Les changements apparaîtront sur votre site sous 5 minutes

### Option 2 : JSONBin.io (Gratuit avec API)

1. **Créer un compte**
   - Allez sur https://jsonbin.io
   - Créez un compte gratuit

2. **Créer un Bin**
   - Créez un nouveau Bin
   - Collez le contenu de `/public/availability.json`
   - Notez votre BIN_ID et API_KEY

3. **Configurer le site**
   ```javascript
   const AVAILABILITY_URL = 'https://api.jsonbin.io/v3/b/YOUR_BIN_ID/latest';
   // Ajoutez le header avec votre API key dans le fetch
   ```

### Option 3 : Votre propre API/Serveur

Si vous avez votre propre backend, créez une route qui retourne le JSON.

## 📝 Format du fichier JSON

```json
{
  "isAvailable": true,
  "status": "available",
  "message": "Actuellement disponible pour de nouveaux projets. Réponse sous 24h.",
  "nextAvailableDate": null,
  "maxProjects": 5,
  "currentProjects": 2,
  "lastUpdated": "2025-10-21T19:23:00Z"
}
```

### Paramètres

- **isAvailable** : `true` ou `false`
- **status** : `"available"`, `"limited"`, ou `"unavailable"`
  - `available` = Badge vert
  - `limited` = Badge jaune
  - `unavailable` = Badge rouge
- **message** : Le texte affiché (personnalisable)
- **nextAvailableDate** : Date de prochaine disponibilité (format ISO) ou `null`
- **maxProjects** : Nombre max de projets simultanés (optionnel)
- **currentProjects** : Nombre de projets en cours (optionnel)
- **lastUpdated** : Date de dernière mise à jour (pour votre suivi)

## 🎨 Exemples de configurations

### Disponible
```json
{
  "isAvailable": true,
  "status": "available",
  "message": "Actuellement disponible pour de nouveaux projets. Réponse sous 24h.",
  "maxProjects": 5,
  "currentProjects": 2
}
```

### Disponibilité limitée
```json
{
  "isAvailable": true,
  "status": "limited",
  "message": "Places limitées disponibles. 1 projet restant pour ce trimestre.",
  "maxProjects": 5,
  "currentProjects": 4
}
```

### Complet
```json
{
  "isAvailable": false,
  "status": "unavailable",
  "message": "Complet jusqu'en mars 2026. Inscrivez-vous sur liste d'attente.",
  "nextAvailableDate": "2026-03-01"
}
```

## 🔄 Mise à jour

1. **Via GitHub Gist** : Éditez directement votre Gist
2. **Via JSONBin** : Utilisez leur interface web ou API
3. **Via API** : Créez une interface admin ou utilisez Postman

Le site se rafraîchit automatiquement toutes les 5 minutes.

## 🛠️ Personnalisation

Pour modifier la fréquence de rafraîchissement, éditez `/src/hooks/useAvailability.js` ligne 44 :
```javascript
// 5 minutes = 5 * 60 * 1000
// 10 minutes = 10 * 60 * 1000
const interval = setInterval(fetchAvailability, 5 * 60 * 1000);
```

## 📱 Test local

Pour tester en local avant de configurer l'API :
- Le fichier `/public/availability.json` sert de fallback
- Modifiez-le pour tester différents états
- Une fois satisfait, configurez votre solution distante

## 🎯 Avantages

✅ Mise à jour instantanée sans redéploiement  
✅ Gestion depuis n'importe où (mobile, tablette)  
✅ Badge coloré dynamique (vert/jaune/rouge)  
✅ Compteur de projets en cours  
✅ Gratuit avec GitHub Gist  
✅ Fallback automatique en cas d'erreur
