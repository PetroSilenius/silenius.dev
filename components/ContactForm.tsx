import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, SimpleGrid, Stack } from '@chakra-ui/layout'
import { useRadio, useRadioGroup } from '@chakra-ui/radio'
import { useColorModeValue } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/textarea'

export const ContactForm = (): JSX.Element => {
  return (
    <>
      <SimpleGrid
        maxW="md"
        width="700px"
        px="5"
        py="2"
        borderWidth="2px"
        shadow="sm"
        borderColor="link"
        borderRadius="md"
        textAlign="right"
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
                For bots only: <input name="bot-field" />
              </label>
            </p>

            <FormControl isRequired mb="1rem">
              <FormLabel fontWeight="bold">First Name:</FormLabel>
              <Input name="name" type="text" placeholder="First Name" />
            </FormControl>

            <ContactReasonControl />

            <FormControl mb="1rem">
              <FormLabel fontWeight="bold">Your Message:</FormLabel>
              <Textarea
                name="message"
                placeholder="Enter your message here"
                rows={4}
              />
            </FormControl>

            <Button size="lg" mt={4} colorScheme="blue" type="submit">
              Send Message
            </Button>
          </form>
        </Box>
      </SimpleGrid>
    </>
  )
}

function ContactReasonControl() {
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
            <RadioOption key={value} {...radio}>
              {value}
            </RadioOption>
          )
        })}
      </Stack>
    </FormControl>
  )
}

function RadioOption(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()

  const checkbox = getCheckboxProps()

  const textColor = useColorModeValue('gray.700', 'gray.400')

  return (
    <Box as="label">
      <input {...input} />

      <Box
        {...checkbox}
        display="inline-block"
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        color={textColor}
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
