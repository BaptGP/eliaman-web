import { Code2, Sparkles } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-primary to-gray-50 pt-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center space-x-2 text-accent">
              <Sparkles className="w-6 h-6" />
              <span className="font-poppins font-semibold">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-poppins font-bold text-dark leading-tight">
              {t.hero.title}
              <br />
              <span className="text-accent">{t.hero.titleAccent}</span>
            </h1>

            <p className="text-xl text-secondary font-roboto max-w-lg">
              {t.hero.subtitle}
            </p>

            <button
              onClick={scrollToPortfolio}
              className="bg-accent hover:bg-accentHover text-white px-8 py-4 rounded-lg font-poppins font-semibold uppercase text-sm transition-all duration-300 animate-pulse-subtle inline-block"
            >
              {t.hero.cta}
            </button>
          </div>

          {/* Right side - Illustration */}
          <div className="relative hidden md:block">
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="space-y-4">
                {/* Code snippet illustration */}
                <div className="flex items-center space-x-2 text-secondary">
                  <Code2 className="w-5 h-5 text-accent" />
                  <span className="font-mono text-sm">portfolio.jsx</span>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm">
                  <div className="space-y-2">
                    <div className="text-purple-400">
                      <span className="text-pink-400">const</span> developer ={" "}
                      {"{"}
                    </div>
                    <div className="text-green-400 pl-4">
                      name: <span className="text-yellow-300">'{t.hero.code.name}'</span>,
                    </div>
                    <div className="text-green-400 pl-4">
                      skills:{" "}
                      <span className="text-blue-400">
                        {JSON.stringify(t.hero.code.skills)}
                      </span>
                      ,
                    </div>
                    <div className="text-green-400 pl-4">
                      passion: <span className="text-yellow-300">'{t.hero.code.passion}'</span>
                    </div>
                    <div className="text-purple-400">{"}"}</div>
                  </div>
                </div>

                {/* Tech icons */}
                <div className="flex justify-around pt-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors">
                    <span className="text-2xl">⚛️</span>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors">
                    <span className="text-2xl">🎵</span>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors">
                    <span className="text-2xl">🚀</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-accentHover/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
