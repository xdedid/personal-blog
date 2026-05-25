<template>
  <div class="bg-parallax">
    <div class="bg-overlay"></div>
  </div>
</template>

<style scoped>
.bg-parallax {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: url('/personal-blog/wallpapers/hyouka.jpg') center / cover no-repeat fixed;
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
