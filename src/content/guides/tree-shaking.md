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
related:
  - title: Tree shaking with webpack 2, TypeScript and Babel
    url: https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-Webpack-2-TypeScript-and-Babel/
  - title: Tree-shaking with webpack 2 and Babel 6
    url: http://www.2ality.com/2015/12/webpack-tree-shaking.html
  - title: webpack 2 Tree Shaking Configuration
    url: https://medium.com/modus-create-front-end-development/webpack-2-tree-shaking-configuration-9f1de90f3233#.15tuaw71x
  - title: Issue 2867
    url: https://github.com/webpack/webpack/issues/2867
  - title: Issue 4784
    url: https://github.com/webpack/webpack/issues/4784
---

_tree shaking_ 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块系统中的[静态结构特性](http://exploringjs.com/es6/ch_modules.html#static-module-structure)，例如 [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 和 [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)。这个术语和概念实际上是兴起于 ES2015 模块打包工具 [rollup](https://github.com/rollup/rollup)。

webpack 2 内置支持 ES2015 模块（别名 *harmony modules*），并能检测出未使用的模块导出。

T> 本指南的继承自[起步指南](/guides/getting-started)。如果您尚未阅读该指南，请先行阅读。


## 添加一个通用模块

在我们的项目中添加一个新的通用模块文件 `src/math.js`，此文件导出两个函数：

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

接着，更新入口脚本，使用其中一个新方法，并且为了简单，将 `lodash` 删除：

__src/index.js__

``` diff
- import _ from 'lodash';
+ import { cube } from './math.js';

  function component() {
-   var element = document.createElement('div');
+   var element = document.createElement('pre');

-   // lodash 是由当前 script 脚本 import 导入进来的
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = [
+     'Hello webpack!',
+     '5 cubed is equal to ' + cube(5)
+   ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```

注意，我们__并未从 `src/math.js` 模块中 `import` 导入 `square` 方法__。这个功能是所谓的“未引用代码(dead code)”，也就是说，应该删除掉未被引用的 `export`。现在让我们运行我们的npm 脚本 `npm run build`，并检查输出的 bundle：

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

注意，上面的 `unused harmony export square` 注释。如果你看下面的代码，你会注意到 `square` 没有被导出，但是，它仍然被包含在 bundle 中。我们将在下一节中解决这个问题。


## 精简输出

我们已经通过 `import` and `export` 语法，标识出了那些“未引用代码(dead code)”，但是我们仍然需要从 bundle 中删除它们。要做到这一点，我们将添加一个能够删除未引用代码(dead code)的压缩工具(minifier) -  [`UglifyJSPlugin`](/plugins/uglifyjs-webpack-plugin) - 在配置对象中添加……

我们先来安装它：

``` bash
npm i --save-dev uglifyjs-webpack-plugin
```

然后将其添加到我们的配置中：

__webpack.config.js__

``` diff
const path = require('path');
+ const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
- }
+ },
+ plugins: [
+   new UglifyJSPlugin()
+ ]
};
```

T> 注意，也可以在命令行接口中使用 `--optimize-minimize` 标记，来使用 `UglifyJsPlugin`。

准备就绪后，然后运行另一个命令 `npm run build`，看看输出结果有没有发生改变。

你发现 `dist/bundle.js` 中的差异了吗？显然，现在整个 bundle 都已经被精简过，但是如果仔细观察，则不会看到 `square` 函数被引入，但会看到 `cube` 函数的修改版本（`function r(e){return e*e*e}n.a=r`）。现在，随着 tree shaking 和代码压缩，我们的 bundle 减小几个字节！虽然，在这个特定示例中，可能看起来没有减少很多，但是，在具有复杂的依赖树的大型应用程序上运行时，tree shaking 或许会对 bundle 产生显著的体积优化。


## 警告

请注意，webpack 本身并不会执行 tree-shaking。它需要依赖于像 [UglifyJS](/plugins/uglifyjs-webpack-plugin/) 这样的第三方工具来执行实际的未引用代码(dead code)删除工作。有些情况下，tree-shaking 可能不会生效。例如，考虑以下模块：

__transforms.js__

``` js
import * as mylib from 'mylib';

export const someVar = mylib.transform({
  // ...
});

export const someOtherVar = mylib.transform({
  // ...
});
```

__index.js__

``` js
import { someVar } from './transforms.js';

// 使用 `someVar`...
```

在上面的代码中，webpack 不能确定是否调用 `mylib.transform` 会引发任何副作用(side-effects)。因此，为保险起见，将在 bundle 代码中保留 `someOtherVar`。

一般来说，当一个工具不能保证某些特定的代码路径(path)不会导致副作用(side-effects)时，即使你确信它不应该存在生成的 bundle 中，但这个代码仍然会保留。常见的情况有：从第三方模块中调用一个函数，webpack 和/或 压缩工具(minifier)无法检查此模块；从第三方模块导入的函数被重新导出，等等。

本指南中使用的代码假设你使用 UglifyJS 插件来执行 tree-shaking。然而，还有其他工具，如 [webpack-rollup-loader](https://github.com/erikdesjardins/webpack-rollup-loader) 或 [Babel Minify Webpack Plugin](/plugins/babel-minify-webpack-plugin)，根据你的设置它们可能产生不同的结果。


## 结论

为了学会使用 _tree shaking_，你必须……

- 使用 ES2015 模块语法（即 `import` 和 `export`）。
- 引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 `UglifyJSPlugin`）。

你可以将应用程序想象成一棵树。绿色表示实际用到的源码和 library，是树上活的树叶。灰色表示无用的代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。

如果你对优化输出很感兴趣的话，请进入到下一个指南，来了解[生产环境](/guides/production)中进行构建的详细细节。

***

> 原文：https://webpack.js.org/guides/tree-shaking/
