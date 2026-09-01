import type { JSX } from 'react'
import { Box } from '@chakra-ui/react'
import { SEO } from '../components'

export default function Cv(): JSX.Element {
  return (
    <>
      <SEO
        title="Resume - Petro Silenius"
        description="Resume describing Petro's experience and education"
        path="/cv"
      />
      <Box height="100vh" width="100vw">
        <iframe
          src="/Resume-Petro-Silenius.pdf"
          title="Resume - Petro Silenius"
          height="100%"
          width="100%"
        />
      </Box>
    </>
  )
}
