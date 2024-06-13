import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, SimpleGrid } from '@chakra-ui/layout'
import { Heading } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/textarea'
import { ContactReason } from '../components'

export const ContactForm = (): JSX.Element => {
  return (
    <>
      <Heading>Feel free to get in touch</Heading>

      <SimpleGrid
        maxW="md"
        width="full"
        px="5"
        py="2"
        textAlign="center"
        borderWidth="2px"
        shadow="sm"
        borderColor="link"
        borderRadius="md"
      >
        <Box maxW="full" overflow="hidden" padding={6}>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don`&apos;`t fill this out: <input name="bot-field" />
              </label>
            </p>
            <FormControl isRequired mb="1rem">
              <FormLabel fontWeight="bold">First name:</FormLabel>
              <Input name="name" type="text" placeholder="First name" />
            </FormControl>
            <ContactReason />
            <FormControl mb="1rem">
              <FormLabel fontWeight="bold">Message:</FormLabel>
              <Textarea name="message" placeholder="Enter your message here" />
            </FormControl>
            <Button size="lg" mt={4} colorScheme="blue" type="submit">
              Send
            </Button>
          </form>
        </Box>
      </SimpleGrid>
    </>
  )
}
