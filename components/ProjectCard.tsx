import type { JSX } from 'react'
import {
  Badge,
  Box,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ExternalLink, GitHub, Star } from 'react-feather'
import { GITHUB_USER, type Project } from '../lib/github-projects'

interface ProjectCardProps {
  project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps): JSX.Element => {
  const { title, summary, imageUrl, repoUrl, liveUrl, tech, stars } = project
  // Some pins live in an organisation or a collaborator's account, which is
  // worth saying out loud rather than passing the work off as solo.
  const isCollaboration = project.owner !== GITHUB_USER

  return (
    <Box
      as="article"
      borderRadius="lg"
      border="1px solid"
      borderColor="border"
      overflow="hidden"
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={`Screenshot of ${title}`}
          loading="lazy"
          onError={(event) => {
            // A rotten README image link should not leave a broken frame behind.
            event.currentTarget.style.display = 'none'
          }}
          width="100%"
          maxHeight="280px"
          objectFit="cover"
          objectPosition="top"
          borderBottom="1px solid"
          borderColor="border"
        />
      )}

      <Stack gap={3} padding={6}>
        <Heading as="h2" size="xl">
          <Link href={liveUrl ?? repoUrl} target="_blank" rel="noreferrer">
            {title}
          </Link>
        </Heading>

        {isCollaboration && (
          <Text fontSize="sm" color="gray.500">
            {project.fullName}
          </Text>
        )}

        {summary.map((paragraph) => (
          <Text key={paragraph}>{paragraph}</Text>
        ))}

        {tech.length > 0 && (
          <HStack wrap="wrap" gap={2}>
            {tech.map((item) => (
              <Badge key={item} variant="subtle">
                {item}
              </Badge>
            ))}
          </HStack>
        )}

        <HStack wrap="wrap" gap={5} paddingTop={1}>
          <Link href={repoUrl} target="_blank" rel="noreferrer">
            <GitHub size={16} style={{ marginRight: '6px' }} /> Source
          </Link>
          {liveUrl && (
            <Link href={liveUrl} target="_blank" rel="noreferrer">
              <ExternalLink size={16} style={{ marginRight: '6px' }} /> Live
              site
            </Link>
          )}
          {stars > 0 && (
            <Text display="flex" alignItems="center" color="gray.500">
              <Star size={16} style={{ marginRight: '6px' }} /> {stars}
            </Text>
          )}
        </HStack>
      </Stack>
    </Box>
  )
}
