---
title: node-loader
source: https://raw.githubusercontent.com/webpack-contrib/node-loader/master/README.md
edit: https://github.com/webpack-contrib/node-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/node-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



A [Node.js add-ons](https://nodejs.org/dist/latest/docs/api/addons.html) loader.

Allows to connect native node modules with `.node` extension.

> ⚠ `node-loader` only works on the `node`/`async-node`/`electron-main`/`electron-renderer`/`electron-preload` targets.

## Getting Started

To begin, you'll need to install `node-loader`:

```console
$ npm install node-loader --save-dev
```

Setup the `target` option to `node`/`async-node`/`electron-main`/`electron-renderer`/`electron-preload` value and do not mock the `__dirname` global variable.

**webpack.config.js**

```js
module.exports = {
  target: "node",
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ],
  },
};
```

### Inline

**index.js**

```js
import node from "node-loader!./file.node";
```

And run `webpack` via your preferred method.

### Configuration

**index.js**

```js
import node from "file.node";
```

Then add the loader to your `webpack` config. For example:

**webpack.config.js**

```js
module.exports = {
  target: "node",
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ],
  },
};
```

And run `webpack` via your preferred method.

## Options

|         Name          |         Type         |         Default         | Description                                                  |
| :-------------------: | :------------------: | :---------------------: | :----------------------------------------------------------- |
| **[`flags`](#flags)** |      `{Number}`      |       `undefined`       | Enables/Disables `url`/`image-set` functions handling        |
|  **[`name`](#name)**  | `{String\|Function}` | `'[contenthash].[ext]'` | Specifies a custom filename template for the target file(s). |

### `flags`

Type: `Number`
Default: `undefined`

The `flags` argument is an integer that allows to specify dlopen behavior.
See the [`process.dlopen`](https://nodejs.org/api/process.html#process_process_dlopen_module_filename_flags) documentation for details.

**index.js**

```js
import node from "file.node";
```

**webpack.config.js**

```js
const os = require("os");

module.exports = {
  target: "node",
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
        options: {
          flags: os.constants.dlopen.RTLD_NOW,
        },
      },
    ],
  },
};
```

### `name`

Type: `String|Function`
Default: `'[contenthash].[ext]'`

Specifies a custom filename template for the target file(s).

#### `String`

**webpack.config.js**

```js
module.exports = {
  target: "node",
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
};
```

#### `Function`

**webpack.config.js**

```js
module.exports = {
  target: "node",
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
        options: {
          name(resourcePath, resourceQuery) {
            // `resourcePath` - `/absolute/path/to/file.js`
            // `resourceQuery` - `?foo=bar`

            if (process.env.NODE_ENV === "development") {
              return "[path][name].[ext]";
            }

            return "[contenthash].[ext]";
          },
        },
      },
    ],
  },
};
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](https://github.com/webpack-contrib/node-loader/blob/master/.github/CONTRIBUTING.md)

## License

[MIT](https://github.com/webpack-contrib/node-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/node-loader.svg
[npm-url]: https://npmjs.com/package/node-loader
[node]: https://img.shields.io/node/v/node-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/node-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/node-loader
[tests]: https://github.com/webpack-contrib/node-loader/workflows/node-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/node-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/node-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/node-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=node-loader
[size-url]: https://packagephobia.now.sh/result?p=node-loader
