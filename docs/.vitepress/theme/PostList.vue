<script setup lang="ts">
import { data as posts } from '../utils/posts.data'
import PostMeta from './PostMeta.vue'
</script>

<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post.url" class="post-card">
      <h2 class="post-title">
        <a :href="post.url">{{ post.title }}</a>
      </h2>
      <PostMeta
        :date="post.date"
        :tags="post.tags"
        :categories="post.categories"
      />
      <p v-if="post.excerpt" class="excerpt" v-html="post.excerpt"></p>
      <a :href="post.url" class="read-more">阅读全文 &rarr;</a>
    </article>
  </div>
</template>

<style scoped>
.post-list {
  max-width: 860px;
  margin: 0 auto;
  padding: 1rem 0;
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
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.post-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.35;
}

.post-title a {
  color: #111;
  text-decoration: none;
  transition: color 0.2s;
}

.post-title a:hover {
  color: var(--vp-c-brand-1);
}

.excerpt {
  font-family: 'Source Sans 3', 'Noto Serif SC', sans-serif;
  color: #333;
  margin: 0.75rem 0 1.25rem 0;
  line-height: 1.75;
  font-weight: 300;
}

.read-more {
  font-family: 'Source Sans 3', sans-serif;
  color: var(--vp-c-brand-1);
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
}

.read-more:hover {
  color: var(--vp-c-brand-2);
}

@media (max-width: 768px) {
  .post-card {
    padding: 1.25rem;
  }

  .post-title {
    font-size: 1.25rem;
  }
}
</style>
