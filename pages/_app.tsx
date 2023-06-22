import { AppProps } from 'next/app'
import { theme } from '../theme'
import { Center, ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { CommandMenu, ThemeSwitch } from '../components'

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="dark" />
      <Center minHeight="100vh" px="2" flexDirection="column">
        <ThemeSwitch />
        <Component {...pageProps} />
        <CommandMenu />
      </Center>
    </ChakraProvider>
  )
}

export default App
