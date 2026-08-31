import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import { Box, Heading, Text, Stack } from '@chakra-ui/react'
import { getProfileBio, ProfileBio } from '../lib/github-readme'

interface AboutProps {
  bio: ProfileBio
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const bio = await getProfileBio()
  return { props: { bio } }
}

export default function About({ bio }: AboutProps): JSX.Element {
  return (
    <>
      <Head>
        <title>About - Petro Silenius</title>
        <meta
          name="description"
          content="Introducing myself to everyone who's interested✌🏻"
        />
      </Head>

      <Box mt="20">
        <Image
          priority
          src="/header.jpeg"
          width="640"
          height="160"
          alt="Petro Silenius wearing a denim jacket and looks to the future"
        />
      </Box>

      <Box mt="14" textAlign="center">
        <Text fontSize="lg">
          💻 {bio.role} @{bio.company}
        </Text>
      </Box>
      <Box mt="6" mb="4" px="4" maxWidth="xl">
        <Stack spacing={3}>
          <Heading as="h2" size="md">
            {bio.heading}
          </Heading>
          {bio.paragraphs.map((paragraph, index) => (
            <Text key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
          <Text>
            {
              "If you're looking to contact me I recommend you to grab my business card from "
            }
            <NextLink href="/contact">
              <a>
                <b>silenius.dev/contact</b>
              </a>
            </NextLink>
            {
              '. And if you wanna research my expertise a bit more before doing that you should check out '
            }
            <NextLink href="/cv">
              <a>
                <b>my CV</b>
              </a>
            </NextLink>
          </Text>
        </Stack>
      </Box>
    </>
  )
}
