<script setup lang="ts">
import { ref, computed } from 'vue'
import { data as posts } from '../utils/knowledge.data'
import { getCategories } from '../utils/knowledge-helpers'

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
        <a href="/personal-blog/knowledge/" class="view-all">查看全部文档</a>
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
  padding: 4rem 2rem;
}

.content {
  max-width: 900px;
  width: 100%;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 1.5rem 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.category-tag {
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #fff;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.post-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.post-header {
  margin-bottom: 0.5rem;
}

.post-category {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: #6366f1;
  font-weight: 600;
}

.post-title {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.post-title a {
  color: #111;
  text-decoration: none;
}

.post-title a:hover {
  color: #6366f1;
}

.post-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  color: #4b5563;
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
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
  padding: 0.25rem 0.5rem;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 0.6875rem;
}

.footer {
  margin-top: 2rem;
  text-align: center;
}

.view-all {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  transition: background 0.2s;
}

.view-all:hover {
  background: rgba(255, 255, 255, 0.25);
}

@media (max-width: 768px) {
  .knowledge-showcase {
    padding: 3rem 1.25rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
