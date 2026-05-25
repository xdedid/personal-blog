---
title: 如何添加新文档
date: 2026-05-25
category: 使用指南
tags: [教程, 入门]
description: 知识库文档添加和管理指南
---

# 如何添加新文档

## 文档格式

每篇文档都是一个 Markdown 文件，存放在 `docs/knowledge/` 目录下。

### Frontmatter 模板

```yaml
---
title: 文档标题
date: 2026-05-25
category: 分类名称
tags: [标签1, 标签2, 标签3]
description: 文档的简短描述（可选）
---

# 文档标题

这里是正文内容...
```

### 必填字段

| 字段 | 说明 | 示例 |
|------|------|------|
| title | 文档标题 | "Vue 3 入门" |
| date | 发布日期 | "2026-05-25" |
| category | 分类名称 | "前端开发" |

### 可选字段

| 字段 | 说明 | 示例 |
|------|------|------|
| tags | 标签数组 | [Vue, JavaScript] |
| description | 简短描述 | "Vue 3 核心概念" |

## 分类建议

以下是推荐的分类体系：

- **前端开发** - HTML, CSS, JavaScript, Vue, React 等
- **后端开发** - Node.js, Python, Java, Go 等
- **开发工具** - Git, Docker, VS Code, 命令行等
- **数据库** - MySQL, PostgreSQL, MongoDB 等
- **运维部署** - Linux, CI/CD, 云服务等
- **学习笔记** - 课程笔记、读书笔记等
- **使用指南** - 教程、说明文档

## 添加新文档步骤

1. 在 `docs/knowledge/` 目录下创建新的 `.md` 文件
2. 文件名建议使用英文小写和连字符，如 `react-hooks.md`
3. 复制上面的 Frontmatter 模板到文件开头
4. 填写文档内容
5. 提交到 Git 仓库，GitHub Actions 会自动部署

## 示例文档

- [Vue 3 基础入门](./vue3-basics.md) - 前端开发分类
- [Git 常用命令速查](./git-commands.md) - 开发工具分类

## 注意事项

- 分类名称会自动聚类，无需预先定义
- 标签会在所有文档中自动汇总显示
- 文章按发布日期倒序排列
- 支持 Markdown 所有标准语法和 VitePress 扩展
