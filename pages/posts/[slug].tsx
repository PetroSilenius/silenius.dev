import type { CSSProperties, JSX } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { Box, HStack, Heading, Image, Link, Tag, Text } from '@chakra-ui/react'
import { Reveal, SEO } from '../../components'
import { getAllPostSlugs, getPostBySlug } from '../../lib/posts'
import type { Post } from '../../lib/posts'
import { formatPostDate } from '../../lib/format-date'
import { SITE_URL } from '../../lib/site'

interface PostPageProps {
  post: Post
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllPostSlugs()
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string
  const post = await getPostBySlug(slug)
  if (!post) return { notFound: true }
  return { props: { post } }
}

export default function PostPage({ post }: PostPageProps): JSX.Element {
  const pageUrl = `${SITE_URL}/posts/${post.slug}`
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
      <SEO
        title={`${post.title} - Petro Silenius`}
        description={description}
        path={`/posts/${post.slug}`}
        type="article"
      />
      <Head>
        {post.date && (
          <meta property="article:published_time" content={post.date} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Box mt="20" maxWidth="700px" width="100%">
        <NextLink href="/posts">
          <Text color="link" mb="6">
            ← Back to posts
          </Text>
        </NextLink>

        <Box as="article">
          <Heading as="h1" size="2xl" mb="2" className="rise-in">
            {post.title}
          </Heading>

          {post.date && (
            <Text
              fontSize="sm"
              color="fg.muted"
              className="rise-in"
              style={{ '--rise-delay': '110ms' } as CSSProperties}
            >
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            </Text>
          )}

          {post.image && (
            <Image
              className="blur-in"
              src={post.image}
              alt={post.imageAlt || post.title}
              borderRadius="lg"
              mt="6"
              width="100%"
            />
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

          <Reveal mt="8" mb="8" delay={220}>
            <Box
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </Reveal>

          {post.url && (
            <Text mb="12">
              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                color="link"
                textDecoration="underline"
              >
                View the original post on LinkedIn
              </Link>
            </Text>
          )}
        </Box>
      </Box>
    </>
  )
}
