import Head from 'next/head'
import Link from 'next/link'

const name = '[Your Name]'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({children, home}: {children: React.ReactNode; home?: boolean}) {
  return (
    <div className="">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="">
        {home ? (
          <>
            <img src="/images/profile.jpg" className="" alt={name} />
            <h1 className="">{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img src="/images/profile.jpg" className="" alt={name} />
              </a>
            </Link>
            <h2 className="">
              <Link href="/">
                <a className="">{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className="">
          <Link href="/">
            <a>← Back to hodme</a>
          </Link>
        </div>
      )}
    </div>
  )
}
