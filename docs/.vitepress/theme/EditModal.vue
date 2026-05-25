<script setup lang="ts">
import { ref, watch } from 'vue'
import { getFileContent, createFile, getToken } from '../utils/github-api'
import { parseFrontmatter, generateFrontmatter } from '../utils/markdown-helpers'

interface PostItem {
  title: string
  path: string
  date: string
  tags: string[]
  categories?: string[]
  category?: string
  description?: string
}

const props = defineProps<{
  post: PostItem
  postType: 'posts' | 'knowledge'
}>()

const emit = defineEmits<{
  close: []
  updated: []
}>()

const isLoading = ref(false)
const isSaving = ref(false)
const error = ref('')
const body = ref('')

const title = ref('')
const date = ref('')
const tags = ref('')
const categories = ref('')
const description = ref('')

watch(() => props.post, async (post) => {
  if (!post) return
  title.value = post.title
  date.value = post.date ? post.date.replace(/\//g, '-') : ''
  tags.value = post.tags.join(', ')
  categories.value = post.categories?.join(', ') || ''
  description.value = post.description || ''

  isLoading.value = true
  error.value = ''
  try {
    const token = getToken()
    if (!token) {
      error.value = '请先在发布页面配置 GitHub Token'
      return
    }
    const config = { token, owner: 'xdedid', repo: 'personal-blog', branch: 'main' }
    const file = await getFileContent(config, post.path)
    if (!file) {
      error.value = '无法读取文件内容'
      return
    }
    const { body: parsedBody } = parseFrontmatter(file.content)
    body.value = parsedBody
  } catch (e) {
    error.value = e instanceof Error ? e.message : '读取文件失败'
  } finally {
    isLoading.value = false
  }
}, { immediate: true })

async function handleSave() {
  if (!title.value.trim()) {
    error.value = '标题不能为空'
    return
  }

  isSaving.value = true
  error.value = ''

  try {
    const token = getToken()
    if (!token) {
      error.value = '请先在发布页面配置 GitHub Token'
      return
    }

    const parsedTags = tags.value
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    const parsedCategories = categories.value
      .split(',')
      .map(c => c.trim())
      .filter(Boolean)

    const formData = {
      title: title.value.trim(),
      category: props.postType,
      tags: parsedTags,
      date: date.value,
      description: description.value.trim(),
      content: body.value,
      knowledgeCategory: categories.value.trim() || '未分类'
    }

    const frontmatter = generateFrontmatter(formData)
    const fullContent = `${frontmatter}\n\n${body.value}\n`

    const config = { token, owner: 'xdedid', repo: 'personal-blog', branch: 'main' }
    const result = await createFile(
      config,
      props.post.path,
      fullContent,
      `docs: update '${title.value.trim()}'`
    )

    if (result.success) {
      emit('updated')
    } else {
      error.value = result.error || '更新失败'
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : '未知错误'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="emit('close')">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">编辑文档</h3>
          <button class="close-btn" @click="emit('close')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <div v-if="isLoading" class="modal-loading">加载中...</div>

        <template v-else>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">标题</label>
              <input v-model="title" type="text" class="form-input" />
            </div>

            <div class="form-group">
              <label class="form-label">日期</label>
              <input v-model="date" type="date" class="form-input" />
            </div>

            <div class="form-group">
              <label class="form-label">标签（逗号分隔）</label>
              <input v-model="tags" type="text" class="form-input" placeholder="标签1, 标签2" />
            </div>

            <div v-if="postType === 'posts'" class="form-group">
              <label class="form-label">分类（逗号分隔）</label>
              <input v-model="categories" type="text" class="form-input" placeholder="分类1, 分类2" />
            </div>

            <div v-if="postType === 'knowledge'" class="form-group">
              <label class="form-label">分类</label>
              <input v-model="categories" type="text" class="form-input" placeholder="分类名称" />
            </div>

            <div v-if="postType === 'knowledge'" class="form-group">
              <label class="form-label">描述</label>
              <input v-model="description" type="text" class="form-input" placeholder="简短描述" />
            </div>
          </div>

          <div v-if="error" class="modal-error">{{ error }}</div>

          <div class="modal-footer">
            <button class="btn btn-ghost" @click="emit('close')">取消</button>
            <button class="btn btn-primary" @click="handleSave" :disabled="isSaving">
              {{ isSaving ? '保存中...' : '保存' }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  width: 90%;
  max-width: 520px;
  max-height: 85vh;
  overflow-y: auto;
  background: rgba(15, 15, 35, 0.95);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.close-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.modal-loading {
  padding: 3rem 1.5rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Source Sans 3', sans-serif;
}

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-family: 'Source Sans 3', 'Noto Serif SC', sans-serif;
  font-size: 0.9rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #c4b5fd;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.modal-error {
  margin: 0 1.5rem;
  padding: 0.625rem 1rem;
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.2);
  border-radius: 8px;
  color: #f87171;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.85rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.btn {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: rgba(196, 181, 253, 0.2);
  border-color: #c4b5fd;
  color: #fff;
}

.btn-primary:hover {
  background: rgba(196, 181, 253, 0.35);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
</style>
