"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Laptop, Wrench, Zap } from "lucide-react";

export default function Services() {
  const { t } = useLanguage();
  const services = [
    {
      icon: Laptop,
      title: t.services.items[0].title,
      description: t.services.items[0].description,
      features: t.services.items[0].features,
    },
    {
      icon: Zap,
      title: t.services.items[1].title,
      description: t.services.items[1].description,
      features: t.services.items[1].features,
    },
    {
      icon: Wrench,
      title: t.services.items[2].title,
      description: t.services.items[2].description,
      features: t.services.items[2].features,
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-dark mb-4">
            {t.services.title}
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full mx-auto mb-4"></div>
          <p className="text-secondary font-roboto text-lg max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-transparent hover:border-accent/20"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-8 h-8 text-accent group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-poppins font-bold text-dark mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-secondary font-roboto mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-center text-secondary font-roboto"
                    >
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
