---
title: worker-loader
source: https://raw.githubusercontent.com/webpack-contrib/worker-loader/master/README.md
edit: https://github.com/webpack-contrib/worker-loader/edit/master/README.md
---
## 安装

```bash
npm i -D worker-loader
```

or

```bash
yarn add worker-loader --dev
```

## <a href="https://webpack.js.org/concepts/loaders">用法</a>

导入 worker 文件：

``` javascript
// main.js
var MyWorker = require("worker-loader!./file.js");

var worker = new MyWorker();
worker.postMessage({a: 1});
worker.onmessage = function(event) {...};
worker.addEventListener("message", function(event) {...});
```

您还可以使用 `inline` 参数将 worker 作为 blob 内联：
``` javascript
var MyWorker = require("worker-loader?inline!./myWorker.js");
```

内联模式将额外为浏览器创建 chunk，但不支持内联 worker，要禁用此行为，只需将 `fallback` 参数设置为 `false`：

``` javascript
var MyWorker = require("worker-loader?inline&fallback=false!./myWorker.js");
```

要设置输出脚本(output script)的自定义名称，请使用 `name` 参数。该名称可能包含 `[hash]` 字符串，`[hash]` 将被替换为，用于缓存目的(caching purpose)、与文件内容相关(content-dependent) hash。例如：

``` javascript
var MyWorker = require("worker-loader?name=outputWorkerName.[hash].js!./myWorker.js");
```


worker 文件可以像任何其他文件一样导入依赖：

``` javascript
// file.js
var _ = require('lodash')

var o = {foo: 'foo'}

_.has(o, 'foo') // true

// 将数据发送到父线程(parent thread)
self.postMessage({foo: 'foo'})

// 响应来自父线程(parent thread)的消息
self.addEventListener('message', function(event){ console.log(event); });
```

如果你配置了 babel-loader，你甚至可以使用 ES6 模块：

``` javascript
// file.js
import _ from 'lodash'

let o = {foo: 'foo'}

_.has(o, 'foo') // true

// 将数据发送到父线程(parent thread)
self.postMessage({foo: 'foo'})

// 响应来自父线程(parent thread)的消息
self.addEventListener('message', (event) => { console.log(event); });
```

### Integrating with TypeScript

To integrate with TypeScript, you will need to define a custom module for the exports of your worker. You will also need to cast the new worker as the `Worker` type:

**typings/custom.d.ts**
```
declare module "worker-loader!*" {
  const content: any;
  export = content;
}
```

**App.ts**
```
import * as MyWorker from "worker-loader!../../worker";
const worker: Worker = new MyWorker();
```

## 维护人员

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/sokra">
          <img width="150" height="150" src="https://github.com/sokra.png?s=150">
        </a>
        <br />
        <a href="https://github.com/sokra">Tobias Koppers</a>
      </td>
      <td align="center">
        <a href="https://github.com/d3viant0ne">
          <img width="150" height="150" src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </a>
        <br />
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <a href="https://github.com/TrySound">
          <img width="150" height="150" src="https://avatars3.githubusercontent.com/u/5635476?v=3&s=150">
        </a>
        <br />
        <a href="https://github.com/TrySound">Bogdan Chadkin</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/worker-loader.svg
[npm-url]: https://npmjs.com/package/worker-loader

[deps]: https://david-dm.org/webpack-contrib/worker-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/worker-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/worker-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/worker-loader

***

> 原文：https://webpack.js.org/loaders/worker-loader/
