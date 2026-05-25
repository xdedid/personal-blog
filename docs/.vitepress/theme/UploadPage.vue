<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  saveToken,
  getToken,
  clearToken as clearStoredToken,
  createFile
} from '../utils/github-api'
import {
  generateSlug,
  generateFilename,
  generateFullMarkdown,
  getTargetPath,
  type PostFormData
} from '../utils/markdown-helpers'

// Token 管理
const tokenInput = ref('')
const tokenSaved = ref(!!getToken())
const showToken = ref(false)

function handleSaveToken() {
  const t = tokenInput.value.trim()
  if (!t) return
  saveToken(t)
  tokenSaved.value = true
  tokenInput.value = ''
}

function handleClearToken() {
  clearStoredToken()
  tokenSaved.value = false
  tokenInput.value = ''
}

// 表单
const form = ref<PostFormData>({
  title: '',
  category: 'posts',
  tags: [],
  date: new Date().toISOString().slice(0, 10),
  description: '',
  content: '',
  knowledgeCategory: ''
})

// Markdown 预览（简单渲染）
const previewHtml = ref('')
let previewTimer: ReturnType<typeof setTimeout> | null = null

watch(() => form.value.content, (val) => {
  if (previewTimer) clearTimeout(previewTimer)
  previewTimer = setTimeout(() => {
    previewHtml.value = renderMarkdown(val)
  }, 300)
}, { immediate: true })

function renderMarkdown(text: string): string {
  if (!text) return '<p class="preview-placeholder">预览区域</p>'
  let html = text
    // 代码块
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="lang-$1">$2</code></pre>')
    // 行内代码
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 标题
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // 粗体和斜体
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // 链接
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    // 图片
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    // 无序列表
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // 有序列表
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // 引用
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // 分割线
    .replace(/^---$/gm, '<hr />')
    // 段落（连续两个换行）
    .replace(/\n\n/g, '</p><p>')
    // 单换行
    .replace(/\n/g, '<br />')

  return `<p>${html}</p>`
}

// 提交状态
const isSubmitting = ref(false)
const status = ref<{ type: 'success' | 'error'; message: string; url?: string } | null>(null)

// 验证
function validate(): string | null {
  if (!getToken()) return '请先配置 GitHub Token'
  if (!form.value.title.trim()) return '请输入标题'
  if (!form.value.content.trim()) return '请输入内容'
  if (!form.value.date) return '请选择日期'
  if (form.value.category === 'knowledge' && !form.value.knowledgeCategory?.trim()) {
    return '请输入知识库分类'
  }
  return null
}

// 提交
async function handleSubmit() {
  const err = validate()
  if (err) {
    status.value = { type: 'error', message: err }
    return
  }

  isSubmitting.value = true
  status.value = null

  try {
    const token = getToken()!
    const slug = generateSlug(form.value.title)
    const filename = generateFilename(form.value.date, slug)
    const targetPath = getTargetPath(form.value.category, filename)
    const markdown = generateFullMarkdown(form.value)

    const result = await createFile(
      { token, owner: 'xdedid', repo: 'personal-blog', branch: 'main' },
      targetPath,
      markdown,
      `docs: add ${form.value.category === 'posts' ? 'post' : 'knowledge'} '${form.value.title}'`
    )

    if (result.success) {
      status.value = {
        type: 'success',
        message: '文档发布成功！GitHub Actions 将自动部署。',
        url: result.url
      }
      // 重置表单
      form.value.title = ''
      form.value.content = ''
      form.value.description = ''
      form.value.knowledgeCategory = ''
    } else {
      status.value = { type: 'error', message: result.error || '发布失败' }
    }
  } catch (err) {
    status.value = {
      type: 'error',
      message: err instanceof Error ? err.message : '未知错误'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="upload-page">
    <!-- Token 配置 -->
    <section class="upload-card">
      <h2 class="card-title">GitHub Token</h2>
      <p class="card-desc">
        需要一个具有 repo 写权限的 Personal Access Token。
        Token 保存在浏览器本地，仅发送至 GitHub API，请勿在公共电脑上使用。
      </p>
      <div class="token-row">
        <div class="token-input-wrap">
          <input
            v-model="tokenInput"
            :type="showToken ? 'text' : 'password'"
            placeholder="ghp_xxxx 或 github_pat_xxxx"
            class="form-input"
            @keydown.enter="handleSaveToken"
          />
          <button class="icon-btn" @click="showToken = !showToken" :title="showToken ? '隐藏' : '显示'">
            <svg v-if="showToken" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
        <button class="btn btn-primary" @click="handleSaveToken">保存</button>
        <button class="btn btn-ghost" @click="handleClearToken">清除</button>
      </div>
      <p v-if="tokenSaved" class="token-status">Token 已保存</p>
    </section>

    <!-- 文档表单 -->
    <section class="upload-card">
      <h2 class="card-title">发布新文档</h2>

      <!-- 类型选择 -->
      <div class="form-group">
        <label class="form-label">分类类型</label>
        <div class="radio-group">
          <button
            :class="['radio-btn', { active: form.category === 'posts' }]"
            @click="form.category = 'posts'"
          >文章</button>
          <button
            :class="['radio-btn', { active: form.category === 'knowledge' }]"
            @click="form.category = 'knowledge'"
          >知识库</button>
        </div>
      </div>

      <!-- 标题 -->
      <div class="form-group">
        <label class="form-label">标题 *</label>
        <input v-model="form.title" type="text" class="form-input" placeholder="文档标题" />
      </div>

      <!-- 知识库分类 -->
      <div v-if="form.category === 'knowledge'" class="form-group">
        <label class="form-label">知识库分类</label>
        <input v-model="form.knowledgeCategory" type="text" class="form-input" placeholder="如: 前端开发" />
      </div>

      <!-- 日期 -->
      <div class="form-group">
        <label class="form-label">日期</label>
        <input v-model="form.date" type="date" class="form-input" />
      </div>

      <!-- 描述 -->
      <div v-if="form.category === 'knowledge'" class="form-group">
        <label class="form-label">描述</label>
        <input v-model="form.description" type="text" class="form-input" placeholder="简短描述" />
      </div>

      <!-- 编辑器 + 预览 -->
      <div class="form-group editor-group">
        <label class="form-label">内容</label>
        <div class="editor-container">
          <textarea
            v-model="form.content"
            class="editor-pane"
            placeholder="Markdown 内容..."
          ></textarea>
          <div class="preview-pane" v-html="previewHtml"></div>
        </div>
      </div>

      <!-- 提交 -->
      <div class="form-actions">
        <button
          class="btn btn-primary btn-lg"
          @click="handleSubmit"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? '提交中...' : '发布文档' }}
        </button>
      </div>

      <!-- 状态 -->
      <Transition name="status">
        <div v-if="status" :class="['status-msg', status.type]">
          <span>{{ status.message }}</span>
          <a v-if="status.url" :href="status.url" target="_blank" class="status-link">查看提交</a>
        </div>
      </Transition>
    </section>
  </div>
</template>

<style scoped>
.upload-page {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.upload-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 2rem;
}

.card-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 1.35rem;
  font-weight: 600;
  color: #111;
  margin: 0 0 0.5rem 0;
}

