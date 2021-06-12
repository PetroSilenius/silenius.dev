import { Sun, Moon } from 'react-feather'
import { IconButton, Icon, useColorMode } from '@chakra-ui/react'

export const ThemeSwitch = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode()

  const IconComponent = colorMode === 'dark' ? Sun : Moon

  return (
    <IconButton
      aria-label={`Toggle ${colorMode === 'dark' ? 'Light' : 'Dark'} mode`}
      icon={<Icon as={IconComponent} />}
      onClick={toggleColorMode}
      position="absolute"
      top="5"
      right="5"
    />
  )
}
