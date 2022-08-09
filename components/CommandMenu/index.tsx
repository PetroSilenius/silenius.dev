import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Menu,
  MenuDivider,
  useDisclosure,
  Text,
  Kbd,
  Input,
} from '@chakra-ui/react'
import { useRef, useEffect } from 'react'
import { Command } from 'cmdk'
import { useRouter } from 'next/router'
import { CommandMenuList } from './CommandMenuList'

export const CommandMenu = () => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const { isOpen, onToggle, onClose } = useDisclosure()

  // Toggle the menu when ⌘K is pressed
  const down = (e: KeyboardEvent) => {
    if (e.key === 'k' && e.metaKey) {
      onToggle()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', down)
    router.events.on('routeChangeStart', onClose)

    return () => {
      window.removeEventListener('keydown', down)
      router.events.off('routeChangeStart', onClose)
    }
  }, [])

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={inputRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <Command.Dialog open={true}>
        <AlertDialogContent>
          <Menu>
            <Input
              as={Command.Input}
              placeholder="Search"
              ref={inputRef}
              border="none"
              focusBorderColor="transparent"
            />
            <MenuDivider mt={0} />

            <CommandMenuList />

            <MenuDivider mb={0} />
            <AlertDialogFooter pt={1} pb={2}>
              <Text pr={1}>Navigate to item</Text>
              <Kbd mt="auto">↵</Kbd>
            </AlertDialogFooter>
          </Menu>
        </AlertDialogContent>
      </Command.Dialog>
    </AlertDialog>
  )
}
