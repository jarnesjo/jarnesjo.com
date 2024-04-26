import {getAllPostSlugs, getPostBySlug} from '@/lib/mdx'
import {PostDate} from '@/components/PostDate'
import {GetStaticPaths, GetStaticProps} from 'next'
import {DefaultLayout, defaultMeta} from '@/components/layouts/DefaultLayout'
import {MDXRemote} from 'next-mdx-remote'
import {MDXRemoteSerializeResult} from 'next-mdx-remote/dist/types'
import {MdxComponents} from '@/components/MdxComponents'
import Link from 'next/link'
import {FrontMatterType} from '@/types/FrontMatterType'

export default function Post({
  slug,
  postData
}: {
  slug: string
  postData: {
    frontMatter: FrontMatterType
    mdxSource: MDXRemoteSerializeResult
  }
}) {
  const components = MdxComponents(slug)
  const content = <MDXRemote {...postData.mdxSource} components={components} />

  const {title, description, date, category, image, tags} = postData.frontMatter

  const meta = {
    title,
    description,
    type: 'article'
  }

  if (image) {
    meta['image'] = {
      ...image,
      src: `${defaultMeta.siteUrl}${image.src}`
    }
  }

  return (
    <DefaultLayout pageMeta={meta}>
      <article id="single-article">
        <header className="py-12 md:py-16 text-center">
          <h1
            className="text-5xl tracking-tight font-bold mb-4 leading-snug lg:-mx-20 js-darkmode-flicker"
            data-flicker-chars={title.length > 35 ? 2 : 1}
          >
            {title}
          </h1>
          <div className="text-gray-500 flex justify-center space-x-2 uppercase">
            <PostDate dateString={date} />
            <span>&bull;</span>
            <Link href={`/category/${category}`} className="uppercase">
              {category}
            </Link>
          </div>
        </header>

        <div className="prose md:prose-lg lg:prose-xl dark:prose-dark mx-auto">{content}</div>

        <div className="text-center my-10 py-8 text-gray-500 bg-gray-100 dark:bg-gray-800 transition-colors duration-200 rounded-md">
          <div className="pb-2">Discuss this post on Twitter</div>
          <div className="space-x-2">
            <a
              className="text-gray-500 hover:text-gray-700 transition-colors"
              rel="noopener"
              href={`http://twitter.com/share?text=Hi @jarnesjo&url=${encodeURIComponent(
                `${defaultMeta.siteUrl}/blog/${slug}`
              )}`}
            >
              With me
            </a>
            <span>&bull;</span>
            <a
              className="text-gray-500 hover:text-gray-700"
              rel="noopener"
              href={`https://mobile.twitter.com/search?q=${encodeURIComponent(
                `${defaultMeta.siteUrl}/blog/${slug}`
              )}`}
            >
              With others
            </a>
          </div>
        </div>

        <div className="md:flex md:space-x-6 text-gray-500 uppercase text-sm mt-10 py-6 md:px-2 border-t border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <div className="flex flex-col">
            <span className="text-xs uppercase text-gray-400 hover:text-gray-700 transition-colors">
              Category
            </span>
            <Link
              href={`/category/${category}`}
              className="uppercase font-medium transition-colors hover:text-red-600"
              title="Category"
            >
              {category}
            </Link>
          </div>
          {tags && (
            <div className="flex flex-col mt-3 md:mt-0">
              <span className="text-xs uppercase text-gray-400">Tags</span>
              <ul className="flex space-x-3">
                {tags.map(tag => (
                  <li className="flex-shrink-0" key={tag}>
                    <Link
                      href={`/tag/${tag}`}
                      className="uppercase transition-colors hover:text-red-600"
                    >
                      #{tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </DefaultLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  let {slug} = params
  slug = Array.isArray(slug) ? slug[slug.length - 1] : slug

  const postData = await getPostBySlug(slug)

  return {
    props: {
      slug: params.slug,
      postData
    }
  }
}
