import type { JSX } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { Box, Heading, HStack, Link, Stack, Tag, Text } from '@chakra-ui/react'
import { getAllPosts } from '../../lib/posts'
import type { PostMeta } from '../../lib/posts'
import { formatPostDate } from '../../lib/format-date'
import { SITE_URL } from '../../lib/site'

interface PostsIndexProps {
  posts: PostMeta[]
}

export const getStaticProps: GetStaticProps<PostsIndexProps> = async () => {
  const posts = getAllPosts()
  return { props: { posts } }
}

export default function PostsIndex({ posts }: PostsIndexProps): JSX.Element {
  const description =
    "A searchable archive of Petro Silenius's posts, reposted here for easy reading."

  return (
    <>
      <Head>
        <title>Posts - Petro Silenius</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/posts`} />
        <meta property="og:title" content="Posts - Petro Silenius" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/posts`} />
        <meta property="og:type" content="website" />
      </Head>

      <Box mt="20" maxWidth="700px" width="100%">
        <NextLink href="/">
          <Text color="link" mb="4">
            ← Back to home
          </Text>
        </NextLink>

        <Heading as="h1" size="2xl" mb="3">
          Posts
        </Heading>
        <Text mb="10" color="fg.muted">
          A repost of what I share on{' '}
          <Link
            href="https://www.linkedin.com/in/petrosilenius"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
          , kept here so it stays easy to find and read.
        </Text>

        {posts.length === 0 && (
          <Text color="fg.muted">No posts have been imported yet.</Text>
        )}

        <Stack gap={6} mb="12">
          {posts.map((post) => (
            <Box
              key={post.slug}
              as="article"
              padding={6}
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.200"
            >
              <Link asChild>
                <NextLink href={`/posts/${post.slug}`}>
                  <Heading as="h2" size="lg">
                    {post.title}
                  </Heading>
                </NextLink>
              </Link>

              {post.date && (
                <Text fontSize="sm" color="fg.muted" mt="1">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </Text>
              )}

              {post.excerpt && <Text mt="3">{post.excerpt}</Text>}

              {post.tags.length > 0 && (
                <HStack mt="4" gap="2" wrap="wrap">
                  {post.tags.map((tag) => (
                    <Tag.Root key={tag} size="sm">
                      <Tag.Label>{tag}</Tag.Label>
                    </Tag.Root>
                  ))}
                </HStack>
              )}
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  )
}
