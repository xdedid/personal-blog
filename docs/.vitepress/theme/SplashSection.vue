<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})
</script>

<template>
  <section class="splash-section">
    <div class="content" :class="{ visible: isVisible }">
      <h1 class="title">
        <span class="title-line">xdedid's</span>
        <span class="title-line accent">blogs</span>
      </h1>
      <p class="subtitle">个人思考与技术分享</p>
      <div class="scroll-hint">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
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
  position: relative;
}

.content {
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.content.visible {
  opacity: 1;
  transform: translateY(0);
}

.title {
  font-family: 'Playfair Display', 'Noto Serif SC', serif;
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: #fff;
  margin: 0 0 1.25rem 0;
  text-shadow: var(--text-shadow);
}

.title-line {
  display: block;
}

.title-line.accent {
  background: linear-gradient(135deg, #c4b5fd 0%, #818cf8 50%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-family: 'Source Sans 3', 'Noto Serif SC', sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  text-shadow: var(--text-shadow-sm);
}

.scroll-hint {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.5);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}

@media (max-width: 768px) {
  .subtitle {
    letter-spacing: 0.1em;
  }
}
</style>
