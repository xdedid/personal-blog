<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../utils/knowledge.data'
import { getCategories } from '../utils/knowledge-helpers'
import { withBase } from 'vitepress'

const recentPosts = posts.slice(0, 4)
const categories = computed(() => getCategories(posts).slice(0, 5))
</script>

<template>
  <section class="knowledge-showcase">
    <div class="content">
      <h2 class="section-title">知识库</h2>

      <div class="categories">
        <span v-for="cat in categories" :key="cat" class="category-tag">{{ cat }}</span>
      </div>

      <div class="posts-grid">
        <article v-for="post in recentPosts" :key="post.url" class="post-card">
          <div class="post-header">
            <span class="post-category">{{ post.category }}</span>
          </div>
          <h3 class="post-title">
            <a :href="post.url">{{ post.title }}</a>
          </h3>
          <p v-if="post.description" class="post-description">{{ post.description }}</p>
          <div v-if="post.tags.length" class="post-tags">
            <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </article>
      </div>

      <div class="footer">
        <a :href="withBase('/knowledge/')" class="view-all">查看全部文档</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.knowledge-showcase {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
}

.content {
  max-width: 960px;
  width: 100%;
}

.section-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 1.5rem 0;
  text-shadow: var(--text-shadow);
  letter-spacing: -0.01em;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.category-tag {
  padding: 0.4rem 0.875rem;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.02em;
  transition: background 0.2s, border-color 0.2s;
}

.category-tag:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.post-card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 14px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s ease;
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.25);
}

.post-header {
  margin-bottom: 0.625rem;
}

.post-category {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  color: #c4b5fd;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.post-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 1.0625rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
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
  font-size: 0.85rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
  margin: 0 0 0.875rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.tag {
  padding: 0.2rem 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
}

.footer {
  margin-top: 2.5rem;
  text-align: center;
}

.view-all {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  padding: 0.75rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  transition: background 0.3s, border-color 0.3s;
  letter-spacing: 0.05em;
}

.view-all:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.35);
}

@media (max-width: 768px) {
  .knowledge-showcase {
    padding: 4rem 1.25rem;
  }

  .section-title {
    font-size: 1.375rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
