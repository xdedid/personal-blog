import { createContentLoader } from 'vitepress'

export interface KnowledgePost {
  title: string
  url: string
  date: string
  excerpt: string | undefined
  tags: string[]
  category: string
  description: string
}

declare const data: KnowledgePost[]
export { data }

export default createContentLoader('knowledge/*.md', {
  excerpt: true,
  transform(raw): KnowledgePost[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        date: formatDate(frontmatter.date),
        excerpt,
        tags: frontmatter.tags || [],
        category: frontmatter.category || '未分类',
        description: frontmatter.description || ''
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

export function getCategories(posts: KnowledgePost[]): string[] {
  const categories = new Set(posts.map(p => p.category))
  return Array.from(categories).sort()
}

export function getTags(posts: KnowledgePost[]): string[] {
  const tags = new Set(posts.flatMap(p => p.tags))
  return Array.from(tags).sort()
}
