import {existsSync} from 'fs'
// @ts-ignore
import {generateMetaImage} from './_lib/metaImage.mjs'
import {BLOG_POST_PATH_STATIC, getAllPostsData} from '../lib/posts'
;(async () => {
  const allPostsData = getAllPostsData()
  const generateAll = process.argv.includes('--all')

  for (let index = 0; index < allPostsData.length; index++) {
    const {title, slug} = allPostsData[index]

    const fileName = `${BLOG_POST_PATH_STATIC}/${slug}/card.png`

    if (generateAll) {
      await generateMetaImage({
        title,
        slug,
        fileName,
        pathToSave: `${BLOG_POST_PATH_STATIC}/${slug}`
      })
      continue
    }

    if (!existsSync(fileName)) {
      await generateMetaImage({
        title,
        slug,
        fileName,
        pathToSave: `${BLOG_POST_PATH_STATIC}/${slug}`
      })
    }
  }

  process.exit()
})()
