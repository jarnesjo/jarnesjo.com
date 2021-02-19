import {GA_TRACKING_ID} from '@/lib/googleAnalytics'
import Document, {Head, Html, Main, NextScript} from 'next/document'

const isProduction = process.env.NODE_ENV === 'production'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
        </Head>
        <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
          <Main />
          <NextScript />
          {isProduction && (
            <>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
        
                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `
                }}
              />
            </>
          )}
        </body>
      </Html>
    )
  }
}
