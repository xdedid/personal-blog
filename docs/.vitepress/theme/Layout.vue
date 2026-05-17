<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout: DefaultLayout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <DefaultLayout>
    <template #home-hero-after>
      <div class="blog-announcement">
        <p>Welcome to my personal blog!</p>
      </div>
    </template>
  </DefaultLayout>
</template>

<style scoped>
.blog-announcement {
  text-align: center;
  padding: 1rem;
  color: var(--vp-c-text-2);
}
</style>