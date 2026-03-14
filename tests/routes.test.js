import {describe, it, expect} from 'vitest'
import {readdir, access, readFile} from 'node:fs/promises'
import {join, resolve} from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const DIST = join(ROOT, 'dist')
const BLOG_DIR = join(ROOT, 'src', 'content', 'writing')

async function fileExists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

async function routeExists(route) {
  const file = route.endsWith('.html')
    ? join(DIST, route)
    : join(DIST, route, 'index.html')
  return fileExists(file)
}

async function getPublishedSlugs() {
  const dirs = await readdir(BLOG_DIR)
  const slugs = []

  for (const dir of dirs) {
    const content = await readFile(join(BLOG_DIR, dir, 'index.mdx'), 'utf-8')
    if (content.includes('published: false')) continue
    const match = content.match(/slug:\s*['"](.+?)['"]/)
    if (match) slugs.push(match[1])
  }

  return slugs
}

describe('Build routes', async () => {
  const slugs = await getPublishedSlugs()

  describe('Static pages', () => {
    it.each(['/', '/writing/', '/about/', '/uses/'])('%s', async (route) => {
      expect(await routeExists(route)).toBe(true)
    })

    it('/404.html', async () => {
      expect(await fileExists(join(DIST, '404.html'))).toBe(true)
    })
  })

  describe('Blog posts', () => {
    it.each(slugs)('/writing/%s/', async (slug) => {
      expect(await routeExists(`/writing/${slug}/`)).toBe(true)
    })
  })

  describe('OG images', () => {
    it.each(slugs)('/og/%s.png', async (slug) => {
      const path = join(DIST, 'og', `${slug}.png`)
      expect(await fileExists(path)).toBe(true)
    })

    it('OG images are valid PNGs (> 1 KB)', async () => {
      for (const slug of slugs) {
        const path = join(DIST, 'og', `${slug}.png`)
        const stat = await import('node:fs/promises').then(fs => fs.stat(path))
        expect(stat.size, `${slug}.png should be > 1 KB`).toBeGreaterThan(1024)
      }
    })
  })
})

describe('Feed', () => {
  it('feed.xml exists and contains posts', async () => {
    const path = join(DIST, 'feed.xml')
    expect(await fileExists(path)).toBe(true)
    const content = await readFile(path, 'utf-8')
    expect(content).toContain('<?xml')
    expect(content).toContain('<item>')
  })
})

describe('Sitemap', () => {
  it('sitemap-index.xml exists', async () => {
    const path = join(DIST, 'sitemap-index.xml')
    expect(await fileExists(path)).toBe(true)
    const content = await readFile(path, 'utf-8')
    expect(content).toContain('<sitemapindex')
    expect(content).toContain('sitemap-0.xml')
  })

  it('sitemap-0.xml contains blog posts', async () => {
    const path = join(DIST, 'sitemap-0.xml')
    expect(await fileExists(path)).toBe(true)
    const content = await readFile(path, 'utf-8')
    const slugs = await getPublishedSlugs()
    for (const slug of slugs) {
      expect(content, `sitemap should contain ${slug}`).toContain(`/writing/${slug}`)
    }
  })
})
