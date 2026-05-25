import type { KnowledgePost } from './knowledge.data'

export function getCategories(posts: KnowledgePost[]): string[] {
  const categories = new Set(posts.map(p => p.category))
  return Array.from(categories).sort()
}

export function getTags(posts: KnowledgePost[]): string[] {
  const tags = new Set(posts.flatMap(p => p.tags))
  return Array.from(tags).sort()
}
