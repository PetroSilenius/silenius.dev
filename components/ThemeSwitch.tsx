import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Sun, Moon } from 'react-feather'
import { Button, IconButton, Icon, useColorMode } from '@chakra-ui/react'

export const ThemeSwitch = (): JSX.Element => {
  const { route } = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()

  const IconComponent = colorMode === 'dark' ? Sun : Moon

  return (
    <aside>
      {route !== '/' && (
        <NextLink href="/">
          <Button aria-label="Go back" position="absolute" top="5" left="5">
            &larr;
          </Button>
        </NextLink>
      )}
      <IconButton
        aria-label={`Toggle ${colorMode === 'dark' ? 'Light' : 'Dark'} mode`}
        icon={<Icon as={IconComponent} />}
        onClick={toggleColorMode}
        position="absolute"
        top="5"
        right="5"
      />
    </aside>
  )
}
