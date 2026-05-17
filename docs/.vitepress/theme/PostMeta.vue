<script setup lang="ts">
defineProps<{
  date: string
  tags?: string[]
  categories?: string[]
}>()
</script>

<template>
  <div class="post-meta">
    <span v-if="date">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
      {{ date }}
    </span>
    <span v-if="categories?.length">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
      </svg>
      {{ categories.join(', ') }}
    </span>
    <span v-if="tags?.length" class="tags">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
        <line x1="7" y1="7" x2="7.01" y2="7"></line>
      </svg>
      <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
    </span>
  </div>
</template>

<style scoped>
.tag {
  background: var(--vp-c-brand-soft);
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85em;
  margin-left: 0.25rem;
}
</style>
