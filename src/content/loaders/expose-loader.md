---
title: expose-loader
source: https://raw.githubusercontent.com/webpack-contrib/expose-loader/master/README.md
edit: https://github.com/webpack-contrib/expose-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/expose-loader
translators:
  - jacob-lcs
  - wangyiman
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



`expose-loader` 允许暴露一个模块（整体或者部分）给全局对象（`self`、`window` 和 `global`）。

想要获取有关兼容性的进一步提示，请查看官方文档中的 [Shimming](/guides/shimming/)。

## 快速开始 $#getting-started$

首先，你需要安装 `expose-loader`：

```console
$ npm install expose-loader --save-dev
```

（如果你在使用 webpack4，请安装 `expose-loader@1` 并按照 [相应说明](https://v4.webpack.docschina.org/loaders/expose-loader/) 进行配置。）

然后你可以用两种方法来用 `expose-loader`。

## 内联 $#inline$

可以使用 `|` 或者 `%20`（空格）分隔 expose 中的 `globalName`、`moduleLocalName` 和 `override`。
可以在[这里](#syntax)获取文档和语法实例。

> ⚠ `%20` 是查询字符串中的空格，因为你不能在 URL 中使用空格

```js
import $ from "expose-loader?exposes=$,jQuery!jquery";
//
// 将 `jquery` 添加到全局对象中，其名称为 `$` 和 `jQuery`
```

```js
import { concat } from "expose-loader?exposes=_.concat!lodash/concat";
//
// 将 `lodash/concat` 添加到全局对象中，其名称为 `_.concat`
```

```js
import {
  map,
  reduce,
} from "expose-loader?exposes=_.map|map,_.reduce|reduce!underscore";
//
// 将 `underscore` 中的 `map` 和 `reduce` 方法分别添加到全局对象中，其名称为 `_.map` 和 `_.reduce`
```

## 使用配置文件 $#using-configuration$

**src/index.js**

```js
import $ from "jquery";
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
      {
        test: require.resolve("underscore"),
        loader: "expose-loader",
        options: {
          exposes: [
            "_.map|map",
            {
              globalName: "_.reduce",
              moduleLocalName: "reduce",
            },
            {
              globalName: ["_", "filter"],
              moduleLocalName: "filter",
            },
          ],
        },
      },
    ],
  },
};
```

[`require.resolve`](https://nodejs.org/api/modules.html#modules_require_resolve_request_options) 调用是一个 Node.js 函数（和 webpack 进程中的 `require.resolve` 无关）。
`require.resolve` 给出模块的绝对路径 (`"/.../app/node_modules/jquery/dist/jquery.js"`)。
所以 expose 只应用于 `jquery` 模块。并且只会在 bundle 中使用时才会被暴露。

然后用你喜欢的方式运行 `webpack`。

## 配置项 $#options$

|           Name            |                   Type                    |   Default   | Description     |
| :-----------------------: | :---------------------------------------: | :---------: | :-------------- |
| **[`exposes`](#exposes)** | `{String\|Object\|Array<String\|Object>}` | `undefined` | List of exposes |

### `exposes` $#exposes$

类型：`String|Object|Array<String|Object>`
默认值：`undefined`

List of exposes.

#### `String` $#string$

允许用一个 string 来描述 expose。

##### `Syntax` $#syntax$

可以使用 `|` 或者 `%20`（空格）分隔 expose 中的 `globalName`、`moduleLocalName` 和 `override`。

字符串语法 - `[[globalName] [moduleLocalName] [override]]` 或者 `[[globalName]|[moduleLocalName]|[override]]`，含义如下：

- `globalName` - 全局对象的名称，比如 `window.$` 用于浏览器环境（**必填项**）
- `moduleLocalName` - 模块的方法／变量／等的名称（该模块必须导出它）（**可以省略**）
- `override` - 允许覆盖在全局对象中存在的值（**可以省略**）

如果 `moduleLocalName` 没有指定，它将整个模块暴露给全局对象，否则它只暴露 `moduleLocalName` 的值。

**src/index.js**

```js
import _ from "underscore";
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          // 对于 `underscore`，它可以是 `_.map map` 或者 `_.map|map`
          exposes: "jquery",
        },
      },
    ],
  },
};
```

#### `Object` $#object$

允许用一个对象来描述 expose。

##### `globalName` $#globalname$

类型：`String|Array<String>`
默认值：`undefined`

全局对象中的名字。（**必填项**）。

**src/index.js**

```js
import _ from "underscore";
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve("underscore"),
        loader: "expose-loader",
        options: {
          exposes: {
            // 可以是 `['_', 'filter']`
            globalName: "_.filter",
            moduleLocalName: "filter",
          },
        },
      },
    ],
  },
};
```

##### `moduleLocalName` $#modulelocalname$

类型：`String`
默认值：`undefined`

模块中的方法／变量／等的名称（该模块必须导出它）。
如果指定了 `moduleLocalName`，它只暴露 `moduleLocalName` 的值。

**src/index.js**

```js
import _ from "underscore";
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve("underscore"),
        loader: "expose-loader",
        options: {
          exposes: {
            globalName: "_.filter",
            moduleLocalName: "filter",
          },
        },
      },
    ],
  },
};
```

##### `override` $#override$

类型：`Boolean`
默认值：`false`

默认情况下，loader 不会覆盖全局对象中的现有值，因为它是不安全的。
在 `development` 模式下，如果值已经出现在全局对象中则抛出一个错误。
但是你可以使用此选项配置 loader 以覆盖全局对象中的现有值。

为了强制覆盖已经存在在全局对象中的现有值，你可以设置 `override` 选项值为 `true`。

**src/index.js**

```js
import $ from "jquery";
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: {
            globalName: "$",
            override: true,
          },
        },
      },
    ],
  },
};
```

#### `Array` $#array$

**src/index.js**

```js
import _ from "underscore";
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve("underscore"),
        loader: "expose-loader",
        options: {
          exposes: [
            "_.map map",
            {
              globalName: "_.filter",
              moduleLocalName: "filter",
            },
            {
              globalName: ["_", "find"],
              moduleLocalName: "myNameForFind",
            },
          ],
        },
      },
    ],
  },
};
```

它将 **只** 暴露 `map`、`filter` 和 `find` 方法（名称为 `myNameForFind`） 给全局对象。

在浏览器中，这些方法可以在 `windows._.map(..args)`、`windows._.filter(...args)` 和 `windows._.myNameForFind(...args)` 下使用。

## 贡献 $#contributing$

如果你还没有阅读，请花一点时间阅读我们的贡献指南。

[CONTRIBUTING](https://github.com/webpack-contrib/expose-loader/blob/master/.github/CONTRIBUTING.md)

## License $#license$

[MIT](https://github.com/webpack-contrib/expose-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/expose-loader.svg
[npm-url]: https://npmjs.com/package/expose-loader
[node]: https://img.shields.io/node/v/expose-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/expose-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/expose-loader
[tests]: https://github.com/webpack-contrib/expose-loader/workflows/expose-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/expose-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/expose-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/expose-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=expose-loader
[size-url]: https://packagephobia.now.sh/result?p=expose-loader
