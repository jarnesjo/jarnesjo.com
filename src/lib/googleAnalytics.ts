import {useRouter} from 'next/dist/client/router'
import {useEffect} from 'react'

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  })
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({action, category, label, value}: GTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}

export const useGoogleAnalytics = () => {
  const router = useRouter()
  const isProduction = process.env.NODE_ENV === 'production'

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProduction) {
        pageview(url)
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}
