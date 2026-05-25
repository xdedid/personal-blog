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

<style>
/* 全局壁纸背景 */
body {
  background: url('/personal-blog/wallpapers/hyouka.jpg') center/cover no-repeat fixed !important;
}

/* 覆盖 VitePress 默认背景 */
.vp-doc,
.vp-sidebar,
.vp-nav,
.vp-page {
  background: transparent !important;
}

/* 内容区域半透明背景 */
.vp-doc {
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(12px);
}

/* 侧边栏半透明 */
.vp-sidebar {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(12px);
}

/* 导航栏半透明 */
.vp-nav {
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(12px);
}

/* 暗色模式调整 */
.dark .vp-doc,
.dark .vp-sidebar,
.dark .vp-nav {
  background: rgba(30, 30, 30, 0.85) !important;
}
</style>

<style scoped>
.blog-announcement {
  text-align: center;
  padding: 1rem;
  color: var(--vp-c-text-2);
}
</style>
