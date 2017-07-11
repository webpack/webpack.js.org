---
title: Tree Shaking
sort: 8
contributors:
  - simon04
  - zacanger
  - alexjoverm
related:
  - title: Tree shaking with webpack 2, TypeScript and Babel
    url: https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-Webpack-2-TypeScript-and-Babel/
  - title: Tree-shaking with webpack 2 and Babel 6
    url: http://www.2ality.com/2015/12/webpack-tree-shaking.html
  - title: webpack 2 Tree Shaking Configuration
    url: https://medium.com/modus-create-front-end-development/webpack-2-tree-shaking-configuration-9f1de90f3233#.15tuaw71x
---

_Tree shaking_ 是一个术语，通常用来描述移除 JavaScript 上下文中无用代码这个过程，或者更准确的说是按需引用代码，它依赖于 ES2015 模块系统中 [import](https://developer.mozilla.org//en-US/docs/Web/JavaScript/Reference/Statements/import)/[export](https://developer.mozilla.org//en-US/docs/Web/JavaScript/Reference/Statements/export) 的[静态结构特性](http://exploringjs.com/es6/ch_modules.html#static-module-structure)。这个术语和概念实际上是兴起于 ES2015 模块打包工具 [rollup](https://github.com/rollup/rollup)。

webpack 2 原生支持 ES6 模块 (别名 *harmony modules*) ，并能检测出未使用的模块输出。


## 示例

举一个 **maths.js** 库例子，它输出两个方法 `square` 和 `cube`：

```javascript
// 这个函数没有被其他地方引用过
export function square(x) {
	return x * x;
}

// 这个函数被引用了
export function cube(x) {
	return x * x * x;
}
```

在 **main.js** 中我们只引用 `cube` 方法：

```javascript
import {cube} from './maths.js';
console.log(cube(5)); // 125
```

运行 `node_modules/.bin/webpack main.js dist.js` 并检查 `dist.js` 可发现 `square` 没有被输出:

```javascript
/* ... webpackBootstrap ... */
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export square */
/* harmony export (immutable) */ __webpack_exports__["a"] = cube;
// 这个函数没有被其他地方引用过
function square(x) {
  return x * x;
}

// 这个函数被引用了
function cube(x) {
  return x * x * x;
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__maths_js__ = __webpack_require__(0);

console.log(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__maths_js__["a" /* cube */])(5)); // 125

/***/ })
```

当执行一次[生产环境构建](/guides/production) `node_modules/.bin/webpack --optimize-minimize main.js dist.min.js` 后，打包出来的代码只包含 `cube` 方法，并没有 `square` 方法：

```javascript
/* ... */
function(e,t,n){"use strict";function r(e){return e*e*e}t.a=r}
/* ... */
function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);console.log(n.i(r.a)(5))}
```

***

> 原文：https://webpack.js.org/guides/tree-shaking/
