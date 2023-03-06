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
          priority
          src="/header.jpeg"
          width="640"
          height="160"
          alt="Petro Silenius wearing a denim jacket and looks to the future"
        />
      </Box>

      <Box mt="14" textAlign="center">
        <Text fontSize="lg">
          💻 Lead developer @Ruokaboksi
        </Text>
      </Box>
      <Box mt="6" mb="4" maxWidth="xl">
        <Stack spacing={3}>
          <Heading as="h2" size="md">
            {"I'm an enthusiastic developer from Turku, Finland."}
          </Heading>
          <Text>
            {
              "I'm currently working as a Lead developer at "
            }
            <a href="https://ruokaboksi.fi">Ruokaboksi</a>
            {' which is a mealkit subscription platform delivering easy, healthy and delicous meals weekly to your home door 📦'}
          </Text>
          <Text>
            {
              "I graduated as a Master of Technology from University of Turku when I was 22 years old and I'm grateful for the lessons I learned. Especially student activity introduced me to great people and taught me a lot. 🎓 Some of my favourite memories there are from organising a biweekly code club or organising events for hundreds of participants"
            }
          </Text>
          <Text>
            {
              "On my freetime I cycle here and there, most recently I've picked up an eletric fatbike which is awesome during the winter. I'm also known for my scouting background where I worked on different projects such as a 40-person two week all-inclusive camp in Italy. 🚲"
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
