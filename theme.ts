import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const fontFamily =
  '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'

// Every motion rule below folds this in under a reduced-motion query: the
// animation is decoration, so it comes off for visitors who ask for less of it.
const stillness = {
  animation: 'none !important',
  transition: 'none !important',
  opacity: '1 !important',
  transform: 'none !important',
  filter: 'none !important',
}

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
    keyframes: {
      // Content settles upwards into place, the way the hero copy does on
      // sites that stage their entrance instead of popping it in.
      'rise-in': {
        '0%': { opacity: '0', transform: 'translateY(18px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      // The sun/moon glyph spins into place when the theme flips.
      'theme-icon-in': {
        '0%': { opacity: '0', transform: 'rotate(-120deg) scale(0.4)' },
        '100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' },
      },
      // Images earn a softer entrance: they resolve from a blur rather than
      // sliding, which keeps the eye on the subject.
      'blur-in': {
        '0%': {
          opacity: '0',
          filter: 'blur(14px)',
          transform: 'scale(0.96)',
        },
        '100%': {
          opacity: '1',
          filter: 'blur(0)',
          transform: 'scale(1)',
        },
      },
    },
  },
  globalCss: {
    ':root': {
      // One easing for the whole site. Everything that moves shares it, so the
      // page reads as a single system rather than a pile of effects.
      '--ease-out-strong': 'cubic-bezier(0.22, 1, 0.36, 1)',
      '--motion-rise': '18px',
    },
    html: {
      scrollBehavior: 'smooth',
      '@media (prefers-reduced-motion: reduce)': { scrollBehavior: 'auto' },
    },
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

    // Entrance animations for content that is on screen from the first paint.
    // `--rise-delay` staggers siblings so they arrive in reading order.
    '.rise-in': {
      animation: 'rise-in 0.62s var(--ease-out-strong) both',
      animationDelay: 'var(--rise-delay, 0ms)',
      '@media (prefers-reduced-motion: reduce)': stillness,
    },
    '.blur-in': {
      animation: 'blur-in 0.9s var(--ease-out-strong) both',
      animationDelay: 'var(--rise-delay, 0ms)',
      '@media (prefers-reduced-motion: reduce)': stillness,
    },

    '.theme-icon': {
      animation: 'theme-icon-in 0.42s var(--ease-out-strong) both',
      '@media (prefers-reduced-motion: reduce)': stillness,
    },

    // The theme toggle wipes the new colours in as a circle grown from the
    // button (see ThemeSwitch). The default cross-fade is turned off so the
    // clip-path animation is the only thing moving, and the incoming snapshot
    // has to sit on top of the outgoing one for the circle to read.
    '::view-transition-old(root), ::view-transition-new(root)': {
      animation: 'none',
      mixBlendMode: 'normal',
    },
    '::view-transition-old(root)': { zIndex: 1 },
    '::view-transition-new(root)': { zIndex: 2 },

    // Trailing icons inside a card drift outwards when the card is hovered.
    '.card-icon': {
      transition: 'transform 0.22s var(--ease-out-strong)',
      '@media (prefers-reduced-motion: reduce)': stillness,
    },

    // Scroll reveals. The hidden state is scoped to `.js-motion` (set by an
    // inline script in _document) so that without JavaScript the content is
    // simply visible instead of stuck at opacity 0.
    '.js-motion [data-reveal]': {
      opacity: '0',
      transform: 'translateY(var(--motion-rise))',
      filter: 'blur(6px)',
      willChange: 'opacity, transform',
      transition:
        'opacity 0.6s var(--ease-out-strong), transform 0.7s var(--ease-out-strong), filter 0.6s var(--ease-out-strong)',
      transitionDelay: 'var(--rise-delay, 0ms)',
      '@media (prefers-reduced-motion: reduce)': stillness,
    },
    '.js-motion [data-reveal="shown"]': {
      opacity: '1',
      transform: 'none',
      filter: 'none',
      willChange: 'auto',
    },
  },
})

export const theme = createSystem(defaultConfig, config)
