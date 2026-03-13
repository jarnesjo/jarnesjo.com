# CLAUDE.md - Project Guide

## Project Overview
Personal blog/portfolio site for Nicklas Jarnesjo (jarnesjo.com). Built with Astro, MDX blog posts, and Tailwind CSS.

## Tech Stack
- **Framework:** Astro 6 (static output)
- **Styling:** Tailwind CSS 4 + @tailwindcss/typography, dark mode via class-based toggle
- **Content:** MDX blog posts via @astrojs/mdx + Content Collections
- **Language:** TypeScript
- **Node:** v22+ (.nvmrc)
- **Package manager:** npm

## Commands
- `npm run dev` -- Dev server (port 4321)
- `npm run build` -- Production build (static files to `dist/`)
- `npm run preview` -- Preview production build locally

## Deployment
- Static files committed in `dist/` -- no build step on server
- Hosted on DigitalOcean via Laravel Forge
- Forge pulls from `main` and serves `dist/` directly
- SSL via Let's Encrypt (managed by Forge)

## Project Structure
```
src/
├── pages/              # Astro pages
│   ├── index.astro     # Home (latest posts + projects)
│   ├── blog/           # Blog index + [slug] dynamic route
│   ├── category/[slug] # Category archive
│   ├── tag/[slug]      # Tag archive
│   ├── about.astro     # About page
│   ├── uses.astro      # Equipment/tools page
│   ├── 404.astro       # Custom 404
│   ├── feed.xml.ts     # RSS feed endpoint
│   └── og/[slug].png.ts # OG image generation (satori)
├── components/         # Astro components
│   ├── Teaser.astro    # Post preview card
│   └── mdx/            # MDX overrides (Image, Video)
├── content/
│   ├── blog/           # Blog posts as date-prefixed dirs (2024-05-08_slug/)
│   └── content.config.ts # Content Collection schema
├── layouts/
│   └── Default.astro   # Main layout (nav, footer, dark mode, meta)
├── fonts/              # Inter-Bold.ttf, og-pattern.png (for OG images)
└── styles/
    └── global.css      # Tailwind CSS
dist/                   # Built static files (committed to repo)
public/
└── static/             # Images, favicons, sounds
```

## Key Patterns
- Fully static site -- no server-side rendering
- Blog posts: frontmatter with title, date, description, slug, category, tags
- `post.data.slug` is source of truth for URLs (not directory name)
- OG images generated via satori + @resvg/resvg-js at build time
- Redirects: `/rss` and `/feed` -> `/feed.xml` (via Astro redirects)
- Dark mode: vanilla JS in layout, no React dependency

## Language
- Code and commits in English
- User communication in Swedish (user preference)
