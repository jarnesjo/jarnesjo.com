import {DefaultLayout} from '@/components/layouts/DefaultLayout'
import {Teaser} from '@/components/Teaser'
import {getAllCategorySlugs, getCategoryBySlug} from '@/lib/mdx'
import {FrontMatterType} from '@/types/FrontMatterType'
import {GetStaticPaths, GetStaticProps} from 'next'

export default function CategoryPage({
  categoryData
}: {
  categoryData: {name: string; slug: string; posts: {slug: string; frontMatter: FrontMatterType}[]}
}) {
  const {name, posts} = categoryData

  return (
    <DefaultLayout
      pageMeta={{
        title: `${name} posts`,
        description: `Here you found every posts and writing about ${name}`
      }}
    >
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold tracking-tight mb-4 uppercase">{name}</h1>
        <p className="text-gray-500">This is a category page about {name}</p>
      </div>
      <div className="space-y-4">
        {posts &&
          posts.map(({slug, frontMatter: {title, date}}) => (
            <Teaser title={title} slug={slug} date={date} key={slug} size="large" />
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
