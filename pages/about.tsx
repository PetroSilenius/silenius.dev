import type { CSSProperties, JSX } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import { Box, Heading, Text, Stack } from '@chakra-ui/react'
import { Reveal, SEO } from '../components'
import { getProfileBio, ProfileBio } from '../lib/github-readme'
import { SITE_URL } from '../lib/site'

interface AboutProps {
  bio: ProfileBio
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const bio = await getProfileBio()
  return { props: { bio } }
}

export default function About({ bio }: AboutProps): JSX.Element {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Petro Silenius',
    url: SITE_URL,
    sameAs: [
      'https://github.com/petrosilenius',
      'https://www.linkedin.com/in/petrosilenius',
    ],
    jobTitle: bio.role,
  }

  return (
    <>
      <SEO
        title="About - Petro Silenius"
        description="Introducing myself to everyone who's interested✌🏻"
        path="/about"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Box mt="20" className="blur-in">
        <Image
          priority
          src="/header.jpeg"
          width="640"
          height="160"
          alt="Petro Silenius wearing a denim jacket and looks to the future"
        />
      </Box>

      <Box
        mt="14"
        textAlign="center"
        className="rise-in"
        style={{ '--rise-delay': '220ms' } as CSSProperties}
      >
        <Text fontSize="lg">
          💻 {bio.role} @{bio.company}
        </Text>
      </Box>
      <Reveal mt="6" mb="4" px="4" maxWidth="xl" delay={320}>
        <Stack gap={3}>
          <Heading as="h2" size="xl">
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
              <b>silenius.dev/contact</b>
            </NextLink>
            {
              '. And if you wanna research my expertise a bit more before doing that you should check out '
            }
            <NextLink href="/cv">
              <b>my CV</b>
            </NextLink>
          </Text>
        </Stack>
      </Reveal>
    </>
  )
}
