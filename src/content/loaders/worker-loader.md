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

## 快速开始

开始之前你需要安装 `worker-loader` ：

```console
$ npm install worker-loader --save-dev
```

### 内敛

**App.js**

```js
import Worker from 'worker-loader!./Worker.js';
```

### 配置

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

## 选项

### `fallback`

类型： `Boolean`
默认值： `false`

是否需要支持非 worker 环境的回退。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
        options: { fallback: true },
      },
    ],
  },
};
```

### `inline`

类型： `Boolean`
默认值： `false`

你也可以使用 `inline` 参数，将 worker 内联为一个 BLOB。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
        options: { inline: true },
      },
    ],
  },
};
```

*注意：内联模式还会为不支持内联 worker 的浏览器创建 chunk， 要禁用此行为，只需将  `fallback` 参数设置为 `false`。*

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        loader: 'worker-loader',
        options: { inline: true, fallback: false },
      },
    ],
  },
};
```

### `name`

类型： `String`
默认值： `[hash].worker.js`

使用 `name` 参数，为输出的脚本设置一个自定义名称。
名称可能含有 `[hash]` 字符串，为了缓存会被替换为依赖内容哈希值。
只使用 `name` 时，`[hash]` 会被忽略。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        loader: 'worker-loader',
        options: { name: 'WorkerName.[hash].js' },
      },
    ],
  },
};
```

### publicPath

类型： `String`
默认值： `null`

重写 worker 脚本的下载路径。
如果未指定， 则使用与其他 webpack 资源相同的公共路径。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        loader: 'worker-loader',
        options: { publicPath: '/scripts/workers/' },
      },
    ],
  },
};
```

## Examples

### Basic

worker 文件可以像其他文件导入依赖那样来导入依赖：

**Worker.js**

```js
const _ = require('lodash');

const obj = { foo: 'foo' };

_.has(obj, 'foo');

// Post data to parent thread
self.postMessage({ foo: 'foo' });

// Respond to message from parent thread
self.addEventListener('message', (event) => console.log(event));
```

### 集成 ES 模块

*注意：如果配置好 [`babel-loader`](https://github.com/babel/babel-loader) ， 你甚至可以使用 ES2015 模块。*

**Worker.js**

```js
import _ from 'lodash';

const obj = { foo: 'foo' };

_.has(obj, 'foo');

// Post data to parent thread
self.postMessage({ foo: 'foo' });

// Respond to message from parent thread
self.addEventListener('message', (event) => console.log(event));
```

### 集成 TypeScript

为了集成 TypeScript，在导出 worker 时，你需要声明一个自定义模块。

**typings/worker-loader.d.ts**

```typescript
declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
```

**Worker.ts**

```typescript
const ctx: Worker = self as any;

// 发送数据到父线程
ctx.postMessage({ foo: 'foo' });

// 响应父线程的消息
ctx.addEventListener('message', (event) => console.log(event));
```

**App.ts**

```typescript
import Worker from 'worker-loader!./Worker';

const worker = new Worker();

worker.postMessage({ a: 1 });
worker.onmessage = (event) => {};

worker.addEventListener('message', (event) => {});
```

### 跨域策略

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
        options: { inline: true },
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

## Contributing

如果你从未阅读过我们的贡献指南，请在上面花点时间。

[CONTRIBUTING](https://github.com/webpack-contrib/worker-loader/blob/master/.github/CONTRIBUTING.md)

## License

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
