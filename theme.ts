import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const fontFamily =
  '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: fontFamily },
        heading: { value: fontFamily },
      },
      colors: {
        link: { value: '#0070f3' },
      },
    },
  },
  globalCss: {
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
    '.post-content': {
      lineHeight: '1.7',
      wordBreak: 'break-word',
    },
    '.post-content p': {
      marginBottom: '1em',
    },
    '.post-content a': {
      textDecoration: 'underline',
    },
  },
})

export const theme = createSystem(defaultConfig, config)
