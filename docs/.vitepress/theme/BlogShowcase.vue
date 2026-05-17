<script setup lang="ts">
import { data as posts } from '../utils/posts.data'

const recentPosts = posts.slice(0, 3)
</script>

<template>
  <section class="blog-showcase">
    <div class="showcase-content">
      <h2 class="showcase-title">最新文章</h2>
      <div class="posts-grid">
        <article v-for="post in recentPosts" :key="post.url" class="post-card">
          <h3 class="post-title">
            <a :href="post.url">{{ post.title }}</a>
          </h3>
          <p class="post-date">{{ post.date }}</p>
          <p v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt"></p>
          <a :href="post.url" class="post-link">阅读全文 →</a>
        </article>
      </div>
      <div class="showcase-footer">
        <a href="/posts/" class="view-all">查看全部文章 →</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-showcase {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
}

.showcase-content {
  max-width: 1000px;
  width: 100%;
}

.showcase-title {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin: 0 0 3rem 0;
  color: var(--vp-c-text-1);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.post-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--vp-c-divider);
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.post-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.post-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.post-title a:hover {
  color: var(--vp-c-brand-1);
}

.post-date {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  margin: 0 0 0.75rem 0;
}

.post-excerpt {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin: 0 0 1rem 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-link {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
}

.post-link:hover {
  text-decoration: underline;
}

.showcase-footer {
  text-align: center;
  margin-top: 2rem;
}

.view-all {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  transition: background 0.3s, color 0.3s;
}

.view-all:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }

  .showcase-title {
    font-size: 1.5rem;
  }
}
</style>
