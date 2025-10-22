# Guide de Personnalisation

## Projets ajoutés

✅ **4 projets réels** ont été intégrés dans le portfolio :

1. **ERP - Gestion de parc** (2024)
   - React, Symfony, MySQL, Stripe
   - Projet confidentiel (pas de lien public)

2. **Blacksheep-Van** (2023)
   - NextJS, NodeJS, Symfony
   - https://www.blacksheep-van.com

3. **Blacksheep - Van, Roadtrip** (2021)
   - React Native, NodeJS, Symfony
   - https://www.blacksheep-van.com

4. **Paintball Nature Game** (2023)
   - WordPress, BookingCalendar, Stripe
   - https://www.paintballnaturegame.fr

## Modifications apportées

### Portfolio (src/components/Portfolio.jsx)
- ✅ Grille adaptée en 2 colonnes (au lieu de 3) pour plus de lisibilité
- ✅ Badge de date affiché sur chaque projet
- ✅ Descriptions complètes avec limitation à 4 lignes
- ✅ Bouton "Voir le site" uniquement pour les projets avec lien
- ✅ Ouverture des liens dans un nouvel onglet
- ✅ Suppression du bouton GitHub (non pertinent pour ces projets)

### CSS (src/index.css)
- ✅ Ajout de la classe `.line-clamp-4` pour limiter les descriptions

## Prochaines étapes de personnalisation

### 1. Images des projets
Remplacez les images Unsplash par vos vraies captures d'écran :
- Créez un dossier `public/images/projects/`
- Ajoutez vos images (format recommandé : 800x600px)
- Mettez à jour les chemins dans `Portfolio.jsx` :
  ```javascript
  image: '/images/projects/erp.jpg'
  ```

### 2. Section À propos
Modifiez `src/components/About.jsx` :
- Remplacez le logo "E" par votre vraie photo
- Personnalisez les 3 paragraphes de présentation

### 3. Section Contact
Modifiez `src/components/Contact.jsx` :
- Changez l'email : `contact@eliaman.dev`
- Ajoutez votre vrai numéro de téléphone
- Configurez l'envoi d'emails (ex: EmailJS, Formspree, ou API backend)

### 4. Footer
Modifiez `src/components/Footer.jsx` :
- Ajoutez vos vrais liens GitHub et LinkedIn

### 5. Favicon
Remplacez `/public/vite.svg` par votre logo

## Commandes utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Prévisualiser le build
npm run preview
```

## Déploiement

Le site peut être déployé sur :
- **Vercel** (recommandé) : `vercel deploy`
- **Netlify** : Connectez votre repo GitHub
- **GitHub Pages** : Configurez dans les settings du repo
