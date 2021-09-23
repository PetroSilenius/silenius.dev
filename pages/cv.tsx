import Head from 'next/head'
import { Box } from '@chakra-ui/react'

export default function Cv(): JSX.Element {
  return (
    <>
      <Head>
        <title>Resume - Petro Silenius</title>
        <meta
          name="description"
          content="Resume describing Petro's experience and education"
        />
      </Head>
      <Box height="100vh" width="100vw">
        <iframe
          src="/Resume-Petro-Silenius.pdf"
          title="Resume - Petro Silenius"
          height="100%"
          width="100%"
        >
          This browser does not support PDFs. Please download the resume to view
          it:
          <a href="/Resume-Petro-Silenius.pdf">Download resume</a>
        </iframe>
      </Box>
    </>
  )
}
