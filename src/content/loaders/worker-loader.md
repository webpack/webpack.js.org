---
title: worker-loader
source: https://raw.githubusercontent.com/webpack-contrib/worker-loader/master/README.md
edit: https://github.com/webpack-contrib/worker-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/worker-loader
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

**App.js**

```js
import Worker from 'worker-loader!./Worker.js';
```

### 配置 {#config}

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
      },
    ],
  },
};
```

**App.js**

```js
import Worker from './file.worker.js';

const worker = new Worker();

worker.postMessage({ a: 1 });
worker.onmessage = function (event) {};

worker.addEventListener('message', function (event) {});
```

然后，通过你的首选方式去运行 `webpack`。

## 选项 {#options}

|                 选项名                  |             类型             |             默认值             | 描述                                                                       |
| :-----------------------------------: | :--------------------------: | :-----------------------------: | :-------------------------------------------------------------------------------- |
|        **[`worker`](#worker)**        |      `{String\|Object}`      |            `Worker`             | 允许设置 web worker 构造函数的名称和选项                             |
|    **[`publicPath`](#publicpath)**    |     `{String\|Function}`     |  与 `output.publicPath` 相同   | 在浏览器中引用时，指定输出文件的 public url 地址 |
|      **[`filename`](#filename)**      |     `{String\|Function}`     |   与 `output.filename` 相同    | web worker 入口 chunk 的文件名                                      |
| **[`chunkFilename`](#chunkfilename)** |          `{String}`          | 与 `output.chunkFilename` 相同 | web worker 非入口 chunk 的文件名                                  |
|        **[`inline`](#inline)**        | `'no-fallback'\|'fallback'`  |           `undefined`           | 允许将内联的 web worker 作为 `BLOB`                                            |
|      **[`esModule`](#esmodule)**      |         `{Boolean}`          |             `true`              | 使用 ES 模块语法                                                             |

### `worker` {#worker}

类型：`String|Object`
默认值：`Worker`

设置 worker 的类型，

#### `String` {#string}

允许为 web worker 设置 constructor 的名字。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: 'worker-loader',
        options: {
          worker: 'SharedWorker',
        },
      },
    ],
  },
};
```

#### `Object` {#object}

为 web worker 设置 constructor 的名字和选项。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: 'worker-loader',
        options: {
          worker: {
            type: 'SharedWorker',
            options: {
              type: 'classic',
              credentials: 'omit',
              name: 'my-custom-worker-name',
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

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: 'worker-loader',
        options: {
          publicPath: '/scripts/workers/',
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
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: 'worker-loader',
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

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: 'worker-loader',
        options: {
          filename: '[name].[contenthash].worker.js',
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
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: 'worker-loader',
        options: {
          filename: (pathData) => {
            if (
              /\.worker\.(c|m)?js$/i.test(pathData.chunk.entryModule.resource)
            ) {
              return '[name].custom.worker.js';
            }

            return '[name].js';
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

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: 'worker-loader',
        options: {
          chunkFilename: '[id].[contenthash].worker.js',
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

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: 'worker-loader',
        options: {
          inline: 'fallback',
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

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: 'worker-loader',
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

**index.js**

```js
import Worker from './my.worker.js';

var worker = new Worker();

var result;

worker.onmessage = function (event) {
  if (!result) {
    result = document.createElement('div');
    result.setAttribute('id', 'result');

    document.body.append(result);
  }

  result.innerText = JSON.stringify(event.data);
};

const button = document.getElementById('button');

button.addEventListener('click', function () {
  worker.postMessage({ postMessage: true });
});
```

**my.worker.js**

```js
onmessage = function (event) {
  var workerResult = event.data;

  workerResult.onmessage = true;

  postMessage(workerResult);
};
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        loader: 'worker-loader',
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

**index.js**

```js
import Worker from './my.worker.js';

const worker = new Worker();

let result;

worker.onmessage = (event) => {
  if (!result) {
    result = document.createElement('div');
    result.setAttribute('id', 'result');

    document.body.append(result);
  }

  result.innerText = JSON.stringify(event.data);
};

const button = document.getElementById('button');

button.addEventListener('click', () => {
  worker.postMessage({ postMessage: true });
});
```

**my.worker.js**

```js
onmessage = function (event) {
  const workerResult = event.data;

  workerResult.onmessage = true;

  postMessage(workerResult);
};
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.(c|m)?js$/i,
        use: [
          {
            loader: 'worker-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
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

**typings/worker-loader.d.ts**

```typescript
declare module 'worker-loader!*' {
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

// 发送数据到父线程
ctx.postMessage({ foo: 'foo' });

// 响应父线程的消息
ctx.addEventListener('message', (event) => console.log(event));
```

**index.ts**

```typescript
import Worker from 'worker-loader!./Worker';

const worker = new Worker();

worker.postMessage({ a: 1 });
worker.onmessage = (event) => {};

worker.addEventListener('message', (event) => {});
```

### 跨域策略 {#cross-origin-policy}

[`WebWorkers`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 受到 [同源策略](https://en.wikipedia.org/wiki/Same-origin_policy) 的限制， 如果 `webpack` 资源的访问服务和应用程序不是同源，浏览器就会拦截其下载。
如果在 CDN 域下托管资源， 通常就会出现这种情况。 
甚至从 `webpack-dev-server` 下载时都会被拦截。

有两种解决方法：

第一种，通过配置 [`inline`](#inline) 参数，将 worker 作为 blob 内联， 而不是将其作为外部脚本下载

**App.js**

```js
import Worker from './file.worker.js';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        loader: 'worker-loader',
        options: { inline: 'fallback' },
      },
    ],
  },
};
```

第二种，通过配置 [`publicPath`](#publicpath) 选项， 重写 worker 脚本的基础下载 URL

**App.js**

```js
// 这会使 worker 从 `/workers/file.worker.js` 下载
import Worker from './file.worker.js';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        loader: 'worker-loader',
        options: { publicPath: '/workers/' },
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
