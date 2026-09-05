import type { CSSProperties, JSX } from 'react'
import Image from 'next/image'
import { Card, Reveal, SEO } from '../components'
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import {
  Linkedin,
  GitHub,
  CreditCard,
  AlignCenter,
  AlignLeft,
  Layers,
} from 'react-feather'

const iconStyle = { marginLeft: '10px' }

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

      <SimpleGrid columns={2} gap={6} maxWidth="800px" marginY={8}>
        {links.map(({ href, label, description, Icon }, index) => (
          <Reveal key={href} delay={320 + index * 70}>
            <Card href={href}>
              <Heading as="h2" size="xl" display="flex">
                {label} <Icon className="card-icon" style={iconStyle} />
              </Heading>
              <Text>{description}</Text>
            </Card>
          </Reveal>
        ))}
      </SimpleGrid>
    </>
  )
}
