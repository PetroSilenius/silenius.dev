import Head from 'next/head'
import Image from 'next/image'
import { Heading, Text } from '@chakra-ui/react'

export default function Experience() {
  return (
    <>
      <Head>
        <title>Experience - Petro Silenius</title>
        <meta
          name="description"
          content="🚀 Driving frontend development forward at a B2B SaaS company
        📚 Graduated Master of Technology as a 22-year old"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Heading as="h1">
          Petro <a>Silenius</a>
        </Heading>
        <Image src="/petro.png" width="200" height="200" />
        <Text>Explore my education and work history.</Text>
      </main>
    </>
  )
}
