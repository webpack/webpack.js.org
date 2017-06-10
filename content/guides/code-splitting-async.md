---
title: 代码分离 - 异步
sort: 33
contributors:
  - simon04
  - levy9527
  - pksjce
  - rahulcs
  - johnstew
related:
  - title: Lazy Loading ES2015 Modules in the Browser
    url: https://dzone.com/articles/lazy-loading-es2015-modules-in-the-browser
---

本指南介绍了如何将您的 bundle 拆分成可以在之后异步下载的 chunk。例如，这允许首先提供最低限度的引导 bundle，并在稍后再异步地加载其他功能。

webpack 支持两种相似的技术实现此目的：使用 `import()` (推荐，ECMAScript 提案) 和 `require.ensure()` (遗留，webpack 特定)。


## 动态引入：`import()`

目前，ECMAScript 正在引入一种"类函数式(function-like)"的 `import()` 模块加载[语法提案](https://github.com/tc39/proposal-dynamic-import)。

[ES2015 loader 规范](https://whatwg.github.io/loader/)定义了 `import()` 作为一种在运行时(runtime)动态载入 ES2015 模块的方法。

webpack 把 `import()` 作为一个分离点(split-point)，并把引入的模块作为一个单独的 chunk。
`import()` 将模块名字作为参数并返回一个 `Promoise` 对象，即 `import(name) -> Promise`

__index.js__

```javascript
function determineDate() {
  import('moment').then(function(moment) {
    console.log(moment().format());
  }).catch(function(err) {
    console.log('Failed to load moment', err);
  });
}

determineDate();
```

注意，由于 webpack 至少需要感知到文件的位置信息，因此类似 `import(foo)` 的完全动态语句__会导致失败__。这是因为 `foo` 可以是系统或项目中的任意路径下任意文件。`import()` 至少应感知的信息是模块所处的位置，所以打包将限制在特定目录或一组文件中。

例如，``import(`./locale/${language}.json`)`` 将会使 `./locale` 目录下的每个 `.json` 都打包到分离点(split-point)中。在运行时(runtime)，当计算出变量 `language` 时，任何像 `english.json` 或 `german.json` 这样的文件都可以供使用。所以请牢记，在使用 `import()` 时，该路径必须包含路径信息或完整的静态路径（就像上面例子中的 `'moment'` 一样）。


### Promise polyfill

W> `import()` 在内部依赖于 [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)。

如果你想在老版本浏览器使用 `import()`，请记得使用 polyfill（例如 [es6-promise](https://github.com/stefanpenner/es6-promise) 或 [promise-polyfill](https://github.com/taylorhakes/promise-polyfill)）来 shim `Promise`。

在应用程序入口起点处配置：

```javascript
import Es6Promise from 'es6-promise';
Es6Promise.polyfill();
// 或
import 'es6-promise/auto';
// 或
import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}
// 或 ...
```


### Chunk 名称

从 webpack 2.4.0 开始，动态导入的 chunk 名称能够指定使用"魔力注释"。

```javascript
import(/* webpackChunkName: "my-chunk-name" */ 'module');
```

Since webpack 2.6.0, the placeholders `[index]`, `[request]` are supported:

```javascript
// will generate files like `i18n/namespace-i18n-bundle-en_json`
import(/* webpackChunkName: "i18n/[request]" */ `i18n/${namespace}-i18n-bundle-${language}.json`).then(...)

// will generate files `i18n-0`, `i18n-1`, …
import(/* webpackChunkName: "i18n-[index]" */ `i18n/${namespace}-i18n-bundle-${language}.json`).then(...)
```

### Import mode

Since webpack 2.6.0, different modes for resolving dynamic imports can be specified.

```javascript
import(/* webpackMode: "lazy" */ `i18n/${namespace}-i18n-bundle-${language}.json`).then(...)
```

The following modes are supported:

* `"lazy"`: The default behavior. Lazy generates a chunk per request. So everything is lazy loaded.
* `"lazy-once"`: Only available for imports with expression. Generates a single chunk for all possible requests. So the first request causes a network request for all modules, all following requests are already fulfilled.
* `"eager"`: Eager generates no chunk. All files are included in the current chunk. No network request is required to load the files. It still returns a Promise but it's already resolved. In contrast to a static import, it skips evaluating until the request is made.

You can combine both options (`webpackChunkName` and `webpackMode`). It's parsed a JSON5 object without curly brackets:

```javascript
import(/* webpackMode: "lazy-once", webpackChunkName: "all-i18n-data" */ `i18n/${namespace}-i18n-bundle-${language}.json`).then(...)
```


### 配合 Babel 使用

如果你想要在 [Babel](http://babeljs.io/) 中使用 `import`，但是由于 import() 还是属于 Stage 3 的特性，所以你需要安装/添加 [`syntax-dynamic-import`](http://babeljs.io/docs/plugins/syntax-dynamic-import/) 插件来避免 parser 报错。在草案正式成为规范后，就不再需要这个插件了。

```bash
npm install --save-dev babel-core babel-loader babel-plugin-syntax-dynamic-import babel-preset-es2015
# for this example
npm install --save moment
```

__index-es2015.js__

```javascript
function determineDate() {
  import('moment')
    .then(moment => moment().format('LLLL'))
    .then(str => console.log(str))
    .catch(err => console.log('Failed to load moment', err));
}

determineDate();
```

__webpack.config.js__

```javascript
module.exports = {
  entry: './index-es2015.js',
  output: {
    filename: 'dist.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}]],
          plugins: ['syntax-dynamic-import']
        }
      }]
    }]
  }
};
```

没有使用 `syntax-dynamic-import` 插件会导致构建失败，并提示：

```javascript
Module build failed(模块构建失败): SyntaxError: 'import' and 'export' may only appear at the top level('import' 和 'export' 只能出现在顶层)`
```

or

```javascript
Module build failed(模块构建失败): SyntaxError: Unexpected token, expected {
```


### 使用 Babel 和 `async`/`await`

对 `import()` 使用 ES2017 的 [`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)/[`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)：

```bash
npm install --save-dev babel-plugin-transform-async-to-generator babel-plugin-transform-regenerator babel-plugin-transform-runtime babel-plugin-syntax-async-functions
```

__index-es2017.js__

```javascript
async function determineDate() {
  const moment = await import('moment');
  return moment().format('LLLL');
}

determineDate().then(str => console.log(str));
```

__webpack.config.js__

```javascript
module.exports = {
  entry: './index-es2017.js',
  output: {
    filename: 'dist.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['es2015', {modules: false}]],
          plugins: [
            'syntax-async-functions',
            'syntax-dynamic-import',
            'transform-async-to-generator',
            'transform-regenerator',
            'transform-runtime'
          ]
        }
      }]
    }]
  }
};
```


### `import()` 导入整个模块命名空间

请注意，该 promise [使用模块命名空间解析](https://github.com/tc39/proposal-dynamic-import#proposed-solution)。考虑以下两个示例：

```js
// 示例 1: 最顶层 import
import * as Component from './component';
// 示例 2: 使用 import() 进行代码分离
import('./component').then(Component => /* ... */);
```

这两种情况下，`Component` 解决了同样的事情，那就是在使用带有 ES2015 模块的 `import()` 时，您必须显式地访问默认导出和命名导出：

```js
async function main() {
  // 解构赋值用法示例
  const { default: Component } = await import('./component');
  // 行内用法示例
  render((await import('./component')).default);
}
```


### `System.import` 已废弃

在 webpack 中使用 `System.import` [不符合提案规范](https://github.com/webpack/webpack/issues/2163)，因此已经于 [v2.1.0-beta.28](https://github.com/webpack/webpack/releases/tag/v2.1.0-beta.28) 废弃，建议使用 `import()` 替代。


## `require.ensure()`

W> `require.ensure()` 特定于 webpack，可被替代为 `import()`。

webpack 在构建时，会静态解析(statically parse)代码中的 `require.ensure()`。在其中任何被引用的依赖模块，或在回调函数中被 `require()` 的模块，都将被分离到一个新的 chunk 中。这个新的 chunk 会被生成为异步的 bundle，由 webpack 通过 jsonp 来按需加载。

语法如下：

```javascript
require.ensure(dependencies: String[], callback: function(require), errorCallback: function(error), chunkName: String)
```

* `dependencies` 是一个字符串数组，我们可以在其中声明所有用到的模块，这些模块需要在回调函数的所有代码被执行前，就已经可用。
* `callback` 是一个函数，当所有的依赖都加载完成后，webpack 会立刻执行此回调函数。具体实现上，`require` 函数将作为一个参数传递给此回调函数。因此，我们可以在回调函数体(function body)内进一步使用 `require()` 来引入执行时所需要的那些模块。

W> 虽然在具体实现上，`require` 会作为参数传递给回调函数，但是使用一个非 require 的任意名称（比如 `require.ensure([], function (request) { request('someModule'); })`）将不会由 webpack 的静态解析器(static parser)处理。所以请使用 `require` 以及 `require.ensure([], function (require) { require('someModule'); })`

* 可选的：`errorCallback` 是一个函数，用于在 webpack 加载依赖失败时执行。
* 可选的：`chunkName` 是专用于设定通过 `require.ensure()` 创建的 chunk 的名称。通过向多个 `require.ensure()` 传递相同的 `chunkName`，我们可以将它们的代码组合成一个单独的 chunk，只生成一个浏览器必须加载的 bundle。

让我们重新考虑从 `import()` 动态导入 `moment`，并且使用 `require.ensure()` 重写此实现：

__index.js__

```javascript
function determineDate() {
  require.ensure([], function(require) {
    var moment = require('moment');
    console.log(moment().format());
  });
}

