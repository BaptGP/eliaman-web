"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { fetchArticles, getImageUrl } from "@/lib/sanity";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  image: any;
  author: string;
  publishedAt: string;
  category: string;
}

export default function BlogPage() {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const filteredArticles = selectedCategory
    ? articles.filter((article) => article.category === selectedCategory)
    : articles;

  const categories = [
    ...new Set(articles.map((article) => article.category).filter(Boolean)),
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section id="blog" className="py-20 bg-primary pt-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-dark mb-4">
            {t.blog.title}
          </h2>
          <p className="text-xl text-secondary font-roboto max-w-2xl mx-auto">
            {t.blog.subtitle}
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full font-poppins font-semibold transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-accent text-white"
                  : "bg-gray-200 text-dark hover:bg-gray-300"
              }`}
            >
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-poppins font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-accent text-white"
                    : "bg-gray-200 text-dark hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Articles Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-secondary font-roboto">Chargement...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary font-roboto">{t.blog.noArticles}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <Link
                key={article._id}
                href={`/blog/${article.slug.current}`}
                className="group h-full"
                style={{
                  animation: `fadeInUp 0.8s ease-out forwards`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                  {/* Image */}
                  {article.image && getImageUrl(article.image) && (
                    <div className="relative h-48 overflow-hidden bg-gray-200">
                      <img
                        src={getImageUrl(article.image)}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Category Badge */}
                    {article.category && (
                      <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-poppins font-semibold mb-3 w-fit">
                        {article.category}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-poppins font-bold text-dark mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-secondary font-roboto mb-4 flex-grow line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-4 text-sm text-secondary">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                        {article.author && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                          </div>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-accent font-poppins font-semibold group-hover:gap-3 transition-all">
                        {t.blog.readMore}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
