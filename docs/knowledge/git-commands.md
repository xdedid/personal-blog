---
title: Git 常用命令速查
date: 2026-05-24
category: 开发工具
tags: [Git, 命令行, 工具]
description: Git 日常使用中最常用的命令汇总
---

# Git 常用命令速查

## 基础操作

### 初始化与克隆

```bash
# 初始化新仓库
git init

# 克隆远程仓库
git clone <url>

# 克隆到指定目录
git clone <url> <directory>
```

### 提交流程

```bash
# 查看状态
git status

# 添加文件到暂存区
git add <file>
git add .  # 添加所有更改

# 提交
git commit -m "commit message"

# 推送到远程
git push origin main
```

## 分支管理

```bash
# 查看分支
git branch
git branch -a  # 包含远程分支

# 创建分支
git branch <branch-name>

# 切换分支
git checkout <branch>
git switch <branch>  # Git 2.23+

# 创建并切换
git checkout -b <branch>
git switch -c <branch>

# 合并分支
git merge <branch>

# 删除分支
git branch -d <branch>
```

## 撤销操作

```bash
# 撤销工作区修改
git checkout -- <file>
git restore <file>

# 撤销暂存
git reset HEAD <file>
git restore --staged <file>

# 修改最后一次提交
git commit --amend

# 回退提交
git reset --soft HEAD~1  # 保留修改
git reset --hard HEAD~1  # 丢弃修改
```

## 日志查看

```bash
# 查看日志
git log
git log --oneline  # 简洁模式
git log --graph  # 图形化

# 查看差异
git diff
git diff --staged
```

## 实用技巧

```bash
# 暂存当前修改
git stash
git stash pop

# 查看远程仓库信息
git remote -v

# 拉取并合并
git pull origin main
```
