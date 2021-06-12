import Head from 'next/head'
import Image from 'next/image'
import { Card, Footer } from '../components'
import { Heading, SimpleGrid, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Petro Silenius - Frontend Developer</title>
        <meta
          name="description"
          content="🚀 Driving frontend development forward at a B2B SaaS company
        📚 Graduated Master of Technology as a 22-year old"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Image
          src="/petro.png"
          width="200"
          height="200"
          alt="Petro Silenius wearing a denim jacket and looks to the future"
        />

        <Heading as="h1" size="3xl" className="title">
          Petro <span className="h1-span">Silenius</span>
        </Heading>

        <SimpleGrid columns={2} gap={6} maxWidth="800px" marginY={8}>
          <Card href="/about">
            <Heading as="h2" size="md">
              About &rarr;
            </Heading>
            <Text>Learn more about me and what I've been up to in life.</Text>
          </Card>
          <Card href="/experience">
            <Heading as="h2" size="md">
              Experience &rarr;
            </Heading>
            <Text>Explore my education and work history.</Text>
          </Card>
          <Card href="/examples">
            <Heading as="h2" size="md">
              Examples &rarr;
            </Heading>
            <Text>
              Discover some of my freetime projects and completed courses.
            </Text>
          </Card>
          <Card href="/card">
            <Heading as="h2" size="md">
              Business card &rarr;
            </Heading>
            <Text>
              Check out my business card and generate one for yourself!
            </Text>
          </Card>
        </SimpleGrid>
      </main>

      <Footer />
      <style jsx>
        {`
          .h1-span {
            color: var(--link);
          }

          .h1-span:hover,
          .h1-span:focus,
          .h1-span:active {
            text-decoration: underline;
          }
        `}
      </style>
    </>
  )
}
