import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import FastGlob from 'fast-glob'

const BLOG_POST_PATH = path.join(process.cwd(), 'src/posts')
const postFilePaths = FastGlob.sync(`${BLOG_POST_PATH}/**/*.mdx`)

const getSlugFromFilePath = filePath => {
  const split = filePath.split('/')
  return split[split.length - 2]
}

export function getAllPostsData() {
  const postData = postFilePaths.map(filePath => {
    const slug = getSlugFromFilePath(filePath)

    const source = fs.readFileSync(filePath, 'utf8')
    const {data} = matter(source)

    return {slug, filePath: path.join(BLOG_POST_PATH, `/${slug}`), ...data}
  })

  return [...postData].sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
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

export function getAllTagSlugs() {
  const allPostsData = postFilePaths
    .map(filePath => {
      const source = fs.readFileSync(filePath, 'utf8')
      const {data} = matter(source)

      return data?.tags
    })
    .flat()

  return allPostsData
    .filter(tag => tag !== undefined)
    .filter((value, index, self) => self.indexOf(value) === index) // Distinct
    .map(tag => `/tag/${tag}`)
}

export function getAllCategorySlugs() {
  const allPostsData = postFilePaths.map(filePath => {
    const source = fs.readFileSync(filePath, 'utf8')
    const {data} = matter(source)

    return data?.category
  })

  return allPostsData
    .filter(category => category !== undefined)
    .filter((value, index, self) => self.indexOf(value) === index) // Distinct
    .map(category => `/category/${category}`)
}
