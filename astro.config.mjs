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
    plugins: [tailwindcss()]
  },
  integrations: [
    mdx(),
    sitemap()
  ],
  redirects: {
    '/rss': '/feed.xml',
    '/feed': '/feed.xml',
    '/blog': '/writing'
  },
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      rehypePlugins: [rehypeCodeTitles, rehypePrism, rehypeAutolinkHeadings]
    })
  }
})
