import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, SimpleGrid, Stack } from '@chakra-ui/layout'
import { useRadio, useRadioGroup } from '@chakra-ui/radio'
import { Heading } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/textarea'

export const ContactForm = () => {
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

function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()

  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />

      <Box
        {...checkbox}
        display="inline-block"
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        color="gray.700"
        _checked={{
          borderColor: 'link',

          color: 'link',
        }}
        px={4}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  )
}

function ContactReason() {
  const options = [
    'I want to hire you',
    'I want to get to know you',
    'Could you help me out',
  ]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'reason',

    defaultValue: options[0],
  })

  const group = getRootProps()

  return (
    <FormControl as="fieldset" mb="1rem">
      <FormLabel as="legend" fontWeight="bold">
        Reason for contact:
      </FormLabel>
      <Stack {...group} align="start">
        {options.map((value) => {
          const radio = getRadioProps({ value })

          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          )
        })}
      </Stack>
    </FormControl>
  )
}
