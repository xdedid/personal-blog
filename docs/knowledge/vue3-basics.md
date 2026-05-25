---
title: Vue 3 基础入门
date: 2026-05-25
category: 前端开发
tags: [Vue, JavaScript, 前端]
description: Vue 3 核心概念和基础用法总结
---

# Vue 3 基础入门

## Composition API

Vue 3 引入了 Composition API，提供了更灵活的代码组织方式。

### setup 函数

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

function increment() {
  count.value++
}
</script>
```

### 响应式系统

- `ref()` - 用于基本类型
- `reactive()` - 用于对象类型
- `computed()` - 计算属性
- `watch()` / `watchEffect()` - 侦听器

## 生命周期

| Options API | Composition API |
|-------------|-----------------|
| beforeCreate | setup() |
| created | setup() |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |

## 组件通信

### Props

```vue
<script setup>
const props = defineProps({
  title: String,
  count: Number
})
</script>
```

### Emits

```vue
<script setup>
const emit = defineEmits(['update', 'delete'])

function handleClick() {
  emit('update', newValue)
}
</script>
```

## 总结

Vue 3 的 Composition API 让代码组织更加灵活，配合 `<script setup>` 语法可以写出更简洁的组件代码。
