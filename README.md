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

## Dependabot and the dependency graph

GitHub stopped parsing this repo's `package-lock.json` in May 2026: its
dependency graph stayed on astro 6.1.7 while main moved on, and Dependabot
raised alerts for versions long gone. The lockfile itself was fine, and a
public repo cannot toggle the graph off and on. So every release sends the
lockfile itself through the dependency submission API
(`scripts/submit-dependencies.mjs`, run by `postversion` after the push).
It never fails a release; if it warns, run it again by hand. To check what
GitHub thinks is on main:

```sh
gh api repos/jarnesjo/jarnesjo.com/dependency-graph/sbom --jq '.sbom.packages[] | select(.name == "astro") | .versionInfo'
```

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
add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://puls.wrlabs.se; style-src 'self'; img-src 'self' https://puls.wrlabs.se; connect-src 'self' https://puls.wrlabs.se; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'" always;

# Old addresses - real 301s. Astro's redirects are meta refresh pages,
# which feed readers don't follow
location ~ ^/(rss|feed)/?$ { return 301 /feed.xml; }
location ~ ^/blog/?$ { return 301 /writing/; }
location ~ ^/blog/(.+?)/?$ { return 301 /writing/$1/; }
# Tools guess /sitemap.xml; Astro's sitemap is sitemap-index.xml
location = /sitemap.xml { return 301 /sitemap-index.xml; }

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

Edit the file in Forge's nginx editor. Forge's API nginx endpoint for the
site returns Forge's `site.conf`, which the real file has inlined (its
`location /` clashed with the one above), so it is not what nginx reads.

The live file has more than the block above. Worth bringing to a new host:

- Bot visits to Puls: `location /` mirrors the requests it serves to an
  internal location that forwards them to Puls when a `map` on the
  User-Agent says bot. Bots don't run the script, so this is the only way Puls sees them.
- 404s to Puls: the internal `/404.html` location has a `post_action`
  that reports the path, status and referrer. That fills Puls's
  "Pages to fix".
- `Cache-Control: no-cache` on HTML only, from a `map` on the response
  content type, so pages revalidate while `/_astro/` caches for a year.
- `map` blocks go outside the `server` block.

### Content-Security-Policy

The policy names hosts only: the site's own files and Puls (script, beacon
and pixel from `puls.wrlabs.se`). Nothing inline is allowed, no inline
scripts, `style` attributes, `<style>` elements or `onclick` handlers. So
the header never needs a hash, and never changes because the code did.

Two things in the code keep it that way:

- The dark mode script that runs before the page renders is a file,
  `src/scripts/theme-init.js`, loaded as a blocking script in the layout
  head. Vite gives it a hashed name under `/_astro/`, so it caches for a
  year and gets a new name when it changes. An inline script would need
  its sha256 in the header, in Forge, by hand, and a whitespace change on
  a new Astro version would break it silently.
- Astro inlines small component scripts by default, which would need the
  same hashes. `vite.build.assetsInlineLimit: 0` in `astro.config.mjs`
  keeps them external.

`tests/csp.test.js` reads the policy from this file and checks the build
against it: no inline scripts, no inline styles, and scripts and images
only from allowed hosts. It runs on every release (`preversion` runs the
whole test suite), so:

- A new third-party script or image host goes in the policy first, in
  Forge and here, then in the code.
- Styling belongs in classes, not `style=""`. Setting `el.style` from JS is
  fine, CSP does not cover that.
- A script that must run before render goes in a file like
  `theme-init.js`, never inline.

To try a change before enforcing it, send the same value as
`Content-Security-Policy-Report-Only` for a while and watch the browser
console. Vaka cannot see violations yet (a report endpoint is on its
roadmap), so the console is the only place they show.
