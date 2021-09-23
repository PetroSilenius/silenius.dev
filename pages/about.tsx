import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import { Box, Heading, Text, Stack } from '@chakra-ui/react'

export default function About(): JSX.Element {
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
          src="/header.jpeg"
          width="640"
          height="160"
          alt="Petro Silenius wearing a denim jacket and looks to the future"
        />
      </Box>

      <Box mt="14" textAlign="center">
        <Text fontSize="lg">
          🚀 Driving frontend development forward at a B2B SaaS company
        </Text>
        <Text fontSize="lg">
          📚 Graduated Master of Technology as a 22-year old
        </Text>
      </Box>
      <Box mt="6" mb="4" maxWidth="xl">
        <Stack spacing={3}>
          <Heading as="h2" size="md">
            {"I'm an enthusiastic frontend developer from Turku, Finland."}
          </Heading>
          <Text>
            {
              "I'm currently working and driving frontend development forward at a SaaS company "
            }
            <a href="https://www.lyyti.com">
              <b>@Lyyti Oy</b>
            </a>
            {'. Some part of my week I tend to spend with my company '}
            <a href="https://www.dataatti.io">
              <b>@Dataatti Oy</b>
            </a>
            {' helping our customers create value to their users.'}
          </Text>
          <Text>
            {
              "I graduated as a Master of Technology from University of Turku when I was 22 years old and I'm grateful for the lessons I learned. Especially student activity introduced me to great people and tought me a lot. 🎓"
            }
          </Text>
          <Text>
            {
              "On my freetime I cycle here and there but also organise a biweekly code club for university students to help them become better developers. I'm also known for my scouting background where I worked on different projects such as a 40-person two week all-inclusive camp in Italy. 🚲"
            }
          </Text>
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
