<script setup lang="ts">
import { Content } from 'vitepress'
import NavBar from './NavBar.vue'
import BackgroundParallax from './BackgroundParallax.vue'
</script>

<template>
  <div class="sub-page-layout">
    <BackgroundParallax />
    <NavBar />
    <main class="sub-page-content">
      <div class="content-wrapper">
        <Content />
      </div>
    </main>
  </div>
</template>

<style scoped>
.sub-page-layout {
  min-height: 100vh;
  position: relative;
}

.sub-page-content {
  position: relative;
  z-index: 1;
  padding: 5.5rem 2rem 4rem;
}

.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2.5rem;
}

/* 内容排版 */
.content-wrapper :deep(h1) {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 2.25em;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0 0 0.8em 0;
  text-shadow: var(--text-shadow);
}

.content-wrapper :deep(h2) {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 1.625em;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #fff;
  margin-top: 2.5em;
  padding-bottom: 0.6em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.content-wrapper :deep(h3) {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: 1.25em;
  font-weight: 600;
  color: #fff;
  margin-top: 2em;
}

.content-wrapper :deep(p) {
  font-family: 'Source Sans 3', 'Noto Serif SC', sans-serif;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
  margin: 0 0 1em 0;
}

.content-wrapper :deep(a) {
  color: #c4b5fd;
  text-decoration: none;
  transition: color 0.2s;
}

.content-wrapper :deep(a:hover) {
  color: #fff;
}

.content-wrapper :deep(code) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85em;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  color: #c4b5fd;
}

.content-wrapper :deep(pre) {
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.content-wrapper :deep(pre code) {
  background: none;
  padding: 0;
  color: rgba(255, 255, 255, 0.85);
}

.content-wrapper :deep(blockquote) {
  border-left: 3px solid #c4b5fd;
  margin: 1em 0;
  padding: 0.5em 1em;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0 6px 6px 0;
}

.content-wrapper :deep(hr) {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 1.5em 0;
}

.content-wrapper :deep(strong) {
  color: #fff;
  font-weight: 600;
}

.content-wrapper :deep(ul),
.content-wrapper :deep(ol) {
  color: rgba(255, 255, 255, 0.85);
  padding-left: 1.5em;
  margin: 0 0 1em 0;
}

.content-wrapper :deep(li) {
  margin-bottom: 0.4em;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .sub-page-content {
    padding: 4.5rem 1rem 3rem;
  }

  .content-wrapper {
    padding: 1.5rem;
  }

  .content-wrapper :deep(h1) {
    font-size: 1.75em;
  }
}
</style>
