---
title: 10 个 Web 开发实用技巧
date: 2026-05-17
categories:
  - 技巧
tags:
  - javascript
  - css
  - 效率
---

# 10 个 Web 开发实用技巧

这里有一些对 Web 开发者非常有用的技巧。

## 1. 使用 CSS 自定义属性

```css
:root {
  --primary-color: #646cff;
}

.button {
  background: var(--primary-color);
}
```

## 2. 函数参数解构

```javascript
function greet({ name, age }) {
  console.log(`你好 ${name}，年龄 ${age}`)
}
```

## 3. 使用可选链

```javascript
const city = user?.address?.city
```

## 4. 模板字面量处理多行文本

```javascript
const html = `
  <div>
    <h1>${title}</h1>
  </div>
`
```

## 5. 用 Console.table 展示数组

```javascript
console.table(users)
```

---

*更多技巧即将推出！*
