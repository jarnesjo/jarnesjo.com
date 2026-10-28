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

Add inside the `server` block, replacing Forge's default `X-Frame-Options`,
`X-XSS-Protection` and `X-Content-Type-Options` lines:

```nginx
# Security headers, set once for every response
add_header Strict-Transport-Security "max-age=31536000" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

# Old addresses - real 301s. Astro's redirects are meta refresh pages,
# which feed readers don't follow
location ~ ^/(rss|feed)/?$ { return 301 /feed.xml; }
location ~ ^/blog/?$ { return 301 /writing/; }
location ~ ^/blog/(.+?)/?$ { return 301 /writing/$1/; }

# Hashed assets (Astro _astro/) -- cache forever
location /_astro/ {
    expires 1y;
}

# Static files (images, sounds etc) -- cache 30 days
location /static/ {
    expires 30d;
}

# Custom 404
error_page 404 /404.html;
```

Keep `add_header` out of `location` blocks. One `add_header` inside a
location drops every `add_header` from the server block for that location.
That is how the assets under `/_astro/` once lost `nosniff`, when that
location also set `Cache-Control "public, immutable"`. `expires` alone sets
`Cache-Control: max-age`, which is enough behind Cloudflare.

`X-XSS-Protection` is left out on purpose: browsers have dropped it, and
the old filter it turned on could be abused.

Not set yet: a Content-Security-Policy. The layout has inline scripts
(dark mode, konami) and loads Puls from another domain, so it needs hashes
or `'unsafe-inline'`. Start with `Content-Security-Policy-Report-Only` when
picking it up.
