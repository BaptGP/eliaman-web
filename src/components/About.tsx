"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Code, Database, Globe, Server, Smartphone, Zap } from "lucide-react";

export default function About() {
  const { t } = useLanguage();
  const skills = [
    { icon: Code, name: t.about.skills.react, color: "text-blue-500" },
    { icon: Server, name: t.about.skills.symfony, color: "text-gray-700" },
    { icon: Database, name: t.about.skills.api, color: "text-green-500" },
    { icon: Zap, name: t.about.skills.performance, color: "text-yellow-500" },
    { icon: Globe, name: t.about.skills.webDesign, color: "text-purple-500" },
    {
      icon: Smartphone,
      name: t.about.skills.responsive,
      color: "text-pink-500",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
            {/* Photo */}
            <div className="mx-auto md:mx-0">
              <img
                src="/me.jpg"
                alt="Eliaman - Développeur Fullstack"
                className="w-40 h-40 rounded-full object-cover shadow-xl ring-4 ring-accent/20"
              />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-poppins font-bold text-dark mb-4">
                  {t.about.title}
                </h2>
                <div className="w-20 h-1 bg-accent rounded-full"></div>
              </div>

              <div className="space-y-4 text-secondary font-roboto text-lg">
                <p>{t.about.paragraph1}</p>
                <p>{t.about.paragraph2}</p>
                <p>{t.about.paragraph3}</p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-xl font-poppins font-semibold text-dark mb-4">
                  {t.about.skillsTitle}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {skills.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-accent/10 hover:scale-105 transition-all duration-300 cursor-pointer group"
                      >
                        <Icon
                          className={`w-6 h-6 ${skill.color} group-hover:scale-110 transition-transform`}
                        />
                        <span className="font-roboto font-medium text-dark">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
