import {getPostsSortedByDate} from '@/lib/mdx'
import {DefaultLayout} from '@/components/layouts/DefaultLayout'
import {Teaser} from '@/components/Teaser'
import Link from 'next/link'
import {CustomImage} from '@/components/CustomImage'

const ListTechBadge = ({text}: {text: string}) => {
  return (
    <li className="inline-flex items-center px-2.5 py-0.5 mr-2 mt-2 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
      {text}
    </li>
  )
}

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

      <h2 className="text-3xl font-bold tracking-tight mb-4 pt-4">Things I have build</h2>
      <p className="text-gray-500 text-lg">
        As owner of development agency I have build alot of fun and cool projects together with
        clients. But since I find happiness to build thing for myself again this is some of them.
      </p>

      <div className="space-y-16 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
          <div className="relative">
            <CustomImage
              src="/static/images/hotadskog-screenshot.png"
              width={2528}
              height={2790}
              alt="Screenshot from frontpage of hotadskog.se"
            />
          </div>
          <div className="mt-6 md:mt-0 md:col-span-2">
            <h3 className="font-semibold text-xl">Hotadskog</h3>
            <p className="mt-4">
              Cross-referencing data sources to be able to easily view and visualize felling
              applications and their impact on nature and cultural values
            </p>
            <div className="mt-4">
              <span className="text-sm mr-2 font-semibold">Dev</span>
              <ul className="flex flex-wrap">
                <ListTechBadge text="Next.js" />
                <ListTechBadge text="AWS Amplify" />
                <ListTechBadge text="Leaflet" />
                <ListTechBadge text="Typescript" />
                <ListTechBadge text="Tailwind CSS" />
              </ul>
            </div>
            <a
              className="mt-4 inline-block text-gray-500 font-semibold"
              href="https://hotadskog.se"
            >
              https://hotadskog.se
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
          <div className="relative">
            <CustomImage
              src="/static/images/prlog-screenshot.png"
              width={2030}
              height={2990}
              alt="Screenshot from frontpage of prlog.app"
            />
          </div>
          <div className="mt-6 md:mt-0 md:col-span-2">
            <h3 className="font-semibold text-xl">PR LOG</h3>
            <p className="mt-4">
              Everything you need to keep track of your PRs (personal records) in training.
              Optimized and build for where to use it - your mobile.
            </p>
            <div className="mt-4">
              <span className="text-sm mr-2 font-semibold">Dev</span>
              <ul className="flex flex-wrap">
                <ListTechBadge text="Next.js" />
                <ListTechBadge text="NextAuth.js" />
                <ListTechBadge text="PostgreSQL" />
                <ListTechBadge text="Prisma" />
                <ListTechBadge text="Typescript" />
                <ListTechBadge text="Tailwind CSS" />
                <ListTechBadge text="Docker" />
              </ul>
            </div>
            <a className="mt-4 inline-block text-gray-500 font-semibold" href="https://prlog.app">
              https://prlog.app
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
          <div className="relative">
            <CustomImage src="/static/images/snittranta.png" width={1338} height={1188} alt="" />
          </div>
          <div className="mt-6 md:mt-0 md:col-span-2">
            <h3 className="font-semibold text-xl">Snittränta</h3>
            <p className="mt-4">
              A comparison site for average interest rates between Swedish banks.
            </p>
            <div className="mt-4">
              <span className="text-sm font-semibold mr-2">Dev</span>
              <ul className="flex">
                <ListTechBadge text="Gatsby" />
                <ListTechBadge text="Tailwind CSS" />
                <ListTechBadge text="Puppeteer" />
              </ul>
            </div>
            <a
              className="mt-4 inline-block text-gray-500 font-semibold"
              href="https://snittränta.se"
            >
              https://snittränta.se
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
          <div className="relative">
            <CustomImage src="/static/images/manadskollen.png" width={2506} height={2220} alt="" />
          </div>
          <div className="mt-6 md:mt-0 md:col-span-2">
            <h3 className="font-semibold text-xl">Månadskollen</h3>
            <p className="mt-4">
              Copy and paste bank statement from Swedish banks and get a fast summary and overview
              of your finance.
            </p>
            <div className="mt-4">
              <span className="text-sm font-semibold mr-2">Dev</span>
              <ul className="flex">
                <ListTechBadge text="Gatsby" />
                <ListTechBadge text="Tailwind CSS" />
              </ul>
            </div>
            <a
              className="mt-4 inline-block text-gray-500 font-semibold"
              href="https://månadskollen.se"
            >
              https://månadskollen.se
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
          <div className="relative">
            <CustomImage
              src="/static/images/minimalisera-screenshot.png"
              width={2870}
              height={2990}
              alt="Screenshot from frontpage of minimalisera.se"
            />
          </div>
          <div className="mt-6 md:mt-0 md:col-span-2">
            <h3 className="font-semibold text-xl">Minimalisera</h3>
            <p className="mt-4">
              A blog about minimalism. First project with Gatsby and Tailwind CSS.
            </p>
            <div className="mt-4">
              <span className="text-sm mr-2 font-semibold">Dev</span>
              <ul className="flex flex-wrap">
                <ListTechBadge text="Gatsby" />
                <ListTechBadge text="Tailwind CSS" />
              </ul>
            </div>
            <a
              className="mt-4 inline-block text-gray-500 font-semibold"
              href="https://minimalisera.se"
            >
              https://minimalisera.se
            </a>
          </div>
        </div>
      </div>
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
