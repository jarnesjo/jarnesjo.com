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

Build locally and commit `dist/`:

```bash
npm run build
git add dist/
git commit -m "Build"
git push
```

Forge pulls and serves `dist/` directly -- no Node.js needed on the server.

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
