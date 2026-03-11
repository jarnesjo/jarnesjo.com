import {describe, it, expect} from 'vitest'
import {
  getPostsSortedByDate,
  getAllPostSlugs,
  getPostBySlug,
  getAllCategorySlugs,
  getAllTagSlugs,
  getCategoryBySlug,
  getTagBySlug,
  BLOG_POST_PATH,
} from '@/lib/mdx'
import fs from 'fs'
import path from 'path'

describe('mdx.ts - Blog post processing', () => {
  describe('getPostsSortedByDate', () => {
    it('should return all posts when no limit is provided', () => {
      const posts = getPostsSortedByDate()
      expect(posts.length).toBeGreaterThan(0)
    })

    it('should respect the limit parameter', () => {
      const limit = 3
      const posts = getPostsSortedByDate(limit)
      expect(posts).toHaveLength(limit)
    })

    it('should return posts sorted by date descending (newest first)', () => {
      const posts = getPostsSortedByDate()
      for (let i = 0; i < posts.length - 1; i++) {
        expect(new Date(posts[i].date).getTime()).toBeGreaterThanOrEqual(
          new Date(posts[i + 1].date).getTime()
        )
      }
    })

    it('should return posts with required fields', () => {
      const posts = getPostsSortedByDate()
      posts.forEach(post => {
        expect(post).toHaveProperty('slug')
        expect(post).toHaveProperty('title')
        expect(post).toHaveProperty('date')
        expect(post).toHaveProperty('category')
        expect(post.slug).toBeTruthy()
        expect(post.title).toBeTruthy()
        expect(post.date).toBeTruthy()
      })
    })
  })

  describe('getAllPostSlugs', () => {
    it('should return slugs for all posts', () => {
      const slugs = getAllPostSlugs()
      expect(slugs.length).toBeGreaterThan(0)
    })

    it('should return slugs in the correct format for Next.js getStaticPaths', () => {
      const slugs = getAllPostSlugs()
      slugs.forEach(item => {
        expect(item).toHaveProperty('params')
        expect(item.params).toHaveProperty('slug')
        expect(typeof item.params.slug).toBe('string')
      })
    })

    it('should have corresponding MDX files for each slug', () => {
      const slugs = getAllPostSlugs()
      slugs.forEach(item => {
        const mdxPath = path.join(BLOG_POST_PATH, item.params.slug, 'index.mdx')
        expect(fs.existsSync(mdxPath)).toBe(true)
      })
    })
  })

  describe('getPostBySlug', () => {
    it('should return a post with mdxSource and frontMatter', async () => {
      const slugs = getAllPostSlugs()
      const firstSlug = slugs[0].params.slug

      const post = await getPostBySlug(firstSlug)
      expect(post).toHaveProperty('mdxSource')
      expect(post).toHaveProperty('frontMatter')
      expect(post.frontMatter.slug).toBe(firstSlug)
      expect(post.frontMatter.title).toBeTruthy()
    })

    it('should include frontmatter fields from the MDX file', async () => {
      const post = await getPostBySlug('blurred-image-placeholder-for-nextjs-image')
      expect(post.frontMatter.title).toBe(
        'Blurred image placeholder for Next.js image (next/image)'
      )
      expect(post.frontMatter.category).toBe('code')
      expect(post.frontMatter.date).toBe('2021-02-09')
      expect(post.frontMatter.tags).toContain('nextjs')
      expect(post.frontMatter.tags).toContain('image')
    })
  })

  describe('getAllCategorySlugs', () => {
    it('should return unique categories', () => {
      const categories = getAllCategorySlugs()
      expect(categories.length).toBeGreaterThan(0)

      const slugValues = categories.map(c => c.params.slug)
      const uniqueValues = [...new Set(slugValues)]
      expect(slugValues).toEqual(uniqueValues)
    })

    it('should return categories in Next.js getStaticPaths format', () => {
      const categories = getAllCategorySlugs()
      categories.forEach(item => {
        expect(item).toHaveProperty('params')
        expect(item.params).toHaveProperty('slug')
      })
    })
  })

  describe('getAllTagSlugs', () => {
    it('should return unique tags', () => {
      const tags = getAllTagSlugs()
      expect(tags.length).toBeGreaterThan(0)

      const slugValues = tags.map(t => t.params.slug)
      const uniqueValues = [...new Set(slugValues)]
      expect(slugValues).toEqual(uniqueValues)
    })

    it('should return tags in Next.js getStaticPaths format', () => {
      const tags = getAllTagSlugs()
      tags.forEach(item => {
        expect(item).toHaveProperty('params')
        expect(item.params).toHaveProperty('slug')
      })
    })
  })

  describe('getCategoryBySlug', () => {
    it('should return posts for a given category', async () => {
      const categories = getAllCategorySlugs()
      const firstCategory = categories[0].params.slug

      const result = await getCategoryBySlug(firstCategory)
      expect(result.name).toBe(firstCategory)
      expect(result.slug).toBe(firstCategory)
      expect(result.posts.length).toBeGreaterThan(0)

      result.posts.forEach(post => {
        expect(post.frontMatter.category).toBe(firstCategory)
      })
    })

    it('should return posts sorted by date descending', async () => {
      const categories = getAllCategorySlugs()
      const result = await getCategoryBySlug(categories[0].params.slug)

      for (let i = 0; i < result.posts.length - 1; i++) {
        expect(
          new Date(result.posts[i].frontMatter.date).getTime()
        ).toBeGreaterThanOrEqual(
          new Date(result.posts[i + 1].frontMatter.date).getTime()
        )
      }
    })
  })

  describe('getTagBySlug', () => {
    it('should return posts for a given tag', async () => {
      const tags = getAllTagSlugs()
      const firstTag = tags[0].params.slug

      const result = await getTagBySlug(firstTag)
      expect(result.name).toBe(firstTag)
      expect(result.posts.length).toBeGreaterThan(0)

      result.posts.forEach(post => {
        expect(post.frontMatter.tags).toContain(firstTag)
      })
    })
  })
})
