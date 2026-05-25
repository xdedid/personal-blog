<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const bgY = ref(0)
const bgSize = ref('cover')

const imgWidth = ref(0)
const imgHeight = ref(0)

function handleScroll() {
  if (!imgWidth.value || !imgHeight.value) return

  const vw = window.innerWidth
  const vh = window.innerHeight
  const docHeight = document.documentElement.scrollHeight - vh
  const scrollPercent = docHeight > 0 ? window.scrollY / docHeight : 0

  // 壁纸按视口宽度缩放后的高度
  const scaledHeight = (vw / imgWidth.value) * imgHeight.value

  // 壁纸超出视口的高度，即最大可滚动范围
  const maxShift = scaledHeight - vh

  if (maxShift > 0) {
    // 将像素偏移转为百分比（相对于缩放后壁纸高度）
    bgY.value = (scrollPercent * maxShift / scaledHeight) * 100
  }
}

function updateSize() {
  if (!imgWidth.value || !imgHeight.value) return
  const vw = window.innerWidth
  const scaledHeight = (vw / imgWidth.value) * imgHeight.value
  // 壁纸高度能覆盖视口时用 100vw auto，否则回退 cover
  bgSize.value = scaledHeight >= window.innerHeight ? '100vw auto' : 'cover'
}

onMounted(() => {
  const img = new Image()
  img.onload = () => {
    imgWidth.value = img.naturalWidth
    imgHeight.value = img.naturalHeight
    updateSize()
    handleScroll()
  }
  img.src = '/personal-blog/wallpapers/hyouka.jpg'

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', () => { updateSize(); handleScroll() }, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="bg-parallax" :style="{ backgroundPositionY: bgY + '%', backgroundSize: bgSize }">
    <div class="bg-overlay"></div>
  </div>
</template>

<style scoped>
.bg-parallax {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: url('/personal-blog/wallpapers/hyouka.jpg') center top no-repeat;
  background-size: cover;
  transition: background-position-y 0.1s linear;
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