determineDate();
```

运行 `webpack index.js bundle.js` 会生成两个文件，`bundle.js` 和 `0.bundle.js`：

__bundle.js__

```js
// webpack 代码 ...
/***/ (function(module, exports, __webpack_require__) {

function determineDate() {
  __webpack_require__.e/* require.ensure */(0).then((function(require) {
    var moment = __webpack_require__(0);
    console.log(moment().format());
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}

determineDate();
// webpack 代码 ...
```

__0.bundle.js__

```js
webpackJsonp([0],[(function(module, exports, __webpack_require__) {
/* WEBPACK VAR INJECTION */(function(module) {

//! moment.js

})]);
```

当你在 HTML 文件中添加 `bundle.js`，然后打开浏览器，`0.bundle.js` 将通过 webpack 异步加载。


### publicPath

在使用代码分离时，`output.publicPath` 是一个重要选项，用于告知 webpack 从哪里按需加载 bundle，查看[配置文档](/configuration/output/#output-publicpath)。


### Chunk 名称

```javascript
require.ensure([], function(require) {
  var foo = require('./module');
}, 'custom-chunk-name');
```

可以向 `require.ensure()` 的最后一个参数传入要指定 chunk 名称。


### Error 回调函数

从 webpack 2.4.0 开始，error 回调函数能够作为 `require.ensure()` 的第三个参数。这可以处理在动态加载 chunk 时发生的错误：

```javascript
require.ensure([], function(require) {
    var foo = require('./module');
}, function(err) {
    console.error('We failed to load chunk: ' + err);
}, 'custom-chunk-name');
```


### 空数组作为参数

```javascript
require.ensure([], function(require){
    require('./a.js');
});
```

以上代码可以确保创建分离点，并且 `a.js` 将会通过 webpack 单独打包。


### 依赖作为参数

```javascript
require.ensure(['./b.js'], function(require) {
    require('./c.js');
});
```

以上代码中，`b.js` 和 `c.js` 打包在一起，并从主 bundle 中拆分。但是只有`c.js`的内容被执行。 `b.js`的内容只供可用，但不执行。
想要执行 `b.js`，我们必须以同步方式引用它，如 `require('./b.js')`，来让它的代码被执行。


## 示例

* `import()`
* * https://github.com/webpack/webpack/tree/master/examples/harmony
* * https://github.com/webpack/webpack/tree/master/examples/code-splitting-harmony
* * https://github.com/webpack/webpack/tree/master/examples/code-splitting-native-import-context
* `require.ensure()`
* * https://github.com/webpack/webpack/tree/master/examples/code-splitting
* * https://github.com/webpack/webpack/tree/master/examples/named-chunks – 阐明 `chunkName` 的用法

***

> 原文：https://webpack.js.org/guides/code-splitting-async/
