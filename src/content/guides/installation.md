---
title: 安装
sort: 1
contributors:
  - pksjce
  - bebraw
  - simon04
---

本指南介绍了安装 webpack 的各种方法。


### 前提条件

在开始之前，请确保安装了 [Node.js](https://nodejs.org/en/) 的最新版本。使用 Node.js 最新的长期支持版本(LTS - Long Term Support)，是理想的起步。使用旧版本，你可能遇到各种问题，因为它们可能缺少 webpack 功能以及/或者缺少相关 package 包。


### 本地安装

最新的webpack版本是：

[![GitHub release](https://img.shields.io/npm/v/webpack.svg?label=webpack&style=flat-square&maxAge=3600)](https://github.com/webpack/webpack/releases)

要安装最新版本或特定版本，请运行以下命令之一：

``` bash
npm install --save-dev webpack
npm install --save-dev webpack@<version>
```

对于大多数项目，我们建议本地安装。这可以使我们在引入破坏式变更(breaking change)的依赖时，更容易分别升级项目。通常，webpack 通过运行一个或多个 [npm scripts](https://docs.npmjs.com/misc/scripts)，会在本地 `node_modules` 目录中查找安装的 webpack：

```json
"scripts": {
	"start": "webpack --config webpack.config.js"
}
```

T> 当你在本地安装 webpack 后，你能够从 `node_modules/.bin/webpack` 访问它的 bin 版本。


### 全局安装

以下的 NPM 安装方式，将使 `webpack` 在全局环境下可用：

``` bash
npm install --global webpack
```

W> 不推荐全局安装 webpack。这会将您项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。


## 最新体验版本

如果你热衷于使用最新版本的 webpack，你可以使用以下命令，直接从 webpack 的仓库中安装：

``` bash
npm install webpack@beta
npm install webpack/webpack#<tagname/branchname>
```

安装这些最新体验版本时要小心！它们可能仍然包含 bug，因此不应该用于生产环境。

***

> 原文：https://webpack.js.org/guides/installation/
