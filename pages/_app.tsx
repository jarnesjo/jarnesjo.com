import '@/css/tailwind.css'
import {useGoogleAnalytics} from '@/lib/googleAnalytics'
import {AppProps} from 'next/app'

export default function App({Component, pageProps}: AppProps) {
  useGoogleAnalytics()

  return <Component {...pageProps} />
}
