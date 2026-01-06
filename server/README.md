# Eliaman Server

Serveur Express pour gérer l'envoi d'emails via Resend.

## Installation

```bash
npm install
```

## Configuration

1. Crée un fichier `.env` à la racine du dossier `server/` :

```
RESEND_API_KEY=your_resend_api_key_here
PORT=3001
```

2. Obtiens ta clé API Resend :
   - Va sur https://resend.com/
   - Crée un compte
   - Génère une clé API
   - Copie-la dans le fichier `.env`

## Lancement

### Mode développement (avec auto-reload)

```bash
npm run dev
```

### Mode production

```bash
npm start
```

Le serveur écoute sur `http://localhost:3001`

## Endpoint

### POST `/api/send-email`

Envoie un email de contact.

**Body:**

```json
{
  "name": "Nom du visiteur",
  "email": "email@example.com",
  "message": "Message du visiteur"
}
```

**Response (succès):**

```json
{
  "success": true,
  "data": { ... }
}
```

**Response (erreur):**

```json
{
  "error": "Failed to send email"
}
```

## Notes

- Le serveur doit être lancé en parallèle du dev server Vite (`npm run dev` dans le dossier racine)
- L'endpoint est appelé depuis le formulaire de contact du site
- Les emails sont envoyés à `contact@eliaman.com`
