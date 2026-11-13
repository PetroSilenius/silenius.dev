import type { CSSProperties, JSX } from 'react'
import Image from 'next/image'
import { Card, Reveal, SEO } from '../components'
import { Box, Flex, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react'
import {
  Linkedin,
  GitHub,
  CreditCard,
  AlignCenter,
  AlignLeft,
  Layers,
  ArrowUpRight,
} from 'react-feather'

const iconStyle = { marginLeft: '8px', width: '18px', height: '18px' }

const links = [
  {
    href: '/about',
    label: 'About',
    description: 'Learn more about me.',
    Icon: AlignCenter,
  },
  {
    href: 'https://www.linkedin.com/in/petrosilenius',
    label: 'LinkedIn',
    description: 'My work and education history.',
    Icon: Linkedin,
  },
  {
    href: 'https://github.com/petrosilenius',
    label: 'GitHub',
    description: 'My code and open source contributions.',
    Icon: GitHub,
  },
  {
    href: '/contact',
    label: 'Business card',
    description: 'Check out my digital business card.',
    Icon: CreditCard,
  },
  {
    href: '/posts',
    label: 'Posts',
    description: "Writing on things I'm learning.",
    Icon: AlignLeft,
  },
  {
    href: '/projects',
    label: 'Projects',
    description: 'A closer look at my favorite projects.',
    Icon: Layers,
  },
]

export default function Home(): JSX.Element {
  return (
    <>
      <SEO
        title="Petro Silenius - CTO"
        description="🚀 Driving technology strategy as CTO at a B2B SaaS company
        📚 Graduated Master of Technology as a 22-year old"
        path=""
      />

      {/* The hero arrives in reading order: portrait, name, then the grid. */}
      <Box className="blur-in">
        <Image
          priority
          src="/petro.png"
          width="200"
          height="200"
          alt="Petro Silenius wearing a denim jacket and looks to the future"
        />
      </Box>

      <Heading
        as="h1"
        size="5xl"
        className="title rise-in"
        style={{ '--rise-delay': '160ms' } as CSSProperties}
      >
        Petro{' '}
        <Text
          as="span"
          color="link"
          position="relative"
          display="inline-block"
          // An underline that sweeps out from the left instead of blinking on.
          _after={{
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: '0.06em',
            width: '100%',
            height: '0.06em',
            background: 'currentColor',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.32s var(--ease-out-strong)',
          }}
          _hover={{ _after: { transform: 'scaleX(1)' } }}
          _active={{ _after: { transform: 'scaleX(1)' } }}
          _focus={{ _after: { transform: 'scaleX(1)' } }}
        >
          Silenius
        </Text>
      </Heading>

      <Reveal delay={320} width="100%" maxWidth="800px" marginTop={8}>
        <HireCard />
      </Reveal>

      <SimpleGrid
        columns={{ base: 2, md: 3 }}
        gap={{ base: 3, md: 4 }}
        width="100%"
        maxWidth="800px"
        marginTop={{ base: 3, md: 4 }}
        marginBottom={8}
      >
        {links.map(({ href, label, description, Icon }, index) => (
          <Reveal key={href} delay={390 + index * 70}>
            <Card href={href}>
              <Heading as="h2" size="md" display="flex" alignItems="center">
                {label} <Icon className="card-icon" style={iconStyle} />
              </Heading>
              <Text fontSize="sm" color="fg.muted" marginTop={1}>
                {description}
              </Text>
            </Card>
          </Reveal>
        ))}
      </SimpleGrid>
    </>
  )
}

/**
 * The one call to action on the page, so it gets a filled gradient instead of
 * the outlined treatment the navigation cards share.
 */
const HireCard = (): JSX.Element => (
  <Link
    href="https://dataatti.io"
    target="_blank"
    rel="noopener noreferrer"
    display="block"
    borderRadius="lg"
    paddingX={{ base: 4, md: 5 }}
    paddingY={{ base: 3, md: 4 }}
    color="white"
    backgroundImage="linear-gradient(135deg, #0070f3 0%, #7b3fe4 100%)"
    boxShadow="0 18px 40px -20px rgba(0, 112, 243, 0.7)"
    transition="transform 0.22s var(--ease-out-strong), box-shadow 0.24s var(--ease-out-strong)"
    _hover={{
      color: 'white',
      transform: 'translateY(-4px)',
      boxShadow: '0 24px 48px -20px rgba(0, 112, 243, 0.85)',
    }}
    _focusVisible={{
      color: 'white',
      transform: 'translateY(-4px)',
      outline: '2px solid',
      outlineColor: 'link',
      outlineOffset: '3px',
    }}
    _active={{ color: 'white', transform: 'translateY(-1px)' }}
    css={{
      '&:hover .card-icon, &:focus-visible .card-icon': {
        transform: 'translate(3px, -3px)',
      },
    }}
  >
    <Flex align="center" justify="space-between" gap={4}>
      <Box>
        <Heading as="h2" size={{ base: 'lg', md: 'xl' }}>
          Hire me through Dataatti
        </Heading>
        <Text fontSize={{ base: 'sm', md: 'md' }} marginTop={1} opacity={0.9}>
          Software, data and AI projects.
        </Text>
      </Box>
      <Flex
        flexShrink={0}
        align="center"
        justify="center"
        boxSize={{ base: 8, md: 10 }}
        borderRadius="full"
        background="whiteAlpha.300"
      >
        <ArrowUpRight className="card-icon" />
      </Flex>
    </Flex>
  </Link>
)
