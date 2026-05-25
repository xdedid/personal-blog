<script setup lang="ts">
import { ref } from 'vue'
import { data as posts } from '../utils/posts.data'
import { getFileContent, deleteFile, getToken } from '../utils/github-api'
import PostMeta from './PostMeta.vue'
import EditModal from './EditModal.vue'
import DeleteConfirm from './DeleteConfirm.vue'

const editingPost = ref<typeof posts[0] | null>(null)
const deletingPost = ref<typeof posts[0] | null>(null)
const status = ref<{ type: 'success' | 'error'; message: string } | null>(null)

function handleEdit(post: typeof posts[0]) {
  const token = getToken()
  if (!token) {
    status.value = { type: 'error', message: '请先在发布页面配置 GitHub Token' }
    return
  }
  editingPost.value = post
}

function handleDelete(post: typeof posts[0]) {
  const token = getToken()
  if (!token) {
    status.value = { type: 'error', message: '请先在发布页面配置 GitHub Token' }
    return
  }
  deletingPost.value = post
}

async function confirmDelete() {
  if (!deletingPost.value) return
  const post = deletingPost.value

  try {
    const token = getToken()!
    const config = { token, owner: 'xdedid', repo: 'personal-blog', branch: 'main' }
    const file = await getFileContent(config, post.path)
    if (!file) {
      status.value = { type: 'error', message: '文件不存在' }
      deletingPost.value = null
      return
    }

    const result = await deleteFile(config, post.path, file.sha, `docs: delete '${post.title}'`)
    if (result.success) {
      status.value = { type: 'success', message: `《${post.title}》已删除，GitHub Actions 将自动重新部署。` }
    } else {
      status.value = { type: 'error', message: result.error || '删除失败' }
    }
  } catch (e) {
    status.value = { type: 'error', message: e instanceof Error ? e.message : '未知错误' }
  }

  deletingPost.value = null
}

function handleUpdated() {
  editingPost.value = null
  status.value = { type: 'success', message: '文档已更新，GitHub Actions 将自动重新部署。' }
}
</script>

<template>
  <div class="post-list">
    <Transition name="status">
      <div v-if="status" :class="['status-msg', status.type]">
        <span>{{ status.message }}</span>
        <button class="status-close" @click="status = null">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </Transition>

    <article v-for="post in posts" :key="post.url" class="post-card">
      <div class="card-header">
        <h2 class="post-title">
          <a :href="post.url">{{ post.title }}</a>
        </h2>
        <div class="card-actions">
          <button class="action-btn" @click="handleEdit(post)" title="编辑">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button class="action-btn action-btn-danger" @click="handleDelete(post)" title="删除">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
      <PostMeta
        :date="post.date"
        :tags="post.tags"
        :categories="post.categories"
      />
      <p v-if="post.excerpt" class="excerpt" v-html="post.excerpt"></p>
      <a :href="post.url" class="read-more">阅读全文 &rarr;</a>
    </article>
  </div>

  <EditModal
    v-if="editingPost"
    :post="editingPost"
    postType="posts"
    @close="editingPost = null"
    @updated="handleUpdated"
  />

  <DeleteConfirm
    v-if="deletingPost"
    :title="deletingPost.title"
    @close="deletingPost = null"
    @confirm="confirmDelete"
  />
</template>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.post-card {
  padding: 1.75rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s ease,
              border-color 0.3s ease;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.post-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.35;
}

.post-title a {
  color: #fff;
  text-decoration: none;
  transition: color 0.2s;
}

.post-title a:hover {
  color: #c4b5fd;
}

.card-actions {
  display: flex;
  gap: 0.25rem;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s;
}

.post-card:hover .card-actions {
  opacity: 1;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.action-btn-danger:hover {
  background: rgba(248, 113, 113, 0.15);
  color: #f87171;
}

.excerpt {
  font-family: 'Source Sans 3', 'Noto Serif SC', sans-serif;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.75rem 0 1.25rem 0;
  line-height: 1.75;
  font-weight: 300;
}

.read-more {
  font-family: 'Source Sans 3', sans-serif;
  color: #c4b5fd;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
}

.read-more:hover {
  color: #fff;
}

.status-msg {
  padding: 0.875rem 1.25rem;
  border-radius: 10px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.status-msg.success {
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.2);
  color: #4ade80;
}

.status-msg.error {
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.2);
  color: #f87171;
}

.status-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.status-close:hover {
  opacity: 1;
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

@media (max-width: 768px) {
  .post-card {
    padding: 1.25rem;
  }

  .post-title {
    font-size: 1.25rem;
  }

  .card-actions {
    opacity: 1;
  }
}
</style>
