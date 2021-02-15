import {DefaultLayout, defaultMeta} from '@/components/layouts/DefaultLayout'
import {PageHeading} from '@/components/PageHeading'
import {Teaser} from '@/components/Teaser'
import {getPostsSortedByDate} from '@/lib/mdx'

export default function BlogIndexPage({allPostsData}) {
  return (
    <DefaultLayout
      pageMeta={{
        title: `Blog - ${defaultMeta.title}`,
        description:
          'Here I will share my thoughts and cool bits of the internet I find. Code, dev, js and similar stuff.'
      }}
    >
      <PageHeading>Writings</PageHeading>
      <div className="prose md:prose-lg">
        <p>
          I started my first blog 2009 as my first PHP-project in WordPress. It was on my first
          local hack in Kalmar, Sweden. Worked mainly with PHP but in recent years leaning more to
          JS.
        </p>
        <p>So I'm going trying to share interesting thing I trip over and develop here. Enjoy!</p>
      </div>
      <div className="pt-12 space-y-8">
        {allPostsData &&
          allPostsData.map(({slug, title, date, category}) => (
            <Teaser
              key={slug}
              slug={slug}
              title={title}
              date={date}
              category={category}
              size="large"
            />
          ))}
      </div>
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  const allPostsData = getPostsSortedByDate()

  return {
    props: {
      allPostsData
    }
  }
}
