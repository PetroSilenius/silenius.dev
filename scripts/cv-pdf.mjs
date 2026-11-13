// Prints the /cv page into public/Resume-Petro-Silenius.pdf, so the PDF and
// the page always come from the same content/cv.json.
//
//   yarn dev            # in another terminal
//   yarn cv:pdf         # or CV_URL=https://... yarn cv:pdf
//
// Needs Playwright with Chromium: `npx playwright install chromium` once.
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const url = process.env.CV_URL ?? 'http://localhost:3000/cv'
const out = fileURLToPath(
  new URL('../public/Resume-Petro-Silenius.pdf', import.meta.url),
)

let chromium
try {
  // CommonJS resolution also honours NODE_PATH, so a globally installed
  // Playwright works without adding it to the project.
  ;({ chromium } = createRequire(import.meta.url)('playwright'))
} catch {
  console.error(
    'Playwright is missing. Run `npx playwright install chromium` and `yarn add -D playwright`, or `npx -p playwright node scripts/cv-pdf.mjs`.',
  )
  process.exit(1)
}

const browser = await chromium.launch()
const page = await browser.newPage({ colorScheme: 'light' })
// next-themes reads its choice from localStorage; pin light for the print.
await page.addInitScript(() => localStorage.setItem('theme', 'light'))
await page.goto(url, { waitUntil: 'networkidle' })
await page.emulateMedia({ media: 'print' })
await page.pdf({
  path: out,
  format: 'A4',
  printBackground: true,
  margin: { top: '14mm', bottom: '14mm', left: '12mm', right: '12mm' },
})
await browser.close()
console.warn(`Wrote ${out}`)
