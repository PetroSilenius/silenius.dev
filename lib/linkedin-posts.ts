import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'linkedin')
const POST_EXTENSIONS = ['.md', '.mdx']

export interface LinkedInPostMeta {
  slug: string
  title: string
  date: string
  url: string
  excerpt: string
  tags: string[]
}

export interface LinkedInPost extends LinkedInPostMeta {
  contentHtml: string
}

function getPostFilenames(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) return []
  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((filename) => POST_EXTENSIONS.includes(path.extname(filename)))
}

function readPostFile(filename: string): {
  slug: string
  matterResult: matter.GrayMatterFile<string>
} {
  const slug = filename.replace(/\.mdx?$/, '')
  const fullPath = path.join(POSTS_DIRECTORY, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return { slug, matterResult: matter(fileContents) }
}

function toPostMeta(
  slug: string,
  data: matter.GrayMatterFile<string>['data'],
): LinkedInPostMeta {
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? String(data.date) : '',
    url: data.url ?? '',
    excerpt: data.excerpt ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
  }
}

export function getAllLinkedInPosts(): LinkedInPostMeta[] {
  const posts = getPostFilenames().map((filename) => {
    const { slug, matterResult } = readPostFile(filename)
    return toPostMeta(slug, matterResult.data)
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllLinkedInPostSlugs(): string[] {
  return getPostFilenames().map((filename) => filename.replace(/\.mdx?$/, ''))
}

export async function getLinkedInPostBySlug(
  slug: string,
): Promise<LinkedInPost | null> {
  const filename = getPostFilenames().find(
    (name) => name.replace(/\.mdx?$/, '') === slug,
  )
  if (!filename) return null

  const { matterResult } = readPostFile(filename)
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkHtml)
    .process(matterResult.content)

  return {
    ...toPostMeta(slug, matterResult.data),
    contentHtml: processedContent.toString(),
  }
}
