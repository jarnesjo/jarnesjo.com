import Link from 'next/link'
import Head from 'next/head'
import {Transition} from '@headlessui/react'
import {useCallback, useEffect, useState} from 'react'
import {CustomImage} from '@/components/CustomImage'
import {useRouter} from 'next/dist/client/router'
import {useTheme} from 'next-themes'
import {useDarkModeNeonFlicker} from '@/lib/useDarkModeNeonFlicker'
import {useMounted} from '@/lib/useMounted'

const menuItems = [
  {title: 'Home', href: '/'},
  {title: 'Blog', href: '/blog'},
  {title: 'About', href: '/about'}
]

export const defaultMeta = {
  title: 'Nicklas Jarnesjö',
  description: `Web developer who loves building and learning new things`,
  siteUrl: 'https://jarnesjo.com',
  twitterHandle: '@jarnesjo',
  type: 'site',
  image: {
    src: 'https://jarnesjo.com/static/images/default-sharing.png',
    alt: 'jarnesjo.com written in red on white background',
    width: '1200',
    height: '630'
  }
}

export type PageMeta = {
  title?: string
  description?: string
  type?: string
  image?: {src: string; alt: string; width?: string; height?: string}
}

const DefaultLayout = ({pageMeta, children}: {children: React.ReactNode; pageMeta?: PageMeta}) => {
  const {theme, setTheme} = useTheme()
  const mounted = useMounted()

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
  const toggleMobileMenu = () => {
    setMobileMenuIsOpen(!mobileMenuIsOpen)
  }
  const router = useRouter()
  const [switchSound, setSwitchSound] = useState(null)

  useDarkModeNeonFlicker()

  useEffect(() => {
    setSwitchSound(new Audio('/static/sounds/switch.mp3'))
  }, [])

  const switchToggle = useCallback(() => {
    if (switchSound) {
      switchSound.currentTime = 0
      switchSound.play()
    }

    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, switchSound])

  const meta = {
    ...defaultMeta,
    ...pageMeta
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="image" content={meta.image.src} />

        {/* Facebook */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={`${meta.siteUrl}${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:image" content={meta.image.src} />
        <meta property="og:image:alt" content={meta.image.alt} />
        <meta property="og:image:width" content={meta.image?.width || defaultMeta.image.width} />
        <meta property="og:image:height" content={meta.image?.height || defaultMeta.image.height} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={meta.twitterHandle} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image.src} />
        <meta name="twitter:creator" content={meta.twitterHandle} />

        {/* RSS */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Nicklas Jarnesjö"
          href={`${meta.siteUrl}/feed.xml`}
        />
      </Head>
      <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-8">
        <Link href="#main" className="sr-only">
          skip to main content
        </Link>
        <header className="flex justify-between items-center text-gray-700 dark:text-gray-200 transition-colors duration-200">
          <div>
            <Link href="/" className="flex items-center">
              <div className="rounded-full ring-1 ring-gray-300 dark:ring-gray-100 overflow-hidden w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                <CustomImage
                  src="https://pbs.twimg.com/profile_images/1394579053047320576/FNtexM-b_400x400.jpg"
                  alt="Avatar of Nicklas Jarnesjö"
                  width={400}
                  height={400}
                  quality={100}
                />
              </div>
              <div className="ml-4 font-semibold">Nicklas Jarnesjö</div>
            </Link>
          </div>

          <nav className="flex md:space-x-10">
            <ul className="space-x-10 font-semibold items-center hidden md:flex">
              {menuItems.map(({title, href}, index) => (
                <li key={index}>
                  <Link href={href} className="hover:text-gray-900 dark:hover:text-white neon">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="rounded-full p-2 w-10 h-10 text-red-600 dark:text-gray-200 hover:text-red-700 bg-red-100 hover:bg-red-200 dark:bg-transparent focus:outline-none dark:hover:bg-gray-800 dark:ring-2 dark:ring-gray-800 dark:hover:ring-gray-700 transition-all duration-200"
              onClick={() => switchToggle()}
              aria-label="Toggle dark mode"
            >
              {mounted && (
                <>
                  {theme === 'dark' ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                  )}
                </>
              )}
            </button>
            <button
              className="p-2 rounded-full md:hidden ml-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-800 dark:ring-2 dark:ring-gray-800 dark:hover:ring-gray-700 hover:text-white transition-all duration-200 focus:outline-none dark:focus:ring-gray-400"
              onClick={() => toggleMobileMenu()}
              aria-label="Open mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {/* =========== */}
            {/* Mobile menu */}
            {/* =========== */}
            <Transition
              show={mobileMenuIsOpen}
              enter="transition-all duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              className="bg-black bg-opacity-90 text-white fixed inset-0 z-10"
              as="div"
            >
              <button
                className="absolute right-4 top-8 p-2 bg-black rounded-full"
                onClick={() => toggleMobileMenu()}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Transition.Child
                enter="transition-all duration-500"
                enterFrom="opacity-0 transform translate-y-20"
                enterTo="opacity-100 transform translate-y-0"
                as="ul"
                className="flex items-center justify-center h-full flex-col text-3xl space-y-8"
              >
                {menuItems.map(({title, href}, index) => (
                  <li key={index}>
                    <Link href={href}>{title}</Link>
                  </li>
                ))}
              </Transition.Child>
            </Transition>
          </nav>
        </header>
        <main id="main" className="pb-10 max-w-2xl mx-auto">
          {children}
        </main>
        <footer className="text-gray-500 dark:text-gray-300 text-center mt-10 pb-8 md:mt-16 flex flex-row flex-wrap justify-center">
          {menuItems.map(item => (
            <Link href={item.href} key={item.title} className="p-4 dark:hover:text-gray-400">
              {item.title}
            </Link>
          ))}
          <Link href="/uses" className="p-4 dark:hover:text-gray-400">
            Uses
          </Link>
          <a
            className="p-4 dark:hover:text-gray-400"
            rel="noopener"
            href="https://twitter.com/jarnesjo"
          >
            Twitter
          </a>
          <Link href="/feed.xml" className="p-4 dark:hover:text-gray-400">
            RSS
          </Link>
        </footer>
      </div>
    </>
  )
}

export {DefaultLayout}
