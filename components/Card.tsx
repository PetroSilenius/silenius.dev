import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

interface CardProps {
  href: string
  children: JSX.Element | JSX.Element[]
}

export const Card = ({ href, children }: CardProps): JSX.Element => {
  return (
    <NextLink href={href}>
      <Link
        tabIndex={0}
        padding={6}
        borderRadius="lg"
        border="1px"
        borderColor="gray.200"
        _hover={{ color: 'blue.400', borderColor: 'blue.400' }}
        _focus={{ color: 'blue.400', borderColor: 'blue.400' }}
        _active={{ color: 'blue.400', borderColor: 'blue.400' }}
      >
        {children}
      </Link>
    </NextLink>
  )
}
