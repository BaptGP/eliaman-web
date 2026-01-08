"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { fetchArticles, getImageUrl } from "@/lib/sanity";
import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  content: string;
  image: any;
  author: string;
  publishedAt: string;
  category: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: any;
  };
}

interface Props {
  article: Article;
}

export default function BlogPostClient({ article }: Props) {
  const { t } = useLanguage();
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const loadRelatedArticles = async () => {
      try {
        const allArticles = await fetchArticles();
        const related = (allArticles || [])
          .filter(
            (a: Article) =>
              a.category === article.category && a._id !== article._id
          )
          .slice(0, 3);
        setRelatedArticles(related);
      } catch (error) {
        console.error("Error fetching related articles:", error);
      }
    };

    loadRelatedArticles();
  }, [article]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="min-h-screen bg-primary py-20 pt-32">
      <div className="container mx-auto px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-accent font-poppins font-semibold hover:gap-3 transition-all mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.blog.backToBlog}
        </Link>

        <article className="max-w-3xl mx-auto">
          {article.category && (
            <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-poppins font-semibold mb-4">
              {article.category}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-dark mb-6">
            {article.title}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2 text-secondary">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="font-roboto">
                {t.blog.publishedOn} {formatDate(article.publishedAt)}
              </span>
            </div>
            {article.author && (
              <div className="flex items-center gap-2 text-secondary">
                <User className="w-5 h-5 text-accent" />
                <span className="font-roboto">
                  {t.blog.by} {article.author}
                </span>
              </div>
            )}
          </div>

          {article.image && getImageUrl(article.image) && (
            <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
              <img
                src={getImageUrl(article.image)}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="mb-12">
            {article.content && (
              <div className="font-roboto text-secondary leading-relaxed prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1
                        className="text-3xl font-poppins font-bold text-dark mt-8 mb-4"
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2
                        className="text-2xl font-poppins font-bold text-dark mt-6 mb-3"
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        className="text-xl font-poppins font-bold text-dark mt-4 mb-2"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-4 leading-relaxed" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc list-inside mb-4 space-y-2"
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className="list-decimal list-inside mb-4 space-y-2"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="mb-2" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className="border-l-4 border-accent pl-4 italic my-4 text-secondary"
                        {...props}
                      />
                    ),
                    code: ({ node, ...props }: any) => (
                      <code
                        className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-accent"
                        {...props}
                      />
                    ),
                    pre: ({ node, ...props }: any) => (
                      <pre
                        className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4"
                        {...props}
                      />
                    ),
                    a: ({ node, ...props }) => (
                      <a className="text-accent hover:underline" {...props} />
                    ),
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>
            )}
          </div>

          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-poppins font-bold text-dark mb-8">
                {t.blog.relatedArticles}
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle._id}
                    href={`/blog/${relatedArticle.slug.current}`}
                    className="group"
                  >
                    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                      {relatedArticle.image &&
                        getImageUrl(relatedArticle.image) && (
                          <div className="relative h-40 overflow-hidden bg-gray-200">
                            <img
                              src={getImageUrl(relatedArticle.image)}
                              alt={relatedArticle.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}

                      <div className="p-4 flex flex-col flex-grow">
                        {relatedArticle.category && (
                          <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-poppins font-semibold mb-2 w-fit">
                            {relatedArticle.category}
                          </span>
                        )}

                        <h3 className="text-lg font-poppins font-bold text-dark mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {relatedArticle.title}
                        </h3>

                        <p className="text-sm text-secondary font-roboto flex-grow line-clamp-2 mb-3">
                          {relatedArticle.excerpt}
                        </p>

                        <div className="flex items-center gap-2 text-accent font-poppins font-semibold text-sm group-hover:gap-3 transition-all">
                          {t.blog.readMore}
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
