<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const navItems = [
  { text: '首页', link: '/' },
  { text: '文章', link: '/posts/' },
  { text: '关于', link: '/about' }
]
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner">
      <!-- 左上角导航 -->
      <nav class="nav-left">
        <a v-for="item in navItems" :key="item.link" :href="item.link" class="nav-link">
          {{ item.text }}
        </a>
      </nav>

      <!-- 右上角头像 -->
      <a href="/about" class="avatar-link">
        <div class="avatar">
          <span>X</span>
        </div>
      </a>

      <!-- 移动端菜单按钮 -->
      <button class="mobile-menu-btn" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- 移动端菜单 -->
    <div class="mobile-menu" :class="{ open: isMobileMenuOpen }">
      <a v-for="item in navItems" :key="item.link" :href="item.link" class="mobile-link" @click="isMobileMenuOpen = false">
        {{ item.text }}
      </a>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.25rem 2rem;
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-left {
  display: flex;
  gap: 2rem;
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: white;
}

.avatar-link {
  text-decoration: none;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  transition: background 0.2s, border-color 0.2s;
}

.avatar:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: white;
}

.mobile-menu {
  display: none;
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem 1.25rem;
  }

  .nav-left {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    padding: 1rem 1.25rem;
    gap: 0.5rem;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .mobile-menu.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .mobile-link {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    padding: 0.5rem 0;
  }
}
</style>
