import { ColorModeScript, Center } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { theme } from '../theme'

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <meta
            name="google-site-verification"
            content="swVloPrga0dFmyC_146kLnCHhaQCcAVnSP3UfNTbzBw"
          />
        </Head>
        <body>
          <Center as="main" flexDirection="column">
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Main />
            <NextScript />
          </Center>
        </body>
      </Html>
    )
  }
}
