import Head from 'next/head'
import { Box, Heading } from '@chakra-ui/react'
import { ContactForm } from '../components'

export default function About(): JSX.Element {
  return (
    <>
      <Head>
        <title>About - Petro Silenius</title>
        <meta name="description" content="Contact form" />
      </Head>

      <Box>
        <Heading textAlign="center" mb="1.5rem">
          Get in Touch
        </Heading>

        <ContactForm />
      </Box>
    </>
  )
}
