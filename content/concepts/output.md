---
title: 输出(Output)
sort: 3
contributors:
  - TheLarkInn
  - chyipin
  - rouzbeh84
---

此选项影响 compilation 对象的输出。`output` 选项控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个`入口`起点，但只指定一个`输出`配置。

## 用法(Usage)

在 webpack 中配置 `output` 属性的最低要求是，将它的值设置为一个对象，包括以下两点：

编译文件的`文件名(filename)`，首选推荐：`// main.js || bundle.js || index.js`

[`output.path`](#output-path) 对应一个**绝对路径**，此路径是你希望一次性打包的目录。

**webpack.config.js**

```javascript
const config = {
  output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
  }
};

module.exports = config;
```

## 选项(Options)

以下列出可以向 `output` 属性传入的值。

### `output.chunkFilename`

非入口的 chunk(non-entry chunk) 的文件名，路径相对于 `output.path` 目录。

`[id]` 被 chunk 的 id 替换。

`[name]` 被 chunk 的 name 替换（或者，在 chunk 没有 name 时使用 id 替换）。

`[hash]` 被 compilation 生命周期的 hash 替换。

`[chunkhash]` 被 chunk 的 hash 替换。

### `output.crossOriginLoading`

此选项可以启用跨域加载(cross-origin loading) chunk。

可选的值有：

`false` - 禁用跨域加载

`"anonymous"` - 启用跨域加载。当使用 `anonymous` 时，发送不带凭据(credential)的请求。

`"use-credentials"` - 启用跨域加载。发送带凭据(credential)的请求。

更多跨域加载信息请查看 [MDN](https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-crossorigin)

> 默认值：`false`

> 参考 [library](/guides/author-libraries/)

> 参考 [开发工具](/guides/development/#choosing-a-tool)

### `output.devtoolLineToLine`

所有/指定模块启用行到行映射(line-to-line mapped)模式。行到行映射模式使用一个简单的 SourceMap，即生成资源(generated source)的每一行都映射到原始资源(original source)的同一行。这是一个可做性能优化之处。当你需要更好的性能，并且只要确保输入行(input line)和生成行(generated line)匹配时，才会考虑启用。

`true` 在所有模块启用（不推荐）

`{test, include, exclude}` 对象，对特定文件启用（类似于 `module.loaders`）。

> 默认值：`false`

### `output.filename`

指定硬盘每个输出文件的名称。在这里你**不能**指定为绝对路径！`output.path` 选项规定了文件被写入硬盘的位置。`filename` 仅用于命名每个文件。

**单个入口**

```javascript
{
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build'
  }
}

// 写入到硬盘：./build/bundle.js
```

**多个入口**

如果你的配置创建了多个 "chunk"（例如使用多个入口起点或使用类似 CommonsChunkPlugin 的插件），你应该使用以下的替换方式来确保每个文件名都不重复。

`[name]` 被 chunk 的 name 替换。

`[hash]` 被 compilation 生命周期的 hash 替换。

`[chunkhash]` 被 chunk 的 hash 替换。

``` javascript
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build'
  }
}

// 写入到硬盘：./build/app.js, ./build/search.js
```

### `output.hotUpdateChunkFilename`

热更新 chunk(Hot Update Chunk) 的文件名。它们在 `output.path` 目录中。

`[id]` 被 chunk 的 id 替换。

`[hash]` 被 compilation 生命周期的 hash 替换。（最后一个 hash 存储在记录中）

> 默认值：`"[id].[hash].hot-update.js"`

### `output.hotUpdateFunction`

webpack 中用于异步加载(async load)热更新(hot update) chunk 的 JSONP 函数。

> 默认值：`"webpackHotUpdate"`

### `output.hotUpdateMainFilename`

热更新主文件(hot update main file)的文件名。

`[hash]` 被 compilation 生命周期的 hash 替换。（最后一个 hash 存储在记录中）

> 默认值：`"[hash].hot-update.json"`

### `output.jsonpFunction`

webpack 中用于异步加载(async loading) chunk 的 JSONP 函数。

较短的函数可能会减少文件大小。当单页有多个 webpack 实例时，请使用不同的标识符(identifier)。

> 默认值：`"webpackJsonp"`

### `output.library`

如果设置此选项，会将 bundle 导出为 library。`output.library` 是 library 的名称。

如果你正在编写 library，并且需要将其发布为单独的文件，请使用此选项。

### `output.libraryTarget`

library 的导出格式

`"var"` - 导出为一个变量：`var Library = xxx`（默认）

`"this"` - 导出为 `this` 的一个属性：`this["Library"] = xxx`

`"commonjs"` - 导出为 `exports` 的一个属性：`exports["Library"] = xxx`

`"commonjs2"` - 通过 `module.exports`：`module.exports = xxx` 导出

`"amd"` - 导出为 AMD（可选命名 - 通过 library 选项设置名称）

`"umd"` - 导出为 AMD，CommonJS2 或者导出为 root 的属性

> 默认值：`"var"`

如果 `output.library` 未设置，但是 `output.libraryTarget` 被设置为 `var` 以外的值，则「所导出对象」的每个属性都被复制到「对应的被导出对象」上（除了 `amd`，`commonjs2` 和 `umd`）。

### `output.path`

导出目录为**绝对路径**（必选项）。

`[hash]` 被 compilation 生命周期的 hash 替换。


**config.js**

``` javascript
output: {
	path: "/home/proj/public/assets",
	publicPath: "/assets/"
}
```

**index.html**
``` html
<head>
  <link href="/assets/spinner.gif"/>
</head>
```

接下来是一个更复杂的例子，来说明对资源使用 CDN 和 hash。

**config.js**

```javascript
output: {
    path: "/home/proj/cdn/assets/[hash]",
    publicPath: "http://cdn.example.com/assets/[hash]/"
}
```

**注意：**在编译时不知道最终输出文件的 `publicPath` 的情况下，`publicPath` 可以留空，并且在入口起点文件运行时动态设置。如果你在编译时不知道 `publicPath`，你可以先忽略它，并且在入口起点设置 `__webpack_public_path__`。

```javascript
 __webpack_public_path__ = myRuntimePublicPath

// 其他的应用程序入口
```

### `output.sourceMapFilename`

JavaScript 模块的 Source Map 文件名。

* `[file]` 被 JavaScript 文件的文件名替换。
* `[id]` 被 chunk 的 id 替换。
* `[hash]` 被 compilation 生命周期的 hash 替换。
* `[contenthash]` 被提取文件的 hash 替换（从 webpack 3.0.0 开始）。

> 默认值：`"[file].map"`

***

> 原文：https://webpack.js.org/concepts/output/