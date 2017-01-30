---
title: 加载器(Loaders)
sort: 1
contributors:
  - ev1stensberg
  - TheLarkInn
  - manekinekko
  - SpaceK33z
---

正如在[概念](/concepts/loaders)中解释说明，loader 是对应用程序中的资源文件进行转换的转换器。举个例子，loader 允许你配置 webpack 如何去处理 CSS 文件。

?> Move the general usage documentation to the [concepts page](/concepts/loaders) and focus here on describing the available loaders (similar to [plugins](/plugins)).

loader 通常以 npm 包的形式存在，你可以用将它作为一个开发依赖(development dependency)来安装：

```sh
npm install css-loader --save-dev
```

在应用程序中可以通过三种方式使用 loader：

* 通过 webpack 配置
* 在 `require` 语句中显式引用
* 通过命令行接口(CLI)

## 通过 webpack 配置

[`module.rules`](https://webpack.js.org/configuration/module/#module-rules) 允许你在 webpack 配置中指定多个 loader。
这是一个非常简洁的展示 loader 的方式，在代码清晰的同时，你也能对每个对应的 loader 的概况有一个清晰的了解。

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

可以在 `require` 语句（或者 `define`, `require.ensure` 等语句）中指定 loader 。loader 和 loader 或源文件之间用 `!` 分隔。每部分都是相对于当前文件的相对路径解析。

```js
require('style-loader!css-loader?modules!./styles.css');
```

可以通过在整个规则(rule)前面加上 `!` 来覆盖配置文件的任意 loader。

可以通过一组查询参数传递 loader 选项，就像在 web 上一样（`?key=value&foo=bar`），也可以使用一个 JSON 对象（`?{"key":"value","foo":"bar"}`）。

T> 尽量使用 `module.rules`，因为这可以减少源代码中对 loader 的引用，并且能够更快地进行调试或者定位到某个 loader 错误，避免代码变得越来越糟糕。

## 通过命令行接口(CLI)

你也可以通过命令行接口来使用 loader ：

```sh
webpack --module-bind jade --module-bind 'css=style!css'
```

这里对 “.jade” 文件使用了 “jade” loader，对 “.css” 文件使用了 “style” loader 和 “css” loader。

***

> 原文：https://webpack.js.org/loaders/