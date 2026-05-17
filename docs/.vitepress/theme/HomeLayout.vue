<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './NavBar.vue'
import SplashSection from './SplashSection.vue'
import BlogShowcase from './BlogShowcase.vue'

const bgTransform = ref('translateY(0)')

const handleScroll = () => {
  const scrollY = window.scrollY
  bgTransform.value = `translateY(-${scrollY * 0.3}px)`
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="home-layout">
    <div class="bg-wrapper">
      <div class="bg-image" :style="{ transform: bgTransform }"></div>
    </div>
    <NavBar />
    <main class="main-content">
      <SplashSection />
      <BlogShowcase />
    </main>
  </div>
</template>

<style scoped>
.home-layout {
  min-height: 100vh;
  position: relative;
}

.bg-wrapper {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
}

.bg-image {
  width: 100%;
  height: 150%;
  background: url('/personal-blog/wallpapers/hyouka.jpg') center/cover no-repeat;
  will-change: transform;
}

.main-content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}
</style>
