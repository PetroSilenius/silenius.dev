import type { JSX } from 'react'
import Head from 'next/head'
import { SITE_URL } from '../lib/site'

interface SEOProps {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}

export function SEO({
  title,
  description,
  path,
  image = `${SITE_URL}/petro.png`,
  type = 'website',
}: SEOProps): JSX.Element {
  const url = `${SITE_URL}${path}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}
