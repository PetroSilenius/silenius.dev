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
      height="100%"
      gridColumn={gridColumn}
      padding={6}
      borderRadius="lg"
      border="1px solid"
      borderColor="border"
      transition="transform 0.22s var(--ease-out-strong), border-color 0.24s var(--ease-out-strong), box-shadow 0.24s var(--ease-out-strong)"
      _hover={{
        transform: 'translateY(-4px)',
        borderColor: 'link',
        boxShadow: 'md',
      }}
      _focusVisible={{
        transform: 'translateY(-4px)',
        borderColor: 'link',
        boxShadow: 'md',
      }}
      // The press reads as the card settling back down under the cursor.
      _active={{ transform: 'translateY(-1px)' }}
      // Nudges the trailing icon (see `.card-icon`) outward on hover.
      css={{
        '&:hover .card-icon, &:focus-visible .card-icon': {
          transform: 'translateX(4px)',
        },
      }}
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
