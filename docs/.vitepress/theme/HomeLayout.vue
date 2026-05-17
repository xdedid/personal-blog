<script setup lang="ts">
import NavBar from './NavBar.vue'
import SplashSection from './SplashSection.vue'
import BlogShowcase from './BlogShowcase.vue'
</script>

<template>
  <div class="home-layout">
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
}

.main-content {
  min-height: 100vh;
}
</style>
