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

    <div class="scroll-hint" :class="{ visible: isVisible }">
      <div class="scroll-arrow"></div>
    </div>
  </section>
</template>

<style scoped>
.splash-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.content {
  position: relative;
  z-index: 10;
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
  color: #111;
  margin: 0 0 0.75rem 0;
}

.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  font-weight: 400;
  color: #6b7280;
  margin: 0;
}

.scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.6s ease 0.4s;
}

.scroll-hint.visible {
  opacity: 1;
}

.scroll-arrow {
  width: 20px;
  height: 20px;
  border-right: 1.5px solid #9ca3af;
  border-bottom: 1.5px solid #9ca3af;
  transform: rotate(45deg);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(6px); }
}

:root.dark .title {
  color: #fff;
}

:root.dark .subtitle {
  color: #9ca3af;
}

:root.dark .scroll-arrow {
  border-color: #6b7280;
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
