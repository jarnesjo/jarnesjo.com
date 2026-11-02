// @ts-check
import {defineConfig} from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import {unified} from '@astrojs/markdown-remark'
import sitemap from '@astrojs/sitemap'
import rehypePrism from 'rehype-prism-plus'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export default defineConfig({
  site: 'https://jarnesjo.com',
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Never inline component scripts: the CSP allows only external scripts and
      // the hashed dark mode script in the layout, see README
      assetsInlineLimit: 0
    }
  },
  integrations: [
    mdx(),
    // /blog/* are meta refresh redirects to /writing/*, so they don't belong in the sitemap
    sitemap({filter: page => !new URL(page).pathname.startsWith('/blog/')})
  ],
  redirects: {
    '/rss': '/feed.xml',
    '/feed': '/feed.xml',
    '/blog': '/writing/'
  },
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      rehypePlugins: [rehypeCodeTitles, rehypePrism, rehypeAutolinkHeadings]
    })
  }
})
