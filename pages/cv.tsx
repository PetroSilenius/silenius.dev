import type { JSX, ReactNode } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Download } from 'react-feather'
import { SEO } from '../components'
import cvData from '../content/cv.json'

// Generated from this page by `yarn cv:pdf`.
const CV_PDF_PATH = '/Resume-Petro-Silenius.pdf'

const Section = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}): JSX.Element => (
  <Stack as="section" gap={3} className="cv-section">
    <Heading
      as="h2"
      size="sm"
      textTransform="uppercase"
      letterSpacing="wider"
      color="fg.muted"
    >
      {title}
    </Heading>
    {children}
  </Stack>
)

const formatUpdated = (yearMonth: string): string =>
  new Date(`${yearMonth}-01T00:00:00Z`).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

export default function CvPage(): JSX.Element {
  const cv = cvData

  return (
    <>
      <SEO
        title="Resume - Petro Silenius"
        description="Resume describing Petro's experience and education"
        path="/cv"
      />

      <Box
        className="cv"
        width="100%"
        maxWidth="960px"
        paddingTop={{ base: 20, md: 24 }}
        paddingBottom={16}
        paddingX={{ base: 2, md: 4 }}
      >
        <Flex
          as="header"
          direction={{ base: 'column', sm: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', sm: 'flex-end' }}
          gap={4}
          marginBottom={10}
          className="cv-header"
        >
          <Stack gap={1}>
            <Heading as="h1" size={{ base: '3xl', md: '4xl' }}>
              {cv.name}
            </Heading>
            <Text fontSize="lg">{cv.headline}</Text>
            <Text color="fg.muted">
              {cv.location} · Updated {formatUpdated(cv.updated)}
            </Text>
          </Stack>
          <Button asChild variant="outline" className="no-print">
            <a href={CV_PDF_PATH} download>
              <Download /> Download PDF
            </a>
          </Button>
        </Flex>

        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 10, md: 12 }}
          className="cv-columns"
        >
          <Stack
            as="aside"
            gap={8}
            flexBasis={{ md: '240px' }}
            flexShrink={0}
            className="cv-sidebar"
          >
            <Section title="Contact">
              <Stack gap={1}>
                {cv.contact.map(({ label, href }) => (
                  <Link key={href} href={href} wordBreak="break-word">
                    {label}
                  </Link>
                ))}
              </Stack>
            </Section>
            <Section title="Top skills">
              <Stack as="ul" gap={1} listStyleType="none">
                {cv.skills.map((skill) => (
                  <Box as="li" key={skill}>
                    {skill}
                  </Box>
                ))}
              </Stack>
            </Section>
            <Section title="Certifications">
              <Stack as="ul" gap={1} listStyleType="none">
                {cv.certifications.map((cert) => (
                  <Box as="li" key={cert}>
                    {cert}
                  </Box>
                ))}
              </Stack>
            </Section>
          </Stack>

          <Stack gap={10} flex="1" minWidth={0} className="cv-main">
            <Section title="Summary">
              <Stack as="ul" gap={1} paddingStart={5} listStyleType="disc">
                {cv.highlights.map((highlight) => (
                  <Box as="li" key={highlight}>
                    {highlight}
                  </Box>
                ))}
              </Stack>
              {cv.summary.map((paragraph) => (
                <Text key={paragraph} lineHeight="tall">
                  {paragraph}
                </Text>
              ))}
            </Section>

            <Section title="Experience">
              <Stack gap={8} separator={<Separator />}>
                {cv.experience.map(({ company, roles }) => (
                  <Stack key={company} gap={4} className="cv-entry">
                    <Heading as="h3" size="lg">
                      {company}
                    </Heading>
                    {roles.map((role) => (
                      <Stack key={role.title} gap={1} className="cv-role">
                        <Flex justify="space-between" wrap="wrap" columnGap={4}>
                          <Text fontWeight="semibold">{role.title}</Text>
                          <Text color="fg.muted" fontSize="sm">
                            {role.period} · {role.location}
                          </Text>
                        </Flex>
                        {'description' in role && role.description && (
                          <Text lineHeight="tall">{role.description}</Text>
                        )}
                      </Stack>
                    ))}
                  </Stack>
                ))}
              </Stack>
            </Section>

            <Section title="Education">
              <Stack gap={3}>
                {cv.education.map(({ school, degree, period }) => (
                  <Flex
                    key={degree}
                    justify="space-between"
                    wrap="wrap"
                    columnGap={4}
                    className="cv-role"
                  >
                    <Box>
                      <Text fontWeight="semibold">{degree}</Text>
                      <Text>{school}</Text>
                    </Box>
                    <Text color="fg.muted" fontSize="sm">
                      {period}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Section>
          </Stack>
        </Flex>
      </Box>
    </>
  )
}
