---
title: 代码分离 - 使用 require.ensure
sort: 33
contributors:
  - pksjce
  - rahulcs
  - johnstew
---

在这一节，我们会讨论 webpack 如何使用 `require.ensure()` 进行代码拆分。

W> `require.ensure` 是 webpack 特有的, 查看 [`import()`](/guides/code-splitting-import) 了解关于此的一个 ECMAScript 提案。

## `require.ensure()`

webpack 在构建时，会静态地解析代码中的 `require.ensure()`。在回调函数中，任何引用的依赖模块，或被 `require()` 的代码，都将被分离到一个新的 chunk 中。这个新的 chunk 会被生成为异步的 bundle，由 webpack 通过 `jsonp` 来按需加载。

语法如下：

```javascript
require.ensure(dependencies: String[], callback: function(require), chunkName: String)
```

#### 依赖(dependencies)
这是一个字符串数组，通过这个参数，在所有的回调函数的代码被执行前，我们可以将所有需要用到的模块进行声明。

#### 回调函数(callback)
当所有的依赖都加载完成后，webpack 会执行这个回调函数。实际上，回调函数将 `require` 函数作为一个参数传递。因此，我们可以在回调函数体(function body)内进一步 `require()` 在执行时所需要的那些模块。

#### chunkName
`chunkName` 是用来提供给特定的 `require.ensure()` 来作为创建的 chunk 的名称。通过向不同 `require.ensure()` 的调用提供相同的 `chunkName`，我们可以将代码合并到相同的 chunk 中，做到只产生一个 bundle 来让浏览器加载。

## 示例

让我们考虑下面的文件结构：

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

通过执行这个项目的 webpack 构建，我们发现 webpack 创建了 2 个新的 bundle，`bundle.js` 和 `0.bundle.js`。

`entry.js` 和 `a.js` 被打包进 `bundle.js`。

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

`b.js` 和 `c.js` 被打包进 `0.bundle.js`。

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

W> `require.ensure` 内部依赖于 `Promises`。 如果你在旧的浏览器中使用 `require.ensure` 请记得去 shim `Promise` [es6-promise polyfill](https://github.com/stefanpenner/es6-promise)。

**更多示例**
* https://github.com/webpack/webpack/tree/master/examples/code-splitting
* https://github.com/webpack/webpack/tree/master/examples/named-chunks – illustrates the use of `chunkName`

## `require.ensure()` 的陷阱

### 空数组作为参数

```javascript
require.ensure([], function(require){
    require('./a.js');
});
```

上面代码保证了拆分点被创建，而且 `a.js` 被 webpack 单独打包。

### 依赖作为参数

```javascript
require.ensure(['./b.js'], function(require) {
    require('./c.js');
});
```

上面代码中，`b.js` 和 `c.js` 都被打包到一起，而且从主 bundle 中拆分出来。但只有 `c.js` 的内容被执行。`b.js` 的内容仅仅是可被使用，但并没有被执行。想要执行 `b.js`，我们必须以同步的方式引用它，如 `require('./b.js')`，来让它的代码被执行。

***

> 原文：https://webpack.js.org/guides/code-splitting-require/