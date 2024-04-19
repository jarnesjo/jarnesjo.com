import '@/css/tailwind.css'
import {useGoogleAnalytics} from '@/lib/googleAnalytics'
import {ThemeProvider} from 'next-themes'
import {AppProps} from 'next/app'

export default function App({Component, pageProps}: AppProps) {
  useGoogleAnalytics()

  return (
    // @ts-ignore
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
