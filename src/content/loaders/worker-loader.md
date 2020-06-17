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



worker loader module for webpack

## Getting Started

To begin, you'll need to install `worker-loader`:

```console
$ npm install worker-loader --save-dev
```

### Inlined

**App.js**

```js
import Worker from 'worker-loader!./Worker.js';
```

### Config

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

And run `webpack` via your preferred method.

## Options

### `fallback`

Type: `Boolean`
Default: `false`

Require a fallback for non-worker supporting environments.

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

Type: `Boolean`
Default: `false`

You can also inline the worker as a BLOB with the `inline` parameter.

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

_Note: Inline mode will also create chunks for browsers without support for inline workers, to disable this behavior just set `fallback` parameter as `false`._

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

Type: `String`
Default: `[hash].worker.js`

To set a custom name for the output script, use the `name` parameter.
The name may contain the string `[hash]`, which will be replaced with a content dependent hash for caching purposes.
When using `name` alone `[hash]` is omitted.

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

Type: `String`
Default: `null`

Overrides the path from which worker scripts are downloaded.
If not specified, the same public path used for other webpack assets is used.

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

The worker file can import dependencies just like any other file:

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

### Integrating with ES Modules

_Note: You can even use ES2015 Modules if you have the [`babel-loader`](https://github.com/babel/babel-loader) configured._

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

### Integrating with TypeScript

To integrate with TypeScript, you will need to define a custom module for the exports of your worker

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

// Post data to parent thread
ctx.postMessage({ foo: 'foo' });

// Respond to message from parent thread
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

### Cross-Origin Policy

[`WebWorkers`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) are restricted by a [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy), so if your `webpack` assets are not being served from the same origin as your application, their download may be blocked by your browser.
This scenario can commonly occur if you are hosting your assets under a CDN domain.
Even downloads from the `webpack-dev-server` could be blocked.
There are two workarounds:

Firstly, you can inline the worker as a blob instead of downloading it as an external script via the [`inline`](#inline) parameter

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

Secondly, you may override the base download URL for your worker script via the [`publicPath`](#publicpath) option

**App.js**

```js
// This will cause the worker to be downloaded from `/workers/file.worker.js`
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

Please take a moment to read our contributing guidelines if you haven't yet done so.

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
