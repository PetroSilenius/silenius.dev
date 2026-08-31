import type { JSX } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { Box, HStack, Heading, Link, Tag, Text } from '@chakra-ui/react'
import {
  getAllLinkedInPostSlugs,
  getLinkedInPostBySlug,
} from '../../lib/linkedin-posts'
import type { LinkedInPost } from '../../lib/linkedin-posts'
import { formatPostDate } from '../../lib/format-date'
import { SITE_URL } from '../../lib/site'

interface LinkedInPostPageProps {
  post: LinkedInPost
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllLinkedInPostSlugs()
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<LinkedInPostPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string
  const post = await getLinkedInPostBySlug(slug)
  if (!post) return { notFound: true }
  return { props: { post } }
}

export default function LinkedInPostPage({
  post,
}: LinkedInPostPageProps): JSX.Element {
  const pageUrl = `${SITE_URL}/linkedin/${post.slug}`
  const description = post.excerpt || post.title

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date || undefined,
    author: {
      '@type': 'Person',
      name: 'Petro Silenius',
      url: SITE_URL,
    },
    url: pageUrl,
    ...(post.url ? { isBasedOn: post.url } : {}),
  }

  return (
    <>
      <Head>
        <title>{post.title} - Petro Silenius</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        {post.date && (
          <meta property="article:published_time" content={post.date} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Box mt="20" maxWidth="700px" width="100%">
        <NextLink href="/linkedin">
          <Text color="link" mb="6">
            ← Back to LinkedIn posts
          </Text>
        </NextLink>

        <Box as="article">
          <Heading as="h1" size="2xl" mb="2">
            {post.title}
          </Heading>

          {post.date && (
            <Text fontSize="sm" color="fg.muted">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            </Text>
          )}

          {post.tags.length > 0 && (
            <HStack mt="3" gap="2" wrap="wrap">
              {post.tags.map((tag) => (
                <Tag.Root key={tag} size="sm">
                  <Tag.Label>{tag}</Tag.Label>
                </Tag.Root>
              ))}
            </HStack>
          )}

          <Box
            mt="8"
            mb="8"
            className="linkedin-post-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {post.url && (
            <Text mb="12">
              <Link href={post.url} target="_blank" rel="noopener noreferrer">
                View the original post on LinkedIn
              </Link>
            </Text>
          )}
        </Box>
      </Box>
    </>
  )
}
