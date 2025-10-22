import { ExternalLink } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Portfolio = () => {
  const { t } = useLanguage()
  const projects = [
    {
      id: 1,
      title: t.portfolio.projects[0].title,
      description: t.portfolio.projects[0].description,
      tech: ['React', 'Symfony', 'MySQL', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      date: '2024',
      link: null
    },
    {
      id: 2,
      title: t.portfolio.projects[1].title,
      description: t.portfolio.projects[1].description,
      tech: ['NextJS', 'NodeJS', 'Symfony'],
      image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&h=600&fit=crop',
      date: '2023',
      link: 'https://www.blacksheep-van.com'
    },
    {
      id: 3,
      title: t.portfolio.projects[2].title,
      description: t.portfolio.projects[2].description,
      tech: ['React Native', 'NodeJS', 'Symfony'],
      image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&h=600&fit=crop',
      date: '2021',
      link: 'https://www.blacksheep-van.com'
    },
    {
      id: 4,
      title: t.portfolio.projects[3].title,
      description: t.portfolio.projects[3].description,
      tech: ['WordPress', 'BookingCalendar', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&h=600&fit=crop',
      date: '2023',
      link: 'https://www.paintballnaturegame.fr'
    },
  ]

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-dark mb-4">
            {t.portfolio.title}
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full mx-auto mb-4"></div>
          <p className="text-secondary font-roboto text-lg max-w-2xl mx-auto">
            {t.portfolio.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Date badge */}
                {project.date && (
                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-poppins font-semibold">
                    {project.date}
                  </div>
                )}
                
                {/* Overlay on hover */}
                {project.link && (
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent hover:bg-accentHover text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-110 flex items-center space-x-2"
                    >
                      <span className="font-poppins font-semibold">Voir le site</span>
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-poppins font-bold text-dark mb-3">
                  {project.title}
                </h3>
                <p className="text-secondary font-roboto mb-4 leading-relaxed line-clamp-4">
                  {project.description}
                </p>
                
                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm font-roboto font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
