<script setup lang="ts">
import { data as posts } from '../utils/posts.data'

const recentPosts = posts.slice(0, 3)
</script>

<template>
  <section class="blog-showcase">
    <div class="content">
      <h2 class="section-title">最新文章</h2>

      <div class="posts-grid">
        <article v-for="post in recentPosts" :key="post.url" class="post-card">
          <div class="post-meta">
            <span class="post-date">{{ post.date }}</span>
          </div>
          <h3 class="post-title">
            <a :href="post.url">{{ post.title }}</a>
          </h3>
          <p v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt"></p>
          <a :href="post.url" class="post-link">阅读全文</a>
        </article>
      </div>

      <div class="footer">
        <a href="/posts/" class="view-all">查看全部文章</a>
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
  margin: 0 0 3rem 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.post-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.post-meta {
  margin-bottom: 0.75rem;
}

.post-date {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #6b7280;
}

.post-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
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

.post-excerpt {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6366f1;
  text-decoration: none;
}

.post-link:hover {
  text-decoration: underline;
}

.footer {
  margin-top: 3rem;
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
  .blog-showcase {
    padding: 3rem 1.25rem;
  }

  .section-title {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
}
</style>
