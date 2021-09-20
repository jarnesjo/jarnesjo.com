import {generateMetaImage} from './_lib/metaImage.mjs'
import {getPostBySlug} from './_lib/posts.mjs'
;(async () => {
  const slug = process.argv[2]

  if (!slug) {
    console.error('No slug provided')
    return
  }

  const {title, filePath} = getPostBySlug(slug)
  const fileName = `${filePath}/card.png`

  await generateMetaImage(title, slug, fileName)

  process.exit()
})()
