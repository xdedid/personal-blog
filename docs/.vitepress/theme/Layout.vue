<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomeLayout from './HomeLayout.vue'

const { Layout: DefaultLayout } = DefaultTheme
const { frontmatter, page } = useData()

const isHomePage = computed(() => {
  return page.value.relativePath === 'index.md' || page.value.relativePath === ''
})
</script>

<template>
  <HomeLayout v-if="isHomePage" />
  <DefaultLayout v-else>
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
