<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'

const { isDark, theme } = useData()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navItems = [
  { text: '首页', link: '/' },
  { text: '文章', link: '/posts/' },
  { text: '关于', link: '/about' }
]
</script>

<template>
  <header class="navbar">
    <div class="navbar-container">
      <a href="/" class="navbar-brand">xdedid's blogs</a>

      <nav class="navbar-links" :class="{ open: isMobileMenuOpen }">
        <a v-for="item in navItems" :key="item.link" :href="item.link" class="nav-link">
          {{ item.text }}
        </a>
      </nav>

      <button class="mobile-menu-btn" @click="toggleMobileMenu" :aria-label="isMobileMenuOpen ? '关闭菜单' : '打开菜单'">
        <svg v-if="!isMobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--vp-c-divider);
  transition: background 0.3s, border-color 0.3s;
}

:root.dark .navbar {
  background: rgba(15, 25, 35, 0.8);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.navbar-brand:hover {
  color: var(--vp-c-brand-1);
}

.navbar-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--vp-c-brand-1);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }

  .navbar-links {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.3s, opacity 0.3s;
  }

  :root.dark .navbar-links {
    background: rgba(15, 25, 35, 0.95);
  }

  .navbar-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
