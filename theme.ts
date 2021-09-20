import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
    heading:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
  },
  colors: {
    link: '#0070f3',
  },
  styles: {
    global: () => ({
      a: { textDecoration: 'none' },
      'a:hover': {
        color: 'link',
        borderColor: 'link',
        textDecoration: 'none !important',
      },
      'a:focus': {
        color: 'link',
        borderColor: 'link',
      },
      'a:active': {
        color: 'link',
        borderColor: 'link',
      },
    }),
  },
  initialColorMode: 'dark',
  useSystemColorMode: true,
})
