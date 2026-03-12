import {globby} from 'globby'
import prettier from 'prettier'
import {writeFileSync} from 'fs'
import {getAllCategorySlugs, getAllTagSlugs, getAllPostsData} from './_lib/posts.mjs'

;(async () => {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pagePaths = await globby(['src/pages/**/*.tsx', '!src/pages/_*.tsx', '!src/pages/api'])
  const pageRoutes = pagePaths
    .filter(pagePath => !pagePath.includes('[slug]'))
    .map(pagePath => pagePath.replace('src/pages', '').replace('.tsx', '').replace('/index', ''))

  const allPosts = getAllPostsData()
  const postEntries = allPosts.map(post => ({
    route: `/blog/${post.slug}`,
    lastmod: new Date(post.date).toISOString().split('T')[0]
  }))

  const tagRoutes = getAllTagSlugs()
  const categoryRoutes = getAllCategorySlugs()

  const staticEntries = [...pageRoutes, ...tagRoutes, ...categoryRoutes]
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
