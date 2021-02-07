import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import {Transition} from '@headlessui/react'
import {useCallback, useEffect, useState} from 'react'

export const siteTitle = 'Nicklas Jarnesjö'
const menuItems = [
  {title: 'Home', href: '/'},
  {title: 'Blog', href: '/blog'},
  {title: 'Stuff', href: '/'},
  {title: 'About', href: '/'}
]

const DefaultLayout = ({children}: {children: React.ReactNode}) => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
  const toggleMobileMenu = () => {
    setMobileMenuIsOpen(!mobileMenuIsOpen)
  }
  const [switchSound, setSwitchSound] = useState(null)
  useEffect(() => {
    setSwitchSound(new Audio('/switch.mp3'))
  }, [])

  const switchToggle = useCallback(() => {
    if (switchSound) {
      switchSound.play()
    }
  }, [switchSound])

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-8">
        <Link href="#main">
          <a className="sr-only">skip to main content</a>
        </Link>
        <header className="flex justify-between items-center text-gray-700">
          <div>
            <Link href="/">
              <a className="flex items-center">
                <div className="rounded-full ring-1 ring-gray-200 overflow-hidden w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                  <Image
                    src="https://pbs.twimg.com/profile_images/1057609789692395522/Zr34NB7E_400x400.jpg"
                    alt=""
                    width={100}
                    height={100}
                    quality={100}
                  />
                </div>
                <div className="ml-4 font-semibold">Nicklas Jarnesjö</div>
              </a>
            </Link>
          </div>

          <nav className="flex md:space-x-10">
            <ul className="space-x-10 font-semibold items-center hidden md:flex">
              {menuItems.map(({title, href}, index) => (
                <li key={index}>
                  <Link href={href}>
                    <a>{title}</a>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="rounded-full p-2 bg-gray-100 hover:bg-red-500 hover:text-white transition-all focus:outline-none outline-none focus:ring-1 focus:ring-red-700"
              onClick={() => switchToggle()}
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </button>
            <button
              className="bg-gray-100 p-2 rounded-full md:hidden ml-6 hover:bg-red-500 hover:text-white transition-all focus:outline-none outline-none focus:ring-1 focus:ring-red-700"
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
              className="bg-black bg-opacity-90 text-white absolute inset-0 z-10"
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
                    <Link href={href}>
                      <a>{title}</a>
                    </Link>
                  </li>
                ))}
              </Transition.Child>
            </Transition>
          </nav>
        </header>
        <main id="main" className="pb-10">
          {children}
        </main>
        <footer className="text-gray-500 text-center mt-10 pb-8 md:mt-16 flex flex-row flex-wrap justify-center">
          {menuItems.map(item => (
            <Link href={item.href} key={item.title}>
              <a className="p-4">{item.title}</a>
            </Link>
          ))}
          <Link href="/uses">
            <a className="p-4">Uses</a>
          </Link>
          <a className="p-4" href="https://twitter.com/jarnesjo">
            Twitter
          </a>
        </footer>
      </div>
    </>
  )
}

export {DefaultLayout}
