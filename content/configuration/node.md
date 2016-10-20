---
title: Node
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

?> Elaborate on this section. What does "mock" or "empty" do? Does `<node builtin>` in the current documentation mean you can enable, disable, or polyfill any global node functions? (it seems `setImmediate` is the example for that)