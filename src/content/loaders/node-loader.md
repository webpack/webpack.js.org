---
title: node-loader
source: https://raw.githubusercontent.com/webpack-contrib/node-loader/master/README.md
edit: https://github.com/webpack-contrib/node-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/node-loader
translators:
  - jacob-lcs
  - QC-L
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



处理 [Node.js 插件（add-ons）](https://nodejs.org/dist/latest/docs/api/addons.html) 的 loader。

允许使用 `.node` 拓展名与原生 node module 相关联。

> ⚠ `node-loader` 只对 `node`/`electron-main`/`electron-main` 生效。

## 快速开始 {#getting-started}

首先，你需要安装 `node-loader`：

```console
$ npm install node-loader --save-dev
```

设置 `target` 配置项为 `node`/`electron-main`/`electron-main`，并且需禁用 `__dirname` 全局变量。

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

### 内联 {#inline}

**index.js**

```js
import node from "node-loader!./file.node";
```

然后通过你喜欢的方式运行 `webpack`。

### 配置 {#configuration}

**index.js**

```js
import node from "file.node";
```

然后在你的 `webpack` 配置中添加该 loader。例如：

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

然后通过你喜欢的方式运行 `webpack`。

## 选项 {#options}

|         Name          |         Type         |         Default         | Description                                                  |
| :-------------------: | :------------------: | :---------------------: | :----------------------------------------------------------- |
| **[`flags`](#flags)** |      `{Number}`      |       `undefined`       | 启用/禁用 `url`/`image-set` 函数处理       |
|  **[`name`](#name)**  | `{String\|Function}` | `'[contenthash].[ext]'` | 指定一个或多个目标文件的自定义文件名模板。 |

### `flags` {#flags}

类型：`Number`
默认值：`undefined`

<<<<<<< HEAD
`flags` 参数是一个允许指定 dlopen 行为的整数。
请查阅 [`process.dlopen`][https://nodejs.org/api/process.html#process_process_dlopen_module_filename_flags] 文档了解更多。
=======
The `flags` argument is an integer that allows to specify dlopen behavior.
See the [`process.dlopen`](https://nodejs.org/api/process.html#process_process_dlopen_module_filename_flags) documentation for details.
>>>>>>> 57a8d1e8bd34e8a7c6aea9966d973abfddb8dfe6

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

### `name` {#name}

类型：`String|Function`
默认值：`'[contenthash].[ext]'`

指定一个或多个目标文件的自定义文件名模板。

#### `String` {#string}

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

#### `Function` {#function}

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

## 贡献 {#contributing}

如果你还未阅读贡献指南，请抽时间进行阅读。

[贡献指南](https://github.com/webpack-contrib/node-loader/blob/master/.github/CONTRIBUTING.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/node-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/node-loader.svg
[npm-url]: https://npmjs.com/package/node-loader
[node]: https://img.shields.io/node/v/node-loader.svg
[node-url]: https://nodejs.org/
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
