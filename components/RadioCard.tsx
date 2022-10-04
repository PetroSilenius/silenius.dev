import { Box } from '@chakra-ui/layout'
import { useRadio } from '@chakra-ui/radio'
import { UseRadioProps } from '@chakra-ui/react'

interface RadioCardProps {
  props: UseRadioProps
  children: string
}

export const RadioCard = ({ props, children }: RadioCardProps): JSX.Element => {
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
        {children}
      </Box>
    </Box>
  )
}
