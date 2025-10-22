# 🔄 Guide de mise à jour des composants restants

## ✅ Composants déjà mis à jour
- Navbar ✓
- Hero ✓

## 📝 Composants à mettre à jour

### 1. About.jsx

**Ligne 1 - Ajouter l'import :**
```javascript
import { Code, Database, Zap, Globe, Server, Smartphone } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'  // AJOUTER
```

**Ligne 3 - Ajouter le hook :**
```javascript
const About = () => {
  const { t } = useLanguage()  // AJOUTER
  const skills = [
```

**Lignes 5-10 - Mettre à jour les noms des skills :**
```javascript
  const skills = [
    { icon: Code, name: t.about.skills.react, color: 'text-blue-500' },
    { icon: Server, name: t.about.skills.symfony, color: 'text-gray-700' },
    { icon: Database, name: t.about.skills.api, color: 'text-green-500' },
    { icon: Zap, name: t.about.skills.performance, color: 'text-yellow-500' },
    { icon: Globe, name: t.about.skills.webDesign, color: 'text-purple-500' },
    { icon: Smartphone, name: t.about.skills.responsive, color: 'text-pink-500' },
  ]
```

**Ligne 31 - Remplacer "À propos" :**
```javascript
<h2 className="text-4xl font-poppins font-bold text-dark mb-4">
  {t.about.title}
</h2>
```

**Lignes 37-47 - Remplacer les 3 paragraphes :**
```javascript
<div className="space-y-4 text-secondary font-roboto text-lg">
  <p>{t.about.paragraph1}</p>
  <p>{t.about.paragraph2}</p>
  <p>{t.about.paragraph3}</p>
</div>
```

**Ligne ~52 - Remplacer "Compétences" :**
```javascript
<h3 className="text-xl font-poppins font-semibold text-dark mb-4">
  {t.about.skillsTitle}
</h3>
```

---

### 2. Portfolio.jsx

**Ligne 1 - Ajouter l'import :**
```javascript
import { ExternalLink } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'  // AJOUTER
```

**Ligne 3 - Ajouter le hook :**
```javascript
const Portfolio = () => {
  const { t } = useLanguage()  // AJOUTER
```

**Lignes 5-42 - Remplacer tout le tableau projects :**
```javascript
  const projects = [
    {
      id: 1,
      title: t.portfolio.projects[0].title,
      description: t.portfolio.projects[0].description,
      tech: ['React', 'Symfony', 'MySQL', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      date: '2024',
      link: null
    },
    {
      id: 2,
      title: t.portfolio.projects[1].title,
      description: t.portfolio.projects[1].description,
      tech: ['NextJS', 'NodeJS', 'Symfony'],
      image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&h=600&fit=crop',
      date: '2023',
      link: 'https://www.blacksheep-van.com'
    },
    {
      id: 3,
      title: t.portfolio.projects[2].title,
      description: t.portfolio.projects[2].description,
      tech: ['React Native', 'NodeJS', 'Symfony'],
      image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&h=600&fit=crop',
      date: '2021',
      link: 'https://www.blacksheep-van.com'
    },
    {
      id: 4,
      title: t.portfolio.projects[3].title,
      description: t.portfolio.projects[3].description,
      tech: ['WordPress', 'BookingCalendar', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&h=600&fit=crop',
      date: '2023',
      link: 'https://www.paintballnaturegame.fr'
    },
  ]
```

**Ligne ~48 - Remplacer "Réalisations" :**
```javascript
<h2 className="text-4xl md:text-5xl font-poppins font-bold text-dark mb-4">
  {t.portfolio.title}
</h2>
```

**Ligne ~52 - Remplacer le sous-titre :**
```javascript
<p className="text-secondary font-roboto text-lg max-w-2xl mx-auto">
  {t.portfolio.subtitle}
</p>
```

---

### 3. Services.jsx

**Ligne 1 - Ajouter l'import :**
```javascript
import { Laptop, Zap, Wrench } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'  // AJOUTER
```

**Ligne 3 - Ajouter le hook :**
```javascript
const Services = () => {
  const { t } = useLanguage()  // AJOUTER
```

**Lignes 4-23 - Remplacer tout le tableau services :**
```javascript
  const services = [
    {
      icon: Laptop,
      title: t.services.items[0].title,
      description: t.services.items[0].description,
      features: t.services.items[0].features
    },
    {
      icon: Zap,
      title: t.services.items[1].title,
      description: t.services.items[1].description,
      features: t.services.items[1].features
    },
    {
      icon: Wrench,
      title: t.services.items[2].title,
      description: t.services.items[2].description,
      features: t.services.items[2].features
    },
  ]
```

**Ligne ~30 - Remplacer "Services" :**
```javascript
<h2 className="text-4xl md:text-5xl font-poppins font-bold text-dark mb-4">
  {t.services.title}
</h2>
```

**Ligne ~34 - Remplacer le sous-titre :**
```javascript
<p className="text-secondary font-roboto text-lg max-w-2xl mx-auto">
  {t.services.subtitle}
</p>
```

---

### 4. Contact.jsx

**Ligne 1-3 - Ajouter l'import :**
```javascript
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useAvailability } from "../hooks/useAvailability";
import { useLanguage } from "../contexts/LanguageContext";  // AJOUTER
```

**Ligne 5 - Ajouter le hook :**
```javascript
const Contact = () => {
  const { t } = useLanguage();  // AJOUTER
  const availability = useAvailability();
```

**Remplacer tous les textes par :**
- Titre : `{t.contact.title}`
- Sous-titre : `{t.contact.subtitle}`
- Labels : `{t.contact.form.name}`, `{t.contact.form.email}`, `{t.contact.form.message}`
- Placeholders : `{t.contact.form.namePlaceholder}`, etc.
- Bouton : `{t.contact.form.send}`, `{t.contact.form.sending}`, `{t.contact.form.success}`
- Micro-entreprise : `{t.contact.microEnterprise}`
- Informations : `{t.contact.info.title}`, `{t.contact.info.email}`, etc.
- Disponibilité : `{t.contact.availability.title}`

---

### 5. Footer.jsx

**Ligne 1 - Ajouter l'import :**
```javascript
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'  // AJOUTER
```

**Ligne 3 - Ajouter le hook :**
```javascript
const Footer = () => {
  const { t } = useLanguage()  // AJOUTER
  const currentYear = new Date().getFullYear()
```

**Remplacer tous les textes par :**
- Description : `{t.footer.description}`
- "Navigation" : `{t.footer.navigation}`
- "Suivez-moi" : `{t.footer.followMe}`
- Liens menu : `{t.nav.about}`, `{t.nav.projects}`, etc.
- Copyright : `{t.footer.madeWith}`, `{t.footer.and}`

---

## 🚀 Commandes rapides

```bash
# Tester le site
npm run dev

# Vérifier qu'il n'y a pas d'erreurs
# Cliquer sur le bouton de langue dans la navbar
# Vérifier que tout change de langue
```

## ✅ Checklist finale

- [ ] About.jsx mis à jour
- [ ] Portfolio.jsx mis à jour
- [ ] Services.jsx mis à jour
- [ ] Contact.jsx mis à jour
- [ ] Footer.jsx mis à jour
- [ ] Test du changement de langue
- [ ] Vérification que la langue est sauvegardée (recharger la page)
- [ ] Test sur mobile (menu responsive)

Une fois tous les composants mis à jour, votre site sera 100% multilingue ! 🌍
