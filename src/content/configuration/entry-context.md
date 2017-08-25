---
title: 入口和上下文(Entry and Context)
sort: 4
contributors:
  - sokra
  - skipjack
  - tarang9211
---

entry 对象是用于 webpack 查找启动并构建 bundle。其上下文是入口文件所处的目录的绝对路径的字符串。


## `context`

`string`

基础目录，**绝对路径**，用于从配置中解析入口起点(entry point)和 loader

``` js
context: path.resolve(__dirname, "app")
```

默认使用当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory - 当前执行路径)。

---


## `entry`

`string | [string] | object { <key>: string | [string] } | (function: () => string | [string] | object { <key>: string | [string] })`

起点或是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行。

动态加载的模块**不是**入口起点。

简单规则：每个 HTML 页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。

```js
entry: {
  home: "./home.js",
  about: "./about.js",
  contact: "./contact.js"
}
```


### 命名

如果传入一个字符串或字符串数组，chunk 会被命名为 `main`。如果传入一个对象，则每个键(key)会是 chunk 的名称，该值描述了 chunk 的入口起点。


### 动态入口

```js
entry: () => './demo'
```

或

```js
entry: () => new Promise((resolve) => resolve(['./demo', './demo2']))
```

当结合 [`output.library`](/configuration/output#output-library) 选项时：如果传入数组，则只导出最后一项。

***

> 原文：https://webpack.js.org/configuration/entry-context/
