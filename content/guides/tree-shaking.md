---
title: Tree Shaking
contributors:
  - simon04
  - zacanger
---

_Tree shaking_ 术语一般用来描述除去javascript上下文中无用的代码, 或者更准确的说是按需引用代码。它依赖于ES6模块 [static structure](http://exploringjs.com/es6/ch_modules.html#static-module-structure) 的 [import](https://developer.mozilla.org//en-US/docs/Web/JavaScript/Reference/Statements/import)/[export](https://developer.mozilla.org//en-US/docs/Web/JavaScript/Reference/Statements/export) .

webpack 2 内置支持ES6模块 (别名 *harmony modules*) ,及检测未使用的模块输出。

## 示例

考虑一个 **maths.js** 库,它输出两个方法 `square` 和 `cube`。
```javascript
// This function isn't used anywhere
export function square(x) {
	return x * x;
}

// This function gets included
export function cube(x) {
	return x * x * x;
}
```

在 **main.js** 中我们只引用`cube` 方法:
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
// This function isn't used anywhere
function square(x) {
  return x * x;
}

// This function gets included
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

运行 [production build](/guides/production-build), `node_modules/.bin/webpack --optimize-minimize main.js dist.min.js` 打包后的压缩代码只包含 `cube` 方法,并没有`square`方法:

```javascript
/* ... */
function(e,t,n){"use strict";function r(e){return e*e*e}t.a=r}
/* ... */
function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);console.log(n.i(r.a)(5))}
```

## 网页链接

* [Tree-shaking with webpack 2 and Babel 6](http://www.2ality.com/2015/12/webpack-tree-shaking.html)
* [Webpack 2 Tree Shaking Configuration](https://medium.com/modus-create-front-end-development/webpack-2-tree-shaking-configuration-9f1de90f3233#.15tuaw71x)
