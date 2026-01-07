import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const navigateToSection = (id) => {
    if (location.pathname === "/") {
      scrollToSection(id);
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button
          onClick={handleLogoClick}
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
              onClick={() => navigateToSection("about")}
              className="text-secondary hover:text-accent transition-colors font-roboto"
            >
              {t.nav.about}
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateToSection("portfolio")}
              className="text-secondary hover:text-accent transition-colors font-roboto"
            >
              {t.nav.projects}
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateToSection("services")}
              className="text-secondary hover:text-accent transition-colors font-roboto"
            >
              {t.nav.services}
            </button>
          </li>
          <li>
            <Link
              to="/blog"
              className="text-secondary hover:text-accent transition-colors font-roboto"
            >
              {t.nav.blog}
            </Link>
          </li>
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <button
              onClick={() => navigateToSection("contact")}
              className="bg-accent hover:bg-accentHover text-white px-6 py-2 rounded-lg font-poppins font-semibold uppercase text-sm transition-all duration-300 hover:shadow-lg"
            >
              {t.nav.contact}
            </button>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-dark"
        >
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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden ${
            scrolled ? "bg-white" : "bg-white/95"
          } shadow-lg`}
        >
          <div className="container mx-auto px-6 py-4 space-y-3">
            <button
              onClick={() => navigateToSection("about")}
              className="block w-full text-left text-secondary hover:text-accent transition-colors font-roboto py-2"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => navigateToSection("portfolio")}
              className="block w-full text-left text-secondary hover:text-accent transition-colors font-roboto py-2"
            >
              {t.nav.projects}
            </button>
            <button
              onClick={() => navigateToSection("services")}
              className="block w-full text-left text-secondary hover:text-accent transition-colors font-roboto py-2"
            >
              {t.nav.services}
            </button>
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-secondary hover:text-accent transition-colors font-roboto py-2"
            >
              {t.nav.blog}
            </Link>
            <div className="py-2">
              <LanguageSwitcher />
            </div>
            <button
              onClick={() => navigateToSection("contact")}
              className="block w-full bg-accent hover:bg-accentHover text-white px-6 py-2 rounded-lg font-poppins font-semibold uppercase text-sm transition-all duration-300 hover:shadow-lg"
            >
              {t.nav.contact}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
