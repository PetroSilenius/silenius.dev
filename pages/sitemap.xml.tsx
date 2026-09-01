import { GetServerSideProps } from 'next'
import { getAllPostSlugs } from '../lib/posts'
import { SITE_URL } from '../lib/site'

const STATIC_ROUTES = ['', '/about', '/contact', '/cv', '/posts']

function buildSitemap(urls: string[]): string {
  const urlEntries = urls
    .map((url) => `  <url><loc>${SITE_URL}${url}</loc></url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const postUrls = getAllPostSlugs().map((slug) => `/posts/${slug}`)
  const sitemap = buildSitemap([...STATIC_ROUTES, ...postUrls])

  res.setHeader('Content-Type', 'application/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

export default function Sitemap(): null {
  return null
}
