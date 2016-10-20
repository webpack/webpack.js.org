---
title: 输出
sort: 1
contributors:
  - dear-lizhihua
---

选项影响编译输出。`output` 选项控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个`入口`点，但只指定一个`输出`配置。

如果你用了哈希（`[hash]` 或 `[chunkhash]`），请确保模块具有一致的顺序。可以使用 `OccurrenceOrderPlugin` 或 `recordsPath`。

## 用法(Usage)

设置 `output` 属性，只需要在你的 webpack 配置简单的设置输出值：

**webpack.config.js**

```javascript
const config = {
  output: 'blah'
};

module.exports = config;
```

## 选项(Options)

以下列出可以向 `output` 属性传入的值。

### `output.chunkFilename`

非入口块(non-entry chunk)的文件名，作为 `output.path` 目录中的相对路径。

`[id]` 被 chunk 的 id 替换。

`[name]` 被 chunk 的 name 替换（或者当 chunk 没有 name 时使用 id 替换）。

`[hash]` 被编译(compilation)的 hash 替换。

`[chunkhash]` 被 chunk 的 hash 替换。

### `output.crossOriginLoading`

选项启用跨域加载(cross-origin loading) chunk。

可能的值有：

`false` - 禁用跨域加载

`"anonymous"` - 启用跨域加载。当使用 `anonymous` 时，发送请求不带凭据(credential)。

`"use-credentials"` - 启用跨域加载。发送请求带凭据(credential)。

更多跨域加载信息请查看[MDN](https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-crossorigin)

> 默认值：`false`

> 参考[[library and externals]]
> 参考[[Development Tools]]

### `output.devtoolLineToLine`

所有/指定模块启用 行到行映射模式(line-to-line mapped mode)。行到行映射模式使用一个简单的 SourceMap，其中生成源码(generated source)的每一行都映射到原始源码(original source)的同一行。这是一个可以性能优化的地方。当你需要更好的性能，并且要确保输入行(input line)和生成行(generated line)匹配时，才会考虑启用。

`true` 在所有模块启用（不推荐）

`{test, include, exclude}`对象 在特定文件启用（类似于 `module.loaders`）。

> 默认值：disabled

### `output.filename`

指定硬盘每个输出文件的名称。在这里你**不能**指定绝对路径！`output.path` 选项规定了文件被写入硬盘的位置。`filename` 仅用于命名每个文件。

**单个入口**
``` javascript
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

如果你的配置创建了多个 "chunk"（例如使用多个入口点或使用类似 CommonsChunkPlugin 的插件），你应该使用以下的替换方式来确保每个文件名都不重复。

`[name]` 被 chunk 的 name 替换。

`[hash]` 被编译(compilation)的 hash 替换。

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

热更新块(Hot Update Chunk) 的文件名。它们在 `output.path` 目录中。

`[id]` 被 chunk 的 id 替换。

`[hash]` 被编译(compilation)的 hash 替换。（最后一个 hash 存储在记录中）

> 默认值：`"[id].[hash].hot-update.js"`

### `output.hotUpdateFunction`

webpack 用于异步加载(async loading)热更新块(hot update chunk)的 JSONP 函数。

> 默认值：`"webpackHotUpdate"`

### `output.hotUpdateMainFilename`

热更新主文件(hot update main file) 的文件名。

`[hash]` 被编译(compilation)的 hash 替换。（最后一个 hash 存储在记录中）

> 默认值：`"[hash].hot-update.json"`

### `output.jsonpFunction`

webpack 用于异步加载(async loading)块(chunk)的 JSONP 函数。

较短的函数可能会减少文件大小。当单页有多个 webpack 实例时，请使用不同的标识符。

> 默认值：`"webpackJsonp"`

### `output.library`

如果设置过，可将包(bundle)导出为库(library)。`output.library` 是库的名称。

如果你正在编写库并且想要将其发布为一个单文件，请使用此选项。

### `output.libraryTarget`

导出库的格式

`"var"` - 通过设置一个变量导出：`var Library = xxx`（默认）

`"this"` - 通过设置 `this` 的一个属性导出：`this["Library"] = xxx`

`"commonjs"` - 通过设置 `exports` 的一个属性导出：`exports["Library"] = xxx`

`"commonjs2"` - 通过设置 `module.exports`：`module.exports = xxx`

`"amd"` - 导出到 AMD（可选命名 - 通过 library 选项设置名称）

`"umd"` - 导出到 AMD，CommonJS2 或者 root 的一个属性

> 默认值：`"var"`

如果 `output.library` 未设置，但是 `output.libraryTarget` 被设置为 `var` 以外的值，则导出对象的每个属性都被复制（除了 `amd`，`commonjs2` 和 `umd`）。

### `output.path`

以**绝对路径**作为导出目录（必选项）。

`[hash]` 被编译(compilation)的 hash 替换。


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

``` javascript
output: {
	path: "/home/proj/cdn/assets/[hash]",
	publicPath: "http://cdn.example.com/assets/[hash]/"
}
```

**注意：**在编译时不知道最终输出文件的 `publicPath` 的情况下，`publicPath` 可以留空，并且在入口点文件运行时动态设置。如果你在编译时不知道 `publicPath`，你可以先忽略它，并且在入口点设置 `__webpack_public_path__`。

``` javascript
 __webpack_public_path__ = myRuntimePublicPath

// 其他的应用程序入口
```

### `output.sourceMapFilename`

JavaScript 文件 SourceMap 的文件名。它们在 `output.path` 目录中。

`[file]` 被 JavaScript 文件的文件名替换。

`[id]` 被 chunk 的 id 替换。

`[hash]` 被编译(compilation)的 hash 替换。

> 默认值：`"[file].map"`
