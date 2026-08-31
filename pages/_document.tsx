import type { JSX } from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en" suppressHydrationWarning>
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <meta
            name="google-site-verification"
            content="swVloPrga0dFmyC_146kLnCHhaQCcAVnSP3UfNTbzBw"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
