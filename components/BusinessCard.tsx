import Image from 'next/image'
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
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
    '--chakra-colors-gray-800'
  )

  return (
    <div className="business-card">
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
            <Image src={imgSrc} width="200" height="200" />
          </Box>
        </Center>
        <Box alignSelf="center">
          <Heading as="h2" size="lg">
            {name}
          </Heading>
          <Text fontSize="lg">{title}</Text>
          <SimpleGrid columns={4} width="100%" paddingTop={[5, 10]}>
            <a
              href={`https://www.linkedin.com/in/${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linkedin profile"
            >
              <Linkedin />
            </a>
            <a
              href={`https://github.com/${github}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github profile"
            >
              <GitHub />
            </a>
            <a
              href={`mailto:${email}?subject=Let's connect!&body=Hey ${name}!%0D%0A%0D%0AI saw your website and would love to connect with you.`}
              aria-label="Send an email"
            >
              <Send />
            </a>
            <a
              href={`/Resume-Petro-Silenius.pdf`}
              download={`${name} resume`}
              aria-label={`Download ${name} resume`}
            >
              <FileText />
            </a>
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