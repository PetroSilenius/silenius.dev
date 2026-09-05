import { useRef } from 'react'
import type { JSX } from 'react'
import { flushSync } from 'react-dom'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Sun, Moon } from 'react-feather'
import { Button, IconButton, Icon } from '@chakra-ui/react'
import { useColorMode } from './color-mode'

export const ThemeSwitch = (): JSX.Element | null => {
  const { route } = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const IconComponent = colorMode === 'dark' ? Sun : Moon

  /**
   * Wipes the new theme in as a circle growing out of the button, using the
   * View Transitions API. Browsers without it — and anyone who has asked for
   * reduced motion — get the plain instant swap instead.
   */
  const handleToggle = (): void => {
    const button = buttonRef.current
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (
      !button ||
      prefersReducedMotion ||
      typeof document.startViewTransition !== 'function'
    ) {
      toggleColorMode()
      return
    }

    const { top, left, width, height } = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    // Reach the furthest corner of the viewport, so the circle finishes by
    // covering the page rather than leaving the far edge behind.
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    const transition = document.startViewTransition(() => {
      // The snapshot is taken when this callback returns, so the theme has to
      // land in the DOM synchronously rather than on React's next render.
      flushSync(() => toggleColorMode())
    })

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 520,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      // A transition that gets skipped (a second click mid-wipe) rejects here,
      // and the theme has already changed either way.
      .catch(() => {})
  }

  if (route === '/cv') {
    return null
  }

  return (
    <aside>
      {route !== '/' && (
        <Button
          asChild
          variant="subtle"
          fontSize="md"
          aria-label="Go back"
          position="absolute"
          top="5"
          left="5"
          transition="transform 0.22s var(--ease-out-strong)"
          _hover={{ transform: 'translateX(-3px)' }}
          _active={{ transform: 'translateX(-1px)' }}
        >
          <NextLink href="/">&larr;</NextLink>
        </Button>
      )}
      <IconButton
        ref={buttonRef}
        aria-label={`Toggle ${colorMode === 'dark' ? 'Light' : 'Dark'} mode`}
        onClick={handleToggle}
        variant="subtle"
        position="absolute"
        top="5"
        right="5"
        overflow="hidden"
        transition="transform 0.22s var(--ease-out-strong)"
        _hover={{ transform: 'scale(1.08)' }}
        _active={{ transform: 'scale(0.94)' }}
      >
        {/* Keying on the mode remounts the icon, so it spins into place on
            every toggle rather than swapping glyphs on the spot. */}
        <Icon key={colorMode} as={IconComponent} className="theme-icon" />
      </IconButton>
    </aside>
  )
}
