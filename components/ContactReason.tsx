import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { useRadioGroup } from '@chakra-ui/radio'
import { Stack } from '@chakra-ui/react'
import { RadioCard } from '../components'

export const ContactReason = (): JSX.Element => {
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
