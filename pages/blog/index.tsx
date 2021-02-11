import {DefaultLayout, siteTitle} from '@/components/layouts/DefaultLayout'
import {PageHeading} from '@/components/PageHeading'
import {Teaser} from '@/components/Teaser'
import {getPostsSortedByDate} from '@/lib/mdx'
import Head from 'next/head'

export default function BlogIndexPage({allPostsData}) {
  return (
    <DefaultLayout>
      <Head>
        <title>Blog - {siteTitle}</title>
      </Head>
      <PageHeading>Writings</PageHeading>
      <div className="prose md:prose-lg">
        <p>
          I started my first blog 2009 as my first PHP-project in WordPress. It was on my first
          local hack in Kalmar, Sweden 🇸🇪. Since then I have primarily worked with PHP, Laravel and
          WordPress, but in the last years starting leaning more to JS. So I'm going trying to share
          interesting thing I trip over and develop here. Enjoy!
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
