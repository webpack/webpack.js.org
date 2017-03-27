---
title: Tree Shaking
contributors:
  - simon04
  - zacanger
  - alexjoverm
---

_Tree shaking_ is a term commonly used in the JavaScript context for dead-code elimination, or more precisely, live-code import. It relies on ES2015 module [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)/[export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) for the [static structure](http://exploringjs.com/es6/ch_modules.html#static-module-structure) of its module system. The name and concept have been popularized by the ES2015 module bundler [rollup](https://github.com/rollup/rollup).

webpack 2 comes with a built-in support for ES2015 modules (alias *harmony modules*) as well as unused module export detection.

## Example

Consider a **maths.js** library file exporting two functions, `square` and `cube`:
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

In our **main.js** we are selectively importing `cube`:
```javascript
import {cube} from './maths.js';
console.log(cube(5)); // 125
```

Running `node_modules/.bin/webpack main.js dist.js` and inspecting `dist.js` reveals that `square` is not being exported (see the "unused harmony export square" comment):

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

When running a [production build](/guides/production-build), `node_modules/.bin/webpack --optimize-minimize main.js dist.min.js`, only the minimized version of `cube` but not `square` remains in the build:

```javascript
/* ... */
function(e,t,n){"use strict";function r(e){return e*e*e}t.a=r}
/* ... */
function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);console.log(n.i(r.a)(5))}
```

## Weblinks

* [Tree shaking with webpack 2, TypeScript and Babel](https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-webpack-2-TypeScript-and-Babel/)
* [Tree-shaking with webpack 2 and Babel 6](http://www.2ality.com/2015/12/webpack-tree-shaking.html)
* [webpack 2 Tree Shaking Configuration](https://medium.com/modus-create-front-end-development/webpack-2-tree-shaking-configuration-9f1de90f3233#.15tuaw71x)
