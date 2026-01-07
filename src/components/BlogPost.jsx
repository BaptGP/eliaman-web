import { ArrowLeft, ArrowRight, Calendar, User } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { fetchArticleBySlug, fetchArticles, getImageUrl } from "../lib/sanity";

const BlogPost = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateMetaTags = (article) => {
    // Use SEO data from Sanity if available, otherwise use defaults
    const metaTitle = article.seo?.metaTitle || article.title;
    const metaDescription = article.seo?.metaDescription || article.excerpt;
    const ogImageUrl =
      getImageUrl(article.seo?.ogImage) || getImageUrl(article.image);
    const articleUrl = `${window.location.origin}/blog/${article.slug.current}`;

    // Update title
    document.title = `${metaTitle} | Eliaman`;

    // Update or create meta tags
    const updateOrCreateMeta = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const updateOrCreateMetaName = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Open Graph meta tags
    updateOrCreateMeta("og:title", metaTitle);
    updateOrCreateMeta("og:description", metaDescription);
    if (ogImageUrl) {
      updateOrCreateMeta("og:image", ogImageUrl);
    }
    updateOrCreateMeta("og:url", articleUrl);
    updateOrCreateMeta("og:type", "article");

    // Twitter Card meta tags
    updateOrCreateMetaName("twitter:card", "summary_large_image");
    updateOrCreateMetaName("twitter:title", metaTitle);
    updateOrCreateMetaName("twitter:description", metaDescription);
    if (ogImageUrl) {
      updateOrCreateMetaName("twitter:image", ogImageUrl);
    }

    // Standard meta tags
    updateOrCreateMetaName("description", metaDescription);
  };

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchArticleBySlug(slug);
        setArticle(data);

        if (data) {
          const allArticles = await fetchArticles();
          const related = allArticles
            .filter((a) => a.category === data.category && a._id !== data._id)
            .slice(0, 3);
          setRelatedArticles(related);

          // Update meta tags for social sharing
          updateMetaTags(data);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-primary py-20">
        <div className="container mx-auto px-6">
          <p className="text-center text-secondary">{t.blog.noArticles}</p>
        </div>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="min-h-screen bg-primary py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl font-poppins font-bold text-dark mb-4">
            Article non trouvé
          </h1>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-accent font-poppins font-semibold hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.blog.backToBlog}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-primary py-20 pt-32">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-accent font-poppins font-semibold hover:gap-3 transition-all mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.blog.backToBlog}
        </Link>

        {/* Article Header */}
        <article
          className="max-w-3xl mx-auto"
          itemScope
          itemType="https://schema.org/BlogPosting"
        >
          {/* Category */}
          {article.category && (
            <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-poppins font-semibold mb-4">
              {article.category}
            </span>
          )}

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl font-poppins font-bold text-dark mb-6"
            itemProp="headline"
          >
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2 text-secondary">
              <Calendar className="w-5 h-5 text-accent" />
              <span
                className="font-roboto"
                itemProp="datePublished"
                content={article.publishedAt}
              >
                {t.blog.publishedOn} {formatDate(article.publishedAt)}
              </span>
            </div>
            {article.author && (
              <div className="flex items-center gap-2 text-secondary">
                <User className="w-5 h-5 text-accent" />
                <span
                  className="font-roboto"
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  {t.blog.by} <span itemProp="name">{article.author}</span>
                </span>
              </div>
            )}
          </div>

          {/* Hidden metadata for Safari Reader */}
          <meta itemProp="description" content={article.excerpt} />
          {article.image && getImageUrl(article.image) && (
            <meta itemProp="image" content={getImageUrl(article.image)} />
          )}

          {/* Featured Image */}
          {article.image && getImageUrl(article.image) && (
            <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
              <img
                src={getImageUrl(article.image)}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="mb-12" itemProp="articleBody">
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
                    code: ({ node, inline, ...props }) =>
                      inline ? (
                        <code
                          className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-accent"
                          {...props}
                        />
                      ) : (
                        <code
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
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-20 pt-20 border-t border-gray-200">
            <h2 className="text-3xl font-poppins font-bold text-dark mb-12">
              {t.blog.relatedArticles}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle._id}
                  to={`/blog/${relatedArticle.slug.current}`}
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
      </div>
    </section>
  );
};

export default BlogPost;
