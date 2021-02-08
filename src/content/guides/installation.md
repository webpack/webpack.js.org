---
title: 安装
sort: 13
contributors:
  - pksjce
  - bebraw
  - simon04
  - EugeneHlushko
  - sibiraj-s
  - chenxsan
---

本指南介绍了安装 webpack 的各种方法。

## 前提条件 {#prerequisites}

在开始之前，请确保安装了 [Node.js](https://nodejs.org/en/) 的最新版本。使用 Node.js 最新的长期支持版本(LTS - Long Term Support)，是理想的起步。
使用旧版本，你可能遇到各种问题，因为它们可能缺少 webpack 功能，
或者缺少相关 package。

## 本地安装 {#local-installation}

最新的 webpack 正式版本是：

[![GitHub release](https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases)

要安装最新版本或特定版本，请运行以下命令之一：

```bash
npm install --save-dev webpack
# 或指定版本
npm install --save-dev webpack@<version>
```

T> 是否使用 `--save-dev` 取决于你的应用场景。假设你仅使用 webpack 进行构建操作，那么建议你在安装时使用 `--save-dev` 选项，因为可能你不需要在生产环境上使用 webpack。如果需要应用于生产环境，请忽略 `--save-dev` 选项。

如果你使用 webpack v4+ 版本，你还需要安装 [CLI](/api/cli/)。

```bash
npm install --save-dev webpack-cli
```

对于大多数项目，我们建议本地安装。这可以在引入重大更新(breaking change)版本时，更容易分别升级项目。
通常会通过运行一个或多个 [npm scripts](https://docs.npmjs.com/misc/scripts) 以在本地 `node_modules` 目录中查找安装的 webpack，
来运行 webpack：

```json
"scripts": {
  "build": "webpack --config webpack.config.js"
}
```

T> 想要运行本地安装的 webpack，你可以通过 `node_modules/.bin/webpack` 来访问它的二进制版本。另外，如果你使用的是 npm v5.2.0 或更高版本，则可以运行 `npx webpack` 来执行。

## 全局安装 {#global-installation}

通过以下 NPM 安装方式，可以使 `webpack` 在全局环境下可用：

```bash
npm install --global webpack
```

W> **不推荐** 全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，
可能会导致构建失败。

## 最新体验版本 {#bleeding-edge}

如果你热衷于使用最新版本的 webpack，你可以使用以下命令安装 beta 版本，
或者直接从 webpack 的仓库中安装：

```bash
npm install --save-dev webpack@next
# 或特定的 tag/分支
npm install --save-dev webpack/webpack#<tagname/branchname>
```

W> 安装这些最新体验版本时要小心！它们可能仍然包含 bug，因此不应该用于生产环境。
