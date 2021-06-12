import { AppProps } from 'next/app'
import '../styles/globals.css'
import { theme } from '../theme'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeSwitch } from '../components'

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <div className="container">
        <ThemeSwitch />
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  )
}

export default App
