import {defineCollection, z} from 'astro:content'
import {glob} from 'astro/loaders'

const blog = defineCollection({
  loader: glob({pattern: '**/*.mdx', base: './src/content/blog'}),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string(),
    description: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional().default(true),
    author: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
        width: z.number().optional(),
        height: z.number().optional()
      })
      .optional()
  })
})

export const collections = {blog}
