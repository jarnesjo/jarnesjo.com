---
name: add-project
description: Add a new project to the portfolio on the homepage
disable-model-invocation: true
argument-hint: <url> [position]
---

Add a new project to jarnesjo.com homepage.

## Input

- **URL**: $ARGUMENTS (the project URL to add)
- Ask for: title, description, tech stack, and desired position in the list

## Screenshot

1. Take a desktop screenshot (1400x1800, cropped) using pageres:
   ```
   npx pageres-cli "<url>" 1400x1800 --crop --delay=3 --filename=<slug>-screenshot
   ```
2. For mobile-first apps, use 750x1200 instead
3. If the site is behind auth, ask the user for a public/share URL
4. For IDN domains (Swedish characters), convert to punycode first:
   ```
   python3 -c "print('<domain>'.encode('idna').decode())"
   ```
5. Show the screenshot to the user for approval before continuing
6. Move the screenshot to `public/static/images/<slug>-screenshot.png`

## Add to index.astro

Add the project to the `projects` array in `src/pages/index.astro`:

```ts
{
  title: '<Title>',
  description: '<Description>',
  image: {src: '/static/images/<slug>-screenshot.png', alt: 'Screenshot of <title>', width: <w>, height: <h>},
  url: '<url>?utm_source=jarnesjo.com&utm_campaign=portfolio&utm_medium=referral',
  tech: ['Tech1', 'Tech2']
}
```

### Rules
- Desktop screenshots: 1400x1800
- Mobile screenshots: 750x1200 (only for mobile-first apps like Odlingsguiden)
- All project images have `class="rounded-md ring-1 ring-gray-200 dark:ring-gray-700"`
- Add UTM params to URL (unless it's a GitHub repo link)
- Default position: end of list. User can specify position (1-based)
- Get actual image dimensions with `sips -g pixelWidth -g pixelHeight`

## Commit

Commit with message: `Add project: <title>`
Do NOT push or release - let the user decide when.
