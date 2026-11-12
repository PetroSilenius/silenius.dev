# silenius.dev

My personal website used for introducing myself as well as sharing my socials and resume. The landing page includes direct links to my Github and LinkedIn as well as to an about page and my business card.

A showcase of my pinned GitHub repositories lives at [silenius.dev/projects](https://www.silenius.dev/projects), where each project is described with content pulled from its README at build time.

The business card is also available directly at [silenius.dev/contact](https://www.silenius.dev/contact). On phones its share button opens the native share sheet, "Save contact" downloads a vCard, and on Android Chrome an extra button writes the card's link to an NFC tag.

The business card also links to my resume at [silenius.dev/cv](https://www.silenius.dev/cv).

## Updating the CV

The CV lives in `content/cv.json`, copied over from a LinkedIn "Save to PDF" export. After editing it, regenerate the downloadable PDF from the page:

```bash
yarn dev
```

```bash
yarn cv:pdf
```

The script needs Playwright with Chromium (`npx playwright install chromium`).

## Tech Stack

Built with TypeScript, React and Next.js. The user interface is based on the Chakra-UI component library.

Deployment is done with Netlify utilising Lighthouse, Essential Next.js and A11y plugins

## Visuals

<img src="https://i.imgur.com/mlfh6gm.png" alt="Screenshot of the website" height="400px"/>

## Configuration

The projects page reads the pinned repositories from the GitHub profile page, which needs no configuration. Setting a `GITHUB_TOKEN` environment variable with a token that has public repository read access switches it to the official GraphQL API instead, which also raises the rate limits for the repository details.

## Installation

Clone the repository in your preferred way.

```bash
  cd silenius.dev
  yarn
  yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## License

[MIT](https://choosealicense.com/licenses/mit/)
