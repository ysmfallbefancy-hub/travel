import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blogbeiträge: ein Markdown-Datei pro Beitrag in src/content/blog/
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      cover: image(),
      coverAlt: z.string().default(''),
      category: reference('categories'),
      author: reference('authors'),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

// Kategorien: eine JSON-Datei pro Kategorie, der Dateiname ist der Slug
const categories = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),
    description: z.string().default(''),
  }),
});

// Autorinnen und Autoren: eine JSON-Datei pro Person
const authors = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/authors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string().default(''),
      bio: z.string(),
      avatar: image().optional(),
    }),
});

export const collections = { blog, categories, authors };
