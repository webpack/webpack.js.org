---
title: worker-loader
source: https://raw.githubusercontent.com/webpack-contrib/worker-loader/master/README.md
edit: https://github.com/webpack-contrib/worker-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/worker-loader
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



webpack 的 worker loader 模块

## 快速开始 {#getting-started}

开始之前你需要安装 `worker-loader` ：

```console
$ npm install worker-loader --save-dev
```

### 内敛 {#inlined}

__App.js__

```js
import Worker from "worker-loader!./Worker.js";
```

### 配置 {#config}

__webpack.config.js__

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      },
    ],
  },
};
```

__App.js__

```js
import Worker from "./file.worker.js";

const worker = new Worker();

worker.postMessage({ a: 1 });
worker.onmessage = function (event) {};

worker.addEventListener("message", function (event) {});
```

然后，通过你的首选方式去运行 `webpack`。

## 选项 {#options}

|                 选项名                  |             类型             |             默认值             | 描述                                                                       |
| :-----------------------------------: | :--------------------------: | :-----------------------------: | :-------------------------------------------------------------------------------- |
|        __[`worker`](#worker)__        |      `{String\|Object}`      |            `Worker`             | 允许设置 web worker 构造函数的名称和选项                             |
|    __[`publicPath`](#publicpath)__    |     `{String\|Function}`     |  与 `output.publicPath` 相同   | 在浏览器中引用时，指定输出文件的 public url 地址 |
|      __[`filename`](#filename)__      |     `{String\|Function}`     |   与 `output.filename` 相同    | web worker 入口 chunk 的文件名                                      |
| __[`chunkFilename`](#chunkfilename)__ |          `{String}`          | 与 `output.chunkFilename` 相同 | web worker 非入口 chunk 的文件名                                  |
|        __[`inline`](#inline)__        | `'no-fallback'\|'fallback'`  |           `undefined`           | 允许将内联的 web worker 作为 `BLOB`                                            |
|      __[`esModule`](#esmodule)__      |         `{Boolean}`          |             `true`              | 使用 ES 模块语法                                                             |

### `worker` {#worker}

类型：`String|Object`
默认值：`Worker`

设置 worker 的类型，

#### `String` {#string}

允许为 web worker 设置 constructor 的名字。

__webpack.config.js__

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: "worker-loader",
        options: {
          worker: "SharedWorker",
        },
      },
    ],
  },
};
```

#### `Object` {#object}

为 web worker 设置 constructor 的名字和选项。

__webpack.config.js__

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: "worker-loader",
        options: {
          worker: {
            type: "SharedWorker",
            options: {
              type: "classic",
              credentials: "omit",
              name: "my-custom-worker-name",
            },
          },
        },
      },
    ],
  },
};
```

### `publicPath` {#publicpath}

类型：`String|Function`
默认值：与 `output.publicPath` 相同

在浏览器中引用时，`publicPath` 用于指定输出文件的 public URL 地址。
如未定义，则使用与其他 webpack 资源相同的 public 地址。

#### `String` {#string}

__webpack.config.js__

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: "worker-loader",
        options: {
          publicPath: "/scripts/workers/",
        },
      },
    ],
  },
};
```

#### `Function` {#function}

__webpack.config.js__

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: "worker-loader",
        options: {
          publicPath: (pathData, assetInfo) => {
            return `/scripts/${pathData.hash}/workers/`;
          },
        },
      },
    ],
  },
};
```

### `filename` {#filename}

类型：`String|Function`
默认值：与 `output.filename` 相同，会添加 `worker` 后缀，示例 —— `output.filename: '[name].js'` 的选项会变成 `[name].worker.js`

web worker 入口 chunk 的文件名。

#### `String` {#string}

__webpack.config.js__

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: "worker-loader",
        options: {
          filename: "[name].[contenthash].worker.js",
        },
      },
    ],
  },
};
```

#### `Function` {#function}

__webpack.config.js__

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: "worker-loader",
        options: {
          filename: (pathData) => {
            if (
              /\.worker\.(c|m)?js$/i.test(pathData.chunk.entryModule.resource)
            ) {
              return "[name].custom.worker.js";
            }

            return "[name].js";
          },
        },
      },
    ],
  },
};
```

### `chunkFilename` {#chunkfilename}

类型：`String`
默认值：与 `output.chunkFilename` 相同，并在基础上添加 `worker` 后缀，示例 —— `output.chunkFilename: '[id].js'` 选项值会变为 `[id].worker.js`

web worker 非入口 chunk 的文件名。

__webpack.config.js__

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: "worker-loader",
        options: {
          chunkFilename: "[id].[contenthash].worker.js",
        },
      },
    ],
  },
};
```

### `inline` {#inline}

类型：`'fallback' | 'no-fallback'`
默认值：`undefined`

允许将内联的 web worker 作为 `BLOB`。

当 inline 模式设置为 `fallback` 时，会为不支持 web worker 的浏览器创建文件，要禁用此行为，只需将其设置为 `no-fallback` 即可。

__webpack.config.js__

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: "worker-loader",
        options: {
          inline: "fallback",
        },
      },
    ],
  },
};
```

### `esModule` {#esmodule}

类型：`Boolean`
默认值：`true`

默认情况下，`worker-loader` 会生成使用 ES 模块语法的 JS 模块.

如果想启用 CommonJS 模块语法，可使用如下配置:

__webpack.config.js__

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: "worker-loader",
        options: {
          esModule: false,
        },
      },
    ],
  },
};
```

## Examples {#examples}

### Basic {#basic}

worker 文件可以像其他文件导入依赖那样来导入依赖：

__index.js__

