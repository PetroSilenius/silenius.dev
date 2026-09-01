import { parseReadme } from './project-readme'

const GITHUB_USER = 'PetroSilenius'
const PINNED_LIMIT = 6
const README_BRANCHES = ['main', 'master']

// A token is optional: with one the pinned repositories come from the official
// GraphQL API, without one they are read off the public profile page.
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN

// Used when GitHub can't be reached at build time, so a network hiccup shows a
// hand-picked selection instead of an empty page.
const FALLBACK_PINNED = [
  'DigitKoodit/UrhoMatti',
  'PetroSilenius/docsalike',
  'PetroSilenius/accessor',
  'aleksivaisanen/resmeat',
  'PetroSilenius/assist-ukranians',
]

export interface Project {
  fullName: string
  owner: string
  title: string
  summary: string[]
  imageUrl: string | null
  repoUrl: string
  liveUrl: string | null
  tech: string[]
  stars: number
  language: string | null
}

interface RepoRef {
  owner: string
  name: string
}

interface RepoMeta extends RepoRef {
  description: string | null
  homepage: string | null
  language: string | null
  stars: number
  topics: string[]
  defaultBranch: string | null
}

const PINNED_QUERY = `query PinnedRepositories($login: String!, $limit: Int!) {
  user(login: $login) {
    pinnedItems(first: $limit, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          owner {
            login
          }
          description
          homepageUrl
          stargazerCount
          primaryLanguage {
            name
          }
          repositoryTopics(first: 6) {
            nodes {
              topic {
                name
              }
            }
          }
          defaultBranchRef {
            name
          }
        }
      }
    }
  }
}`

interface GraphQlRepository {
  name: string
  owner: { login: string }
  description: string | null
  homepageUrl: string | null
  stargazerCount: number
  primaryLanguage: { name: string } | null
  repositoryTopics: { nodes: { topic: { name: string } }[] }
  defaultBranchRef: { name: string } | null
}

async function fetchPinnedFromApi(): Promise<RepoMeta[] | null> {
  if (!GITHUB_TOKEN) return null

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: PINNED_QUERY,
        variables: { login: GITHUB_USER, limit: PINNED_LIMIT },
      }),
    })
    if (!response.ok) return null

    const body = await response.json()
    const nodes: GraphQlRepository[] =
      body?.data?.user?.pinnedItems?.nodes ?? []
    if (!nodes.length) return null

    return nodes.map((node) => ({
      name: node.name,
      owner: node.owner.login,
      description: node.description,
      homepage: node.homepageUrl,
      language: node.primaryLanguage?.name ?? null,
      stars: node.stargazerCount ?? 0,
      topics: node.repositoryTopics.nodes.map((entry) => entry.topic.name),
      defaultBranch: node.defaultBranchRef?.name ?? null,
    }))
  } catch (error) {
    console.warn(
      'Could not read pinned repositories from the GitHub API',
      error,
    )
    return null
  }
}

/**
 * Pinned repositories are only exposed through the authenticated GraphQL API, so
 * without a token we read the same list off the public profile page. Pins can
 * point at repositories in other accounts, so the owner is read per pin rather
 * than assumed.
 */
async function scrapePinnedRepos(): Promise<RepoRef[]> {
  try {
    const response = await fetch(`https://github.com/${GITHUB_USER}`, {
      headers: { Accept: 'text/html' },
    })
    if (!response.ok) return []

    const html = await response.text()
    const list = html.match(/js-pinned-items-reorder-list([\s\S]*?)<\/ol>/i)
    if (!list) return []

    const links = list[1].matchAll(
      /href="\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)"/g,
    )
    const refs = Array.from(links, (match) => ({
      owner: match[1],
      name: match[2],
    }))

    return dedupeRefs(refs).slice(0, PINNED_LIMIT)
  } catch (error) {
    console.warn(
      'Could not read pinned repositories from the profile page',
      error,
    )
    return []
  }
}

function dedupeRefs(refs: RepoRef[]): RepoRef[] {
  const seen = new Set<string>()
  return refs.filter((ref) => {
    const key = toFullName(ref).toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function toFullName({ owner, name }: RepoRef): string {
  return `${owner}/${name}`
}

function parseFullName(fullName: string): RepoRef {
  const [owner, name] = fullName.split('/')
  return { owner, name }
}

async function fetchRepoMeta(ref: RepoRef): Promise<RepoMeta | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${toFullName(ref)}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
        },
      },
    )
    if (!response.ok) return null

    const repo = await response.json()
    return {
      name: repo.name,
      owner: repo.owner?.login ?? ref.owner,
      description: repo.description ?? null,
      homepage: repo.homepage || null,
      language: repo.language ?? null,
      stars: repo.stargazers_count ?? 0,
      topics: repo.topics ?? [],
      defaultBranch: repo.default_branch ?? null,
    }
  } catch (error) {
    console.warn(
      `Could not read repository details for ${toFullName(ref)}`,
      error,
    )
    return null
  }
}

async function fetchReadme(
  ref: RepoRef,
  defaultBranch: string | null,
): Promise<{ markdown: string; branch: string } | null> {
  const branches = Array.from(
    new Set([defaultBranch, ...README_BRANCHES]),
  ).filter((branch): branch is string => Boolean(branch))

  for (const branch of branches) {
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/${toFullName(ref)}/${branch}/README.md`,
      )
      if (!response.ok) continue
      return { markdown: await response.text(), branch }
    } catch (error) {
      console.warn(`Could not read the README of ${toFullName(ref)}`, error)
    }
  }

  return null
}

function prettifyName(name: string): string {
  const words = name.replace(/[-_.]+/g, ' ').trim()
  return words.charAt(0).toUpperCase() + words.slice(1)
}

async function toProject(meta: RepoMeta): Promise<Project> {
  const readme = await fetchReadme(meta, meta.defaultBranch)
  const content = readme
    ? parseReadme(readme.markdown, {
        owner: meta.owner,
        repo: meta.name,
        branch: readme.branch,
      })
    : null

  const summary = content?.summary.length
    ? content.summary
    : meta.description
      ? [meta.description]
      : []

  const tech = content?.tech.length
    ? content.tech
    : meta.topics.length
      ? meta.topics
      : meta.language
        ? [meta.language]
        : []

  return {
    fullName: toFullName(meta),
    owner: meta.owner,
    title: content?.title ?? prettifyName(meta.name),
    summary,
    imageUrl: content?.imageUrl ?? null,
    repoUrl: `https://github.com/${toFullName(meta)}`,
    liveUrl: content?.liveUrl ?? meta.homepage,
    tech,
    stars: meta.stars,
    language: meta.language,
  }
}

function toMinimalMeta(ref: RepoRef): RepoMeta {
  return {
    ...ref,
    description: null,
    homepage: null,
    language: null,
    stars: 0,
    topics: [],
    defaultBranch: null,
  }
}

async function getPinnedRepos(): Promise<RepoMeta[]> {
  const fromApi = await fetchPinnedFromApi()
  if (fromApi?.length) return fromApi

  const scraped = await scrapePinnedRepos()
  const refs = scraped.length ? scraped : FALLBACK_PINNED.map(parseFullName)

  return Promise.all(
    refs.map(async (ref) => (await fetchRepoMeta(ref)) ?? toMinimalMeta(ref)),
  )
}

/** Reads the pinned repositories and turns each README into showcase copy. */
export async function getProjects(): Promise<Project[]> {
  const repos = await getPinnedRepos()
  return Promise.all(repos.map(toProject))
}

export { GITHUB_USER }
