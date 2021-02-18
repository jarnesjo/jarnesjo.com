import {getAllPostSlugs, getPostBySlug} from '@/lib/mdx'
import Date from '@/components/date'
import {GetStaticPaths, GetStaticProps} from 'next'
import {DefaultLayout, defaultMeta} from '@/components/layouts/DefaultLayout'
import hydrate from 'next-mdx-remote/hydrate'
import {MdxRemote} from 'next-mdx-remote/types'
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
    mdxSource: MdxRemote.Source
  }
}) {
  const content = hydrate(postData.mdxSource, {components: MdxComponents(slug)})

  const {title, date, category, image, tags} = postData.frontMatter

  const meta = {
    title,
    type: 'article'
  }

  if (image) {
    const sharingCard = require(`../../posts/${slug}/${image.src}`)

    meta['image'] = {
      ...image,
      src: `${defaultMeta.siteUrl}${sharingCard.default}`
    }
  }

  return (
    <DefaultLayout pageMeta={meta}>
      <article id="single-article">
        <header className="py-12 md:py-16 text-center">
          <h1 className="text-5xl tracking-tight font-bold mb-4 leading-snug lg:-mx-20">{title}</h1>
          <div className="text-gray-500 flex justify-center space-x-2 uppercase">
            <Date dateString={date} />
            <span>&bull;</span>
            <Link href={`/category/${category}`}>
              <a className="uppercase">{category}</a>
            </Link>
          </div>
        </header>

        <div className="prose md:prose-lg mx-auto">{content}</div>

        <div className="md:flex md:space-x-6 text-gray-500 uppercase text-sm mt-8 mb-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col">
            <span className="text-xs uppercase text-gray-400 hover:text-gray-700 transition-colors">
              Category
            </span>
            <Link href={`/category/${category}`}>
              <a className="uppercase font-medium" title="Category">
                {category}
              </a>
            </Link>
          </div>
          {tags && (
            <div className="flex flex-col mt-3 md:mt-0">
              <span className="text-xs uppercase text-gray-400">Tags</span>
              <ul className="flex space-x-3">
                {tags.map(tag => (
                  <li className="flex-shrink-0" key={tag}>
                    #{tag}
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
