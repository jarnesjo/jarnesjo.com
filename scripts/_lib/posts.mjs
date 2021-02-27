import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import FastGlob from 'fast-glob'

const BLOG_POST_PATH = path.join(process.cwd(), 'posts')
const postFilePaths = FastGlob.sync(`${BLOG_POST_PATH}/**/*.mdx`)

const getSlugFromFilePath = filePath => {
  const split = filePath.split('/')
  return split[split.length - 2]
}

export function getAllPostsData() {
  return postFilePaths.map(filePath => {
    const slug = getSlugFromFilePath(filePath)

    const source = fs.readFileSync(filePath, 'utf8')
    const {
      data: {title}
    } = matter(source)

    return {slug, title, filePath: path.join(BLOG_POST_PATH, `/${slug}`)}
  })
}

export function getPostBySlug(slug) {
  const fullPath = path.join(BLOG_POST_PATH, `/${slug}/index.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const {
    data: {title}
  } = matter(fileContents)

  return {slug, title, filePath: path.join(BLOG_POST_PATH, `/${slug}`)}
}
