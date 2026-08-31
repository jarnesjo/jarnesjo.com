# jarnesjo.com

- Framework: Astro
- Content: MDX
- Styling: Tailwind CSS v4
- Deployment: Laravel Forge (static files)

## Dev

```bash
git clone https://github.com/jarnesjo/jarnesjo.com.git
cd jarnesjo.com
npm ci
npm run dev
```

## Build & deploy

Releases are cut locally. `npm version` builds, runs the route tests,
force-adds the gitignored `dist/` into the release commit, and pushes it
with its tag:

```bash
npm run release:patch   # or release:minor / release:major
```

The push happens in the `postversion` hook, so a release can never sit
unpushed. That used to be easy to miss, since `dist/` is always dirty
after a build and hides an unpushed commit in `git status`.

If `npm version` refuses with "Git working directory not clean", it is the
stale `dist/` from an earlier build - the check runs before `preversion`
rebuilds it. Add `--force` (`npm version minor --force`) to let the fresh
build land in the release commit.

Forge pulls and serves `dist/` directly -- no Node.js needed on the server.

`dist/` is gitignored but committed. If you ever stage it by hand, use
`git add -f dist` -- a plain `git add dist/` picks up already-tracked files
but silently skips new ones, which ships HTML referencing asset hashes that
never made it into the commit.

## Nginx (add to Forge config)

Add inside the `server` block:

```nginx
# Hashed assets (Astro _astro/) -- cache forever
location /_astro/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Static files (images, sounds etc) -- cache 30 days
location /static/ {
    expires 30d;
    add_header Cache-Control "public";
}

# Custom 404
error_page 404 /404.html;
```
