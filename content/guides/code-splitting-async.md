---
title: Code Splitting - Async
sort: 17
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

This guide documents how to split your bundle into chunks which can be downloaded asynchronously at a later time. For instance, this allows to serve a minimal bootstrap bundle first and to asynchronously load additional features later.

webpack supports two similar techniques to achieve this goal: using `import()` (preferred, ECMAScript proposal) and `require.ensure()` (legacy, webpack specific).


## Dynamic import: `import()`

Currently, a "function-like" `import()` module loading [syntax proposal](https://github.com/tc39/proposal-dynamic-import) is on the way into ECMAScript.

The [ES2015 Loader spec](https://whatwg.github.io/loader/) defines `import()` as method to load ES2015 modules dynamically on runtime.

webpack treats `import()` as a split-point and puts the requested module in a separate chunk.
`import()` takes the module name as argument and returns a `Promise`: `import(name) -> Promise`

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

Note that fully dynamic statements, such as `import(foo)`, __will fail__ because webpack requires at least some file location information. This is because `foo` could potentially be any path to any file in your system or project. The `import()` must contain at least some information about where the module is located, so bundling can be limited to a specific directory or set of files.

For example, ``import(`./locale/${language}.json`)`` will cause every `.json` file in the `./locale` directory to be bundled into the split-point. At run time, when the variable `language` has been computed, any file like `english.json` or `german.json` will be available for consumption. So keep in mind that when using `import()`, the path must contain some path information or be completely static (as is `'moment'` in the example above).


### Promise polyfill

W> `import()` relies on [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) internally.

If you use `import()` with older browsers, remember to shim `Promise` using a polyfill such as [es6-promise](https://github.com/stefanpenner/es6-promise) or [promise-polyfill](https://github.com/taylorhakes/promise-polyfill).

In an entry point of your application:

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


### Chunk names

Since webpack 2.4.0, chunk names for dynamic imports can be specified using a "magic comment".

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


### Usage with Babel

If you want to use `import` with [Babel](http://babeljs.io/), you'll need to install/add the [`syntax-dynamic-import`](http://babeljs.io/docs/plugins/syntax-dynamic-import/) plugin while it's still Stage 3 to get around the parser error. When the proposal is added to the spec this won't be necessary anymore.

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

Not using the `syntax-dynamic-import` plugin will fail the build with:

```javascript
Module build failed: SyntaxError: 'import' and 'export' may only appear at the top level
```

or

```javascript
Module build failed: SyntaxError: Unexpected token, expected {
```


### Usage with Babel and `async`/`await`

To use ES2017 [`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)/[`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) with `import()`:

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


### `import()` imports the entire module namespace

Note that the promise is [resolved with the module namespace](https://github.com/tc39/proposal-dynamic-import#proposed-solution). Consider the following two examples:

```js
// Example 1: top-level import
import * as Component from './component';
// Example 2: Code Splitting with import()
import('./component').then(Component => /* ... */);
```

`Component` in both of those cases resolves to the same thing, meaning in the case of using `import()` with ES2015 modules you have to explicitly access default and named exports:

```js
async function main() {
  // Destructuring example
  const { default: Component } = await import('./component');
  // Inline example
  render((await import('./component')).default);
}
```


### `System.import` is deprecated

The use of `System.import` in webpack [did not fit the proposed spec](https://github.com/webpack/webpack/issues/2163), so it was deprecated in [v2.1.0-beta.28](https://github.com/webpack/webpack/releases/tag/v2.1.0-beta.28) in favor of `import()`.


## `require.ensure()`

W> `require.ensure()` is specific to webpack and superseded by `import()`.

webpack statically parses for `require.ensure()` in the code while building. Any module that is referenced as a dependency or `require()`d within the callback function, will be added to a new chunk. This new chunk is written to an async bundle that is loaded on demand by webpack through jsonp.

The syntax is as follows:

```javascript
require.ensure(dependencies: String[], callback: function(require), errorCallback: function(error), chunkName: String)
```

* `dependencies` is an array of strings where we can declare all the modules that need to be made available before all the code in the callback function can be executed.
* `callback` is a function that webpack will execute once the dependencies are loaded. An implementation of the `require` function is sent as a parameter to this function. The function body can use this to further `require()` modules it needs for execution.

W> Although the implementation of `require` is passed as an argument to the callback function, using an arbitrary name e.g. `require.ensure([], function (request) { request('someModule'); })` isn't handled by webpack's static parser. Use `require` instead: `require.ensure([], function (require) { require('someModule'); })`

* optional: `errorCallback` is a function that is executed when webpack fails to load the dependencies.
* optional: `chunkName` is a name given to the chunk created by this particular `require.ensure()`. By passing the same `chunkName` to various `require.ensure()` calls, we can combine their code into a single chunk, resulting in only one bundle that the browser must load.

Let's reconsider the dynamic import of `moment` from the `import()` section and rewrite it using `require.ensure()`:

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

Running `webpack index.js bundle.js` generates two files, `bundle.js` and `0.bundle.js`:

__bundle.js__

```js
// webpack code ...
/***/ (function(module, exports, __webpack_require__) {

function determineDate() {
  __webpack_require__.e/* require.ensure */(0).then((function(require) {
    var moment = __webpack_require__(0);
    console.log(moment().format());
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}

determineDate();
// webpack code ...
```

__0.bundle.js__

```js
webpackJsonp([0],[(function(module, exports, __webpack_require__) {
/* WEBPACK VAR INJECTION */(function(module) {

//! moment.js

})]);
```

When you add `bundle.js` in your HTML file and open it in your browser, the `0.bundle.js` will be loaded asynchronously by webpack.


### publicPath

`output.publicPath` is an important option when using Code Splitting, it is used to tell webpack where to load your bundles on-demand, see the [configuration documentation](/configuration/output/#output-publicpath).


### Chunk name

```javascript
require.ensure([], function(require) {
  var foo = require('./module');
}, 'custom-chunk-name');
```

Use the last argument to `require.ensure()` in order to specify the name of the chunk.


### Error callback

Since webpack 2.4.0, an error callback can be as third argument to `require.ensure()`. This allows to address errors which occur when dynamically loading the chunk:

```javascript
require.ensure([], function(require) {
    var foo = require('./module');
}, function(err) {
    console.error('We failed to load chunk: ' + err);
}, 'custom-chunk-name');
```


### Empty Array as Parameter

```javascript
require.ensure([], function(require){
    require('./a.js');
});
```

The above code ensures that a split point is created and `a.js` is bundled separately by webpack.


### Dependencies as Parameter

```javascript
require.ensure(['./b.js'], function(require) {
    require('./c.js');
});
```

In the above code, `b.js` and `c.js` are bundled together and split from the main bundle. But only the contents of `c.js` are executed. The contents of `b.js` are only made available and not executed.
To execute `b.js`, we will have to require it in a sync manner like `require('./b.js')` for the JavaScript to get executed.


## Examples

* `import()`
* * https://github.com/webpack/webpack/tree/master/examples/harmony
* * https://github.com/webpack/webpack/tree/master/examples/code-splitting-harmony
* * https://github.com/webpack/webpack/tree/master/examples/code-splitting-native-import-context
* `require.ensure()`
* * https://github.com/webpack/webpack/tree/master/examples/code-splitting
* * https://github.com/webpack/webpack/tree/master/examples/named-chunks – illustrates the use of `chunkName`
