import type { JSX } from 'react'
import { AppProps } from 'next/app'
import { theme } from '../theme'
import { Center, ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from '../components/color-mode'
import { ThemeSwitch } from '../components'

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider value={theme}>
      <ColorModeProvider>
        <Center as="main" minHeight="100vh" px="2" flexDirection="column">
          <ThemeSwitch />
          <Component {...pageProps} />
        </Center>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default App
