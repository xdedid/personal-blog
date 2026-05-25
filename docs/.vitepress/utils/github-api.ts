const TOKEN_KEY = 'github_pat'

export interface GitHubConfig {
  token: string
  owner: string
  repo: string
  branch: string
}

export interface ApiResult {
  success: boolean
  url?: string
  error?: string
}

export interface FileContent {
  sha: string
  content: string
}

// Token 管理（SSR 安全）

const isBrowser = typeof window !== 'undefined'

export function saveToken(token: string): void {
  if (isBrowser) localStorage.setItem(TOKEN_KEY, token)
}

export function getToken(): string | null {
  return isBrowser ? localStorage.getItem(TOKEN_KEY) : null
}

export function clearToken(): void {
  if (isBrowser) localStorage.removeItem(TOKEN_KEY)
}

// GitHub API

const API_BASE = 'https://api.github.com'

function encodeContent(content: string): string {
  return btoa(unescape(encodeURIComponent(content)))
}

export async function getFileSha(
  config: GitHubConfig,
  path: string
): Promise<string | null> {
  const url = `${API_BASE}/repos/${config.owner}/${config.repo}/contents/${path}?ref=${config.branch}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: 'application/vnd.github.v3+json'
    }
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
  const data = await res.json()
  return data.sha
}

export async function createFile(
  config: GitHubConfig,
  path: string,
  content: string,
  message: string
): Promise<ApiResult> {
  try {
    const existingSha = await getFileSha(config, path)

    const body: Record<string, unknown> = {
      message,
      content: encodeContent(content),
      branch: config.branch
    }
    if (existingSha) body.sha = existingSha

    const url = `${API_BASE}/repos/${config.owner}/${config.repo}/contents/${path}`
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify(body)
    })

    if (res.status === 401) {
      return { success: false, error: 'Token 无效或已过期' }
    }
    if (res.status === 403) {
      return { success: false, error: 'Token 权限不足，需要 repo 写权限' }
    }
    if (res.status === 422) {
      return { success: false, error: '文件已存在且无法更新' }
    }
    if (!res.ok) {
      return { success: false, error: `GitHub API 错误: ${res.status}` }
    }

    const data = await res.json()
    return { success: true, url: data.content.html_url }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : '未知错误'
    }
  }
}

export async function getFileContent(
  config: GitHubConfig,
  path: string
): Promise<FileContent | null> {
  const url = `${API_BASE}/repos/${config.owner}/${config.repo}/contents/${path}?ref=${config.branch}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: 'application/vnd.github.v3+json'
    }
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
  const data = await res.json()
  const decoded = decodeURIComponent(escape(atob(data.content)))
  return { sha: data.sha, content: decoded }
}

export async function deleteFile(
  config: GitHubConfig,
  path: string,
  sha: string,
  message: string
): Promise<ApiResult> {
  try {
    const url = `${API_BASE}/repos/${config.owner}/${config.repo}/contents/${path}`
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({ message, sha, branch: config.branch })
    })

    if (res.status === 401) {
      return { success: false, error: 'Token 无效或已过期' }
    }
    if (res.status === 403) {
      return { success: false, error: 'Token 权限不足，需要 repo 写权限' }
    }
    if (res.status === 404) {
      return { success: false, error: '文件不存在' }
    }
    if (res.status === 422) {
      return { success: false, error: 'SHA 不匹配，文件可能已被修改' }
    }
    if (!res.ok) {
      return { success: false, error: `GitHub API 错误: ${res.status}` }
    }

    const data = await res.json()
    return { success: true, url: data.commit?.html_url }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : '未知错误'
    }
  }
}
