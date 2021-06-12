import { Linkedin, GitHub, Send } from 'react-feather'
import { SimpleGrid } from '@chakra-ui/react'

export const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <SimpleGrid
        columns={3}
        width="100%"
        align="center"
        paddingY={3}
        borderTop="1px"
        borderColor="gray.200"
      >
        <a
          href="https://www.linkedin.com/in/petrosilenius/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Linkedin profile"
        >
          <Linkedin />
        </a>
        <a
          href="https://github.com/PetroSilenius"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github profile"
        >
          <GitHub />
        </a>
        <a
          href="mailto:petro.silenius@gmail.com?subject=Let's connect!&body=Hey Petro!%0D%0A%0D%0AI saw your website and would love to connect with you."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Send an email"
        >
          <Send />
        </a>
      </SimpleGrid>

      <style jsx>
        {`
          .footer {
            width: 100vw;
          }
        `}
      </style>
    </footer>
  )
}
