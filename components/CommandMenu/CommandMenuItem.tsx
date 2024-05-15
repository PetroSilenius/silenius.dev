import { Command } from 'cmdk'
import { Icon, MenuItem } from '@chakra-ui/react'
import NextLink from 'next/link'

interface CommandMenuItemProps {
  icon: any
  href?: string
  onClick?: () => void
  children: JSX.Element | string
}

export const CommandMenuItem = ({
  icon,
  href,
  onClick,
  children,
}: CommandMenuItemProps) => {
  const menuItem = (
    <MenuItem
      onClick={onClick}
      icon={<Icon as={icon} />}
      _hover={{ background: 'gray.600' }}
    >
      {children}
    </MenuItem>
  )

  return (
    <Command.Item>
      {href ? (
        <NextLink href={href} passHref>
          {menuItem}
        </NextLink>
      ) : (
        menuItem
      )}
    </Command.Item>
  )
}
