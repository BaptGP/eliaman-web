# 🌍 Système Multilingue (FR/EN)

## ✅ Ce qui a été fait

### 1. **Infrastructure**
- ✅ Fichier de traductions (`src/i18n/translations.js`)
- ✅ Context React pour la gestion de la langue (`src/contexts/LanguageContext.jsx`)
- ✅ Composant de sélection de langue (`src/components/LanguageSwitcher.jsx`)
- ✅ Intégration dans App.jsx

### 2. **Composants mis à jour**
- ✅ **Navbar** - Menu + sélecteur de langue
- ✅ **Hero** - Section d'accueil

### 3. **Fonctionnalités**
- ✅ Détection automatique de la langue du navigateur
- ✅ Sauvegarde de la préférence dans localStorage
- ✅ Bouton de changement de langue dans la navbar (icône globe)
- ✅ Mise à jour de l'attribut `lang` du HTML

## 🔧 Composants restants à mettre à jour

### About.jsx
```javascript
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  // Remplacer les textes par:
  // t.about.title
  // t.about.paragraph1
  // t.about.paragraph2
  // t.about.paragraph3
  // t.about.skillsTitle
  // t.about.skills.react, etc.
}
```

### Portfolio.jsx
```javascript
import { useLanguage } from '../contexts/LanguageContext';

const Portfolio = () => {
  const { t } = useLanguage();
  
  // Remplacer:
  // title → t.portfolio.title
  // subtitle → t.portfolio.subtitle
  // projects[0].description → t.portfolio.projects[0].description
}
```

### Services.jsx
```javascript
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  
  // Remplacer:
  // title → t.services.title
  // subtitle → t.services.subtitle
  // services[0].title → t.services.items[0].title
}
```

### Contact.jsx
```javascript
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  
  // Remplacer tous les labels et textes par t.contact.*
}
```

### Footer.jsx
```javascript
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  // Remplacer par t.footer.*
}
```

## 🎨 Utilisation

### Changer de langue
Cliquez sur le bouton avec l'icône globe dans la navbar. Il affiche "EN" quand vous êtes en français (pour passer à l'anglais) et "FR" quand vous êtes en anglais.

### Ajouter une nouvelle traduction
Éditez `src/i18n/translations.js` et ajoutez votre texte dans les deux langues (fr et en).

### Ajouter une nouvelle langue
1. Ajoutez la langue dans `translations.js` :
```javascript
export const translations = {
  fr: { ... },
  en: { ... },
  es: { ... }, // Espagnol
}
```

2. Modifiez `LanguageSwitcher.jsx` pour gérer 3+ langues

## 📝 Exemple de mise à jour d'un composant

**Avant :**
```javascript
<h2>À propos</h2>
<p>Développeur fullstack passionné...</p>
```

**Après :**
```javascript
import { useLanguage } from '../contexts/LanguageContext';

const MyComponent = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <h2>{t.about.title}</h2>
      <p>{t.about.paragraph1}</p>
    </>
  );
}
```

## 🚀 Prochaines étapes

Pour terminer l'intégration multilingue, mettez à jour les composants restants :
1. About.jsx
2. Portfolio.jsx
3. Services.jsx
4. Contact.jsx
5. Footer.jsx

Toutes les traductions sont déjà prêtes dans `src/i18n/translations.js` !

## 🔍 Test

1. Lancez le site : `npm run dev`
2. Cliquez sur le bouton de langue dans la navbar
3. Vérifiez que le Hero et la Navbar changent de langue
4. La préférence est sauvegardée (rechargez la page pour vérifier)
