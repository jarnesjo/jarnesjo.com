import {existsSync} from 'fs'
import {generateMetaImage} from './_lib/metaImage.mjs'
import {BLOG_POST_PATH_STATIC, getAllPostsData} from './_lib/posts.mjs'
;(async () => {
  const allPostsData = getAllPostsData()
  const generateAll = process.argv.includes('--all')

  for (let index = 0; index < allPostsData.length; index++) {
    const {title, slug, filePath} = allPostsData[index]

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