.card-desc {
  font-family: 'Source Sans 3', 'Noto Serif SC', sans-serif;
  font-size: 0.875rem;
  color: #555;
  margin: 0 0 1.25rem 0;
  line-height: 1.6;
}

/* Token */
.token-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.token-input-wrap {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.token-input-wrap .form-input {
  padding-right: 2.5rem;
}

.icon-btn {
  position: absolute;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #777;
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.2s;
}

.icon-btn:hover {
  color: #333;
}

.token-status {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.8rem;
  color: #16a34a;
  margin: 0.5rem 0 0 0;
}

/* 表单 */
.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.form-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-family: 'Source Sans 3', 'Noto Serif SC', sans-serif;
  font-size: 0.9rem;
  color: #111;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.form-input::placeholder {
  color: #999;
}

/* 类型选择 */
.radio-group {
  display: flex;
  gap: 0.5rem;
}

.radio-btn {
  font-family: 'Source Sans 3', sans-serif;
  padding: 0.5rem 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background: transparent;
  color: #555;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.radio-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.radio-btn.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}

/* 编辑器 */
.editor-group {
  margin-bottom: 1.5rem;
}

.editor-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  min-height: 400px;
}

.editor-pane {
  width: 100%;
  min-height: 400px;
  padding: 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.7;
  color: #111;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.editor-pane:focus {
  border-color: var(--vp-c-brand-1);
}

.editor-pane::placeholder {
  color: #999;
}

.preview-pane {
  padding: 1rem;
  font-family: 'Source Sans 3', 'Noto Serif SC', sans-serif;
  font-size: 0.9rem;
  line-height: 1.8;
  color: #333;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow-y: auto;
}

.preview-pane :deep(h1),
.preview-pane :deep(h2),
.preview-pane :deep(h3) {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  color: #111;
  margin: 1em 0 0.5em;
}

.preview-pane :deep(h1) { font-size: 1.5em; }
.preview-pane :deep(h2) { font-size: 1.25em; }
.preview-pane :deep(h3) { font-size: 1.1em; }

.preview-pane :deep(code) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85em;
  background: rgba(0, 0, 0, 0.06);
  padding: 0.15em 0.4em;
  border-radius: 4px;
}

.preview-pane :deep(pre) {
  background: rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.preview-pane :deep(pre code) {
  background: none;
  padding: 0;
}

.preview-pane :deep(blockquote) {
  border-left: 3px solid var(--vp-c-brand-1);
  margin: 1em 0;
  padding: 0.5em 1em;
  color: #555;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 0 6px 6px 0;
}

.preview-pane :deep(hr) {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 1.5em 0;
}

.preview-pane :deep(a) {
  color: var(--vp-c-brand-1);
}

.preview-pane :deep(img) {
  max-width: 100%;
  border-radius: 8px;
}

.preview-placeholder {
  color: #999;
  font-style: italic;
}

/* 按钮 */
.btn {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-ghost {
  background: transparent;
  color: #555;
}

.btn-ghost:hover {
  background: rgba(0, 0, 0, 0.06);
  color: #111;
}

.btn-lg {
  padding: 0.75rem 2rem;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

/* 状态消息 */
.status-msg {
  margin-top: 1rem;
  padding: 0.875rem 1.25rem;
  border-radius: 8px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-msg.success {
  background: rgba(22, 163, 74, 0.1);
  border: 1px solid rgba(22, 163, 74, 0.2);
  color: #16a34a;
}

.status-msg.error {
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.2);
  color: #dc2626;
}

.status-link {
  color: inherit;
  text-decoration: underline;
  font-weight: 500;
}

.status-enter-active,
.status-leave-active {
  transition: all 0.3s ease;
}

.status-enter-from,
.status-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* 移动端 */
@media (max-width: 768px) {
  .upload-card {
    padding: 1.25rem;
  }

  .token-row {
    flex-wrap: wrap;
  }

  .token-input-wrap {
    width: 100%;
  }

  .editor-container {
    grid-template-columns: 1fr;
  }

  .editor-pane {
    min-height: 250px;
  }

  .preview-pane {
    min-height: 200px;
  }
}
</style>
