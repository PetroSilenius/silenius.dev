export interface ReadmeContent {
  title: string | null
  summary: string[]
  imageUrl: string | null
  liveUrl: string | null
  tech: string[]
}

export interface ReadmeSource {
  owner: string
  repo: string
  branch: string
}

// Sections that document how to run a project rather than what it is, so they
// never make it into the showcase copy.
const BOILERPLATE_SECTIONS = [
  'acknowledgements',
  'api reference',
  'available scripts',
  'build',
  'commands',
  'configuration',
  'contributing',
  'deployment',
  'development',
  'development server',
  'environment variables',
  'getting started',
  'how to run',
  'how to use',
  'installation',
  'install',
  'learn more',
  'license',
  'prerequisites',
  'production',
  'roadmap',
  'quick start',
  'requirements',
  'run locally',
  'running',
  'running locally',
  'scripts',
  'setup',
  'testing',
  'tests',
  'usage',
]

const TECH_SECTIONS = [
  'built with',
  'stack',
  'tech',
  'tech stack',
  'technologies',
]

const MEDIA_SECTIONS = [
  'demo',
  'preview',
  'screenshot',
  'screenshots',
  'visuals',
]

// Unmodified starter-template copy says nothing about the project itself.
const TEMPLATE_PATTERNS = [
  /bootstrapped with \[?create[- ]react[- ]app/i,
  /^getting started with create react app$/i,
  /this is an? \[?next\.js\]? project bootstrapped/i,
  /welcome to your .{0,30}template/i,
  /this template is your blank canvas/i,
]

// Lines that only point at the live site, which the card links to anyway.
const CALL_TO_ACTION_PATTERNS = [
  /^available (at|on|in|from)\b/i,
  /^(the )?live (demo|site|version|app)\b/i,
  /^download it (on|from)\b/i,
  /^(you can )?(find|try) it (out )?(at|on|from)\b/i,
]

function isCallToAction(text: string): boolean {
  return CALL_TO_ACTION_PATTERNS.some((pattern) => pattern.test(text))
}

function isTemplateCopy(text: string): boolean {
  return TEMPLATE_PATTERNS.some((pattern) => pattern.test(text))
}

const BADGE_URL_PATTERN =
  /shields\.io|badgen|badge|api\.netlify\.com|travis-ci|circleci|codecov|coveralls/i

const MAX_SUMMARY_PARAGRAPHS = 2
const MAX_SUMMARY_LENGTH = 280
const MAX_TECH_ITEMS = 6
const MAX_TECH_ITEM_LENGTH = 32

interface Section {
  title: string | null
  level: number
  lines: string[]
}

/** Splits the markdown after its title into sections keyed by their heading. */
function splitSections(lines: string[]): Section[] {
  const sections: Section[] = [{ title: null, level: 1, lines: [] }]

  for (const line of lines) {
    const heading = line.match(/^(#{2,6})\s+(.+?)\s*#*$/)
    if (heading) {
      sections.push({
        title: heading[2].toLowerCase().trim(),
        level: heading[1].length,
        lines: [],
      })
      continue
    }
    sections[sections.length - 1].lines.push(line)
  }

  return sections
}

/** Drops fenced code blocks and HTML comments, which never carry showcase copy. */
function stripCodeAndComments(markdown: string): string[] {
  const withoutComments = markdown.replace(/<!--[\s\S]*?-->/g, '')
  const lines: string[] = []
  let insideFence = false

  for (const line of withoutComments.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      insideFence = !insideFence
      continue
    }
    if (!insideFence) lines.push(line)
  }

  return lines
}

function toPlainText(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  const cut = text.slice(0, maxLength)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`
}

/** Groups consecutive non-empty lines into blocks, the markdown notion of a paragraph. */
function toBlocks(lines: string[]): string[] {
  const blocks: string[] = []
  let current: string[] = []

  for (const line of lines) {
    if (line.trim()) {
      current.push(line.trim())
      continue
    }
    if (current.length) blocks.push(current.join(' '))
    current = []
  }
  if (current.length) blocks.push(current.join(' '))

  return blocks
}

function isProseBlock(block: string): boolean {
  if (/^[-*+]\s|^\d+\.\s|^>|^\||^!\[/.test(block)) return false
  // Badge rows and standalone images read as decoration, not description.
  if (!toPlainText(block)) return false
  return true
}

/** Detects blocks that are nothing but a link, e.g. a bolded live-site URL. */
function linkOnlyUrl(block: string): string | null {
  const match = block.match(/^\**\s*\[[^\]]*\]\(\s*([^)\s]+)[^)]*\)\s*\**$/)
  return match?.[1] ?? null
}

function firstLinkUrl(block: string): string | null {
  return block.match(/\[[^\]]*\]\(\s*([^)\s]+)/)?.[1] ?? null
}

function collectListItems(lines: string[]): string[] {
  return lines
    .filter((line) => /^\s*[-*+]\s+/.test(line))
    .map((line) => toPlainText(line.replace(/^\s*[-*+]\s+/, '')))
    .filter(Boolean)
}

function resolveUrl(url: string, source: ReadmeSource): string | null {
  if (/^https?:\/\//i.test(url)) return url
  if (url.startsWith('#') || url.startsWith('mailto:')) return null

  const path = url.replace(/^\.\//, '').replace(/^\//, '')
  const { owner, repo, branch } = source
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`
}

/** Picks the first illustrative image, skipping CI and deploy badges. */
function findImageUrl(lines: string[], source: ReadmeSource): string | null {
  const pattern =
    /!\[[^\]]*\]\(\s*([^)\s]+)[^)]*\)|<img[^>]+src=["']([^"']+)["']/gi

  // Matched against the whole document, since an image tag may wrap onto a
  // second line.
  for (const match of Array.from(lines.join('\n').matchAll(pattern))) {
    const raw = match[1] ?? match[2]
    if (!raw || BADGE_URL_PATTERN.test(raw)) continue
    const resolved = resolveUrl(raw, source)
    if (resolved) return resolved
  }

  return null
}

