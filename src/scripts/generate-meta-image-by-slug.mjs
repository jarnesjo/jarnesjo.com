import {generateMetaImage} from './_lib/metaImage.mjs'
import {BLOG_POST_PATH_STATIC, getPostBySlug} from './_lib/posts.mjs'
;(async () => {
  const slug = process.argv[2]

  if (!slug) {
    console.error('No slug provided')
    return
  }

  const {title, filePath} = getPostBySlug(slug)

  const pathToSave = `${BLOG_POST_PATH_STATIC}/${slug}`
  const fileName = `${BLOG_POST_PATH_STATIC}/${slug}/card.png`

  await generateMetaImage({title, slug, pathToSave, fileName})

  process.exit()
})()
