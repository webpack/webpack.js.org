---
title: 安装
contributors:
  - pksjce
  - bebraw
  - simon04
sort: 10
---

### 前提条件

在开始前，先要确认你已经安装 [Node.js](https://nodejs.org/en/) 的最新版本。使用 Node.js 最新的 LTS 版本，是理想的起步。使用旧版本，你可能遇到各种问题，因为它们可能缺少 webpack 功能或缺少相关 package 包。

下一节会谈到如何在项目本地安装 webpack。

### 本地安装

The latest webpack release is: [![GitHub release](https://img.shields.io/github/release/webpack/webpack.svg?style=flat-square)](https://github.com/webpack/webpack/releases)

``` bash
npm install --save-dev webpack

npm install --save-dev webpack@<version>
```

如果你在项目中使用了 npm scripts，npm 首先会在本地模块中寻找 webpack。这是一个实用的小技巧。

```json
"scripts": {
	"start": "webpack --config mywebpack.config.js"
}
```

上面是 npm 的标准配置，也是我们推荐的实践。

T> 当你在本地安装 webpack 后，你能够从 `node_modules/.bin/webpack` 访问它的 bin 版本。


### 全局安装

W> 注意，不推荐全局安装 webpack。这会锁定 webpack 到指定版本，并且在使用不同的 webpack 版本的项目中可能会导致构建失败。

``` bash
npm install --global webpack
```

`webpack` 命令现在可以全局执行了。


### 体验最新版本

如果你热衷于使用最新版本的 webpack（注意了，这可是不稳定的版本），你可以直接从 webpack 的仓库中安装：

``` bash
npm install webpack/webpack#<tagname/branchname>
```

***

> 原文：https://webpack.js.org/guides/installation/