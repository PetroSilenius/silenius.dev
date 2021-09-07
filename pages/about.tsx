import Head from 'next/head'
import Image from 'next/image'
import { Box, Heading, Text } from '@chakra-ui/react'

export default function About(): JSX.Element {
  return (
    <>
      <Head>
        <title>About - Petro Silenius</title>
        <meta
          name="description"
          content="🚀 Driving frontend development forward at a B2B SaaS company
        📚 Graduated Master of Technology as a 22-year old"
        />
      </Head>

      <Image
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

      <Box mt="20" align="center">
        <Text>
          🚀 Driving frontend development forward at a B2B SaaS company
        </Text>
        <Text>📚 Graduated Master of Technology as a 22-year old</Text>
      </Box>
    </>
  )
}
