import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/img/logo_withoutname_black.png"
                alt="Eliaman Logo"
                className="h-10 invert"
              />
              <span className="text-2xl font-poppins font-bold">Eliaman</span>
            </div>
            <p className="text-gray-400 font-roboto">{t.footer.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">
              {t.footer.navigation}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-accent transition-colors font-roboto"
                >
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-gray-400 hover:text-accent transition-colors font-roboto"
                >
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-accent transition-colors font-roboto"
                >
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-accent transition-colors font-roboto"
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-4">
              {t.footer.followMe}
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/BaptGP"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 hover:bg-accent rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 hover:bg-accent rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@eliaman.dev"
                className="w-12 h-12 bg-gray-800 hover:bg-accent rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 font-roboto flex items-center justify-center space-x-1">
            <span>
              © {currentYear} Eliaman. {t.footer.madeWith}
            </span>
            <span>React</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
