import type { JSX } from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en" suppressHydrationWarning>
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#0070f3" />
          <meta
            name="google-site-verification"
            content="swVloPrga0dFmyC_146kLnCHhaQCcAVnSP3UfNTbzBw"
          />
        </Head>
        <body>
          {/* Marks the document as motion-capable before first paint. The
              scroll-reveal styles hang off this class, so a visitor without
              JavaScript gets the content rather than an empty page. */}
          <script
            dangerouslySetInnerHTML={{
              __html: "document.documentElement.classList.add('js-motion')",
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
