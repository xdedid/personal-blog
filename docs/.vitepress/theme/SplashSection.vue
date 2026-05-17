<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => isVisible.value = true, 100)
})
</script>

<template>
  <section class="splash-section">
    <div class="content" :class="{ visible: isVisible }">
      <h1 class="title">xdedid's blogs</h1>
      <p class="subtitle">个人思考与技术分享</p>
    </div>
  </section>
</template>

<style scoped>
.splash-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.content {
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.content.visible {
  opacity: 1;
  transform: translateY(0);
}

.title {
  font-family: 'Inter', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
  margin: 0 0 0.75rem 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>
