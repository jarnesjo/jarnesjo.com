import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import {MdxComponents} from '@/components/MdxComponents'
import FastGlob from 'fast-glob'

const postsDirectory = path.join(process.cwd(), 'posts')
const postFilePaths = FastGlob.sync(`${postsDirectory}/**/*.mdx`)

export function getPostsSortedByDate() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.mdx$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      slug,
      ...(matterResult.data as {date: string; title: string})
    }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// =================
// Get posts by slug
// =================
export function getAllPostSlugs() {
  // return postFilePaths.map(path => {
  //   const split = path.split('/')
  //   const slug = split[split.length - 2]

  //   return {
  //     params: {slug: slug}
  //   }
  // })

  // ==========
  // File based
  // ==========
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, '')
      }
    }
  })
}

export function getAllCategorySlugs() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const {data} = matter(fileContents)

    // Combine the data with the id
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

export async function getPostBySlug(slug: string | string[]) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const {data, content} = matter(fileContents)

  const mdxSource = await renderToString(content, {
    components: MdxComponents(),
    mdxOptions: {
      remarkPlugins: [
        // require('remark-autolink-headings'),
        // require('remark-slug'),
        // require('remark-code-titles')
      ],
      rehypePlugins: [require('@mapbox/rehype-prism')]
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
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.mdx$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const {data, content} = matter(fileContents)

    // Combine the data with the id
    return {
      slug,
      frontMatter: {...data}
    }
  })

  const postsForCategory = allPostsData.filter(({frontMatter: {category}}) => category === slug)

  return {
    name: slug,
    slug,
    posts: postsForCategory
  }
}
