import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useAvailability } from "../hooks/useAvailability";
import { useLanguage } from "../contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const availability = useAvailability();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation d'envoi
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-dark mb-4">
            {t.contact.title}
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full mx-auto mb-4"></div>
          <p className="text-secondary font-roboto text-lg max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_400px] gap-12">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-dark font-poppins font-semibold mb-2"
                >
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder={t.contact.form.namePlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-dark font-poppins font-semibold mb-2"
                >
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder={t.contact.form.emailPlaceholder}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-dark font-poppins font-semibold mb-2"
                >
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                  placeholder={t.contact.form.messagePlaceholder}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-accent hover:bg-accentHover text-white px-8 py-4 rounded-lg font-poppins font-semibold uppercase text-sm transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {status === "sending" ? (
                  <span>{t.contact.form.sending}</span>
                ) : status === "success" ? (
                  <span>{t.contact.form.success}</span>
                ) : (
                  <>
                    <span>{t.contact.form.send}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-secondary font-roboto text-sm text-center">
                {t.contact.microEnterprise}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-poppins font-bold text-dark mb-6">
                {t.contact.info.title}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-dark mb-1">
                      {t.contact.info.email}
                    </h4>
                    <a
                      href="mailto:contact@eliaman.dev"
                      className="text-secondary hover:text-accent transition-colors"
                    >
                      contact@eliaman.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-dark mb-1">
                      {t.contact.info.phone}
                    </h4>
                    <a
                      href="tel:+33123456789"
                      className="text-secondary hover:text-accent transition-colors"
                    >
                      +33 6 33 46 66 92
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-dark mb-1">
                      {t.contact.info.location}
                    </h4>
                    <p className="text-secondary" style={{ whiteSpace: 'pre-line' }}>
                      {t.contact.info.locationText}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl shadow-xl p-8 text-white ${
                availability.status === "available"
                  ? "bg-gradient-to-br from-green-500 to-green-600"
                  : availability.status === "limited"
                  ? "bg-gradient-to-br from-yellow-500 to-yellow-600"
                  : "bg-gradient-to-br from-red-500 to-red-600"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-poppins font-bold">
                  {t.contact.availability.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${availability.getStatusColor()} animate-pulse`}
                  ></div>
                  <span className="text-sm font-semibold">
                    {availability.getStatusText()}
                  </span>
                </div>
              </div>
              <p className="font-roboto mb-3">{availability.message}</p>
              {availability.maxProjects && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm font-roboto opacity-90">
                    {t.contact.availability.projectsInProgress} : {availability.currentProjects} /{" "}
                    {availability.maxProjects}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
