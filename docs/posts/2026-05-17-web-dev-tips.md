---
title: 10 Web Development Tips
date: 2026-05-17
categories:
  - Tips
tags:
  - javascript
  - css
  - productivity
---

# 10 Web Development Tips

Here are some useful tips for web developers.

## 1. Use CSS Custom Properties

```css
:root {
  --primary-color: #646cff;
}

.button {
  background: var(--primary-color);
}
```

## 2. Destructure in Function Parameters

```javascript
function greet({ name, age }) {
  console.log(`Hello ${name}, age ${age}`)
}
```

## 3. Use Optional Chaining

```javascript
const city = user?.address?.city
```

## 4. Template Literals for Multi-line

```javascript
const html = `
  <div>
    <h1>${title}</h1>
  </div>
`
```

## 5. Console.table for Arrays

```javascript
console.table(users)
```

---

*More tips coming soon!*
