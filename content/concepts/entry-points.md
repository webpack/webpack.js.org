---
title: 入口
sort: 0
contributors:
  - dear-lizhihua
---

正如我们在[介绍](./)中提到的，在 webpack 配置中有多种方式定义 `entry` 属性。除了解释为什么它可能对你有用，我们还将向你展示如何**能够**配置 `entry` 属性。

## 单入口（简写）语法

用法：`entry: string|Array<string>`

**webpack.config.js**

```javascript
const config = {
  entry: './path/to/my/entry/file.js'
};

module.exports = config;
```

 `entry` 属性的单入口语法是下面的简写：

```javascript
const config = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
```

T> **当你向 `entry` 传入一个数组时会发生什么？**向 `entry` 属性传入 文件路径(file path)数组 将创建**“多个主入口(multi-main entry)”**。当你想要多个依赖文件一起注入，并且将它们的依赖映射到一个“块(chunk)”时，传入数组是非常有用的。

当你正在寻找那些快速为应用程序或只有一个入口的工具（即：一个库）设置的 webpack 配置，这会是个很不错的选择。但是，使用此语法扩展配置没有太多的灵活性。

## 对象语法

用法：`entry: {[entryChunkName: string]: string|Array<string>}`

**webpack.config.js**

```javascript
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

对象语法会比较繁琐。然而，这是应用程序中定义入口的最可扩展的方式。

T> **“webpack 的可扩展配置”**是可重用的，并且可以与其他配置组合使用。这是一种流行的技术，用于将关注点(concern)从环境(environment)、构建目标(build target)、运行时(runtime)中分离。然后使用专门的工具（如 [webpack-merge](https://github.com/survivejs/webpack-merge)）把它们合并在一起。

## 常见场景

以下列出入口配置和它们的实际用例：

#### 入口分离 应用(app) 和 公共库(vendor)

**webpack.config.js**

```javascript
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

**是什么？**从表面上看，这告诉我们 webpack 从 `app.js` 和 `vendors.js` 开始创建依赖图表(dependency graph)。这些图表是完全分离、互相独立的（每个 bundle 中都有一个 webpack 引导(bootstrap)）。在只有一个入口点（不包括公共库）的单页应用中比较常见。

**为什么？**此设置允许你使用`CommonsChunkPlugin`并从 app 包 提取 公共引用(vendor reference) 到 vendor 包，并把公共引用的部分替换为 `__webpack_require__()` 调用。如果应用包中了没有公共代码，那么你可以在 webpack 中实现被称为 [持久缓存](/how-to/cache) 的通用模式。

#### 多页应用

**webpack.config.js**

```javascript
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js',
    vendors: './src/vendors.js'
  }
};
```

**是什么？**我们告诉 webpack 需要 4 个独立分离的依赖图表（如上面的例子）。

**为什么？**在多页应用中，服务器将为您获取一个新的 HTML 文档。页面重新加载新文档，并且资源被重新下载。然而，这给了我们独特的机会去做很多事：

- 使用 `CommonsChunkPlugin` 在每个页面间创建 应用共享代码 的 包文件(bundle)。由于入口点增多，多页应用能够在入口点重用大量代码/模块，这样可以极大的从这些新技术受益。

- 使用在第一个示例中相同的插件和技术设置[持久缓存](/how-to/cache)
