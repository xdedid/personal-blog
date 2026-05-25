<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <div class="custom-home-content">
        <slot name="home-hero-after" />
      </div>
    </template>
  </Layout>
</template>

<style>
/* 全局壁纸背景 */
body {
  background: url('/personal-blog/wallpapers/hyouka.jpg') center/cover no-repeat fixed !important;
}

/* 覆盖 VitePress 默认背景 */
.vp-doc,
.vp-sidebar,
.vp-page {
  background: transparent !important;
}

/* 内容区域半透明背景 */
.vp-doc {
  background: rgba(255, 255, 255, 0.88) !important;
  backdrop-filter: blur(16px);
}

/* 侧边栏半透明 */
.vp-sidebar {
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(16px);
}

/* 导航栏半透明 */
.VPNav {
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(16px);
}

/* 暗色模式调整 */
.dark .vp-doc,
.dark .vp-sidebar,
.dark .VPNav {
  background: rgba(30, 30, 30, 0.85) !important;
}

/* 首页 hero 区域样式 */
.VPHero .name {
  font-size: 3.5rem !important;
  font-weight: 700 !important;
}

.VPHero .tagline {
  font-size: 1.25rem !important;
}

/* 自定义首页内容区域 */
.custom-home-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
