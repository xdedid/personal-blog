<script setup lang="ts">
import NavBar from './NavBar.vue'
import BackgroundParallax from './BackgroundParallax.vue'
import SplashSection from './SplashSection.vue'
import BlogShowcase from './BlogShowcase.vue'
import KnowledgeShowcase from './KnowledgeShowcase.vue'
</script>

<template>
  <div class="home-layout">
    <BackgroundParallax />
    <NavBar />
    <main class="main-content">
      <SplashSection />
      <BlogShowcase />
      <KnowledgeShowcase />
    </main>
  </div>
</template>

<style scoped>
.home-layout {
  min-height: 100vh;
  position: relative;
}

.main-content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}
</style>
