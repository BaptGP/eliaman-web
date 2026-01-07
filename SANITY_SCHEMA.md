# Sanity CMS Schema for Blog

## Setup Instructions

1. Create a Sanity project at https://www.sanity.io
2. In your Sanity project, create the following schema for blog articles

## Article Schema

Create a new document type called `article` in your Sanity studio with the following structure:

```javascript
{
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 10,
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'React', value: 'React' },
          { title: 'Symfony', value: 'Symfony' },
          { title: 'Web Development', value: 'Développement Web' },
          { title: 'Performance', value: 'Performance' },
          { title: 'Tips', value: 'Conseils' }
        ]
      }
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      date: 'publishedAt'
    },
    prepare(selection) {
      const { author, date } = selection
      return {
        title: selection.title,
        subtitle: author && date ? `by ${author} on ${new Date(date).toLocaleDateString()}` : author || ''
      }
    }
  }
}
```

## Environment Variables

Add to your `.env` file:

```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

You can find your Project ID in your Sanity project settings.

## CORS Configuration

In your Sanity project settings, add your domain to the CORS origins:

- For development: `http://localhost:5173`
- For production: `https://yourdomain.com`

## Features

- **Article Listing**: Browse all articles with category filtering
- **Article Detail**: Read full articles with metadata
- **Related Articles**: Automatically shows related articles by category
- **Multilingual**: Supports French and English
- **Responsive Design**: Works on all devices
- **Image Support**: Featured images for each article
