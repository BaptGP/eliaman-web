import { createClient } from "@sanity/client";

export const getImageUrl = (image) => {
  if (!image) return null;
  if (typeof image === "string") return image;
  if (image.asset?.url) return image.asset.url;
  if (image.url) return image.url;
  return null;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN || "";
const apiVersion = "2024-01-01";

let sanityClient = null;

if (projectId) {
  sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}

export const fetchArticles = async () => {
  if (!sanityClient) {
    console.warn(
      "Sanity client not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local"
    );
    return [];
  }

  const query = `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    image {
      asset -> {
        url
      }
    },
    author,
    publishedAt,
    category
  }`;

  try {
    const articles = await sanityClient.fetch(query);
    return articles;
  } catch (error) {
    console.error("Error fetching articles from Sanity:", error);
    return [];
  }
};

export const fetchArticleBySlug = async (slug) => {
  if (!sanityClient) {
    console.warn(
      "Sanity client not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local"
    );
    return null;
  }

  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    image {
      asset -> {
        url
      }
    },
    author,
    publishedAt,
    category,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset -> {
          url
        }
      }
    }
  }`;

  try {
    const article = await sanityClient.fetch(query, { slug });
    return article;
  } catch (error) {
    console.error("Error fetching article from Sanity:", error);
    return null;
  }
};

export const fetchArticlesByCategory = async (category) => {
  if (!sanityClient) {
    console.warn(
      "Sanity client not configured. Please set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local"
    );
    return [];
  }

  const query = `*[_type == "article" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset -> {
        url
      }
    },
    author,
    publishedAt,
    category
  }`;

  try {
    const articles = await sanityClient.fetch(query, { category });
    return articles;
  } catch (error) {
    console.error("Error fetching articles by category from Sanity:", error);
    return [];
  }
};
