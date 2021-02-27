# jarnesjo.com

## Dev

### Generate meta images

```bash
// Create meta image for single post
node ./scripts/generate-meta-image-by-slug.mjs slug-to-your-post

// Create meta images for all posts
node ./scripts/generate-meta-images.mjs
```

## Production

### Deploying with Docker and github workflows to Digital Ocean

GitHub secrect

**DEPLOY_HOST** - IP to Digital Ocean (DO) droplet  
**DEPLOY_KEY** - SSH secret and the public key should be added to `.ssh/authorized_keys` on server  
**DEPLOY_PORT** - SSH port (22)  
**DEPLOY_USER** - User on droplet (for Forge: `forge`)  
**USERNAME** - Your github name
