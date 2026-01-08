import BlogPostClient from "@/components/BlogPostClient";
import { fetchArticleBySlug, getImageUrl } from "@/lib/sanity";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article non trouvé",
    };
  }

  const metaTitle =
    article.seo?.metaTitle && article.seo.metaTitle.trim()
      ? article.seo.metaTitle
      : article.title;
  const metaDescription =
    article.seo?.metaDescription && article.seo.metaDescription.trim()
      ? article.seo.metaDescription
      : article.excerpt;
  const ogImageUrl =
    (article.seo?.ogImage ? getImageUrl(article.seo.ogImage) : null) ||
    getImageUrl(article.image);
  const articleUrl = `https://www.eliaman.com/blog/${article.slug.current}`;

  return {
    title: `${metaTitle} | Eliaman`,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      url: articleUrl,
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: 1024,
            height: 1024,
            type: "image/png",
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      ...(ogImageUrl && {
        images: [ogImageUrl],
      }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <BlogPostClient article={article} />;
}
