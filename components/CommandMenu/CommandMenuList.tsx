import { MenuGroup, useColorMode } from '@chakra-ui/react'
import { Command } from 'cmdk'
import {
  AlignCenter,
  Linkedin,
  GitHub,
  CreditCard,
  FileText,
  Home,
  Sun,
  Moon,
} from 'react-feather'
import { CommandMenuItem } from './CommandMenuItem'

export const CommandMenuList = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Command.List>
      <Command.Empty>No results found.</Command.Empty>

      <Command.Group heading={<MenuGroup title="Social media" />}>
        <CommandMenuItem icon={GitHub} href="https://github.com/petrosilenius">
          Github
        </CommandMenuItem>
        <CommandMenuItem
          icon={Linkedin}
          href="https://www.linkedin.com/in/petrosilenius"
        >
          LinkedIn
        </CommandMenuItem>
      </Command.Group>

      <Command.Group heading={<MenuGroup title="Pages" />}>
        <CommandMenuItem icon={FileText} href="/cv">
          Resume
        </CommandMenuItem>
        <CommandMenuItem icon={CreditCard} href="/contact">
          Contact card
        </CommandMenuItem>
        <CommandMenuItem icon={AlignCenter} href="/about">
          About
        </CommandMenuItem>
        <CommandMenuItem icon={Home} href="/">
          Index page
        </CommandMenuItem>
      </Command.Group>

      <Command.Group heading={<MenuGroup title="Actions" />}>
        <CommandMenuItem
          icon={colorMode === 'dark' ? Sun : Moon}
          onClick={toggleColorMode}
        >
          {`Toggle ${colorMode === 'dark' ? 'Light' : 'Dark'} mode`}
        </CommandMenuItem>
      </Command.Group>
    </Command.List>
  )
}
