// @ts-ignore
import {generateMetaImage} from './_lib/metaImage.mjs'
import {BLOG_POST_PATH_STATIC, getPostDataBySlug} from '../lib/posts'
;(async () => {
  const slug = process.argv[2]

  if (!slug) {
    console.error('No slug provided')
    return
  }

  const {title} = getPostDataBySlug(slug)

  const pathToSave = `${BLOG_POST_PATH_STATIC}/${slug}`
  const fileName = `${BLOG_POST_PATH_STATIC}/${slug}/card.png`

  await generateMetaImage({title, slug, pathToSave, fileName})

  process.exit()
})()
