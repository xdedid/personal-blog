<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import BackgroundParallax from './BackgroundParallax.vue'
import HomeLayout from './HomeLayout.vue'

const { Layout: DefaultLayout } = DefaultTheme
const { page } = useData()

const isHomePage = computed(() => {
  return page.value.relativePath === 'index.md' || page.value.relativePath === ''
})
</script>

<template>
  <HomeLayout v-if="isHomePage" />
  <DefaultLayout v-else>
    <template #layout-top>
      <BackgroundParallax />
    </template>
  </DefaultLayout>
</template>

<style>
/* ============================================
   VitePress 默认导航栏 — 玻璃态覆盖
   子页面使用 VitePress VPNav，统一为透明玻璃效果
   ============================================ */

/* 首页隐藏 VitePress 默认导航（由 HomeLayout 自定义 NavBar 替代） */
.page .VPNav {
  display: none !important;
}

/* 子页面导航栏：透明玻璃态 */
.VPNav {
  background: rgba(0, 0, 0, 0.2) !important;
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
}

/* 导航栏文字：亮色适配壁纸 */
.VPNavBar .title {
  color: #fff !important;
}

.VPNavBar .VPNavBarMenuLink .text {
  color: rgba(255, 255, 255, 0.75) !important;
}

.VPNavBar .VPNavBarMenuLink .text:hover {
  color: #fff !important;
}

.VPNavBar .VPNavBarMenuGroup .text {
  color: rgba(255, 255, 255, 0.75) !important;
}

.VPNavBar .VPNavBarMenuGroup:hover .text {
  color: #fff !important;
}

/* 搜索按钮 */
.VPNavBar .VPSearchButton {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  color: rgba(255, 255, 255, 0.7) !important;
}

.VPNavBar .VPSearchButton:hover {
  background: rgba(255, 255, 255, 0.18) !important;
  color: #fff !important;
}

.VPNavBar .VPSearchButton .shortcut {
  background: rgba(255, 255, 255, 0.12) !important;
  color: rgba(255, 255, 255, 0.5) !important;
}

/* 社交链接 / GitHub 图标 */
.VPNavBar .VPSocialLink {
  color: rgba(255, 255, 255, 0.65) !important;
}

.VPNavBar .VPSocialLink:hover {
  color: #fff !important;
}

/* 暗色模式切换按钮 */
.VPNavBar .VPSwitchAppearance {
  color: rgba(255, 255, 255, 0.7) !important;
}

.VPNavBar .VPSwitchAppearance:hover {
  color: #fff !important;
}

/* 移动端菜单按钮 */
.VPNavBar .VPNavBarHamburger {
  color: rgba(255, 255, 255, 0.8) !important;
}

/* 导航栏下拉菜单 */
.VPNavBarMenuGroup .menu {
  background: rgba(15, 15, 35, 0.95) !important;
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4) !important;
}

.VPNavBarMenuGroup .menu .link .text {
  color: rgba(255, 255, 255, 0.75) !important;
}

.VPNavBarMenuGroup .menu .link:hover .text {
  color: #fff !important;
}

/* ============================================
   侧边栏 — 玻璃态
   ============================================ */
.VPSidebar {
  background: rgba(0, 0, 0, 0.4) !important;
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
}

.VPSidebar .VPSidebarItem .text {
  color: rgba(255, 255, 255, 0.7) !important;
}

.VPSidebar .VPSidebarItem:hover .text {
  color: #fff !important;
}

.VPSidebar .VPSidebarItem.active .text {
  color: var(--vp-c-brand-1) !important;
}

.VPSidebar .group .title-text {
  color: rgba(255, 255, 255, 0.85) !important;
}

/* ============================================
   移动端导航覆盖 — 全屏菜单
   ============================================ */
.VPNavScreen {
  background: rgba(0, 0, 0, 0.95) !important;
  backdrop-filter: blur(30px) !important;
  -webkit-backdrop-filter: blur(30px) !important;
}

.VPNavScreen .VPScreenMenuLink .text {
  color: rgba(255, 255, 255, 0.8) !important;
}

.VPNavScreen .VPScreenMenuLink:hover .text {
  color: #fff !important;
}

.VPNavScreen .VPScreenMenuGroup .text {
  color: rgba(255, 255, 255, 0.8) !important;
}

.VPNavScreen .VPNavBarAppearance {
  color: rgba(255, 255, 255, 0.8) !important;
}

.VPNavScreen .VPSocialLinks .VPSocialLink {
  color: rgba(255, 255, 255, 0.6) !important;
}

/* ============================================
   搜索模态框 — 适配暗色壁纸
   ============================================ */
.VPModal {
  background: rgba(0, 0, 0, 0.7) !important;
}

.VPModal .container {
  background: rgba(15, 15, 35, 0.98) !important;
  backdrop-filter: blur(40px) !important;
  -webkit-backdrop-filter: blur(40px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 16px !important;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.5) !important;
}

.VPModal .title {
  color: rgba(255, 255, 255, 0.5) !important;
}

.VPModal .query {
  color: #fff !important;
}

.VPModal .search-input {
  color: #fff !important;
}

.VPModal .search-input::placeholder {
  color: rgba(255, 255, 255, 0.35) !important;
}

.VPModal .results {
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
}

.VPModal .result {
  color: rgba(255, 255, 255, 0.75) !important;
}

.VPModal .result:hover,
.VPModal .result.active {
  background: rgba(255, 255, 255, 0.08) !important;
}

.VPModal .result-title {
  color: #fff !important;
}

.VPModal .result-text {
  color: rgba(255, 255, 255, 0.55) !important;
}

.VPModal .result-highlight {
  color: var(--vp-c-brand-1) !important;
}

.VPModal .action-button {
  color: rgba(255, 255, 255, 0.5) !important;
}

/* ============================================
   全局背景透明化 — 壁纸可见
   ============================================ */
.VPPage,
.VPContent,
.doc-content-wrapper,
.content-container {
  background: transparent !important;
}

/* 文档内容区域：半透明玻璃态 */
.vp-doc {
  background: rgba(255, 255, 255, 0.82) !important;
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 16px !important;
  padding: 2.5rem !important;
}

/* VitePress 页脚 */
.VPFooter {
  background: transparent !important;
  border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
}

.VPFooter .message,
.VPFooter .copyright {
  color: rgba(255, 255, 255, 0.45) !important;
}

/* 布局顶部容器透明 */
.Layout {
  background: transparent !important;
}

/* ============================================
   暗色模式适配
   ============================================ */
.dark .VPNav {
  background: rgba(0, 0, 0, 0.35) !important;
}

.dark .vp-doc {
  background: rgba(20, 20, 40, 0.85) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

.dark .VPSidebar {
  background: rgba(0, 0, 0, 0.5) !important;
}
</style>
