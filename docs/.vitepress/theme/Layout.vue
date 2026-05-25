<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import HomeLayout from './HomeLayout.vue'
import SubPageLayout from './SubPageLayout.vue'

const { page } = useData()

const isHomePage = computed(() => {
  return page.value.relativePath === 'index.md' || page.value.relativePath === ''
})
</script>

<template>
  <HomeLayout v-if="isHomePage" />
  <SubPageLayout v-else />
</template>
