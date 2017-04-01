---
title: worker-loader
source: https://raw.githubusercontent.com/webpack-contrib/worker-loader/master/README.md
edit: https://github.com/webpack-contrib/worker-loader/edit/master/README.md
---
## Install

```bash
npm i -D worker-loader
```

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Import the worker file:

``` javascript
// main.js
var MyWorker = require("worker-loader!./file.js");

var worker = new MyWorker();
worker.postMessage({a: 1});
worker.onmessage = function(event) {...};
worker.addEventListener("message", function(event) {...});
```

You can also inline the worker as a blob with the `inline` parameter:
``` javascript
var MyWorker = require("worker-loader?inline!./myWorker.js");
```

Inline mode will also create chunks for browsers without supporting of inline workers,
to disable this behavior just set `fallback` parameter as `false`:

``` javascript
var MyWorker = require("worker-loader?inline&fallback=false!./myWorker.js");
```

To set a custom name for the output script, use the `name` parameter. The name may contain the string `[hash]`, which will be replaced with a content-dependent hash for caching purposes. For example:

``` javascript
var MyWorker = require("worker-loader?name=outputWorkerName.[hash].js!./myWorker.js");
```


The worker file can import dependencies just like any other file:

``` javascript
// file.js
var _ = require('lodash')

var o = {foo: 'foo'}

_.has(o, 'foo') // true
```

You can even use ES6 modules if you have the babel-loader configured:

``` javascript
// file.js
import _ from 'lodash'

let o = {foo: 'foo'}

_.has(o, 'foo') // true
```

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/5635476?v=3&s=150">
        </br>
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
