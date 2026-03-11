import {describe, it, expect} from 'vitest'
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(__dirname, '../..')

describe('Project structure integrity', () => {
  describe('Required config files exist', () => {
    const requiredFiles = [
      'package.json',
      'next.config.mjs',
      'tsconfig.json',
      'tailwind.config.js',
      'postcss.config.js',
    ]

    requiredFiles.forEach(file => {
      it(`${file} should exist`, () => {
        expect(fs.existsSync(path.join(ROOT, file))).toBe(true)
      })
    })
  })

  describe('All blog posts have valid structure', () => {
    const postsDir = path.join(ROOT, 'src/posts')
    const postDirs = fs
      .readdirSync(postsDir)
      .filter(f => fs.statSync(path.join(postsDir, f)).isDirectory())

    postDirs.forEach(postDir => {
      it(`${postDir} should have an index.mdx file`, () => {
        const mdxPath = path.join(postsDir, postDir, 'index.mdx')
        expect(fs.existsSync(mdxPath)).toBe(true)
      })
    })
  })

  describe('Blog post frontmatter validation', () => {
    it('all posts should have required frontmatter fields', async () => {
      const matter = (await import('gray-matter')).default
      const postsDir = path.join(ROOT, 'src/posts')
      const postDirs = fs
        .readdirSync(postsDir)
        .filter(f => fs.statSync(path.join(postsDir, f)).isDirectory())

      postDirs.forEach(postDir => {
        const mdxPath = path.join(postsDir, postDir, 'index.mdx')
        const content = fs.readFileSync(mdxPath, 'utf8')
        const {data} = matter(content)

        expect(data.title, `${postDir}: missing title`).toBeTruthy()
        expect(data.date, `${postDir}: missing date`).toBeTruthy()
        expect(data.category, `${postDir}: missing category`).toBeTruthy()

        // Validate date format (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/
        expect(data.date, `${postDir}: invalid date format`).toMatch(dateRegex)
      })
    })
  })

  describe('Page files exist', () => {
    const requiredPages = [
      'src/pages/index.tsx',
      'src/pages/blog/index.tsx',
      'src/pages/blog/[slug].tsx',
      'src/pages/about.tsx',
      'src/pages/uses.tsx',
      'src/pages/404.tsx',
      'src/pages/category/[slug].tsx',
      'src/pages/tag/[slug].tsx',
      'src/pages/_app.tsx',
      'src/pages/_document.tsx',
    ]

    requiredPages.forEach(page => {
      it(`${page} should exist`, () => {
        expect(fs.existsSync(path.join(ROOT, page))).toBe(true)
      })
    })
  })

  describe('Key components exist', () => {
    const requiredComponents = [
      'src/client/components/layouts/DefaultLayout.tsx',
      'src/client/components/Teaser.tsx',
      'src/client/components/MdxComponents.tsx',
      'src/client/components/CustomImage.tsx',
      'src/client/components/PageHeading.tsx',
      'src/client/components/PostDate.tsx',
    ]

    requiredComponents.forEach(component => {
      it(`${component} should exist`, () => {
        expect(fs.existsSync(path.join(ROOT, component))).toBe(true)
      })
    })
  })

  describe('Build scripts exist', () => {
    const scripts = [
      'src/scripts/generate-rss-feed.mjs',
      'src/scripts/generate-sitemap.mjs',
      'src/scripts/_lib/posts.mjs',
    ]

    scripts.forEach(script => {
      it(`${script} should exist`, () => {
        expect(fs.existsSync(path.join(ROOT, script))).toBe(true)
      })
    })
  })
})
