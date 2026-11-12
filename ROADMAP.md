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

## Later

- Go over the generated OG images (`src/pages/og/[slug].png.ts`) so they look more harmonized. Wanted next, not started, and what should change is not decided yet.
- Link the Snoka card on the home page to its repo when it goes public (`url` in `src/pages/index.astro`). Left out for now since a link to a private repo gives visitors a 404.
- Update satori from 0.33 when a version drops its exact pin on fflate 0.7.3. Tried 0.63.2 on 2026-11-04: it still pins it, so no audit finding clears, and every OG image renders slightly differently (about 0.75% of the pixels), for no gain. Satori only calls `inflateSync`, not the affected `unzipSync`.
- Same wait for `@tailwindcss/typography`: 0.5.20 pins postcss-selector-parser 6.0.10. Build time only. Both could be forced with `overrides`, left out on purpose since neither is reachable from the site.
- Give the RSS feed a real publish time. `pubDate` is the frontmatter `date` at `00:00:00 GMT`, so a tool that reads the feed to mark posts next to traffic puts each one at 01:00 on that date, and a post backdated to its Friday lands days before it went live. Left for now since nothing reads the feed that way yet: posts are added to Puls by hand with the time from the release commit. The fix would be a time in frontmatter, or a separate `published` timestamp beside the date readers see.
