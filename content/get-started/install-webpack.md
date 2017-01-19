---
title: 安装
contributors:
  - pksjce
  - bebraw
sort: 1
---

### 预备知识

在开始前，先要确认你已经安装 [Node.js](https://nodejs.org/en/) 的最新版本。使用 Node.js 最新的 LTS 版本，是理想的启动入口。使用旧版本，你可能遇到各种问题，因为它们可能缺少 webpack 功能或缺少相关 package 包。

注意，本文档适用于 webpack 2，目前还尚未发布 stable 版本。你可以通过在安装时使用 ` beta ` 标签来获取最新beta版本（查看下文）。

### 全局安装

``` bash
npm install webpack@beta -g
```

现在可以在全局使用 `webpack` 命令了。

然而，这并不是推荐用法。这会将你的 webpack 锁定到特定版本，并且可能在使用 webpack 不同版本的项目中失败。接下来的章节向你介绍如何在项目中本地安装 webpack。

### 本地安装

``` bash
npm install webpack --save-dev

npm install webpack@<version> --save-dev
```

如果你在项目中使用了 npm scripts，npm 会尝试在本地模块中查找安装的 webpack，这种本地安装的方式有助于查找本地的 webpack。

```json
"scripts": {
	"start": "webpack --config mywebpack.config.js"
}
```

这是标准和推荐的用法。

T> 要运行本地安装的 webpack，你可以通过 `node_modules/.bin/webpack` 访问其 bin 版本


### 前沿领域

如果你热衷于使用 webpack 提供的最新版本（当心 - 可能不稳定），你可以直接从 webpack 仓库中安装

``` bash
npm install webpack/webpack#<tagname/branchname>
```

***

> 原文：https://webpack.js.org/get-started/install-webpack/