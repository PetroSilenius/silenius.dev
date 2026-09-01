import type { JSX } from 'react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

interface CardProps {
  href: string
  gridColumn?: string
  children: JSX.Element | JSX.Element[]
}

const isExternalHref = (href: string): boolean => /^https?:\/\//.test(href)

export const Card = ({
  href,
  gridColumn,
  children,
}: CardProps): JSX.Element => {
  const external = isExternalHref(href)

  return (
    <Link
      asChild
      tabIndex={0}
      display="block"
      gridColumn={gridColumn}
      padding={6}
      borderRadius="lg"
      border="1px solid"
      borderColor="border"
    >
      {external ? (
        <NextLink href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </NextLink>
      ) : (
        <NextLink href={href}>{children}</NextLink>
      )}
    </Link>
  )
}
