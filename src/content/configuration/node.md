---
title: Node
sort: 14
contributors:
  - sokra
  - skipjack
  - oneforwonder
  - Rob--W
  - byzyk
---

These options configure whether to polyfill or mock certain [Node.js globals](https://nodejs.org/docs/latest/api/globals.html) and modules. This allows code originally written for the Node.js environment to run in other environments like the browser.

This feature is provided by webpack's internal [`NodeStuffPlugin`](https://github.com/webpack/webpack/blob/master/lib/NodeStuffPlugin.js) plugin. If the target is "web" (default) or "webworker", the [`NodeSourcePlugin`](https://github.com/webpack/webpack/blob/master/lib/node/NodeSourcePlugin.js) plugin is also activated.


## `node`

`object`

This is an object where each property is the name of a Node global or module and each value may be one of the following...

- `true`: Provide a polyfill.
- `"mock"`: Provide a mock that implements the expected interface but has little or no functionality.
- `"empty"`: Provide an empty object.
- `false`: Provide nothing. Code that expects this object may crash with a `ReferenceError`. Code that attempts to import the module using `require('modulename')` may trigger a `Cannot find module "modulename"` error.

W> Not every Node global supports all four options. The compiler will throw an error for property-value combinations that aren't supported (e.g. `process: 'empty'`). See the sections below for more details.

These are the defaults:

```js
module.exports = {
  //...
  node: {
    console: false,
    global: true,
    process: true,
    __filename: 'mock',
    __dirname: 'mock',
    Buffer: true,
    setImmediate: true

    // See "Other node core libraries" for additional options.
  }
};
```

Since webpack 3.0.0, the `node` option may be set to `false` to completely turn off the `NodeStuffPlugin` and `NodeSourcePlugin` plugins.


## `node.console`

`boolean | "mock"`

Default: `false`

The browser provides a `console` object with a very similar interface to the Node.js `console`, so a polyfill is generally not needed.


## `node.process`

`boolean | "mock"`

Default: `true`


## `node.global`

`boolean`

Default: `true`

See [the source](https://github.com/webpack/webpack/blob/master/buildin/global.js) for the exact behavior of this object.


## `node.__filename`

`boolean | "mock"`

Default: `"mock"`

Options:

- `true`: The filename of the __input__ file relative to the [`context` option](https://webpack.js.org/configuration/entry-context/#context).
- `false`: The regular Node.js `__filename` behavior. The filename of the __output__ file when run in a Node.js environment.
- `"mock"`: The fixed value `"index.js"`.


## `node.__dirname`

`boolean | "mock"`

Default: `"mock"`

Options:

- `true`: The dirname of the __input__ file relative to the [`context` option](https://webpack.js.org/configuration/entry-context/#context).
- `false`: The regular Node.js `__dirname` behavior. The dirname of the __output__ file when run in a Node.js environment.
- `"mock"`: The fixed value `"/"`.


## `node.Buffer`

`boolean | "mock"`

Default: `true`


## `node.setImmediate`

`boolean | "mock" | "empty"`

Default: `true`


## Other node core libraries

`boolean | "mock" | "empty"`

W> This option is only activated (via `NodeSourcePlugin`) when the target is unspecified, "web" or "webworker".

Polyfills for Node.js core libraries from [`node-libs-browser`](https://github.com/webpack/node-libs-browser) are used if available, when the `NodeSourcePlugin` plugin is enabled. See the list of [Node.js core libraries and their polyfills](https://github.com/webpack/node-libs-browser#readme).

By default, webpack will polyfill each library if there is a known polyfill or do nothing if there is not one. In the latter case, webpack will behave as if the module name was configured with the `false` value.

T> To import a built-in module, use [`__non_webpack_require__`](/api/module-variables/#__non_webpack_require__-webpack-specific-), i.e. `__non_webpack_require__('modulename')` instead of `require('modulename')`.

Example:

```js
module.exports = {
  //...
  node: {
    dns: 'mock',
    fs: 'empty',
    path: true,
    url: false
  }
};
```
