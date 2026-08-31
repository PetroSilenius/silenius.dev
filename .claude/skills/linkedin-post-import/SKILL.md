---
name: linkedin-post-import
description: Converts a LinkedIn post (pasted text, or fetched from a LinkedIn URL) into a Markdown file under content/linkedin/ for the site's /linkedin blog. Use whenever the user asks to import, repost, add, or sync a LinkedIn post onto the site.
---

# LinkedIn post import

This site reposts the user's LinkedIn posts as indexable pages at `/linkedin`
and `/linkedin/[slug]`. Posts live as Markdown files in `content/linkedin/`
and are read at build time by `lib/linkedin-posts.ts`. This skill turns raw
LinkedIn post content into a correctly formatted file in that directory.

## Getting the source content

The user will usually paste the post text directly into the chat, possibly
along with the post's URL. If they instead give only a LinkedIn URL and no
text, fetch it if a tool for that is available; LinkedIn frequently blocks
scraping and login-walls its content, so if fetching fails, ask the user to
paste the post text instead rather than guessing at it. **Never invent or
paraphrase post content the user hasn't provided** — reformat what they gave
you, don't rewrite it.

## Output location and filename

One file per post, at:

```
content/linkedin/YYYY-MM-DD-slug.md
```

- `YYYY-MM-DD` is the post's publish date. Ask the user if it isn't given or
  evident; if they genuinely don't know, default to today's date.
- `slug` is a short kebab-case phrase (3-6 words) summarizing the post's
  topic, derived from its opening line. Lowercase, hyphen-separated, no
  punctuation. This becomes part of the URL, so keep it readable and unique
  (add `-2`, `-3`, etc. if a file for that date/topic already exists).

## Frontmatter

Every file starts with YAML frontmatter with these fields:

```yaml
---
title: 'Short, human-readable title (~70 chars max)'
date: 'YYYY-MM-DD'
url: 'https://www.linkedin.com/posts/...'
tags: ['tag-one', 'tag-two']
excerpt: 'One or two sentences summarizing the post, used in listings and meta descriptions.'
---
```

- **title**: Use a title the user gives you. Otherwise derive one from the
  post's first sentence or line, trimmed of leading emoji, and shortened to
  roughly 70 characters so it reads well in a browser tab.
- **date**: ISO `YYYY-MM-DD`.
- **url**: The original LinkedIn post's permalink, if the user gave one.
  Leave as an empty string (`''`) if not provided, and mention to the user
  that they can add it later — don't fabricate a URL.
- **tags**: Pull `#hashtags` out of the post body into this array (strip the
  `#`, lowercase them), and remove the trailing hashtag line from the body
  if the post ends with one (LinkedIn posts commonly do). If there are no
  hashtags, use an empty array `[]`.
- **excerpt**: A concise 1-2 sentence summary (roughly under 200 characters),
  usually the post's opening line with emoji stripped. This is shown on the
  `/linkedin` listing page and used as the page's meta description, so it
  should read well out of context.

## Body content

Everything after the frontmatter is the post body, rendered as Markdown.

- **Preserve the original line breaks exactly as pasted.** LinkedIn posts
  rely on single newlines (not blank-line-separated paragraphs) for
  readability. The site's Markdown pipeline (`remark-breaks`) turns single
  newlines into visual line breaks, so do not collapse or merge lines, and
  do not add blank lines between them unless the original post had them.
- Keep emoji as-is.
- Markdown formatting (`**bold**`, lists, links) is supported and rendered,
  but don't add formatting the original post didn't have — just carry over
  the text faithfully.
- If a trailing hashtag line was moved into the `tags` frontmatter field per
  above, you may drop it from the body, or leave it if the user prefers to
  see hashtags inline — ask if unsure.

## Multiple posts at once

If the user pastes several posts in one go (e.g. separated by `---` or
clearly numbered), create one file per post, following the naming and
frontmatter rules above for each.

## After writing the file(s)

- Reuse `content/linkedin/2025-01-15-example-post.md` as a reference for the
  expected shape — check it if unsure about formatting, and feel free to
  delete it once real posts exist.
- Confirm to the user which file(s) were created and remind them the post
  will appear at `/linkedin` and `/linkedin/<slug>` once the site is
  rebuilt/deployed. Don't run the build yourself unless asked.
