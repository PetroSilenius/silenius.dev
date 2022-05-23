import Head from 'next/head'
import Image from 'next/image'
import { Card } from '../components'
import { Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { Linkedin, GitHub, CreditCard, AlignCenter } from 'react-feather'

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

      <Heading as="h1" size="3xl" className="title">
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
          <Heading as="h2" size="md" display="flex">
            About <AlignCenter style={{ marginLeft: '10px' }} />
          </Heading>
          <Text>{"Learn more about me and what I've been up to in life."}</Text>
        </Card>
        <Card href="https://www.linkedin.com/in/petrosilenius">
          <Heading as="h2" size="md" display="flex">
            LinkedIn <Linkedin style={{ marginLeft: '10px' }} />
          </Heading>
          <Text>Explore my work, education and volunteering history.</Text>
        </Card>
        <Card href="https://github.com/petrosilenius">
          <Heading as="h2" size="md" display="flex">
            GitHub <GitHub style={{ marginLeft: '10px' }} />
          </Heading>
          <Text>
            Discover some of my freetime projects and completed courses.
          </Text>
        </Card>
        <Card href="/contact">
          <Heading as="h2" size="md" display="flex">
            Business card <CreditCard style={{ marginLeft: '10px' }} />
          </Heading>
          <Text>Check out my business card and generate one for yourself!</Text>
        </Card>
      </SimpleGrid>
    </>
  )
}
