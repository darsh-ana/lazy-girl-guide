import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().optional(),
  blurb: z.string(),
  bestFor: z.string().optional(),
  skipIf: z.string().optional(),
  priceRange: z.string().optional(),
  url: z.string().optional().default(''),
})

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    date: z.string(),
    image: z.string(),
    imageAlt: z.string().optional(),
    featured: z.boolean().optional().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    products: z.array(productSchema).optional().default([]),
    content: z.string(),
  }),
  transform: async (doc) => {
    const slug = doc.title
      .toLowerCase()
      .trim()
      .replace(/['"]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const words = doc.content.trim().split(/\s+/).length
    const readingTime = Math.max(1, Math.round(words / 200))

    return {
      ...doc,
      slug,
      readingTime,
    }
  },
})

export default defineConfig({
  collections: [posts],
})
