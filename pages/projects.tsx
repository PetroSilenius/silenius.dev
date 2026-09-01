import type { JSX } from 'react'
import { GetStaticProps } from 'next'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { ProjectCard, SEO } from '../components'
import { getProjects, Project } from '../lib/github-projects'

interface ProjectsProps {
  projects: Project[]
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const projects = await getProjects()
  return { props: { projects } }
}

export default function Projects({ projects }: ProjectsProps): JSX.Element {
  return (
    <>
      <SEO
        title="Projects - Petro Silenius"
        description="A showcase of the projects I've pinned on GitHub 🛠"
        path="/projects"
      />

      {/* The layout centers its content, so the auto margin keeps a short list
          of projects anchored to the top of the page. */}
      <Box mt="20" marginBottom="auto" pb="8" maxWidth="3xl" width="full">
        <Stack gap={3} mb="8">
          <Heading as="h1" size="4xl">
            {"Things I've built"}
          </Heading>
          <Text>
            {
              'A showcase of the projects I keep pinned on my GitHub profile. Every description here is written where the code lives, in the README of each repository.'
            }
          </Text>
        </Stack>

        {projects.length > 0 ? (
          <Stack gap={8}>
            {projects.map((project) => (
              <ProjectCard key={project.fullName} project={project} />
            ))}
          </Stack>
        ) : (
          <Text>
            {'The projects are taking a break. Have a look at '}
            <a href="https://github.com/petrosilenius">my GitHub profile</a>
            {' instead.'}
          </Text>
        )}
      </Box>
    </>
  )
}
