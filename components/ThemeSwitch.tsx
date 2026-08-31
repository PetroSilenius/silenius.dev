import type { JSX } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Sun, Moon } from 'react-feather'
import { Button, IconButton, Icon } from '@chakra-ui/react'
import { useColorMode } from './color-mode'

export const ThemeSwitch = (): JSX.Element | null => {
  const { route } = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()

  const IconComponent = colorMode === 'dark' ? Sun : Moon

  if (route === '/cv') {
    return null
  }

  return (
    <aside>
      {route !== '/' && (
        <Button
          asChild
          variant="subtle"
          aria-label="Go back"
          position="absolute"
          top="5"
          left="5"
        >
          <NextLink href="/">&larr;</NextLink>
        </Button>
      )}
      <IconButton
        aria-label={`Toggle ${colorMode === 'dark' ? 'Light' : 'Dark'} mode`}
        onClick={toggleColorMode}
        variant="subtle"
        position="absolute"
        top="5"
        right="5"
      >
        <Icon as={IconComponent} />
      </IconButton>
    </aside>
  )
}
