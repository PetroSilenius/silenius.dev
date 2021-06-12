import Image from 'next/image'
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

interface BusinessCardProps {
  imgSrc: string
  name: string
  title: string
  borderColors: string
}

export const BusinessCard = ({
  imgSrc,
  name,
  title,
  borderColors,
}: BusinessCardProps): JSX.Element => {
  const cardBgColor = useColorModeValue(
    '--chakra-colors-gray-100',
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
          <Image src={imgSrc} width="150" height="150" />
        </Center>
        <Box alignSelf="center">
          <Heading as="h2" size="lg">
            {name}
          </Heading>
          <Text fontSize="lg">{title}</Text>
        </Box>
      </SimpleGrid>
      <style jsx>
        {`
          .business-card {
            background-clip: padding-box;
            background: var(${cardBgColor});
            position: relative;
            border-radius: 15px;
            width: 70vw;
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
            margin: -5px;
            border-radius: inherit;
            background: linear-gradient(149deg, ${borderColors});
          }
        `}
      </style>
    </div>
  )
}
