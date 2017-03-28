---
title: 代码分离 - 使用 import()
sort: 33
contributors:
  - simon04
---

## 动态引入

目前，ECMAScript正在引入一种“函数式”的`import()`[语法提议](https://github.com/tc39/proposal-dynamic-import)。

[ES2015 加载规范](https://whatwg.github.io/loader/)定义了`import()`作为一种在运行时动态载入ES2015模块的方法。

webpack把`import()`作为一个分离点并把引入的模块作为一个单独的chunk，`import()`将模块名字作为参数并返回一个`Promoise`对象，即`import(name) -> Promise`

**index.js**
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
T> 记住`import()`路径不可以是完全动态的（比如`import(Math.random())`）。只可以是完全静态（比如`import('./locale/de.json')`）或者是部分静态的（比如`import('./locale/' + language + '.json')`）。

## 配合Promise polyfill

W> `import()` 的内部依赖于 [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)。

如果你想在老版本的浏览器上使用`import()`，请记得使用polyfill，比如[es6-promise](https://github.com/stefanpenner/es6-promise) 或者 [promise-polyfill](https://github.com/taylorhakes/promise-polyfill)。

在应用的入口:
```javascript
import Es6Promise from 'es6-promise';
Es6Promise.polyfill();
// or
import 'es6-promise/auto';
// or
import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}
// or ...
```

## 配合Babel

如果你想通过[Babel](http://babeljs.io/)来使用`import`，你需要安装/添加[`syntax-dynamic-import`](http://babeljs.io/docs/plugins/syntax-dynamic-import/)插件，因为这是属于Stage 3的特性。当这个提议加入规范后就不需要加这个插件了。

```bash
npm install --save-dev babel-core babel-loader babel-plugin-syntax-dynamic-import babel-preset-es2015
# for this example
npm install --save moment
```

**index-es2015.js**
```javascript
function determineDate() {
  import('moment')
    .then(moment => moment().format('LLLL'))
    .then(str => console.log(str))
    .catch(err => console.log('Failed to load moment', err));
}

determineDate();
```

**webpack.config.js**
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

如果没有使用`syntax-dynamic-import`插件，构建会失败并显示
* `Module build failed: SyntaxError: 'import' and 'export' may only appear at the top level`, 或者
* `Module build failed: SyntaxError: Unexpected token, expected {`

## 通过Babel使用`async`/`await`

通过 ES2017特性 [`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)/[`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) 来使用 `import()`:

```bash
npm install --save-dev babel-plugin-transform-async-to-generator babel-plugin-transform-regenerator babel-plugin-transform-runtime
```

**index-es2017.js**
```javascript
async function determineDate() {
  const moment = await import('moment');
  return moment().format('LLLL');
}

determineDate().then(str => console.log(str));
```

**webpack.config.js**
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

## `import` 取代了 `require.ensure`?

好消息：载入chunk失败时，我们可以处理抛出的错误了，因为它们是基于`Promise`的。

坏消息：`require.ensure`允许通过赋值第三个参数(可选)，来简单地给chunk命名，但是`import` API 并没有提供这样的能力。如果你希望保持这个特性，你可以继续使用`require.ensure`。

```javascript
require.ensure([], function(require) {
  var foo = require("./module");
}, "custom-chunk-name");
```

## `System.import` 已经过时了

`System.import`在webpack里的使用[并不符合规范](https://github.com/webpack/webpack/issues/2163)，所以它在[v2.1.0-beta.28](https://github.com/webpack/webpack/releases/tag/v2.1.0-beta.28)已过时并被`import()`取代。

## 示例
* https://github.com/webpack/webpack/tree/master/examples/harmony
* https://github.com/webpack/webpack/tree/master/examples/code-splitting-harmony
* https://github.com/webpack/webpack/tree/master/examples/code-splitting-native-import-context

## 网络链接
* [Lazy Loading ES2015 Modules in the Browser](https://dzone.com/articles/lazy-loading-es2015-modules-in-the-browser)

***

> 原文：https://webpack.js.org/guides/environment-variables/