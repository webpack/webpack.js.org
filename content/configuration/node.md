---
title: Node
sort: 14
contributors:
  - sokra
  - skipjack
---

## `node`

`object`

Customize the NodeJS environment using polyfills or mocks:

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