import FastGlob from 'fast-glob'
import prettier from 'prettier'
import {writeFileSync} from 'fs'
import {getAllCategoryPaths, getAllTagPaths, getAllPostsData} from '../lib/posts'

;(async () => {
  const pagePaths = FastGlob.sync(['src/pages/**/*.tsx', '!src/pages/_*.tsx', '!src/pages/api'])
  const pageRoutes = pagePaths
    .filter(pagePath => !pagePath.includes('[slug]'))
    .map(pagePath => pagePath.replace('src/pages', '').replace('.tsx', '').replace('/index', ''))

  const allPosts = getAllPostsData()
  const postEntries = allPosts.map(post => ({
    route: `/blog/${post.slug}`,
    lastmod: new Date(post.date).toISOString().split('T')[0]
  }))

  const tagRoutes = getAllTagPaths()
  const categoryRoutes = getAllCategoryPaths()

  const staticEntries: {route: string; lastmod?: string}[] = [...pageRoutes, ...tagRoutes, ...categoryRoutes]
    .sort()
    .map(route => ({route}))

  const allEntries = [...staticEntries, ...postEntries].sort((a, b) =>
    a.route.localeCompare(b.route)
  )

  const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allEntries
    .map(({route, lastmod}) => {
      return `
      <url>
      <loc>${`https://jarnesjo.com${route}`}</loc>
      ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
      </url>
      `
    })
    .join('')}
    </urlset>
    `

  const prettierConfig = await prettier.resolveConfig('./.prettierrc')
  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  })

  writeFileSync('public/sitemap.xml', formatted)
})()
