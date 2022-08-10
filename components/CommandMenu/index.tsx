import {
  Menu,
  MenuDivider,
  MenuList,
  useDisclosure,
  Text,
  Kbd,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalFooter,
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <Command.Dialog open={true}>
        <Menu onClose={onClose} isOpen={isOpen} id="absolute">
          <ModalContent>
            <MenuList w="200%" mt="100%">
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
              <ModalFooter pt={1} pb={0}>
                <Text pr={1}>Navigate to item</Text>
                <Kbd mt="auto">↵</Kbd>
              </ModalFooter>
            </MenuList>
          </ModalContent>
        </Menu>
      </Command.Dialog>
    </Modal>
  )
}
