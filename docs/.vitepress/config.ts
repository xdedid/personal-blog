import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的博客',
  description: '一个基于 VitePress 的个人博客',
  lang: 'zh-CN',

  base: '/personal-blog/',
  appearance: 'dark',

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;500;600&family=Noto+Serif+SC:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
        rel: 'stylesheet'
      }
    ]
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '知识库', link: '/knowledge/' },
      { text: '发布', link: '/upload' },
      { text: '关于', link: '/about' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xdedid/personal-blog' }
    ],

    search: {
      provider: 'local'
    },

    darkModeSwitchLabel: '主题',
    darkModeSwitchTitle: '切换到暗色主题',
    lightModeSwitchTitle: '切换到亮色主题',

    footer: {
      message: '使用 VitePress 构建',
      copyright: '© 2026 我的博客'
    }
  }
})
