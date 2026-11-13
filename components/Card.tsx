import type { JSX } from 'react'
import NextLink from 'next/link'
import { chakra, Link, type HTMLChakraProps } from '@chakra-ui/react'

type CardChildren = JSX.Element | JSX.Element[]

interface CardProps {
  href: string
  gridColumn?: string
  /** Suggested file name; turns the card into a download link. */
  download?: string
  children: CardChildren
}

interface CardButtonProps {
  onClick: () => void
  'aria-label'?: string
  children: CardChildren
}

const isExternalHref = (href: string): boolean => /^https?:\/\//.test(href)

// Shared by links and buttons so every card on the site moves the same way.
const cardStyles: HTMLChakraProps<'a'> = {
  display: 'block',
  height: '100%',
  width: '100%',
  textAlign: 'left',
  padding: { base: 4, md: 5 },
  borderRadius: 'lg',
  border: '1px solid',
  borderColor: 'border',
  cursor: 'pointer',
  transition:
    'transform 0.22s var(--ease-out-strong), border-color 0.24s var(--ease-out-strong), box-shadow 0.24s var(--ease-out-strong)',
  _hover: {
    transform: 'translateY(-4px)',
    borderColor: 'link',
    boxShadow: 'md',
  },
  _focusVisible: {
    transform: 'translateY(-4px)',
    borderColor: 'link',
    boxShadow: 'md',
    outline: 'none',
  },
  // The press reads as the card settling back down under the cursor.
  _active: { transform: 'translateY(-1px)' },
  // Nudges the trailing icon (see `.card-icon`) outward on hover.
  css: {
    '&:hover .card-icon, &:focus-visible .card-icon': {
      transform: 'translateX(4px)',
    },
  },
}

export const Card = ({
  href,
  gridColumn,
  download,
  children,
}: CardProps): JSX.Element => {
  if (download) {
    return (
      <Link
        href={href}
        download={download}
        gridColumn={gridColumn}
        {...cardStyles}
      >
        {children}
      </Link>
    )
  }

  const external = isExternalHref(href)

  return (
    <Link asChild tabIndex={0} gridColumn={gridColumn} {...cardStyles}>
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

/** A card that runs an action instead of navigating. */
export const CardButton = ({
  onClick,
  children,
  ...rest
}: CardButtonProps): JSX.Element => (
  <chakra.button
    type="button"
    onClick={onClick}
    {...(cardStyles as HTMLChakraProps<'button'>)}
    {...rest}
  >
    {children}
  </chakra.button>
)
