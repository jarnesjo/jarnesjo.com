const fs = require('fs')

const globby = require('globby')
const prettier = require('prettier')

;(async () => {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pagePaths = await globby(['pages/**/*.tsx', '!pages/_*.tsx', '!pages/api'])
  const pageRoutes = pagePaths
    .filter(pagePath => !pagePath.includes('[slug]'))
    .map(pagePath => pagePath.replace('pages', '').replace('.tsx', '').replace('/index', ''))

  const postPaths = await globby(['posts'], {onlyDirectories: true})
  const postRoutes = postPaths.map(postPath => postPath.replace('posts', '/blog'))

  const allRoutes = [...pageRoutes, ...postRoutes].sort()

  const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(route => {
      return `
      <url>
      <loc>${`https://jarnesjo.com${route}`}</loc>
      </url>
      `
    })
    .join('')}
    </urlset>
    `

  const prettierConfig = await prettier.resolveConfig('./.prettierrc')
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  })

  fs.writeFileSync('public/sitemap.xml', formatted)
})()