import { AppProps } from 'next/app'
import '../styles/globals.css'
import { theme } from '../theme'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <div className="container">
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  )
}

export default MyApp
