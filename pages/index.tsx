import {getAllPostSlugs, getPostsSortedByDate} from '../lib/mdx'
import Head from 'next/head'
import Date from '@/components/date'
import Link from 'next/link'
import {DefaultLayout, siteTitle} from '@/components/layouts/DefaultLayout'
// import Img from 'react-optimized-image'

export default function Home({allPostsData}) {
  return (
    <DefaultLayout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className="py-12 md:py-20">
        <div className="uppercase tracking-wide text-lg font-semibold text-red-500">
          Hi, my name is Nicklas
        </div>
        <h1 className="text-6xl font-extrabold tracking-tight pt-2 pb-6">I like to build things</h1>
        <div className="text-2xl text-gray-500">
          I'm one of the founder of Webready, a development agency in Kalmar, Sweden.
        </div>
      </div>

      <div className="pb-20 pt-4">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Latest writings</h2>
        <div className="space-y-4">
          {allPostsData.map(({slug, date, title}) => (
            <article className="" key={slug}>
              <Link href={`/blog/${slug}`}>
                <a className="text-xl font-semibold">{title}</a>
              </Link>
              <br />
              <small className="">
                <Date dateString={date} />
              </small>
            </article>
          ))}
        </div>
      </div>

      <h2 className="text-3xl font-bold tracking-tight mb-4">Things I have build</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {/* <div className="relative">
          <Img
            src={require('../public/images/snittranta.png?lqip')}
            webp
            alt=""
            className="w-full absolute"
            loading="lazy"
          />
          <Img
            src={require('../public/images/snittranta.png')}
            webp
            alt=""
            sizes={[300, 600]}
            breakpoints={[600]}
            className="absolute inset-x-0 w-full"
            loading="lazy"
          />
        </div> */}
        <div></div>
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
