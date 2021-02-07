import Date from '@/components/date'
import {DefaultLayout} from '@/components/layouts/DefaultLayout'
import {getAllCategorySlugs, getCategoryBySlug} from '@/lib/mdx'
import {FrontMatterType} from '@/types/FrontMatterType'
import {GetStaticPaths, GetStaticProps} from 'next'
import Link from 'next/link'

export default function CategoryPage({
  categoryData
}: {
  categoryData: {name: string; slug: string; posts: {slug: string; frontMatter: FrontMatterType}[]}
}) {
  const {name, posts} = categoryData

  return (
    <DefaultLayout>
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold tracking-tight mb-4 uppercase">{name}</h1>
        <p className="text-gray-500">This is a cateogry page about {name}</p>
      </div>
      <div className="space-y-4">
        {posts &&
          posts.map(({slug, frontMatter: {title, description, date}}) => (
            <div key={slug}>
              <Link href={`/posts/${slug}`}>
                <a className="text-xl font-semibold">{title}</a>
              </Link>
              <div className="text-gray-500">
                <small>
                  <Date dateString={date} />
                </small>
                {/* {description && <> &bull; {description}</>} */}
              </div>
            </div>
          ))}
      </div>
    </DefaultLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCategorySlugs()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const categoryData = await getCategoryBySlug(params.slug)
  return {
    props: {
      categoryData
    }
  }
}
