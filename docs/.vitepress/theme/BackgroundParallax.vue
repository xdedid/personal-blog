<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const bgY = ref(0)

const handleScroll = () => {
  const scrollY = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = docHeight > 0 ? scrollY / docHeight : 0
  bgY.value = scrollPercent * 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="bg-parallax" :style="{ backgroundPositionY: bgY + '%' }">
    <div class="bg-overlay"></div>
  </div>
</template>

<style scoped>
.bg-parallax {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: url('/personal-blog/wallpapers/hyouka.jpg') center / cover no-repeat;
  transition: background-position-y 0.15s linear;
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(15, 15, 35, 0.3) 0%,
    rgba(15, 15, 35, 0.15) 50%,
    rgba(15, 15, 35, 0.3) 100%
  );
}
</style>
