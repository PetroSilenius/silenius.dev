import type { JSX } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Card } from '../components'
import { Heading, SimpleGrid, Text } from '@chakra-ui/react'
import {
  Linkedin,
  GitHub,
  CreditCard,
  AlignCenter,
  AlignLeft,
  Layers,
} from 'react-feather'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Petro Silenius - Frontend Developer</title>
        <meta
          name="description"
          content="🚀 Driving frontend development forward at a B2B SaaS company
        📚 Graduated Master of Technology as a 22-year old"
        />
      </Head>

      <Image
        priority
        src="/petro.png"
        width="200"
        height="200"
        alt="Petro Silenius wearing a denim jacket and looks to the future"
      />

      <Heading as="h1" size="5xl" className="title">
        Petro{' '}
        <Text
          as="span"
          color="link"
          _hover={{ textDecoration: 'underline' }}
          _active={{ textDecoration: 'underline' }}
          _focus={{ textDecoration: 'underline' }}
        >
          Silenius
        </Text>
      </Heading>

      <SimpleGrid columns={2} gap={6} maxWidth="800px" marginY={8}>
        <Card href="/about">
          <Heading as="h2" size="xl" display="flex">
            About <AlignCenter style={{ marginLeft: '10px' }} />
          </Heading>
          <Text>Learn more about me.</Text>
        </Card>
        <Card href="https://www.linkedin.com/in/petrosilenius">
          <Heading as="h2" size="xl" display="flex">
            LinkedIn <Linkedin style={{ marginLeft: '10px' }} />
          </Heading>
          <Text>My work and education history.</Text>
        </Card>
        <Card href="https://github.com/petrosilenius">
          <Heading as="h2" size="xl" display="flex">
            GitHub <GitHub style={{ marginLeft: '10px' }} />
          </Heading>
          <Text>My freetime projects and courses.</Text>
        </Card>
        <Card href="/contact">
          <Heading as="h2" size="xl" display="flex">
            Business card <CreditCard style={{ marginLeft: '10px' }} />
          </Heading>
          <Text>Check out my digital business card.</Text>
        </Card>
        <Card href="/posts">
          <Heading as="h2" size="xl" display="flex">
            Posts <AlignLeft style={{ marginLeft: '10px' }} />
          </Heading>
          <Text>Thoughts I share here.</Text>
        </Card>
        <Card href="/projects">
          <Heading as="h2" size="xl" display="flex">
            Projects <Layers style={{ marginLeft: '10px' }} />
          </Heading>
          <Text>Projects pinned on GitHub.</Text>
        </Card>
      </SimpleGrid>
    </>
  )
}
