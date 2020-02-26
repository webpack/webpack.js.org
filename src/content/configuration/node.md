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
---

The following Node.js options configure whether to polyfill or mock certain [Node.js globals](https://nodejs.org/docs/latest/api/globals.html) and modules. This allows code originally written for the Node.js environment to run in other environments like the browser.

This feature is provided by webpack's internal [`NodeStuffPlugin`](https://github.com/webpack/webpack/blob/master/lib/NodeStuffPlugin.js) plugin. If the target is "web" (default) or "webworker", the [`NodeSourcePlugin`](https://github.com/webpack/webpack/blob/master/lib/node/NodeSourcePlugin.js) plugin is also activated.


## `node`

`boolean = false` `object`

This is an object where each property is the name of a Node global or module and each value may be one of the following...

- `true`: Provide a polyfill.
- `'mock'`: Provide a mock that implements the expected interface but has little or no functionality.
- `'empty'`: Provide an empty object.
- `false`: Provide nothing. Code that expects this object may crash with a `ReferenceError`. Code that attempts to import the module using `require('modulename')` may trigger a `Cannot find module "modulename"` error.

W> Not every Node global supports all four options. The compiler will throw an error for property-value combinations that aren't supported (e.g. `global: 'empty'`). See the sections below for more details.

These are the defaults:

__webpack.config.js__

```javascript
module.exports = {
  //...
  node: {
    global: false,
    __filename: 'mock',
    __dirname: 'mock',
  }
};
```

Since webpack 3.0.0, the `node` option may be set to `false` to completely turn off the `NodeStuffPlugin` and `NodeSourcePlugin` plugins.

## `node.global`

`boolean = true`

See [the source](https://nodejs.org/api/globals.html) for the exact behavior of this object.


## `node.__filename`

`string = 'mock'` `boolean`

Options:

- `true`: The filename of the __input__ file relative to the [`context` option](https://webpack.js.org/configuration/entry-context/#context).
- `false`: The regular Node.js `__filename` behavior. The filename of the __output__ file when run in a Node.js environment.
- `'mock'`: The fixed value `'index.js'`.


## `node.__dirname`

`string = 'mock'` `boolean`

Options:

- `true`: The dirname of the __input__ file relative to the [`context` option](https://webpack.js.org/configuration/entry-context/#context).
- `false`: The regular Node.js `__dirname` behavior. The dirname of the __output__ file when run in a Node.js environment.
- `'mock'`: The fixed value `'/'`.
