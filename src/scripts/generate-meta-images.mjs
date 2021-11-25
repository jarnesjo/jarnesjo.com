import {existsSync} from 'fs'
import {generateMetaImage} from './_lib/metaImage.mjs'
import {getAllPostsData} from './_lib/posts.mjs'
;(async () => {
  const allPostsData = getAllPostsData()
  const generateAll = process.argv.includes('--all')

  console.log(process.argv.includes('--all'))

  for (let index = 0; index < allPostsData.length; index++) {
    const {title, slug, filePath} = allPostsData[index]

    const fileName = `${filePath}/card.png`

    if (generateAll) {
      await generateMetaImage(title, slug, fileName)
      continue
    }

    if (!existsSync(fileName)) {
      await generateMetaImage(title, slug, fileName)
    }
  }

  process.exit()
})()
