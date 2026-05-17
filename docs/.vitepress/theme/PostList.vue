<script setup lang="ts">
import { data as posts } from '../utils/posts.data'
import PostMeta from './PostMeta.vue'
</script>

<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post.url" class="post-item">
      <h2>
        <a :href="post.url">{{ post.title }}</a>
      </h2>
      <PostMeta
        :date="post.date"
        :tags="post.tags"
        :categories="post.categories"
      />
      <p v-if="post.excerpt" class="excerpt" v-html="post.excerpt"></p>
      <a :href="post.url" class="read-more">Read more →</a>
    </article>
  </div>
</template>

<style scoped>
.post-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.post-item {
  padding: 2rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-item:last-child {
  border-bottom: none;
}

.post-item h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5em;
}

.post-item h2 a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.post-item h2 a:hover {
  color: var(--vp-c-brand-1);
}

.excerpt {
  color: var(--vp-c-text-2);
  margin: 1rem 0;
  line-height: 1.6;
}

.read-more {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
