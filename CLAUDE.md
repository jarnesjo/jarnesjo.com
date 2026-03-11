# CLAUDE.md - Project Guide

## Project Overview
Personal blog/portfolio site for Nicklas Jarnesjö (jarnesjo.com). Built with Next.js (Pages Router), MDX blog posts, Tailwind CSS, and TypeScript.

## Tech Stack
- **Framework:** Next.js 14 (Pages Router) with `output: 'standalone'` for Docker
- **Styling:** Tailwind CSS 3 + @tailwindcss/typography, dark mode via `next-themes` (class-based)
- **Content:** MDX blog posts via `next-mdx-remote` + `gray-matter`
- **Language:** TypeScript (strict: false)
- **Node:** v20 (.nvmrc)
- **Package manager:** npm

## Commands
- `npm run dev` — Dev server with hot reload on posts (uses next-remote-watch)
- `npm run dev:next` — Standard Next.js dev server
- `npm run build` — Production build (+ postbuild: RSS feed + sitemap generation)
- `npm start` — Production server
- `npm test` — Run test suite (Vitest)

## CI/CD (GitHub Actions)
- **PR Test build** (`.github/workflows/pr-test-build.yml`) — Runs on PRs: `npm test` then Docker build
- **Build and Deploy** (`.github/workflows/build-and-deploy.yml`) — Push to main: builds Docker image, publishes to GitHub Packages, deploys to DigitalOcean via SSH
- **CodeQL** (`.github/workflows/codeql-analysis.yml`) — Security analysis on push/PR to main + weekly schedule

## Deployment
- Docker multi-stage build (`Dockerfile`) → standalone Next.js output
- Hosted on DigitalOcean, deployed via `docker pull` + `docker run` on port 3000
- Google Analytics ID passed as build arg (`NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`)

## Project Structure
```
src/
├── pages/              # Next.js Pages Router
│   ├── index.tsx       # Home (latest posts + projects)
│   ├── blog/           # Blog index + [slug] dynamic route
│   ├── category/[slug] # Category archive
│   ├── tag/[slug]      # Tag archive
│   ├── about.tsx       # About page
│   ├── uses.tsx        # Equipment/tools page
│   └── 404.tsx         # Custom 404
├── client/components/  # React components
│   ├── layouts/DefaultLayout.tsx  # Main layout (nav, footer, meta)
│   ├── Teaser.tsx      # Post preview card
│   ├── MdxComponents.tsx # Custom MDX overrides (Image, Video, links)
│   └── ...
├── lib/
│   ├── mdx.ts          # Core MDX processing (getPostsSortedByDate, getPostBySlug, etc.)
│   └── googleAnalytics.ts
├── posts/              # Blog posts as {slug}/index.mdx
├── types/              # TypeScript types (FrontMatterType)
├── css/                # Tailwind CSS
└── scripts/            # Build scripts (RSS, sitemap, OG images)
    └── _lib/           # Shared script utilities
public/
├── static/             # Images, favicons, sounds, post-content
├── feed.xml            # Generated RSS
└── sitemap.xml         # Generated sitemap
```

## Key Patterns
- All pages use `getStaticProps`/`getStaticPaths` — fully static site, no API routes
- Blog posts: frontmatter with title, date, description, category, tags, image
- Path aliases: `@/components/*`, `@/lib/*`, `@/css/*`, `@/types/*`, `@/public/*`
- Redirects: `/rss` and `/feed` → `/feed.xml`

## Language
- Code and commits in English
- User communication in Swedish (user preference)
