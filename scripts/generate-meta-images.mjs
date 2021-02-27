import {generateMetaImage} from './_lib/metaImage.mjs'
import {getAllPostsData} from './_lib/posts.mjs'
;(async () => {
  const allPostsData = getAllPostsData()

  for (let index = 0; index < allPostsData.length; index++) {
    const {title, slug, filePath} = allPostsData[index]

    const fileName = `${filePath}/card.png`

    await generateMetaImage(title, slug, fileName)
  }

  process.exit()
})()
