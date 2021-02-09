import {DefaultLayout} from '@/components/layouts/DefaultLayout'
import {PageHeading} from '@/components/PageHeading'
import {Teaser} from '@/components/Teaser'
import {getPostsSortedByDate} from '@/lib/mdx'

export default function BlogIndexPage({allPostsData}) {
  return (
    <DefaultLayout>
      <PageHeading>Writings</PageHeading>
      <div className="prose md:prose-lg">
        <p>
          I started my first blog 2019 as my first PHP-project in WordPress on my first local hack
          in Kalmar, Sweden.
        </p>
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