```js
import Worker from "./my.worker.js";

var worker = new Worker();

var result;

worker.onmessage = function (event) {
  if (!result) {
    result = document.createElement("div");
    result.setAttribute("id", "result");

    document.body.append(result);
  }

  result.innerText = JSON.stringify(event.data);
};

const button = document.getElementById("button");

button.addEventListener("click", function () {
  worker.postMessage({ postMessage: true });
});
```

__my.worker.js__

```js
onmessage = function (event) {
  var workerResult = event.data;

  workerResult.onmessage = true;

  postMessage(workerResult);
};
```

__webpack.config.js__

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: "worker-loader",
        options: {
          esModule: false,
        },
      },
    ],
  },
};
```

### 集成 ES6+ 特性 {#integrating-with-es6-features}

如果使用 [`babel-loader`](https://github.com/babel/babel-loader) 配置，甚至可以使用 ES6+ 的特性。

__index.js__

```js
import Worker from "./my.worker.js";

const worker = new Worker();

let result;

worker.onmessage = (event) => {
  if (!result) {
    result = document.createElement("div");
    result.setAttribute("id", "result");

    document.body.append(result);
  }

  result.innerText = JSON.stringify(event.data);
};

const button = document.getElementById("button");

button.addEventListener("click", () => {
  worker.postMessage({ postMessage: true });
});
```

__my.worker.js__

```js
onmessage = function (event) {
  const workerResult = event.data;

  workerResult.onmessage = true;

  postMessage(workerResult);
};
```

__webpack.config.js__

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        use: [
          {
            loader: "worker-loader",
          },
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
};
```

### 集成 TypeScript {#integrating-with-typescript}

要与 TypeScript 集成，你需要为 worker 导出一个自定义模块。

#### 使用 `worker-loader!` 加载 {#loadingwidthworkloader}

**typings/worker-loader.d.ts**

```typescript
declare module "worker-loader!*" {
  // You need to change `Worker`, if you specified a different value for the `workerType` option
  class WebpackWorker extends Worker {
    constructor();
  }

  // Uncomment this if you set the `esModule` option to `false`
  // export = WebpackWorker;
  export default WebpackWorker;
}
```

__my.worker.ts__

```typescript
const ctx: Worker = self as any;

// 发送数据到父线程
ctx.postMessage({ foo: "foo" });

// 响应父线程的消息
ctx.addEventListener("message", (event) => console.log(event));
```

__index.ts__

```typescript
import Worker from "worker-loader!./Worker";

const worker = new Worker();

worker.postMessage({ a: 1 });
worker.onmessage = (event) => {};

worker.addEventListener("message", (event) => {});
```

#### 不使用 `worker-loader!` 加载 {#loadingwidthoutworkloader}

另外，你可以通过使用以下符号忽略传递给 `import` 语句的 `worker-loader!` 前缀。
这对于使用非 webpack 运行时环境执行代码很有用
(例如 Jest 使用 [`workerloader-jest-transformer`](https://github.com/astagi/workerloader-jest-transformer)).

**typings/worker-loader.d.ts**

```typescript
declare module "*.worker.ts" {
  // You need to change `Worker`, if you specified a different value for the `workerType` option
  class WebpackWorker extends Worker {
    constructor();
  }

  // Uncomment this if you set the `esModule` option to `false`
  // export = WebpackWorker;
  export default WebpackWorker;
}
```

**my.worker.ts**

```typescript
const ctx: Worker = self as any;

// Post data to parent thread
ctx.postMessage({ foo: "foo" });

// Respond to message from parent thread
ctx.addEventListener("message", (event) => console.log(event));
```

**index.ts**

```typescript
import MyWorker from "./my.worker.ts";

const worker = new MyWorker();

worker.postMessage({ a: 1 });
worker.onmessage = (event) => {};

worker.addEventListener("message", (event) => {});
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      // Place this *before* the `ts-loader`.
      {
        test: /\.worker\.ts$/,
        loader: "worker-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
```

### 跨域策略 {#cross-origin-policy}

[`WebWorkers`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 受到 [同源策略](https://en.wikipedia.org/wiki/Same-origin_policy) 的限制， 如果 `webpack` 资源的访问服务和应用程序不是同源，浏览器就会拦截其下载。
如果在 CDN 域下托管资源， 通常就会出现这种情况。
甚至从 `webpack-dev-server` 下载时都会被拦截。

有两种解决方法：

第一种，通过配置 [`inline`](#inline) 参数，将 worker 作为 blob 内联， 而不是将其作为外部脚本下载

__App.js__

```js
import Worker from "./file.worker.js";
```

__webpack.config.js__

```js
module.exports = {
  module: {
    rules: [
      {
        loader: "worker-loader",
        options: { inline: "fallback" },
      },
    ],
  },
};
```

第二种，通过配置 [`publicPath`](#publicpath) 选项， 重写 worker 脚本的基础下载 URL

__App.js__

```js
// 这会使 worker 从 `/workers/file.worker.js` 下载
import Worker from "./file.worker.js";
```

__webpack.config.js__

```js
module.exports = {
  module: {
    rules: [
      {
        loader: "worker-loader",
        options: { publicPath: "/workers/" },
      },
    ],
  },
};
```

## Contributing {#contributing}

如果你从未阅读过我们的贡献指南，请在上面花点时间。

[CONTRIBUTING](https://github.com/webpack-contrib/worker-loader/blob/master/.github/CONTRIBUTING.md)

## License {#license}

[MIT](https://github.com/webpack-contrib/worker-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/worker-loader.svg
[npm-url]: https://npmjs.com/package/worker-loader
[node]: https://img.shields.io/node/v/worker-loader.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/worker-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/worker-loader
[tests]: https://github.com/webpack-contrib/worker-loader/workflows/worker-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/worker-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/worker-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/worker-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=worker-loader
[size-url]: https://packagephobia.now.sh/result?p=worker-loader
