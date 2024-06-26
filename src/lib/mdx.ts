import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {serialize} from 'next-mdx-remote/serialize'
// import {MdxComponents} from '@/components/MdxComponents'
import FastGlob from 'fast-glob'
import rehypePrism from 'rehype-prism-plus'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const BLOG_POST_PATH = path.join(process.cwd(), 'src/posts')
const postFilePaths = FastGlob.sync(`${BLOG_POST_PATH}/**/*.mdx`)

const getSlugFromFilePath = filePath => {
  const split = filePath.split('/')
  return split[split.length - 2]
}

const dateSortDesc = (a: Date, b: Date) => {
  if (a < b) {
    return 1
  } else {
    return -1
  }
}

export function getPostsSortedByDate(limit?: number) {
  const allPostsData = postFilePaths.map(filePath => {
    const slug = getSlugFromFilePath(filePath)

    const source = fs.readFileSync(filePath, 'utf8')
    const {
      data: {date, title, category}
    } = matter(source)

    return {slug, date, title, category}
  })

  // Sort posts by date
  return [...allPostsData]
    .sort((a, b) => dateSortDesc(a.date, b.date))
    .slice(0, limit ?? allPostsData.length)
}

// =================
// Get posts by slug
// =================
export function getAllPostSlugs() {
  return postFilePaths.map(filePath => {
    return {
      params: {slug: getSlugFromFilePath(filePath)}
    }
  })
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
    .map(category => {
      return {
        params: {
          slug: category
        }
      }
    })
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
    .map(tag => {
      return {
        params: {
          slug: tag
        }
      }
    })
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(BLOG_POST_PATH, `/${slug}/index.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
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
  const allPostsData = postFilePaths.map(filePath => {
    const source = fs.readFileSync(filePath, 'utf8')
    const {data} = matter(source)

    return {
      slug: getSlugFromFilePath(filePath),
      frontMatter: {...data}
    }
  })

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
  const allPostsData = postFilePaths.map(filePath => {
    const source = fs.readFileSync(filePath, 'utf8')
    const {data} = matter(source)

    return {
      slug: getSlugFromFilePath(filePath),
      frontMatter: {...data}
    }
  })

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
