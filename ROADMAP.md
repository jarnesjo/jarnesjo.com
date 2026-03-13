# Roadmap

## Completed (Next.js era)

- [x] Clean up unused dependencies (next-remote-watch, file-loader, globby)
- [x] Consolidate MDX processing into shared `posts.ts`
- [x] Update CI/CD pipeline (ghcr.io, action versions, Dockerfile lint fixes)
- [x] SEO best practices (JSON-LD, article OG tags, og:locale, sitemap lastmod)
- [x] Small improvements (lazy-load sound, prettierrc)

## Completed: Migrate to Astro

- [x] Scaffold Astro project
- [x] Set up Tailwind CSS with existing config
- [x] Create base layout (navigation, footer, dark mode toggle)
- [x] Set up Content Collections for blog posts (move MDX files)
- [x] Migrate pages: home, blog index, about, uses
- [x] Migrate dynamic routes: blog/[slug], category/[slug], tag/[slug]
- [x] Portfolio/projects section on home page
- [x] SEO: meta tags, JSON-LD, sitemap, RSS feed
- [x] OG image generation (satori + resvg)
- [x] Set up hosting (DigitalOcean via Laravel Forge, static dist/)
- [x] Verify visual parity with current site
- [x] Remove Next.js files and Docker setup
- [x] Update CI/CD workflows

## Completed: Restructure blog posts

- [x] Add `slug` to frontmatter — slug becomes the source of truth instead of directory name
- [x] Rename post directories with date prefix (`2024-03-12_short-name/`)
- [x] Update Content Collection config to use frontmatter slug

## Completed: Update site content

- [x] Remove "Hotad skog" from projects
- [x] Update screenshot for "Snittränta"
- [x] Add "Odlingsguiden" as a new project
