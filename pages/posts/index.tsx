import type { CSSProperties, JSX } from 'react'
import { GetStaticProps } from 'next'
import NextLink from 'next/link'
import {
  Box,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { Reveal, SEO } from '../../components'
import { getAllPosts } from '../../lib/posts'
import type { PostMeta } from '../../lib/posts'
import { formatPostDate } from '../../lib/format-date'

interface PostsIndexProps {
  posts: PostMeta[]
}

export const getStaticProps: GetStaticProps<PostsIndexProps> = async () => {
  const posts = getAllPosts()
  return { props: { posts } }
}

export default function PostsIndex({ posts }: PostsIndexProps): JSX.Element {
  const description =
    'Posts where I share my thoughts, updates, and lessons learned.'

  return (
    <>
      <SEO
        title="Posts - Petro Silenius"
        description={description}
        path="/posts"
      />

      <Box mt="20" maxWidth="700px" width="100%">
        <Heading as="h1" size="2xl" mb="3" className="rise-in">
          Posts
        </Heading>
        <Text
          mb="10"
          color="fg.muted"
          className="rise-in"
          style={{ '--rise-delay': '120ms' } as CSSProperties}
        >
          Posts where I share my thoughts, updates, and lessons learned — also
          posted on{' '}
          <Link
            href="https://www.linkedin.com/in/petrosilenius"
            target="_blank"
            rel="noopener noreferrer"
            color="link"
            textDecoration="underline"
          >
            LinkedIn
          </Link>
          .
        </Text>

        {posts.length === 0 && (
          <Text color="fg.muted">No posts have been imported yet.</Text>
        )}

        <Stack gap={6} mb="12">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={240 + index * 80}>
              <Box
                as="article"
                padding={6}
                borderRadius="lg"
                border="1px solid"
                borderColor="border"
                transition="transform 0.24s var(--ease-out-strong), border-color 0.24s var(--ease-out-strong), box-shadow 0.24s var(--ease-out-strong)"
                _hover={{
                  transform: 'translateY(-4px)',
                  borderColor: 'link',
                  boxShadow: 'md',
                }}
              >
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    borderRadius="md"
                    mb="4"
                    width="100%"
                    maxHeight="320px"
                    objectFit="cover"
                  />
                )}

                <Link asChild>
                  <NextLink href={`/posts/${post.slug}`}>
                    <Heading as="h2" size="lg">
                      {post.title}
                    </Heading>
                  </NextLink>
                </Link>

                {post.date && (
                  <Text fontSize="sm" color="fg.muted" mt="1">
                    <time dateTime={post.date}>
                      {formatPostDate(post.date)}
                    </time>
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
            </Reveal>
          ))}
        </Stack>
      </Box>
    </>
  )
}
