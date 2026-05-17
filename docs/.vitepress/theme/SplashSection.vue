<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section class="splash-section">
    <div class="splash-content" :class="{ visible: isVisible }">
      <h1 class="splash-title">xdedid's blogs</h1>
      <p class="splash-subtitle">个人思考与技术分享</p>
    </div>
    <div class="scroll-indicator">
      <span class="scroll-text">向下滚动</span>
      <svg class="scroll-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </section>
</template>

<style scoped>
.splash-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 60px;
}

.splash-content {
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.splash-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.splash-title {
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
}

.splash-subtitle {
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--vp-c-text-2);
  margin: 0;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: bounce 2s infinite;
}

.scroll-text {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.scroll-arrow {
  color: var(--vp-c-text-3);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
}

@media (max-width: 768px) {
  .splash-title {
    font-size: 2.5rem;
  }

  .splash-subtitle {
    font-size: 1rem;
  }
}
</style>
