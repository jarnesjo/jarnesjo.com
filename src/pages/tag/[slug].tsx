import {DefaultLayout} from '@/components/layouts/DefaultLayout'
import {Teaser} from '@/components/Teaser'
import {getAllTagSlugs, getTagBySlug} from '@/lib/mdx'
import {FrontMatterType} from '@/types/FrontMatterType'
import {GetStaticPaths, GetStaticProps} from 'next'

export default function TagPage({
  tagData
}: {
  tagData: {name: string; slug: string; posts: {slug: string; frontMatter: FrontMatterType}[]}
}) {
  const {name, posts} = tagData

  return (
    <DefaultLayout
      pageMeta={{
        title: `All posts tagged with #${name.toUpperCase()}`,
        description: `Here you found every posts and writing tagged with #${name}`
      }}
    >
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold tracking-tight mb-4 uppercase">{name}</h1>
        <p className="text-gray-500">This is a tag page about #{name}</p>
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
  const paths = getAllTagSlugs()

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const tagData = await getTagBySlug(params.slug)

  return {
    props: {
      tagData
    }
  }
}
