import type { JSX } from 'react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

interface CardProps {
  href: string
  gridColumn?: string
  children: JSX.Element | JSX.Element[]
}

export const Card = ({
  href,
  gridColumn,
  children,
}: CardProps): JSX.Element => {
  return (
    <Link
      asChild
      tabIndex={0}
      display="block"
      gridColumn={gridColumn}
      padding={6}
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
    >
      <NextLink href={href}>{children}</NextLink>
    </Link>
  )
}
