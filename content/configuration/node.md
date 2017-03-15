---
title: Node
sort: 14
contributors:
  - sokra
  - skipjack
---

## `node`

`object`

使用 polyfill 或 mock 来自定义 NodeJS 环境：

```js
node: {
  console: false,
  global: true,
  process: true,
  Buffer: true,
  __filename: "mock",
  __dirname: "mock",
  setImmediate: true
}
```

?> Elaborate on this section. What does "mock" or "empty" do? Does `<node builtin>` in the current documentation mean you can enable, disable, or polyfill any global Node.js function? (it seems `setImmediate` is the example for that)

***

> 原文：https://webpack.js.org/configuration/node/