---
title: Tree Shaking
sort: 7
contributors:
  - simon04
  - zacanger
  - alexjoverm
  - avant1
  - MijaelWatts
  - dmitriid
  - probablyup
related:
  - title: "webpack 4 beta — try it today!"
    url: https://medium.com/webpack/webpack-4-beta-try-it-today-6b1d27d7d7e2#9a67
  - title: Debugging Optimization Bailouts
    url: https://webpack.js.org/plugins/module-concatenation-plugin/#debugging-optimization-bailouts
  - title: Issue 6074 - Add support for more complex selectors for sideEffects
    url: https://github.com/webpack/webpack/issues/6074
---

_Tree shaking_ is a term commonly used in the JavaScript context for dead-code elimination. It relies on the [static structure](http://exploringjs.com/es6/ch_modules.html#static-module-structure) of ES2015 module syntax, i.e. [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export). The name and concept have been popularized by the ES2015 module bundler [rollup](https://github.com/rollup/rollup).

The webpack 2 release came with built-in support for ES2015 modules (alias _harmony modules_) as well as unused module export detection. 新的 webpack 4 版本扩展了此功能，通过 `package.json` 的 `"sideEffects"` 属性作为标记，向 compiler 提供提示，表明项目中哪些文件是 "pure" 纯的 ES2015 模块，由此可以安全地删除文件中未使用的部分。

T> The remainder of this guide will stem from [Getting Started](/guides/getting-started). If you haven't read through that guide already, please do so now.


## Add a Utility

Let's add a new utility file to our project, `src/math.js`, that exports two functions:

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
  |- math.js
|- /node_modules
```

__src/math.js__

``` javascript
export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}
```

With that in place, let's update our entry script to utilize one of these new methods and remove `lodash` for simplicity:

__src/index.js__

``` diff
- import _ from 'lodash';
+ import { cube } from './math.js';

  function component() {
-   var element = document.createElement('div');
+   var element = document.createElement('pre');

-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = [
+     'Hello webpack!',
+     '5 cubed is equal to ' + cube(5)
+   ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```

Note that we __did not `import` the `square` method__ from the `src/math.js` module. That function is what's known as "dead code", meaning an unused `export` that should be dropped. Now let's run our npm script, `npm run build`, and inspect the output bundle:

__dist/bundle.js (around lines 90 - 100)__

``` js
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export square */
/* harmony export (immutable) */ __webpack_exports__["a"] = cube;
function square(x) {
  return x * x;
}

function cube(x) {
  return x * x * x;
}
```

Note the `unused harmony export square` comment above. If you look at the code below it, you'll notice that `square` is not being imported, however, it is still included in the bundle. We'll fix that in the next section.


## 将文件标记为无副作用(side-effect-free)

在一个纯粹的 ESM 模块世界中，识别出哪些文件有副作用很简单。然而，我们的项目无法达到这种纯度，所以，此时有必要向 webpack 的 compiler 提供提示哪些代码是“纯粹部分”。

这种方式是通过 package.json 的 `"sideEffects"` 属性来实现的。

```json
{
  "name": "your-project",
  "sideEffects": false
}
```

如同上面提到的，如果所有代码都不包含副作用，我们就可以简单地将该属性标记为 `false`，来告知 webpack，它可以安全地删除未用到的 export。

T> “副作用”的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。

如果你的代码确实有一些副作用，那么可以改为提供一个数组：

```json
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js"
  ]
}
```

数组方式支持相关文件的相对路径、绝对路径和 glob 模式。 它内部使用 [micromatch](https://github.com/micromatch/micromatch#matching-features)。

T> 注意，任何导入的文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 `css-loader` 并导入 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除：

```json
{
  "name": "your-project",
  "sideEffects": [
    "./src/some-side-effectful-file.js",
    "*.css"
  ]
}
```

最后，还可以在 [`module.rules` 配置选项](https://github.com/webpack/webpack/issues/6065#issuecomment-351060570) 中设置 `"sideEffects"`。

## 压缩输出

通过如上方式，我们已经可以通过 `import` 和 `export` 语法，找出那些需要删除的“未使用代码(dead code)”，然而，我们不只是要找出，还需要在 bundle 中删除它们。为此，我们将使用 `-p`(production) 这个 webpack 编译标记，来启用 uglifyjs 压缩插件。

T> 注意，`--optimize-minimize` 标记也会在 webpack 内部调用 `UglifyJsPlugin`。

从 webpack 4 开始，也可以通过 `"mode"` 配置选项轻松切换到压缩输出，只需设置为 `"production"`。

__webpack.config.js__

``` diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
- }
+ },
+ mode: "production"
};
```

With that squared away, we can run another `npm run build` and see if anything has changed.

Notice anything different about `dist/bundle.js`? Clearly the whole bundle is now minified and mangled, but, if you look carefully, you won't see the `square` function included but will see a mangled version of the `cube` function (`function r(e){return e*e*e}n.a=r`). With minification and tree shaking our bundle is now a few bytes smaller! While that may not seem like much in this contrived example, tree shaking can yield a significant decrease in bundle size when working on larger applications with complex dependency trees.


## Conclusion

So, what we've learned is that in order to take advantage of _tree shaking_, you must...

- Use ES2015 module syntax (i.e. `import` and `export`).
- 在项目 `package.json` 文件中，添加一个 "sideEffects" 入口。
- Include a minifier that supports dead code removal (e.g. the `UglifyJSPlugin`).

You can imagine your application as a tree. The source code and libraries you actually use represent the green, living leaves of the tree. Dead code represents the brown, dead leaves of the tree that are consumed by autumn. In order to get rid of the dead leaves, you have to shake the tree, causing them to fall.

If you are interested in more ways to optimize your output, please jump to the next guide for details on building for [production](/guides/production).