function findTitle(lines: string[]): {
  title: string | null
  link: string | null
} {
  for (const line of lines) {
    const heading = line.match(/^#\s+(.+?)\s*#*$/)
    if (!heading) continue
    const link = heading[1].match(/\[[^\]]*\]\(\s*([^)\s]+)/)
    return { title: toPlainText(heading[1]) || null, link: link?.[1] ?? null }
  }
  return { title: null, link: null }
}

export function parseReadme(
  markdown: string,
  source: ReadmeSource,
): ReadmeContent {
  const lines = stripCodeAndComments(markdown)
  const { title, link } = findTitle(lines)

  const titleIndex = lines.findIndex((line) => /^#\s+/.test(line))
  const sections = splitSections(
    titleIndex === -1 ? lines : lines.slice(titleIndex + 1),
  )

  const summary: string[] = []
  const tech: string[] = []
  const linkCandidates: string[] = link ? [link] : []

  // A skipped section takes its subsections with it, so the steps under an
  // "Installation" heading stay out of the showcase copy too.
  let skippedLevel: number | null = null

  for (const section of sections) {
    if (skippedLevel !== null && section.level > skippedLevel) continue
    skippedLevel = null

    if (section.title && TECH_SECTIONS.includes(section.title)) {
      tech.push(...collectListItems(section.lines))
      skippedLevel = section.level
      continue
    }
    if (
      section.title &&
      (BOILERPLATE_SECTIONS.includes(section.title) ||
        MEDIA_SECTIONS.includes(section.title))
    ) {
      skippedLevel = section.level
      continue
    }
    if (summary.length >= MAX_SUMMARY_PARAGRAPHS) continue

    for (const block of toBlocks(section.lines)) {
      if (summary.length >= MAX_SUMMARY_PARAGRAPHS) break
      if (!isProseBlock(block)) continue
      const onlyLink = linkOnlyUrl(block)
      if (onlyLink) {
        linkCandidates.push(onlyLink)
        continue
      }
      const text = toPlainText(block)
      if (!text) continue
      // "Available at …" style lines duplicate the live-site link on the card,
      // so the link is kept and the line itself dropped.
      if (isCallToAction(text)) {
        const url = firstLinkUrl(block)
        if (url) linkCandidates.push(url)
        continue
      }
      if (isTemplateCopy(text)) continue
      summary.push(truncate(text, MAX_SUMMARY_LENGTH))
    }
  }

  const liveUrl =
    linkCandidates.find(
      (candidate) =>
        /^https?:\/\//i.test(candidate) &&
        !/^https?:\/\/(www\.)?github\.com/i.test(candidate),
    ) ?? null

  return {
    title: title && !isTemplateCopy(title) ? title : null,
    summary,
    imageUrl: findImageUrl(lines, source),
    liveUrl,
    tech: tech
      .filter((item) => item.length <= MAX_TECH_ITEM_LENGTH)
      .slice(0, MAX_TECH_ITEMS),
  }
}
