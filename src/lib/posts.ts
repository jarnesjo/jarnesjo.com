import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import FastGlob from 'fast-glob'

export const BLOG_POST_PATH = path.join(process.cwd(), 'src/posts')
export const BLOG_POST_PATH_STATIC = path.join(process.cwd(), 'public/static/post-content')

export const getSlugFromFilePath = (filePath: string) => {
  const split = filePath.split('/')
  return split[split.length - 2]
}

export const dateSortDesc = (a: Date, b: Date) => {
  if (a < b) {
    return 1
  } else {
    return -1
  }
}

export type PostData = {
  slug: string
  filePath: string
  title: string
  date: Date
  description: string
  category: string
  tags: string[]
  author: string
  image?: {src: string; alt: string; width?: number; height?: number}
}

export function getAllPostsWithFrontMatter(): PostData[] {
  const postFilePaths = FastGlob.sync(`${BLOG_POST_PATH}/**/*.mdx`)

  return postFilePaths.map(filePath => {
    const slug = getSlugFromFilePath(filePath)
    const source = fs.readFileSync(filePath, 'utf8')
    const {data} = matter(source)

    return {
      slug,
      filePath: path.join(BLOG_POST_PATH, `/${slug}`),
      ...(data as Omit<PostData, 'slug' | 'filePath'>)
    }
  })
}

export function getAllPostsData() {
  return [...getAllPostsWithFrontMatter()].sort((a, b) => dateSortDesc(a.date, b.date))
}

export function getPostDataBySlug(slug: string) {
  const fullPath = path.join(BLOG_POST_PATH, `/${slug}/index.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const {
    data: {title}
  } = matter(fileContents)

  return {slug, title, filePath: path.join(BLOG_POST_PATH, `/${slug}`)}
}

export function getAllCategoryPaths() {
  const categories = getAllPostsWithFrontMatter()
    .map(post => post.category)
    .filter(category => category !== undefined)
    .filter((value, index, self) => self.indexOf(value) === index)

  return categories.map(category => `/category/${category}`)
}

export function getAllTagPaths() {
  const tags = getAllPostsWithFrontMatter()
    .map(post => post.tags)
    .flat()
    .filter(tag => tag !== undefined)
    .filter((value, index, self) => self.indexOf(value) === index)

  return tags.map(tag => `/tag/${tag}`)
}
