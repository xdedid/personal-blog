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
        <a href="/personal-blog/posts/" class="view-all">查看全部文章</a>
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
  margin: 0 0 3rem 0;
  text-shadow: var(--text-shadow);
  letter-spacing: -0.01em;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.post-card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 16px;
  padding: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.3s ease;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.25);
}

.post-meta {
  margin-bottom: 0.75rem;
}

.post-date {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.8rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.05em;
}

.post-title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
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

.post-excerpt {
  font-family: 'Source Sans 3', 'Noto Serif SC', sans-serif;
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin: 0 0 1.25rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-link {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #c4b5fd;
  text-decoration: none;
  transition: color 0.2s;
}

.post-link:hover {
  color: #fff;
}

.footer {
  margin-top: 3rem;
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
  .blog-showcase {
    padding: 4rem 1.25rem;
  }

  .section-title {
    font-size: 1.375rem;
    margin-bottom: 2rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
