---
title: Code Splitting - Using import()
sort: 33
contributors:
  - simon04
  - levy9527
---

## Dynamic import

Currently, a "function-like" `import()` module loading [syntax proposal](https://github.com/tc39/proposal-dynamic-import) is on the way into ECMAScript.

The [ES2015 Loader spec](https://whatwg.github.io/loader/) defines `import()` as method to load ES2015 modules dynamically on runtime.

webpack treats `import()` as a split-point and puts the requested module in a separate chunk.
`import()` takes the module name as argument and returns a `Promise`: `import(name) -> Promise`

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
T> Keep in mind that `import()` path cannot be fully dynamic (e.g., `import(Math.random())`). Rather either completely static (e.g., `import('./locale/de.json')`) or partially static (e.g., `import('./locale/' + language + '.json')`).

## Promise polyfill

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

## Usage with Babel

If you want to use `import` with [Babel](http://babeljs.io/), you'll need to install/add the [`syntax-dynamic-import`](http://babeljs.io/docs/plugins/syntax-dynamic-import/) plugin while it's still Stage 3 to get around the parser error. When the proposal is added to the spec this won't be necessary anymore.

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

Not using the `syntax-dynamic-import` plugin will fail the build with
* `Module build failed: SyntaxError: 'import' and 'export' may only appear at the top level`, or
* `Module build failed: SyntaxError: Unexpected token, expected {`

## Usage with Babel and `async`/`await`

To use ES2017 [`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)/[`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) with `import()`:

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

## `import` supersedes `require.ensure`?

Good news: Failure to load a chunk can be handled now because they are `Promise` based.

Caveat: `require.ensure` allows for easy chunk naming with the optional third argument, but `import` API doesn't offer that capability yet. If you want to keep that functionality, you can continue using `require.ensure`.

```javascript
require.ensure([], function(require) {
  var foo = require("./module");
}, "custom-chunk-name");
```

## `System.import` is deprecated

The use of `System.import` in webpack [did not fit the proposed spec](https://github.com/webpack/webpack/issues/2163), so it was deprecated in [v2.1.0-beta.28](https://github.com/webpack/webpack/releases/tag/v2.1.0-beta.28) in favor of `import()`.

## Examples
* https://github.com/webpack/webpack/tree/master/examples/harmony
* https://github.com/webpack/webpack/tree/master/examples/code-splitting-harmony
* https://github.com/webpack/webpack/tree/master/examples/code-splitting-native-import-context

## Weblinks
* [Lazy Loading ES2015 Modules in the Browser](https://dzone.com/articles/lazy-loading-es2015-modules-in-the-browser)
