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

<<<<<<< HEAD
### `fallback` {#fallback}

类型： `Boolean`
默认值： `false`

是否需要支持非 worker 环境的回退。
=======
|                 Name                  |             Type             |             Default             | Description                                                                       |
| :-----------------------------------: | :--------------------------: | :-----------------------------: | :-------------------------------------------------------------------------------- |
|        **[`worker`](#worker)**        |      `{String\|Object}`      |            `Worker`             | Allows to set web worker constructor name and options                             |
|    **[`publicPath`](#publicpath)**    |     `{String\|Function}`     |  based on `output.publicPath`   | specifies the public URL address of the output files when referenced in a browser |
|      **[`filename`](#filename)**      |     `{String\|Function}`     |   based on `output.filename`    | The filename of entry chunks for web workers                                      |
| **[`chunkFilename`](#chunkfilename)** |          `{String}`          | based on `output.chunkFilename` | The filename of non-entry chunks for web workers                                  |
|        **[`inline`](#inline)**        | `'no-fallback'\|'fallback'`  |           `undefined`           | Allow to inline the worker as a `BLOB`                                            |
|      **[`esModule`](#esmodule)**      |         `{Boolean}`          |             `true`              | Use ES modules syntax                                                             |

### `worker`

Type: `String|Object`
Default: `Worker`

Set the worker type.

#### `String`

Allows to set web worker constructor name.
>>>>>>> b793da3ee7429e76656aedf213f1527c3a2c1a71

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

<<<<<<< HEAD
### `inline` {#inline}

类型： `Boolean`
默认值： `false`

你也可以使用 `inline` 参数，将 worker 内联为一个 BLOB。
=======
#### `Object`

Allow to set web worker constructor name and options.

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

### `publicPath`

Type: `String|Function`
Default: based on `output.publicPath`

The `publicPath` specifies the public URL address of the output files when referenced in a browser.
If not specified, the same public path used for other webpack assets is used.

#### `String`
>>>>>>> b793da3ee7429e76656aedf213f1527c3a2c1a71

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

<<<<<<< HEAD
*注意：内联模式还会为不支持内联 worker 的浏览器创建 chunk， 要禁用此行为，只需将  `fallback` 参数设置为 `false`。*
=======
#### `Function`
>>>>>>> b793da3ee7429e76656aedf213f1527c3a2c1a71

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

<<<<<<< HEAD
### `name` {#name}

类型： `String`
默认值： `[hash].worker.js`

使用 `name` 参数，为输出的脚本设置一个自定义名称。
名称可能含有 `[hash]` 字符串，为了缓存会被替换为依赖内容哈希值。
只使用 `name` 时，`[hash]` 会被忽略。
=======
### `filename`

Type: `String|Function`
Default: based on `output.filename`, adding `worker` suffix, for example - `output.filename: '[name].js'` value of this option will be `[name].worker.js`

The filename of entry chunks for web workers.

#### `String`

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

#### `Function`
>>>>>>> b793da3ee7429e76656aedf213f1527c3a2c1a71

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

<<<<<<< HEAD
### publicPath {#publicpath}

类型： `String`
默认值： `null`

重写 worker 脚本的下载路径。
如果未指定， 则使用与其他 webpack 资源相同的公共路径。
=======
### `chunkFilename`

Type: `String`
Default: based on `output.chunkFilename`, adding `worker` suffix, for example - `output.chunkFilename: '[id].js'` value of this option will be `[id].worker.js`

The filename of non-entry chunks for web workers.
>>>>>>> b793da3ee7429e76656aedf213f1527c3a2c1a71

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

<<<<<<< HEAD
### workerType {#workertype}
=======
### `inline`
>>>>>>> b793da3ee7429e76656aedf213f1527c3a2c1a71

Type: `'fallback' | 'no-fallback'`
Default: `undefined`

Allow to inline the worker as a `BLOB`.

Inline mode with the `fallback` value will create file for browsers without support web workers, to disable this behavior just use `no-fallback` value.

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

### `esModule`

Type: `Boolean`
Default: `true`

By default, `worker-loader` generates JS modules that use the ES modules syntax.

You can enable a CommonJS modules syntax using:

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

<<<<<<< HEAD
### 集成 ES 模块 {#integrating-with-es-modules}

*注意：如果配置好 [`babel-loader`](https://github.com/babel/babel-loader) ， 你甚至可以使用 ES2015 模块。*
=======
### Integrating with ES6+ features

You can even use ES6+ features if you have the [`babel-loader`](https://github.com/babel/babel-loader) configured.
>>>>>>> b793da3ee7429e76656aedf213f1527c3a2c1a71

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

<<<<<<< HEAD
为了集成 TypeScript，在导出 worker 时，你需要声明一个自定义模块。
=======
To integrate with TypeScript, you will need to define a custom module for the exports of your worker.
>>>>>>> b793da3ee7429e76656aedf213f1527c3a2c1a71

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

<<<<<<< HEAD
[`WebWorkers`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 受到 [同源策略](https://en.wikipedia.org/wiki/Same-origin_policy) 的限制， 如果 `webpack` 资源的访问服务和应用程序不是同源，浏览器就会拦截其下载。
如果在 CDN 域下托管资源， 通常就会出现这种情况。 
甚至从 `webpack-dev-server` 下载时都会被拦截。
有两种解决方法：
=======
[`WebWorkers`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) are restricted by a [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy), so if your `webpack` assets are not being served from the same origin as your application, their download may be blocked by your browser.
This scenario can commonly occur if you are hosting your assets under a CDN domain.
Even downloads from the `webpack-dev-server` could be blocked.

There are two workarounds:
>>>>>>> b793da3ee7429e76656aedf213f1527c3a2c1a71

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
