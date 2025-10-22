import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

// URL de votre fichier JSON de disponibilité
// Vous pouvez utiliser GitHub Gist, votre propre API, ou un service comme JSONBin
const AVAILABILITY_URL =
  "https://gist.githubusercontent.com/BaptGP/7db4a18dcd698f614c20520f6609392a/raw/availibity.json";
// Ou GitHub Gist: 'https://gist.githubusercontent.com/USERNAME/GIST_ID/raw/availability.json'

// Configuration par défaut (fallback si l'API ne répond pas)
const DEFAULT_AVAILABILITY = {
  isAvailable: true,
  status: "available", // 'available', 'limited', 'unavailable'
  message:
    "Actuellement disponible pour de nouveaux projets. Réponse sous 24h.",
  nextAvailableDate: null,
  maxProjects: null,
  currentProjects: 0,
};

export const useAvailability = () => {
  const { t } = useLanguage();
  const [availability, setAvailability] = useState(DEFAULT_AVAILABILITY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        // Essayer de charger depuis le fichier local d'abord
        const response = await fetch("/availability.json");
        const data = await response.json();
        setAvailability(data);
        setLoading(false);

        // Pour utiliser une API distante (GitHub Gist, JSONBin, etc.),
        // décommentez les lignes ci-dessous et commentez les lignes ci-dessus :
        // const response = await fetch(AVAILABILITY_URL);
        // const data = await response.json();
        // setAvailability(data.record || data); // Adapter selon votre source
      } catch (err) {
        console.error("Erreur lors du chargement des disponibilités:", err);
        setError(err);
        setAvailability(DEFAULT_AVAILABILITY);
        setLoading(false);
      }
    };

    fetchAvailability();

    // Rafraîchir toutes les 5 minutes
    const interval = setInterval(fetchAvailability, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (availability.status) {
      case "available":
        return "bg-green-500";
      case "limited":
        return "bg-yellow-500";
      case "unavailable":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (availability.status) {
      case "available":
        return t.contact.availability.available;
      case "limited":
        return t.contact.availability.limited;
      case "unavailable":
        return t.contact.availability.unavailable;
      default:
        return "Unknown status";
    }
  };

  return {
    ...availability,
    loading,
    error,
    getStatusColor,
    getStatusText,
  };
};
