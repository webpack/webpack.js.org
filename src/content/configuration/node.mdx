---
title: Node
sort: 17
contributors:
  - sokra
  - skipjack
  - oneforwonder
  - Rob--W
  - byzyk
  - EugeneHlushko
  - anikethsaha
  - chenxsan
---

The following Node.js options configure whether to polyfill or mock certain [Node.js globals](https://nodejs.org/docs/latest/api/globals.html).

This feature is provided by webpack's internal [`NodeStuffPlugin`](https://github.com/webpack/webpack/blob/master/lib/NodeStuffPlugin.js) plugin.

W> As of webpack 5, You can configure only `global`, `__filename` or `__dirname` under `node` option. If you're looking for how to polyfill `fs` alike in Node.js under webpack 5, please check [resolve.fallback](/configuration/resolve/#resolvefallback) for help.

## `node`

`boolean: false` `object`

**webpack.config.js**

```javascript
module.exports = {
  //...
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
};
```

Since webpack 3.0.0, the `node` option may be set to `false` to completely turn off the `NodeStuffPlugin` plugin.

## `node.global`

`boolean`

T> If you are using a module which needs global variables in it, use `ProvidePlugin` instead of `global`.

See [the Node.js documentation](https://nodejs.org/api/globals.html#globals_global) for the exact behavior of this object.

Options:

- `true`: Provide a polyfill.
- `false`: Provide nothing. Code that expects this object may crash with a `ReferenceError`.

## `node.__filename`

`boolean` `string: 'mock' | 'eval-only'`

Options:

- `true`: The filename of the **input** file relative to the [`context` option](/configuration/entry-context/#context).
- `false`: Webpack won't touch your `__filename` code, which means you have the regular Node.js `__filename` behavior. The filename of the **output** file when run in a Node.js environment.
- `'mock'`: The fixed value `'/index.js'`.
- `'eval-only'`

## `node.__dirname`

`boolean` `string: 'mock' | 'eval-only'`

Options:

- `true`: The dirname of the **input** file relative to the [`context` option](/configuration/entry-context/#context).
- `false`: Webpack won't touch your `__dirname` code, which means you have the regular Node.js `__dirname` behavior. The dirname of the **output** file when run in a Node.js environment.
- `'mock'`: The fixed value `'/'`.
- `'eval-only'`
