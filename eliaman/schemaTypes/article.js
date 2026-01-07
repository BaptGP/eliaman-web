export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Extrait',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Contenu (Markdown)',
      type: 'text',
      rows: 15,
      validation: (Rule) => Rule.required(),
      description: 'Utilise la syntaxe Markdown pour formater ton contenu',
    },
    {
      name: 'image',
      title: 'Image à la une',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'author',
      title: 'Auteur',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'React', value: 'React'},
          {title: 'Symfony', value: 'Symfony'},
          {title: 'Développement Web', value: 'Développement Web'},
          {title: 'Performance', value: 'Performance'},
          {title: 'Conseils', value: 'Conseils'},
        ],
      },
    },
    {
      name: 'publishedAt',
      title: 'Publié le',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'seo',
      title: 'SEO & Réseaux Sociaux',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Titre Meta (pour les moteurs de recherche)',
          type: 'string',
          description: "Laisse vide pour utiliser le titre de l'article",
        },
        {
          name: 'metaDescription',
          title: 'Description Meta',
          type: 'text',
          rows: 2,
          description: "Laisse vide pour utiliser l'extrait",
        },
        {
          name: 'ogImage',
          title: 'Image pour les réseaux sociaux (Open Graph)',
          type: 'image',
          description: "Laisse vide pour utiliser l'image à la une",
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      date: 'publishedAt',
    },
    prepare(selection) {
      const {author, date} = selection
      return {
        title: selection.title,
        subtitle:
          author && date
            ? `par ${author} le ${new Date(date).toLocaleDateString('fr-FR')}`
            : author || '',
      }
    },
  },
}
