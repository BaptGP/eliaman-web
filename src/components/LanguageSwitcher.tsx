"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-all duration-300 group"
      aria-label="Change language"
    >
      <Globe className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
      <span className="text-sm font-poppins font-semibold text-accent uppercase">
        {language === "fr" ? "EN" : "FR"}
      </span>
    </button>
  );
}
