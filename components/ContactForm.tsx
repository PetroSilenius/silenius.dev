import { FormEventHandler, useRef, useState } from 'react'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, SimpleGrid, Stack } from '@chakra-ui/layout'
import { useRadio, useRadioGroup } from '@chakra-ui/radio'
import { useColorModeValue } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/textarea'

export const ContactForm = (): JSX.Element => {
  const formEl = useRef<HTMLFormElement>(null)

  const [formSuccess, setFormSuccess] = useState<boolean>(false)
  const [formError, setFormError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    if (formEl === null || formEl.current === null) return

    const formData = new FormData(formEl.current)

    setLoading(true)

    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        setFormSuccess(true)
        setFormError(false)
      })
      .catch(() => {
        setFormError(true)
        setFormSuccess(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
            onSubmit={submitHandler}
            ref={formEl}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                For bots only: <input name="bot-field" />
              </label>
            </p>

            <FormControl isRequired mb="1rem">
              <FormLabel fontWeight="bold">First Name:</FormLabel>
              <Input
                name="name"
                type="text"
                placeholder="First Name"
                disabled={formSuccess}
              />
            </FormControl>

            <ContactReasonControl disabled={formSuccess} />

            <FormControl mb="1rem">
              <FormLabel fontWeight="bold">Your Message:</FormLabel>
              <Textarea
                name="message"
                placeholder="Enter your message here"
                rows={4}
                disabled={formSuccess}
              />
            </FormControl>

            <FormControl>
              {formSuccess && (
                <FormHelperText color={'green.500'}>
                  Your message has been sent!
                </FormHelperText>
              )}

              {formError && (
                <FormHelperText color={'red.500'}>
                  Something went wrong, Please try again.
                </FormHelperText>
              )}

              <Button
                size="lg"
                mt={4}
                colorScheme="blue"
                type="submit"
                disabled={loading || formSuccess}
                isLoading={loading}
                loadingText="Sending"
              >
                Send Message
              </Button>
            </FormControl>
          </form>
        </Box>
      </SimpleGrid>
    </>
  )
}

type ContactReasonControlProps = {
  disabled: boolean
}

function ContactReasonControl({ disabled }: ContactReasonControlProps) {
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
    <FormControl as="fieldset" mb="1rem" disabled={disabled}>
      <FormLabel as="legend" fontWeight="bold">
        Reason for contact:
      </FormLabel>
      <Stack {...group} align="start">
        {options.map((value) => {
          const radio = getRadioProps({ value })

          return (
            <RadioOption key={value} {...radio} disabled={disabled}>
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
        cursor={props.disabled ? 'not-allowed' : 'pointer'}
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
