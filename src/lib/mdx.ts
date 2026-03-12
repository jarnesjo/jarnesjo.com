import fs from 'fs'
import matter from 'gray-matter'
import {serialize} from 'next-mdx-remote/serialize'
import rehypePrism from 'rehype-prism-plus'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import {
  BLOG_POST_PATH,
  getAllPostsWithFrontMatter,
  getAllPostsData,
  dateSortDesc
} from './posts'

// Re-export for backwards compatibility
export {BLOG_POST_PATH, BLOG_POST_PATH_STATIC, getAllPostsData, getPostDataBySlug} from './posts'

export function getPostsSortedByDate(limit?: number) {
  const allPostsData = getAllPostsData()

  return allPostsData
    .map(({slug, date, title, category}) => ({slug, date, title, category}))
    .slice(0, limit ?? allPostsData.length)
}

export function getAllPostSlugs() {
  return getAllPostsWithFrontMatter().map(({slug}) => ({
    params: {slug}
  }))
}

export function getAllCategorySlugs() {
  const categories = getAllPostsWithFrontMatter()
    .map(post => post.category)
    .filter(category => category !== undefined)
    .filter((value, index, self) => self.indexOf(value) === index)

  return categories.map(category => ({
    params: {slug: category}
  }))
}

export function getAllTagSlugs() {
  const tags = getAllPostsWithFrontMatter()
    .map(post => post.tags)
    .flat()
    .filter(tag => tag !== undefined)
    .filter((value, index, self) => self.indexOf(value) === index)

  return tags.map(tag => ({
    params: {slug: tag}
  }))
}

export async function getPostBySlug(slug: string) {
  const fullPath = `${BLOG_POST_PATH}/${slug}/index.mdx`
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const {data, content} = matter(fileContents)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
      // @ts-ignore
      rehypePlugins: [rehypeCodeTitles, rehypePrism, rehypeAutolinkHeadings]
    }
  })

  return {
    mdxSource,
    frontMatter: {
      slug: slug || null,
      ...data
    }
  }
}

export async function getCategoryBySlug(slug: string | string[]) {
  const allPostsData = getAllPostsWithFrontMatter().map(({slug, ...rest}) => ({
    slug,
    frontMatter: {...rest}
  }))

  const postsForCategory = allPostsData
    .filter(({frontMatter: {category}}) => category === slug)
    .sort((a, b) => dateSortDesc(a.frontMatter.date, b.frontMatter.date))

  return {
    name: slug,
    slug,
    posts: postsForCategory
  }
}

export async function getTagBySlug(slug: string | string[]) {
  const allPostsData = getAllPostsWithFrontMatter().map(({slug, ...rest}) => ({
    slug,
    frontMatter: {...rest}
  }))

  const postsForTag = allPostsData
    .filter(({frontMatter: {tags}}) => {
      return tags.map((tag: string) => tag === slug).includes(true)
    })
    .sort((a, b) => dateSortDesc(a.frontMatter.date, b.frontMatter.date))

  return {
    name: slug,
    slug,
    posts: postsForTag
  }
}
