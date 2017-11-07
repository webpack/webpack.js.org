---
title: worker-loader
source: https://raw.githubusercontent.com/webpack-contrib/worker-loader/master/README.md
edit: https://github.com/webpack-contrib/worker-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/worker-loader
---
This loader registers the script as <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API">Web Worker</a>


## 安装

```bash
npm i -D worker-loader
```

## <a href="https://webpack.js.org/concepts/loaders">用法</a>

##

**App.js**
```js
import Worker from 'worker-loader!./Worker.js';
```

### `Config`

**webpack.config.js**
```js
{
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  }
}
```

**App.js**
```js
import Worker from './file.worker.js';

const worker = new Worker();

worker.postMessage({ a: 1 });
worker.onmessage = function (event) {};

worker.addEventListener("message", function (event) {});
```

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|[**`name`**](#name)|`{String}`|`[hash].worker.js`|Set a custom name for the output script|
|[**`inline`**](#inline)|`{Boolean}`|`false`|Inline the worker as a BLOB|
|[**`fallback`**](#fallback)|`{Boolean}`|`false`|Require a fallback for non-worker supporting environments|
|[**`publicPath`**](#publicPath)|`{String}`|`null`|Override the path from which worker scripts are downloaded|

### `name`

To set a custom name for the output script, use the `name` parameter. The name may contain the string `[hash]`, which will be replaced with a content dependent hash for caching purposes

*webpack.config.js**
```js
{
  loader: 'worker-loader',
  options: { name: 'WorkerName.[hash].js' }
}
```

### `inline`

You can also inline the worker as a BLOB with the `inline` parameter

**webpack.config.js**
```js
{
  loader: 'worker-loader',
  options: { inline: true }
}
```

> ℹ️  Inline mode will also create chunks for browsers without support for inline workers, to disable this behavior just set `fallback` parameter as `false`

**webpack.config.js**
```js
{
  loader: 'worker-loader'
  options: { inline: true, fallback: false }
}
```

### `fallback`

Require a fallback for non-worker supporting environments

**webpack.config.js**
```js
{
  loader: 'worker-loader'
  options: { fallback: false }
}
```

### `publicPath`

Overrides the path from which worker scripts are downloaded. If not specified, the same public path used for other
webpack assets is used

**webpack.config.js**
```js
{
  loader: 'worker-loader'
  options: { publicPath: '/scripts/workers/' }
}
```

## Examples

The worker file can import dependencies just like any other file

**Worker.js**
```js
const _ = require('lodash')

const obj = { foo: 'foo' }

_.has(obj, 'foo')

// Post data to parent thread
self.postMessage({ foo: 'foo' })

// Respond to message from parent thread
self.addEventListener('message', (event) => console.log(event))
```

### `Integrating with ES2015 Modules`

> ℹ️  You can even use ES2015 Modules if you have the [`babel-loader`](https://github.com/babel/babel-loader) configured.

**Worker.js**
```js
import _ from 'lodash'

const obj = { foo: 'foo' }

_.has(obj, 'foo')

// Post data to parent thread
self.postMessage({ foo: 'foo' })

// Respond to message from parent thread
self.addEventListener('message', (event) => console.log(event))
```

### `Integrating with TypeScript`

To integrate with TypeScript, you will need to define a custom module for the exports of your worker

**typings/custom.d.ts**
```ts
declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export = WebpackWorker;
}
```

**Worker.ts**
```ts
const ctx: Worker = self as any;

// Post data to parent thread
ctx.postMessage({ foo: "foo" });

// Respond to message from parent thread
ctx.addEventListener("message", (event) => console.log(event));
```

**App.ts**
```ts
import Worker = require("worker-loader!./Worker");

const worker = new Worker();

worker.postMessage({ a: 1 });
worker.onmessage = (event) => {};

worker.addEventListener("message", (event) => {});
```

### `Cross-Origin Policy`

[`WebWorkers`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) are restricted by a [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy), so if your `webpack` assets are not being served from the same origin as your application, their download may be blocked by your browser. This scenario can commonly occur if you are hosting your assets under a CDN domain. Even downloads from the `webpack-dev-server` could be blocked. There are two workarounds

Firstly, you can inline the worker as a blob instead of downloading it as an external script via the [`inline`](#inline) parameter

**App.js**
```js
import Worker from './file.worker.js';
```

**webpack.config.js**
```js
{
  loader: 'worker-loader'
  options: { inline: true }
}
```

Secondly, you may override the base download URL for your worker script via the [`publicPath`](#publicpath) option

**App.js**
```js
// This will cause the worker to be downloaded from `/workers/file.worker.js`
import Worker from './file.worker.js';
```

**webpack.config.js**
```js
{
  loader: 'worker-loader'
  options: { publicPath: '/workers/' }
}
```

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/TrySound">
          <img width="150" height="150" src="https://avatars3.githubusercontent.com/u/5635476?v=3&s=150">
        </a>
        <br />
        <a href="https://github.com/TrySound">Bogdan Chadkin</a>
      </td>
      <td align="center">
        <a href="https://github.com/bebraw">
          <img width="150" height="150" src="https://github.com/bebraw.png?v=3&s=150">
          </br>
          Juho Vepsäläinen
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/d3viant0ne">
          <img width="150" height="150" src="https://github.com/d3viant0ne.png?v=3&s=150">
          </br>
          Joshua Wiens
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/michael-ciniawsky">
          <img width="150" height="150" src="https://github.com/michael-ciniawsky.png?v=3&s=150">
          </br>
          Michael Ciniawsky
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/evilebottnawi">
          <img width="150" height="150" src="https://github.com/evilebottnawi.png?v=3&s=150">
          </br>
          Alexander Krasnoyarov
        </a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/worker-loader.svg
[npm-url]: https://npmjs.com/package/worker-loader

[node]: https://img.shields.io/node/v/cache-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/worker-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/worker-loader

[test]: http://img.shields.io/travis/webpack-contrib/worker-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/worker-loader

[cover]: https://codecov.io/gh/webpack-contrib/cache-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/cache-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/worker-loader/
