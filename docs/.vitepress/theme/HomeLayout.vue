<script setup lang="ts">
import NavBar from './NavBar.vue'
import SplashSection from './SplashSection.vue'
import BlogShowcase from './BlogShowcase.vue'
</script>

<template>
  <div class="home-layout">
    <NavBar />
    <main class="fullpage-scroll">
      <SplashSection />
      <BlogShowcase />
    </main>
  </div>
</template>

<style scoped>
.home-layout {
  height: 100vh;
  overflow: hidden;
}

.fullpage-scroll {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.fullpage-scroll > :deep(*) {
  scroll-snap-align: start;
}
</style>
