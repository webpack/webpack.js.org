---
title: Node
sort: 14
contributors:
  - sokra
  - skipjack
  - oneforwonder
---

These options configure whether to polyfill or mock certain [Node.js globals](https://nodejs.org/docs/latest/api/globals.html) and modules. This allows code originally written for the Node.js environment to run in other environments like the browser. This feature is provided by webpack's internal [`NodeStuffPlugin`](https://github.com/webpack/webpack/blob/master/lib/NodeStuffPlugin.js).


## `node`

`object`

This is an object where each property is the name of a Node global or module and each value may be one of the following...

- `true`: Provide a polyfill.
- `"mock"`: Provide a mock that implements the expected interface but has little or no functionality.
- `"empty"`: Provide an empty object.
- `false`: Provide nothing. Code that expects this object to be defined may crash.

W> Not every Node global supports all four options. The compiler will throw an error for property-value combinations that aren't supported (e.g. `process: 'empty'`). See the sections below for more details.

These are the defaults:

```js
node: {
  console: false,
  global: true,
  process: true,
  __filename: "mock",
  __dirname: "mock",
  Buffer: true,
  setImmediate: true
}
```

Since webpack 3.0.0, the `node` option may be set to `false` to turn off the `NodeSourcePlugin` completely.


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

Default: `true`

Options:

- `true`: The filename of the **input** file relative to the [`context` option](https://webpack.js.org/configuration/entry-context/#context).
- `false`: The regular Node.js `__filename` behavior. The filename of the **output** file when run in a Node.js environment.
- `"mock"`: The fixed value `"index.js"`.


## `node.__dirname`

`boolean | "mock"`

Default: `true`

Options:

- `true`: The dirname of the **input** file relative to the [`context` option](https://webpack.js.org/configuration/entry-context/#context).
- `false`: The regular Node.js `__dirname` behavior. The dirname of the **output** file when run in a Node.js environment.
- `"mock"`: The fixed value `"/"`.


## `node.Buffer`

`boolean | "mock"`

Default: `true`


## `node.setImmediate`

`boolean | "mock" | "empty"`

Default: `true`


## Other node core libraries

`boolean | "mock" | "empty"`

Many other Node.js core libraries can be configured as well. See the list of [Node.js core libraries and their polyfills](https://github.com/webpack/node-libs-browser).

By default, Webpack will polyfill each library if there is a known polyfill or do nothing if there is not one.

Example:

```js
node: {
  dns: "mock",
  fs: "empty",
  path: true,
  url: false
}
```

