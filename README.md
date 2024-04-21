# jarnesjo.com

- Framework: Next.js
- Content: MDX
- Styling: Tailwind CSS
- Deployment: Digital Ocean
- Production build: Docker

## Dev

```bash
git clone https://github.com/jarnesjo/jarnesjo.com.git
cd jarnesjo.com
npm ci
npm run dev
```

Enjoy content on [localhost:3000](http://localhost:3000)

### Generate meta images

```bash
// Create meta image for single post
node ./src/scripts/generate-meta-image-by-slug.mjs slug-to-your-post

// Create meta images for all posts missing meta card
node ./src/scripts/generate-meta-images.mjs

// Create meta images for all posts
node ./src/scripts/generate-meta-images.mjs --all

```

## Production

### Deploying with Docker and github workflows to Digital Ocean

GitHub secrect

**DEPLOY_HOST** - IP to Digital Ocean (DO) droplet  
**DEPLOY_KEY** - SSH secret and the public key should be added to `.ssh/authorized_keys` on server  
**DEPLOY_PORT** - SSH port (22)  
**DEPLOY_USER** - User on droplet (for Forge: `forge`)  
**USERNAME** - Your github name
