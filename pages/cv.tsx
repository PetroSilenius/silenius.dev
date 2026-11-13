import type { CSSProperties, JSX, ReactNode } from 'react'
import Image from 'next/image'
import { Box, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Download, GitHub, Globe, Linkedin } from 'react-feather'
import { Card, Reveal, SEO } from '../components'
import cvData from '../content/cv.json'

// Generated from this page by `yarn cv:pdf`.
const CV_PDF_PATH = '/Resume-Petro-Silenius.pdf'

const iconStyle = { marginLeft: '8px', width: '18px', height: '18px' }

const contactIcons: Record<string, typeof Linkedin> = {
  'linkedin.com': Linkedin,
  'github.com': GitHub,
}

const iconFor = (href: string): typeof Linkedin =>
  Object.entries(contactIcons).find(([host]) => href.includes(host))?.[1] ??
  Globe

const formatUpdated = (yearMonth: string): string =>
  new Date(`${yearMonth}-01T00:00:00Z`).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

/** The outlined panel the home page cards use, without the link behaviour. */
const Panel = ({ children }: { children: ReactNode }): JSX.Element => (
  <Box
    className="cv-panel"
    height="100%"
    padding={{ base: 4, md: 5 }}
    borderRadius="lg"
    border="1px solid"
    borderColor="border"
  >
    {children}
  </Box>
)

const Section = ({
  title,
  delay = 0,
  children,
}: {
  title: string
  delay?: number
  children: ReactNode
}): JSX.Element => (
  <Reveal as="section" delay={delay} className="cv-section">
    <Heading as="h2" size="xl" marginBottom={{ base: 3, md: 4 }}>
      {title}
    </Heading>
    {children}
  </Reveal>
)

const Meta = ({ children }: { children: ReactNode }): JSX.Element => (
  <Text fontSize="sm" color="fg.muted">
    {children}
  </Text>
)

export default function CvPage(): JSX.Element {
  const cv = cvData
  const [firstName, ...lastNames] = cv.name.split(' ')

  return (
    <>
      <SEO
        title="Resume - Petro Silenius"
        description="Resume describing Petro's experience and education"
        path="/cv"
      />

      <Stack
        className="cv"
        width="100%"
        maxWidth="800px"
        gap={{ base: 10, md: 12 }}
        paddingTop={{ base: 20, md: 16 }}
        paddingBottom={16}
      >
        {/* Same entrance as the home page: portrait, name, then the rest. */}
        <Flex
          as="header"
          direction="column"
          align="center"
          textAlign="center"
          gap={2}
          className="cv-hero"
        >
          <Box
            className="blur-in cv-photo"
            width={{ base: '128px', md: '160px' }}
            borderRadius="full"
            overflow="hidden"
            marginBottom={2}
          >
            <Image
              priority
              src={cv.photo}
              width="200"
              height="200"
              alt={cv.name}
            />
          </Box>
          <Box
            className="rise-in"
            style={{ '--rise-delay': '160ms' } as CSSProperties}
          >
            <Heading as="h1" size={{ base: '4xl', md: '5xl' }}>
              {firstName}{' '}
              <Text as="span" color="link">
                {lastNames.join(' ')}
              </Text>
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} marginTop={2}>
              {cv.headline}
            </Text>
            <Text color="fg.muted" marginTop={1}>
              {cv.location} · Updated {formatUpdated(cv.updated)}
            </Text>
          </Box>
        </Flex>

        <SimpleGrid
          columns={{ base: 2, md: 4 }}
          gap={{ base: 3, md: 4 }}
          className="cv-links"
        >
          {cv.contact.map(({ name, label, href }, index) => {
            const LinkIcon = iconFor(href)
            return (
              <Reveal key={href} delay={320 + index * 70}>
                <Card href={href}>
                  <Heading
                    as="h2"
                    size="md"
                    display="flex"
                    alignItems="center"
                    className="no-print"
                  >
                    {name}
                    <LinkIcon className="card-icon" style={iconStyle} />
                  </Heading>
                  <Text fontSize="sm" color="fg.muted" marginTop={1} truncate>
                    {label}
                  </Text>
                </Card>
              </Reveal>
            )
          })}
          <Reveal delay={320 + cv.contact.length * 70} className="no-print">
            <Card href={CV_PDF_PATH} download="Resume-Petro-Silenius.pdf">
              <Heading as="h2" size="md" display="flex" alignItems="center">
                Download PDF
                <Download className="card-icon" style={iconStyle} />
              </Heading>
              <Text fontSize="sm" color="fg.muted" marginTop={1}>
                Printable A4 copy.
              </Text>
            </Card>
          </Reveal>
        </SimpleGrid>

        <Section title="Summary">
          <Panel>
            <Stack gap={3}>
              <Stack as="ul" gap={1} paddingStart={5} listStyleType="disc">
                {cv.highlights.map((highlight) => (
                  <Box as="li" key={highlight} fontWeight="medium">
                    {highlight}
                  </Box>
                ))}
              </Stack>
              {cv.summary.map((paragraph) => (
                <Text key={paragraph} lineHeight="tall" color="fg.muted">
                  {paragraph}
                </Text>
              ))}
            </Stack>
          </Panel>
        </Section>

        <Section title="Experience">
          <Stack gap={{ base: 3, md: 4 }}>
            {cv.experience.map(({ company, roles }) => (
              <Panel key={company}>
                <Stack gap={4} className="cv-entry">
                  <Heading as="h3" size="lg">
                    {company}
                  </Heading>
                  {roles.map((role) => (
                    <Stack key={role.title} gap={1} className="cv-role">
                      <Flex justify="space-between" wrap="wrap" columnGap={4}>
                        <Text fontWeight="semibold">{role.title}</Text>
                        <Meta>
                          {role.period} · {role.location}
                        </Meta>
                      </Flex>
                      {'description' in role && role.description && (
                        <Text lineHeight="tall" color="fg.muted">
                          {role.description}
                        </Text>
                      )}
                    </Stack>
                  ))}
                </Stack>
              </Panel>
            ))}
          </Stack>
        </Section>

        <Section title="Education">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 3, md: 4 }}>
            {cv.education.map(({ school, degree, period }) => (
              <Panel key={degree}>
                <Stack gap={1} className="cv-role">
                  <Text fontWeight="semibold">{degree}</Text>
                  <Meta>
                    {school} · {period}
                  </Meta>
                </Stack>
              </Panel>
            ))}
          </SimpleGrid>
        </Section>

        <Section title="Certifications">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 3, md: 4 }}>
            {cv.certifications.map((cert) => (
              <Panel key={cert}>
                <Text fontWeight="semibold">{cert}</Text>
              </Panel>
            ))}
          </SimpleGrid>
        </Section>
      </Stack>
    </>
  )
}
