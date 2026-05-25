export interface PostFormData {
  title: string
  category: 'posts' | 'knowledge'
  tags: string[]
  date: string
  description: string
  content: string
  knowledgeCategory?: string
}

// 生成 URL-safe slug，纯中文标题回退到 post-{timestamp}
export function generateSlug(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  if (!slug || slug.replace(/-/g, '').length === 0) {
    const now = new Date()
    const ts = now.getFullYear().toString()
      + String(now.getMonth() + 1).padStart(2, '0')
      + String(now.getDate()).padStart(2, '0')
      + '-'
      + String(now.getHours()).padStart(2, '0')
      + String(now.getMinutes()).padStart(2, '0')
      + String(now.getSeconds()).padStart(2, '0')
    return `post-${ts}`
  }

  return slug
}

export function generateFilename(date: string, slug: string): string {
  return `${date}-${slug}.md`
}

export function generateFrontmatter(data: PostFormData): string {
  const lines: string[] = ['---']
  lines.push(`title: "${data.title}"`)
  lines.push(`date: ${data.date}`)

  if (data.category === 'posts') {
    if (data.tags.length > 0) {
      lines.push(`tags: [${data.tags.map(t => `"${t}"`).join(', ')}]`)
    }
    lines.push(`categories: ["未分类"]`)
  } else {
    lines.push(`category: ${data.knowledgeCategory || '未分类'}`)
    if (data.tags.length > 0) {
      lines.push(`tags: [${data.tags.map(t => `"${t}"`).join(', ')}]`)
    }
    if (data.description) {
      lines.push(`description: "${data.description}"`)
    }
  }

  lines.push('---')
  return lines.join('\n')
}

export function generateFullMarkdown(data: PostFormData): string {
  const frontmatter = generateFrontmatter(data)
  return `${frontmatter}\n\n${data.content}\n`
}

export function getTargetPath(
  category: 'posts' | 'knowledge',
  filename: string
): string {
  return `docs/${category}/${filename}`
}
