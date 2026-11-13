import { useEffect, useState } from 'react'
import type { CSSProperties, JSX } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  Linkedin,
  GitHub,
  Send,
  FileText,
  Share2,
  UserPlus,
  Radio,
  Check,
} from 'react-feather'
import { Card, CardButton } from './Card'

interface BusinessCardProps {
  imgSrc: string
  name: string
  title: string
  borderColors: string
  github: string
  linkedin: string
  email: string
  /** Absolute URL the share sheet and NFC tag point at. */
  shareUrl: string
  /** Public path of the vCard offered by "Save contact". */
  vcardHref: string
}

// Web NFC isn't in the TypeScript DOM lib yet; this is the slice we use.
interface NDEFWriter {
  write: (message: {
    records: { recordType: string; data: string }[]
  }) => Promise<void>
}
type NDEFReaderConstructor = new () => NDEFWriter

type Status =
  { kind: 'idle' } | { kind: 'pending' | 'success' | 'error'; text: string }

const socialIconProps = {
  h: 5,
  w: 5,
  transition: 'transform 0.2s var(--ease-out-strong)',
}

export const BusinessCard = ({
  imgSrc,
  name,
  title,
  borderColors,
  github,
  linkedin,
  email,
  shareUrl,
  vcardHref,
}: BusinessCardProps): JSX.Element => {
  const [canWriteNfc, setCanWriteNfc] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  // Feature detection has to wait for the client: the server render can't
  // know what the visitor's browser supports.
  useEffect(() => {
    setCanWriteNfc('NDEFReader' in window)
  }, [])

  useEffect(() => {
    if (status.kind === 'idle' || status.kind === 'pending') return
    const timeout = window.setTimeout(() => setStatus({ kind: 'idle' }), 4000)
    return () => window.clearTimeout(timeout)
  }, [status])

  const handleShare = async (): Promise<void> => {
    const data = {
      title: `${name} – ${title}`,
      text: `${name}, ${title}. Let's connect!`,
      url: shareUrl,
    }

    // The native share sheet is where phones offer AirDrop, Nearby Share and
    // messaging apps, so it's the closest a web page gets to a card tap.
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(data)
      } catch (error) {
        if ((error as DOMException).name !== 'AbortError') {
          setStatus({ kind: 'error', text: "Couldn't open sharing." })
        }
      }
      return
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setStatus({ kind: 'success', text: 'Link copied to clipboard.' })
    } catch {
      setStatus({ kind: 'error', text: `Share this link: ${shareUrl}` })
    }
  }

  const handleWriteNfc = async (): Promise<void> => {
    const Reader = (window as unknown as { NDEFReader: NDEFReaderConstructor })
      .NDEFReader
    try {
      setStatus({ kind: 'pending', text: 'Hold an NFC tag to the phone…' })
      await new Reader().write({
        records: [{ recordType: 'url', data: shareUrl }],
      })
      setStatus({
        kind: 'success',
        text: 'Tag written. Tapping it now opens this card.',
      })
    } catch (error) {
      setStatus({
        kind: 'error',
        text: `Couldn't write the tag: ${(error as Error).message}`,
      })
    }
  }

  return (
    <Stack gap={6} align="center" width="100%" maxWidth="640px" paddingY={16}>
      {/* The gradient is the card's edge; the panel inside sits on top. */}
      <Box
        className="blur-in"
        width="100%"
        padding="6px"
        borderRadius="2xl"
        backgroundImage={`linear-gradient(149deg, ${borderColors})`}
        boxShadow="0 24px 48px -24px rgba(5, 34, 91, 0.45)"
        transition="transform 0.35s var(--ease-out-strong)"
        _hover={{ transform: 'translateY(-6px)' }}
        css={{
          '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
            '&:hover': { transform: 'none' },
          },
        }}
      >
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          align="center"
          gap={{ base: 5, sm: 8 }}
          bg="bg.panel"
          borderRadius="xl"
          paddingX={{ base: 6, sm: 10 }}
          paddingY={{ base: 8, sm: 10 }}
          aspectRatio={{ base: 'auto', sm: '1.75' }}
          textAlign={{ base: 'center', sm: 'left' }}
        >
          <Box
            flexShrink={0}
            width={{ base: '128px', sm: '160px' }}
            borderRadius="full"
            overflow="hidden"
          >
            <Image priority src={imgSrc} width="200" height="200" alt={name} />
          </Box>

          <Stack gap={1} minWidth={0}>
            <Heading as="h1" size={{ base: '2xl', sm: '3xl' }}>
              {name}
            </Heading>
            <Text fontSize="lg" color="fg.muted">
              {title}
            </Text>

            <HStack
              gap={5}
              paddingTop={5}
              justify={{ base: 'center', sm: 'flex-start' }}
              css={{
                '& a:hover svg, & a:focus-visible svg': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Link
                href={`https://www.linkedin.com/in/${linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <Icon as={Linkedin} {...socialIconProps} />
              </Link>
              <Link
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <Icon as={GitHub} {...socialIconProps} />
              </Link>
              <Link
                href={`mailto:${email}?subject=Let's connect!&body=Hey ${name}!%0D%0A%0D%0AI saw your website and would love to connect with you.`}
                aria-label="Send an email"
              >
                <Icon as={Send} {...socialIconProps} />
              </Link>
              <Link asChild aria-label={`${name} resume`}>
                <NextLink href="/cv">
                  <Icon as={FileText} {...socialIconProps} />
                </NextLink>
              </Link>
            </HStack>
          </Stack>
        </Flex>
      </Box>

      <SimpleGrid
        columns={canWriteNfc ? { base: 1, sm: 3 } : 2}
        gap={{ base: 3, md: 4 }}
        width="100%"
        className="rise-in"
        style={{ '--rise-delay': '200ms' } as CSSProperties}
      >
        <CardButton onClick={handleShare}>
          <ActionLabel icon={Share2} label="Share card" />
          <ActionHint>Send it from your phone.</ActionHint>
        </CardButton>
        <Card href={vcardHref} download="Petro-Silenius.vcf">
          <ActionLabel icon={UserPlus} label="Save contact" />
          <ActionHint>Add me to your contacts.</ActionHint>
        </Card>
        {canWriteNfc && (
          <CardButton onClick={handleWriteNfc}>
            <ActionLabel icon={Radio} label="Write NFC tag" />
            <ActionHint>Tap a tag to open this card.</ActionHint>
          </CardButton>
        )}
      </SimpleGrid>

      <Text
        role="status"
        aria-live="polite"
        minHeight="1.5em"
        fontSize="sm"
        color={status.kind === 'error' ? 'fg.error' : 'fg.muted'}
        display="flex"
        alignItems="center"
        gap={2}
      >
        {status.kind !== 'idle' && (
          <>
            {status.kind === 'success' && <Check size={14} />}
            {status.text}
          </>
        )}
      </Text>
    </Stack>
  )
}

// Same type scale as the link cards on the home page.
const ActionLabel = ({
  icon: ActionIcon,
  label,
}: {
  icon: typeof Share2
  label: string
}): JSX.Element => (
  <Heading as="h2" size="md" display="flex" alignItems="center">
    {label}
    <ActionIcon
      className="card-icon"
      style={{ marginLeft: '8px', width: '18px', height: '18px' }}
    />
  </Heading>
)

const ActionHint = ({ children }: { children: string }): JSX.Element => (
  <Text fontSize="sm" color="fg.muted" marginTop={1}>
    {children}
  </Text>
)
