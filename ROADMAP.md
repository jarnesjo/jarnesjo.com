# Roadmap

## Epic: Clean up unused dependencies

- [ ] Remove `next-remote-watch` — Next.js 16 handles MDX hot reload natively
- [ ] Remove `file-loader` — no longer needed with `next/image`
- [ ] Replace `globby` with `fast-glob` in sitemap script (already a dependency)

## Epic: Restructure blog posts

- [ ] Rename post directories with date prefix (`2024-03-12_short-name/`)
- [ ] Add `slug` to frontmatter — slug becomes the source of truth instead of directory name
- [ ] Update `src/lib/mdx.ts` to read slug from frontmatter and sort by directory date prefix
- [ ] Update `src/scripts/_lib/posts.mjs` to match new structure

## Epic: Consolidate MDX processing

- [ ] Merge duplicate logic between `src/lib/mdx.ts` and `src/scripts/_lib/posts.mjs`
- [ ] Consider lazy file reading instead of sync reads at module level

## Epic: Modernize OG image generation

- [ ] Replace Puppeteer-based OG image scripts with Next.js `next/og` (ImageResponse)
- [ ] Remove `puppeteer-core` dependency

## Epic: Harden TypeScript

- [ ] Enable `strict: true` in tsconfig incrementally
- [ ] Fix type errors that surface

## Epic: Update CI/CD pipeline

- [ ] Migrate from `docker.pkg.github.com` to `ghcr.io` (GitHub Packages v1 is deprecated)
- [x] Remove CodeQL workflow (unnecessary for static blog)
- [ ] Update `build-and-deploy.yml` action versions

## Epic: SEO best practices

- [ ] Add JSON-LD structured data (`BlogPosting`, `Person`) to blog posts
- [ ] Add article-specific OG tags (`article:published_time`, `article:author`, `article:section`)
- [ ] Add `og:locale` meta tag
- [ ] Add `<lastmod>` timestamps to sitemap based on post dates

## Epic: Small improvements

- [ ] Lazy-load dark mode sound effect (`switch.mp3`)
- [ ] Add `.prettierrc` config (Prettier is used in sitemap script but config is missing)
