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

#### dependencies
This is an array of strings where we can declare all the modules that need to be made available before all the code in the callback function can be executed.

#### callback
This is the callback function that webpack will execute once the dependencies are loaded. An implementation of the `require` function is sent as a parameter to this function. The function body can use this to further `require()` modules it needs for execution.

#### chunkName
The `chunkName` is a name given to the chunk created by this particular `require.ensure()`. By passing the same `chunkName` to various `require.ensure()` calls, we can combine their code into a single chunk, resulting in only one bundle that the browser must load.

## Example

Let us consider the following file structure:

```bash
.
├── dist
├── js
│   ├── a.js
│   ├── b.js
│   ├── c.js
│   └── entry.js
└── webpack.config.js
```

**entry.js**

```javascript
require('./a');
require.ensure(['./b'], function(require){
    require('./c');
    console.log('done!');
});
```

**a.js**

```javascript
console.log('***** I AM a *****');
```

**b.js**

```javascript
console.log('***** I AM b *****');
```

**c.js**

```javascript
console.log('***** I AM c *****');
```

**webpack.config.js**

```javascript
var path = require('path');

module.exports = function(env) {
    return {
        entry: './js/entry.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: 'https://cdn.example.com/assets/',
            // tell webpack where to load the on-demand bundles. 

            pathinfo: true,
            // show comments in bundles, just to beautify the output of this example.
            // should not be used for production.
        }
    }
}

```

T> `output.publicPath` is an important option when using code-splitting, it is used to tell webpack where to load your bundles on-demand, see the [configuration documentation](/configuration/output/#output-publicpath).

On running webpack on this project, we find that webpack has created two new bundles, `bundle.js` and `0.bundle.js`.

`entry.js` and `a.js` are bundled in `bundle.js`.

**bundle.js**

```javascript
/******/ (function(modules) { // webpackBootstrap
//webpack bootstrap code...

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "https://cdn.example.com/assets/";

// webpack bootstrap code...
/******/ })
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!*****************!*\
  !*** ./js/a.js ***!
  \*****************/
/***/ (function(module, exports) {

console.log('***** I AM a *****');


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/* unknown exports provided */
/* all exports used */
/*!*********************!*\
  !*** ./js/entry.js ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./a */ 0);
__webpack_require__.e/* require.ensure */(0).then((function(require){
    __webpack_require__(/*! ./c */ 2);
    console.log('done!');
}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);


/***/ })
/******/ ]);
```

T> We can see the specified **webpack public path** on `__webpack_require__.p` in the bootstrap code, it corresponds to our `output.publicPath` configuration on above.

`b.js` and `c.js` are bundled in `0.bundle.js`.

**0.bundle.js**
```javascript
webpackJsonp([0],[
/* 0 */,
/* 1 */
/* unknown exports provided */
/* all exports used */
/*!*****************!*\
  !*** ./js/b.js ***!
  \*****************/
/***/ (function(module, exports) {

console.log('***** I AM b *****');


/***/ }),
/* 2 */
/* unknown exports provided */
/* all exports used */
/*!*****************!*\
  !*** ./js/c.js ***!
  \*****************/
/***/ (function(module, exports) {

console.log('***** I AM c *****');



/***/ })
]);
```

Now just add `bundle.js` in your HTML file and open it in your broswer, the `0.bundle.js` will be loaded on demand (from `https://cdn.example.com/assets/0.bundle.js`) by webpack.

**More examples**
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
