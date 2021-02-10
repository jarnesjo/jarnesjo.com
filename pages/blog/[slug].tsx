import {getAllPostSlugs, getPostBySlug} from '@/lib/mdx'
import Head from 'next/head'
import Date from '@/components/date'
import {GetStaticPaths, GetStaticProps} from 'next'
import {DefaultLayout} from '@/components/layouts/DefaultLayout'
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

  const {title, date, category} = postData.frontMatter

  return (
    <DefaultLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <article id="single-article">
        <header className="py-12 md:py-16 text-center">
          <h1 className="text-5xl tracking-tight font-bold mb-4 leading-snug md:-mx-20">{title}</h1>
          <div className="text-gray-500 flex justify-center space-x-2 uppercase">
            <Date dateString={date} />
            <span>&bull;</span>
            <Link href={`/category/${category}`}>
              <a className="uppercase">{category}</a>
            </Link>
          </div>
        </header>
        <div className="prose md:prose-lg mx-auto">{content}</div>
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
