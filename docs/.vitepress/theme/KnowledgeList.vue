<script setup lang="ts">
import { ref, computed } from 'vue'
import { data as posts } from '../utils/knowledge.data'
import { getCategories, getTags } from '../utils/knowledge-helpers'

const selectedCategory = ref<string>('')
const selectedTag = ref<string>('')

const categories = computed(() => getCategories(posts))
const tags = computed(() => getTags(posts))

const filteredPosts = computed(() => {
  return posts.filter(post => {
    const matchCategory = !selectedCategory.value || post.category === selectedCategory.value
    const matchTag = !selectedTag.value || post.tags.includes(selectedTag.value)
    return matchCategory && matchTag
  })
})

function clearFilters() {
  selectedCategory.value = ''
  selectedTag.value = ''
}

function getCategoryCount(category: string): number {
  return posts.filter(p => p.category === category).length
}
</script>

<template>
  <div class="knowledge-list">
    <div class="filters">
      <div class="filter-group">
        <h3 class="filter-title">分类</h3>
        <div class="filter-options">
          <button
            :class="['filter-btn', { active: !selectedCategory }]"
            @click="selectedCategory = ''"
          >
            全部 ({{ posts.length }})
          </button>
          <button
            v-for="cat in categories"
            :key="cat"
            :class="['filter-btn', { active: selectedCategory === cat }]"
            @click="selectedCategory = cat"
          >
            {{ cat }} ({{ getCategoryCount(cat) }})
          </button>
        </div>
      </div>

      <div v-if="tags.length" class="filter-group">
        <h3 class="filter-title">标签</h3>
        <div class="filter-options">
          <button
            :class="['filter-btn tag-btn', { active: !selectedTag }]"
            @click="selectedTag = ''"
          >
            全部
          </button>
          <button
            v-for="tag in tags"
            :key="tag"
            :class="['filter-btn tag-btn', { active: selectedTag === tag }]"
            @click="selectedTag = tag"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <button v-if="selectedCategory || selectedTag" class="clear-btn" @click="clearFilters">
        清除筛选
      </button>
    </div>

    <div class="posts-container">
      <div v-if="filteredPosts.length === 0" class="empty-state">
        <p>没有找到匹配的文档</p>
        <button class="clear-btn" @click="clearFilters">清除筛选</button>
      </div>

      <article v-for="post in filteredPosts" :key="post.url" class="post-card">
        <div class="post-header">
          <span class="post-category">{{ post.category }}</span>
          <span class="post-date">{{ post.date }}</span>
        </div>
        <h2 class="post-title">
          <a :href="post.url">{{ post.title }}</a>
        </h2>
        <p v-if="post.description" class="post-description">{{ post.description }}</p>
        <p v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt"></p>
        <div v-if="post.tags.length" class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <a :href="post.url" class="read-more">阅读全文 &rarr;</a>
      </article>
    </div>
  </div>
</template>

<style scoped>
.knowledge-list {
  display: flex;
  flex-direction: column;
}

.filters {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 1.75rem;
}

.filter-group {
  margin-bottom: 1rem;
}

.filter-group:last-of-type {
  margin-bottom: 0;
}

.filter-title {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-btn {
  font-family: 'Source Sans 3', sans-serif;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: #c4b5fd;
  color: #c4b5fd;
}

.filter-btn.active {
  background: rgba(196, 181, 253, 0.2);
  border-color: #c4b5fd;
  color: #fff;
}

.tag-btn {
  font-size: 0.8rem;
  padding: 0.375rem 0.75rem;
}

.clear-btn {
  font-family: 'Source Sans 3', sans-serif;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

.posts-container {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.5);
}

.empty-state p {
  font-family: 'Source Sans 3', 'Noto Serif SC', sans-serif;
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
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

.post-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.post-category {
  font-family: 'Source Sans 3', sans-serif;
  padding: 0.2rem 0.625rem;
  background: rgba(196, 181, 253, 0.15);
  color: #c4b5fd;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.post-date {
  font-family: 'Source Sans 3', sans-serif;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  font-weight: 300;
}

.post-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
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

.post-description {
  font-family: 'Source Sans 3', 'Noto Serif SC', sans-serif;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  font-weight: 300;
  margin: 0 0 0.75rem 0;
  line-height: 1.6;
}

.post-excerpt {
  font-family: 'Source Sans 3', 'Noto Serif SC', sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.7;
  margin: 0 0 1rem 0;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  font-family: 'Source Sans 3', sans-serif;
  padding: 0.2rem 0.6rem;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: 400;
}

.read-more {
  font-family: 'Source Sans 3', sans-serif;
  color: #c4b5fd;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s;
}

.read-more:hover {
  color: #fff;
}

@media (max-width: 768px) {
  .filters {
    padding: 1rem;
  }

  .filter-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }

  .post-card {
    padding: 1.25rem;
  }

  .post-title {
    font-size: 1.125rem;
  }
}
</style>
