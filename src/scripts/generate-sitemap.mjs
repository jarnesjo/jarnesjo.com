import globby from 'globby'
import prettier from 'prettier'
import {writeFileSync} from 'fs'
;(async () => {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pagePaths = await globby(['src/pages/**/*.tsx', '!src/pages/_*.tsx', '!src/pages/api'])
  const pageRoutes = pagePaths
    .filter(pagePath => !pagePath.includes('[slug]'))
    .map(pagePath => pagePath.replace('src/pages', '').replace('.tsx', '').replace('/index', ''))

  const postPaths = await globby(['src/posts'], {onlyDirectories: true})
  const postRoutes = postPaths.map(postPath => postPath.replace('src/posts', '/blog'))

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

  writeFileSync('public/sitemap.xml', formatted)
})()
