import {getPostsSortedByDate} from '@/lib/mdx'
import {DefaultLayout} from '@/components/layouts/DefaultLayout'
import {Teaser} from '@/components/Teaser'
import Link from 'next/link'

export default function Home({allPostsData}) {
  return (
    <DefaultLayout pageMeta={{title: 'Nicklas Jarnesjö - web, dev and business'}}>
      <div className="py-12 md:py-20">
        <div className="uppercase tracking-wide text-lg font-semibold text-red-500">
          Hi, my name is Nicklas
        </div>
        <h1
          className="text-6xl font-extrabold tracking-tight pt-2 pb-6 js-darkmode-flicker"
          data-flicker-chars="3"
        >
          I like to build things
        </h1>
        <div className="text-2xl text-gray-500">
          I'm one of the founders of Webready, a development agency in Kalmar, Sweden.
        </div>
      </div>

      <div className="pb-20 pt-4">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Latest writings</h2>
        <div className="space-y-5">
          {allPostsData.map(({slug, date, title}) => (
            <Teaser title={title} slug={slug} date={date} key={slug} />
          ))}
          <div className="font-semibold text-red-500 hover:text-red-700">
            <Link href="/blog">
              <a>See all posts →</a>
            </Link>
          </div>
        </div>
      </div>

      {/* <h2 className="text-3xl font-bold tracking-tight mb-4">Things I have build</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div className="relative">
          <CustomImage src="/static/images/snittranta.png" width={1338} height={1188} alt="" />
        </div>
        <div></div>
      </div> */}
    </DefaultLayout>
  )
}

export async function getStaticProps() {
  const allPostsData = getPostsSortedByDate(5)

  return {
    props: {
      allPostsData
    }
  }
}
