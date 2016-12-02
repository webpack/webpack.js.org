---
title: 安装
sort: 1
contributors:
  - pksjce
  - xie qianyue
---

### 前提条件

这个文档默认你已经安装了 `node` 和 `npm`。 

### 全局安装

``` bash
npm install webpack -g
```

现在 `webpack` 便全局可用了。

但是我们不推荐你全局安装。全局安装锁定了你的 webpack 版本，这将阻碍你在不同的项目中使用不同的 webpack 版本。下一节会谈到如何在项目本地安装 webpack。

### 本地安装

``` bash
npm install webpack --save-dev

npm install webpack@<version> --save-dev
```

如果你在项目中使用了 npm，npm 首先会在你的本地模块中寻找 webpack。这是一个实用的个小技巧。

```json
"scripts": {
	"start": "webpack --config mywebpack.config.js"
}
```

上面是 npm 的标准配置，也是我们推荐的实践。

T> 当你在本地安装 webpack 后，你能够在 `node_modules/.bin/webpack` 找到它的二进制程序。

### 体验最新版本

如果你热衷于使用最新版本的 webpack（注意了，这可是不稳定的版本），你可以直接从 webpack 的仓库中安装：

``` bash
npm install webpack/webpack#<tagname/branchname>
```
