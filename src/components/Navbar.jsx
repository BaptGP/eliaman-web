import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center space-x-2 group cursor-pointer"
        >
          <img
            src="/img/logo_withoutname_color.png"
            alt="Eliaman Logo"
            className="h-14 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6"
          />
          <span className="text-2xl font-poppins font-bold text-dark group-hover:text-accent transition-colors">
            Eliaman
          </span>
        </button>

        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <button
              onClick={() => scrollToSection("about")}
              className="text-secondary hover:text-accent transition-colors font-roboto"
            >
              {t.nav.about}
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-secondary hover:text-accent transition-colors font-roboto"
            >
              {t.nav.projects}
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("services")}
              className="text-secondary hover:text-accent transition-colors font-roboto"
            >
              {t.nav.services}
            </button>
          </li>
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-accent hover:bg-accentHover text-white px-6 py-2 rounded-lg font-poppins font-semibold uppercase text-sm transition-all duration-300 hover:shadow-lg"
            >
              {t.nav.contact}
            </button>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button className="md:hidden text-dark">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
