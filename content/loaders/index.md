---
title: 加载器（Loader）
sort: 1
contributors:
  - ev1stensberg
  - TheLarkInn
  - manekinekko
  - SpaceK33z
---

正如在[概念](/concepts/loaders)中解释的一样，loader 是一种转换器，用来对应用中的资源文件进行转换。举个例子，loader 允许你配置 webpack 如何去处理 CSS 文件。

Loader 通常以 npm 包的形式存在，你可以用将它作为一个开发依赖来安装：

```sh
npm install css-loader --save-dev
```

在应用中可以通过三种途径去使用 loader：

* 通过 webpack 配置
* 通过 `require` 语句引用
* 通过命令行

## 通过 webpack 配置

[`module.rules`](https://webpack.js.org/configuration/module/#module-rules) 允许你在 webpack 配置中指定数个 loader 。
这是一个非常简洁的展示 loader 的方式，在代码清晰的同时你也能对每个 loader 的概况有一个清晰的了解。

```js
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
```

## 通过 `require`

你可以通过 `require` 语句（或者 `define`, `require.ensure` 等等）指定 loader 。loader 和 loader 或源文件之间用 `!` 分隔。每部分都是相对于当前文件的相对路径解析。

```js
require('style-loader!css-loader?modules!./styles.css');
```
可以在配置文件的规则（rule）之前加上 `!` 来覆盖任一 loader 。

可以通过一组查询参数传递 loader 选项，就像在 web 上一样（`?key=value&foo=bar`），也可以使用一个JSON对象（`?{"key":"value","foo":"bar"}`）。

T> 尽量使用 `module.rules` ，它可以减少源文件中的引用，并且在出错时能让你更快地进行调试或者定位到某个 loader 。

## 通过命令行

你也可以通过命令行来使用 loader ：

```sh
webpack --module-bind jade --module-bind 'css=style!css'
```

这里使用了加载 “.jade” 文件的 “jade” loader 和加载 “.css” 文件的 “style” 与 “css” loader。

***

> 原文：https://webpack.js.org/loaders/