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

async function getSlugs({drafts = false} = {}) {
  const dirs = await readdir(BLOG_DIR)
  const slugs = []

  for (const dir of dirs) {
    const content = await readFile(join(BLOG_DIR, dir, 'index.mdx'), 'utf-8')
    // Only read the frontmatter, posts can mention `published: false` in their body
    const frontmatter = content.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
    if (/^published:\s*false/m.test(frontmatter) !== drafts) continue
    const match = frontmatter.match(/slug:\s*['"](.+?)['"]/)
    if (match) slugs.push(match[1])
  }

  return slugs
}

const getPublishedSlugs = () => getSlugs()

describe('Build routes', async () => {
  const slugs = await getPublishedSlugs()

  describe('Static pages', () => {
    it.each(['/', '/writing/', '/about/', '/uses/'])('%s', async (route) => {
      expect(await routeExists(route)).toBe(true)
    })

    it('/404.html', async () => {
      expect(await fileExists(join(DIST, '404.html'))).toBe(true)
    })

    it('/ and /writing/ have their own descriptions', async () => {
      const description = async route => {
        const html = await readFile(join(DIST, route, 'index.html'), 'utf-8')
        return html.match(/<meta name="description" content="([^"]*)"/)?.[1]
      }
      expect(await description('/writing/')).not.toBe(await description('/'))
    })
  })

  describe('Blog posts', () => {
    it.each(slugs)('/writing/%s/', async (slug) => {
      expect(await routeExists(`/writing/${slug}/`)).toBe(true)
    })
  })

  describe('Drafts', () => {
    it('are not built or listed', async () => {
      const drafts = await getSlugs({drafts: true})
      const listing = await readFile(join(DIST, 'writing', 'index.html'), 'utf-8')
      for (const slug of drafts) {
        expect(await routeExists(`/writing/${slug}/`)).toBe(false)
        expect(listing).not.toContain(`/writing/${slug}`)
      }
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

  it('links straight to posts, not through the /blog/ redirects', async () => {
    const content = await readFile(join(DIST, 'feed.xml'), 'utf-8')
    expect(content).not.toContain('/blog/')
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

  it('sitemap-0.xml leaves out the /blog/ redirects', async () => {
    const content = await readFile(join(DIST, 'sitemap-0.xml'), 'utf-8')
    expect(content).not.toContain('<loc>https://jarnesjo.com/blog/')
  })
})
