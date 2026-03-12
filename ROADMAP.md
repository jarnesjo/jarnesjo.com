# Roadmap

## Completed (Next.js era)

- [x] Clean up unused dependencies (next-remote-watch, file-loader, globby)
- [x] Consolidate MDX processing into shared `posts.ts`
- [x] Update CI/CD pipeline (ghcr.io, action versions, Dockerfile lint fixes)
- [x] SEO best practices (JSON-LD, article OG tags, og:locale, sitemap lastmod)
- [x] Small improvements (lazy-load sound, prettierrc)

## Epic: Migrate to Astro

Decision: Next.js Pages Router is in maintenance mode and overkill for a static content site.
Astro is purpose-built for this, ships zero JS by default, and removes the need for Docker hosting.

- [ ] Scaffold Astro project in `astro/` subdirectory
- [ ] Set up Tailwind CSS with existing config
- [ ] Create base layout (navigation, footer, dark mode toggle)
- [ ] Set up Content Collections for blog posts (move MDX files)
- [ ] Migrate pages: home, blog index, about, uses
- [ ] Migrate dynamic routes: blog/[slug], category/[slug], tag/[slug]
- [ ] Portfolio/projects section on home page
- [ ] SEO: meta tags, JSON-LD, sitemap, RSS feed
- [ ] OG image generation (replace Puppeteer with satori/vercel-og)
- [ ] Set up hosting (Cloudflare Pages / Vercel) with auto-deploy
- [ ] Verify visual parity with current site
- [ ] Remove Next.js files and Docker setup
- [ ] Update CI/CD workflows

## Epic: Restructure blog posts

- [ ] Add `slug` to frontmatter — slug becomes the source of truth instead of directory name
- [ ] Rename post directories with date prefix (`2024-03-12_short-name/`)
- [ ] Update Content Collection config to use frontmatter slug

## Epic: Update site content

- [ ] Remove "Hotad skog" from projects
- [ ] Update screenshot for "Snittränta"
- [ ] Add "Odlingsguiden" as a new project
