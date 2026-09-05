import type { JSX } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  Icon,
  Link,
} from '@chakra-ui/react'
import { useColorModeValue } from './color-mode'
import { Linkedin, GitHub, Send, FileText } from 'react-feather'

interface BusinessCardProps {
  imgSrc: string
  name: string
  title: string
  borderColors: string
  github: string
  linkedin: string
  email: string
}

export const BusinessCard = ({
  imgSrc,
  name,
  title,
  borderColors,
  github,
  linkedin,
  email,
}: BusinessCardProps): JSX.Element => {
  const cardBgColor = useColorModeValue(
    '--chakra-colors-white',
    '--chakra-colors-gray-800',
  )

  const iconHoverColor = borderColors.split(', ')[0]

  return (
    <div className="business-card blur-in">
      <SimpleGrid
        columns={2}
        padding={6}
        position="absolute"
        top={0}
        left={0}
        height="100%"
        width="100%"
      >
        <Center>
          <Box w={[100, 150, 200]}>
            <Image priority src={imgSrc} width="200" height="200" alt={name} />
          </Box>
        </Center>
        <Box alignSelf="center">
          <Heading as="h2" size="2xl">
            {name}
          </Heading>
          <Text fontSize="lg">{title}</Text>
          <SimpleGrid columns={4} width="100%" paddingTop={[5, 10]}>
            <Link
              href={`https://www.linkedin.com/in/${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linkedin profile"
              w="fit-content"
            >
              <Icon
                as={Linkedin}
                h="6"
                w="6"
                transition="all 0.2s"
                _hover={{ stroke: iconHoverColor }}
              />
            </Link>
            <Link
              href={`https://github.com/${github}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github profile"
              w="fit-content"
            >
              <Icon
                as={GitHub}
                h="6"
                w="6"
                transition="all 0.2s"
                _hover={{ stroke: iconHoverColor }}
              />
            </Link>
            <Link
              href={`mailto:${email}?subject=Let's connect!&body=Hey ${name}!%0D%0A%0D%0AI saw your website and would love to connect with you.`}
              aria-label="Send an email"
              w="fit-content"
            >
              <Icon
                as={Send}
                h="6"
                w="6"
                transition="all 0.2s"
                _hover={{ stroke: iconHoverColor }}
              />
            </Link>
            <Link asChild aria-label={`${name} resume`} w="fit-content">
              <NextLink href="/cv">
                <Icon
                  as={FileText}
                  h="6"
                  w="6"
                  transition="all 0.2s"
                  _hover={{ stroke: iconHoverColor }}
                />
              </NextLink>
            </Link>
          </SimpleGrid>
        </Box>
      </SimpleGrid>
      <style jsx>
        {`
          .business-card {
            background-clip: padding-box;
            background: var(${cardBgColor});
            position: relative;
            border-radius: 15px;
            width: 90vw;
            max-width: 650px;
            padding-top: 56%;
            transition:
              transform 0.35s var(--ease-out-strong),
              box-shadow 0.35s var(--ease-out-strong);
          }
          /* Picking the card up off the page on hover, the way a real one
             would lift out of a wallet. */
          .business-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 24px 48px -24px rgba(5, 34, 91, 0.35);
          }
          @media (prefers-reduced-motion: reduce) {
            .business-card,
            .business-card:hover {
              transition: none;
              transform: none;
            }
          }
          .business-card:before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            margin: -8px;
            border-radius: inherit;
            background: linear-gradient(149deg, ${borderColors});
          }
        `}
      </style>
    </div>
  )
}
