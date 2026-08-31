const README_URL =
  'https://raw.githubusercontent.com/PetroSilenius/PetroSilenius/master/README.md'

export interface ProfileBio {
  heading: string
  role: string
  company: string
  paragraphs: string[]
}

// Used if the GitHub fetch fails at build time, so a network hiccup never breaks the build.
const FALLBACK_BIO: ProfileBio = {
  heading: "I'm an enthusiastic developer from Turku, Finland.",
  role: 'Lead developer',
  company: 'Ruokaboksi',
  paragraphs: [
    'I\'m currently working as a Lead developer at <a href="https://ruokaboksi.fi">Ruokaboksi</a> which is a mealkit subscription platform delivering easy, healthy and delicous meals weekly to your home door 📦',
    "I graduated as a Master of Technology from University of Turku when I was 22 years old and I'm grateful for the lessons I learned. Especially student activity introduced me to great people and taught me a lot. 🎓 Some of my favourite memories there are from organising a biweekly code club or organising events for hundreds of participants",
    "On my freetime I cycle here and there, most recently I've picked up an eletric fatbike which is awesome during the winter. I'm also known for my scouting background where I worked on different projects such as a 40-person two week all-inclusive camp in Italy. 🚲",
  ],
}

export function parseProfileBio(markdown: string): ProfileBio | null {
  const headingMatch = markdown.match(/<h3>\s*<b>([\s\S]*?)<\/b>\s*<\/h3>/i)
  const bodyMatch = markdown.match(/<p>([\s\S]*?)<\/p>/i)
  if (!headingMatch || !bodyMatch) return null

  const paragraphs = bodyMatch[1]
    .split(/\n\s*\n/)
    .map((paragraph) =>
      paragraph
        .replace(/<img[^>]*>/gi, '')
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .filter(Boolean)

  if (paragraphs.length < 2) return null

  // The README's last paragraph is a contact/CV call-to-action aimed at GitHub
  // visitors; the site renders its own CTA with in-app links instead.
  const bioParagraphs = paragraphs.slice(0, -1)

  const roleMatch = bioParagraphs[0]?.match(
    /working as (?:a |an )?([^<]+?) at <a[^>]*>([^<]+)<\/a>/i,
  )

  return {
    heading: headingMatch[1].trim(),
    role: roleMatch?.[1]?.trim() ?? FALLBACK_BIO.role,
    company: roleMatch?.[2]?.trim() ?? FALLBACK_BIO.company,
    paragraphs: bioParagraphs,
  }
}

export async function getProfileBio(): Promise<ProfileBio> {
  try {
    const response = await fetch(README_URL)
    if (!response.ok) return FALLBACK_BIO
    const markdown = await response.text()
    return parseProfileBio(markdown) ?? FALLBACK_BIO
  } catch {
    return FALLBACK_BIO
  }
}
