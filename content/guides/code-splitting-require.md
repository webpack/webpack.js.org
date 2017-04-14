---
title: Code Splitting - Using require.ensure
sort: 33
contributors:
  - pksjce
  - rahulcs
  - johnstew
---

In this section, we will discuss how webpack splits code using `require.ensure()`.

W> `require.ensure` is specific to webpack, see [`import()`](/guides/code-splitting-import) for a proposal for ECMAScript.

## `require.ensure()`

webpack statically parses for `require.ensure()` in the code while building. Any module that is referenced as a dependency or `require()`d within the callback function, will be added to a new chunk. This new chunk is written to an async bundle that is loaded on demand by webpack through jsonp.

The syntax is as follows:

```javascript
require.ensure(dependencies: String[], callback: function(require), chunkName: String)
```

* `dependencies` is an array of strings where we can declare all the modules that need to be made available before all the code in the callback function can be executed.
* `callback` is a function that webpack will execute once the dependencies are loaded. An implementation of the `require` function is sent as a parameter to this function. The function body can use this to further `require()` modules it needs for execution.
* `chunkName` is a name given to the chunk created by this particular `require.ensure()`. By passing the same `chunkName` to various `require.ensure()` calls, we can combine their code into a single chunk, resulting in only one bundle that the browser must load.

## Example

Let's reconsider the dynamic import of `moment` from the `import()` section and rewrite it using `require.ensure()`:

**index.js**
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

**bundle.js**
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

**0.bundle.js*
```js
webpackJsonp([0],[(function(module, exports, __webpack_require__) {
/* WEBPACK VAR INJECTION */(function(module) {

//! moment.js

})]);
```

When you add `bundle.js` in your HTML file and open it in your browser, the `0.bundle.js` will be loaded asynchronously by webpack.

## publicPath

`output.publicPath` is an important option when using code-splitting, it is used to tell webpack where to load your bundles on-demand, see the [configuration documentation](/configuration/output/#output-publicpath).

## Examples

* https://github.com/webpack/webpack/tree/master/examples/code-splitting
* https://github.com/webpack/webpack/tree/master/examples/named-chunks – illustrates the use of `chunkName`

## Promise polyfill

W> `require.ensure` relies on [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) internally. See [this section](/guides/code-splitting-import#promise-polyfill) for possible polyfills.

## Gotchas for `require.ensure()`

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
