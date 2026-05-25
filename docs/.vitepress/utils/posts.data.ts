import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  path: string
  date: string
  excerpt: string | undefined
  tags: string[]
  categories: string[]
}

declare const data: Post[]
export { data }

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url: `/personal-blog${url}`,
        path: `docs${url}.md`,
        date: formatDate(frontmatter.date),
        excerpt,
        tags: frontmatter.tags || [],
        categories: frontmatter.categories || []
      }))
      .sort((a, b) => b.date.localeCompare(a.date))
  }
})

function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
