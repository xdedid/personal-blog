import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Blog',
  description: 'A personal blog built with VitePress',
  lang: 'zh-CN',

  // GitHub Pages base path (replace with your repo name)
  base: '/personal-blog/',

  // Enable dark mode toggle
  appearance: 'dark',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Posts', link: '/posts/' },
      { text: 'About', link: '/about' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/personal-blog' }
    ],

    search: {
      provider: 'local'
    },

    darkModeSwitchLabel: 'Theme',
    darkModeSwitchTitle: 'Switch to dark theme',
    lightModeSwitchTitle: 'Switch to light theme'
  }
})
