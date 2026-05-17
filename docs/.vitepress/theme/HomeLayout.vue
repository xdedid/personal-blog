<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './NavBar.vue'
import SplashSection from './SplashSection.vue'
import BlogShowcase from './BlogShowcase.vue'

const bgY = ref(0)

const handleScroll = () => {
  const scrollY = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = docHeight > 0 ? scrollY / docHeight : 0
  bgY.value = scrollPercent * 30
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
      <div class="bg-image" :style="{ backgroundPositionY: bgY + '%' }"></div>
      <div class="bg-overlay"></div>
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
}

.bg-image {
  width: 100%;
  height: 100%;
  background: url('/personal-blog/wallpapers/hyouka.jpg') center/cover no-repeat;
  transition: background-position-y 0.1s linear;
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.4);
}

.main-content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}
</style>
