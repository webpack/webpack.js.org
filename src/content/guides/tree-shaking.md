---
title: Tree Shaking
sort: 16
contributors:
  - simon04
  - zacanger
  - alexjoverm
  - avant1
  - MijaelWatts
  - dmitriid
  - probablyup
  - gish
  - lumo10
  - byzyk
  - pnevares
  - EugeneHlushko
  - AnayaDesign
  - torifat
  - rahul3v
related:
  - title: Debugging Optimization Bailouts
    url: https://webpack.js.org/plugins/module-concatenation-plugin/#debugging-optimization-bailouts
  - title: Issue 6074 - Add support for more complex selectors for sideEffects
    url: https://github.com/webpack/webpack/issues/6074
---

_tree shaking_ 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 [静态结构](http://exploringjs.com/es6/ch_modules.html#static-module-structure) 特性，例如 [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 和 [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)。这个术语和概念实际上是由 ES2015 模块打包工具 [rollup](https://github.com/rollup/rollup) 普及起来的。

webpack 2 正式版本内置支持 ES2015 模块（也叫做 _harmony modules_）和未使用模块检测能力。新的 webpack 4 正式版本扩展了此检测能力，通过 `package.json` 的 `"sideEffects"` 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯正 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。

T> 本指南的继承自 [起步](/guides/getting-started) 指南。如果你尚未阅读该指南，请先行阅读。

## 添加一个通用模块 {#add-a-utility}

在我们的项目中添加一个新的通用模块文件 `src/math.js`，并导出两个函数：

**project**

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
+ |- math.js
|- /node_modules
```

**src/math.js**

```javascript
export function square(x) {
  return x * x;
}

export function cube(x) {
  return x * x * x;
}
```

需要将 `mode` 配置设置成[development](/configuration/mode/#mode-development)，以确定 bundle 不会被压缩：

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
+ mode: 'development',
+ optimization: {
+   usedExports: true,
+ },
};
```

配置完这些后，更新入口脚本，使用其中一个新方法，并且为了简化示例，我们先将 `lodash` 删除：

**src/index.js**

```diff
- import _ from 'lodash';
+ import { cube } from './math.js';

  function component() {
-   const element = document.createElement('div');
+   const element = document.createElement('pre');

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

注意，我们**没有从 `src/math.js` 模块中 `import` 另外一个 `square` 方法**。这个函数就是所谓的“未引用代码(dead code)”，也就是说，应该删除掉未被引用的 `export`。现在运行 npm script `npm run build`，并查看输出的 bundle：

**dist/bundle.js (around lines 90 - 100)**

```js
/* 1 */
/***/ (function (module, __webpack_exports__, __webpack_require__) {
  'use strict';
  /* unused harmony export square */
  /* harmony export (immutable) */ __webpack_exports__['a'] = cube;
  function square(x) {
    return x * x;
  }

  function cube(x) {
    return x * x * x;
  }
});
```

注意，上面的 `unused harmony export square` 注释。如果你观察它下面的代码，你会注意到虽然我们没有引用 `square`，但它仍然被包含在 bundle 中。我们将在下一节解决这个问题。

## 将文件标记为 side-effect-free(无副作用) {#mark-the-file-as-side-effect-free}

在一个纯粹的 ESM 模块世界中，很容易识别出哪些文件有 side effect。然而，我们的项目无法达到这种纯度，所以，此时有必要提示 webpack compiler 哪些代码是“纯粹部分”。

通过 package.json 的 `"sideEffects"` 属性，来实现这种方式。

```json
{
  "name": "your-project",
  "sideEffects": false
}
```

如果所有代码都不包含 side effect，我们就可以简单地将该属性标记为 `false`，来告知 webpack，它可以安全地删除未用到的 export。

T> "side effect(副作用)" 的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。

如果你的代码确实有一些副作用，可以改为提供一个数组：

```json
{
  "name": "your-project",
  "sideEffects": ["./src/some-side-effectful-file.js"]
}
```

此数组支持简单的 glob 模式匹配相关文件。其内部使用了 [glob-to-regexp](https://github.com/fitzgen/glob-to-regexp)（支持：`*`，`**`，`{a,b}`，`[a-z]`）。如果匹配模式为 `*.css`，且不包含 `/`，将被视为 `**/*.css`。

T> 注意，所有导入文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 `css-loader` 并 import 一个 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除：

```json
{
  "name": "your-project",
  "sideEffects": ["./src/some-side-effectful-file.js", "*.css"]
}
```

最后，还可以在 [`module.rules` 配置选项](/configuration/module/#module-rules) 中设置 `"sideEffects"`。

## 解释 tree shaking 和 `sideEffects` {#clarifying-tree-shaking-and-sideeffects}

[`sideEffects`](/configuration/optimization/#optimizationsideeffects) 和 [`usedExports`](/configuration/optimization/#optimizationusedexports)（更多被认为是 tree shaking）是两种不同的优化方式。

**`sideEffects` 更为有效** 是因为它允许跳过整个模块/文件和整个文件子树。

`usedExports` 依赖于 [terser](https://github.com/terser-js/terser) 去检测语句中的副作用。它是一个 JavaScript 任务而且没有像 `sideEffects` 一样简单直接。而且它不能跳转子树/依赖由于细则中说副作用需要被评估。尽管导出函数能运作如常，但 React 框架的高阶函数（HOC）在这种情况下是会出问题的。

让我们来看一个例子：

```javascript
import { Button } from '@shopify/polaris';
```

打包前的文件版本看起来是这样的：

```javascript
import hoistStatics from 'hoist-non-react-statics';

function Button(_ref) {
  // ...
}

function merge() {
  var _final = {};

  for (
    var _len = arguments.length, objs = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    objs[_key] = arguments[_key];
  }

  for (var _i = 0, _objs = objs; _i < _objs.length; _i++) {
    var obj = _objs[_i];
    mergeRecursively(_final, obj);
  }

  return _final;
}

function withAppProvider() {
  return function addProvider(WrappedComponent) {
    var WithProvider =
      /*#__PURE__*/
      (function (_React$Component) {
        // ...
        return WithProvider;
      })(Component);

    WithProvider.contextTypes = WrappedComponent.contextTypes
      ? merge(WrappedComponent.contextTypes, polarisAppProviderContextTypes)
      : polarisAppProviderContextTypes;
    var FinalComponent = hoistStatics(WithProvider, WrappedComponent);
    return FinalComponent;
  };
}

var Button$1 = withAppProvider()(Button);

export {
  // ...,
  Button$1,
};
```

当 `Button` 没有被使用，你可以有效地清除掉 `export { Button$1 };` 且保留所有剩下的代码。那问题来了，“这段代码会有任何副作用或它能被安全都清理掉吗？”。很难说，尤其是这 `withAppProvider()(Button)` 这段代码。`withAppProvider` 被调用，而且返回的值也被调用。当调用 `merge` 或 `hoistStatics` 会有任何副作用吗？当给 `WithProvider.contextTypes` (Setter?) 赋值或当读取 `WrappedComponent.contextTypes` (Getter) 的时候，会有任何副作用吗？

实际上，Terser 尝试去解决以上的问题，但在很多情况下，它不太确定。但这不会意味着 terser 由于无法解决这些问题而运作得不好，而是由于在 JavaScript 这种动态语言中实在太难去确定。

但我们可以通过 `/*#__PURE__*/` 注释来帮忙 terser。它给一个语句标记为没有副作用。就这样一个简单的改变就能够使下面的代码被 tree-shake:

```javascript
var Button$1 = /*#__PURE__*/ withAppProvider()(Button);
```

这会使得这段代码被过滤，但仍然会有一些引入的问题，需要对其进行评估，因为它们产生了副作用。

为了解决这个问题，我们需要在 `package.json` 中添加 [`"sideEffects"`](/guides/tree-shaking/#mark-the-file-as-side-effect-free) 属性。

它类似于 `/*#__PURE__*/` 但是作用于模块的层面，而不是代码语句的层面。它表示的意思是(指`"sideEffects"` 属性)：“如果被标记为无副作用的模块没有被直接导出使用，打包工具会跳过进行模块的副作用分析评估。”。

在一个 `Shopify Polaris` 的例子，原有的模块如下：

**index.js**

```javascript
import './configure';
export * from './types';
export * from './components';
```

**components/index.js**

```javascript
// ...
export { default as Breadcrumbs } from './Breadcrumbs';
export { default as Button, buttonFrom, buttonsFrom } from './Button';
export { default as ButtonGroup } from './ButtonGroup';
// ...
```

**package.json**

```json
// ...
"sideEffects": [
  "**/*.css",
  "**/*.scss",
  "./esnext/index.js",
  "./esnext/configure.js"
],
// ...
```

对于代码 `import { Button } from "@shopify/polaris";` 它有以下的暗示：

- 导入它：导入并包含该模块，分析评估它并继续进行依赖分析
- 跳过它：不导入它，不分析评估它但会继续进行依赖分析
- 排除它：不导入它，不评估且不做依赖分析

以下是每个匹配到的资源的情况：

- `index.js`: 没有直接的导出被使用，但被标记为有副作用 -> 导入它
- `configure.js`: 没有导出被使用，但被标记为有副作用 -> 导入它
- `types/index.js`: 没有导出被使用，没有被标记为有副作用 -> 排除它
- `components/index.js`: 没有导出被使用，没有被标记为有副作用，但重新导出的导出内容被使用了 -> 跳过它
- `components/Breadcrumbs.js`: 没有导出被使用，没有被标记为有副作用 -> 排除它。这也会排除所有如同 `components/Breadcrumbs.css` 的依赖，尽管它们都被标记为有副作用。
- `components/Button.js`: 直接的导出被使用，没有被标记为有副作用 -> 导入它
- `components/Button.css`: 没有导出被使用，但被标记为有副作用 -> 导入它

在这种情况下，只有4个模块被导入到 bundle 中：

- `index.js`: 基本为空的
- `configure.js`
- `components/Button.js`
- `components/Button.css`

在这次的优化后，其它的优化项目都可以应用。例如：从 `Button.js` 导出 的`buttonFrom` 和 `buttonsFrom` 也没有被使用。`usedExports` 优化会捡起这些代码而且 terser 会能够从 bundle 中把这些语句摘除出来。

模块合并也会应用。所以这4个模块，加上入口的模块（也可能有更多的依赖）会被合并。**`index.js` 最终没有生成代码**.

## 将函数调用标记为无副作用 {#mark-a-function-call-as-side-effect-free}

是可以告诉 webpack 一个函数调用是无副作用的，只要通过 `/*#__PURE__*/` 注释。它可以被放到函数调用之前，用来标记它们是无副作用的(pure)。传到函数中的入参是无法被刚才的注释所标记，需要单独每一个标记才可以。如果一个没被使用的变量定义的初始值被认为是无副作用的（pure），它会被标记为死代码，不会被执行且会被压缩工具清除掉。这个行为被会开启当 [`optimization.innerGraph`](/configuration/optimization/#optimizationinnergraph) 被设置成 `true`。

**file.js**

```javascript
/*#__PURE__*/ double(55);
```

## 压缩输出结果 {#minify-the-output}

通过 `import` 和 `export`  语法，我们已经找出需要删除的“未引用代码(dead code)”，然而，不仅仅是要找出，还要在 bundle 中删除它们。为此，我们需要将 `mode` 配置选项设置为 [`production`](/configuration/mode/#mode-production)。

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
- mode: 'development',
- optimization: {
-   usedExports: true,
- }
+ mode: 'production',
};
```

T> 注意，也可以在命令行接口中使用 `--optimize-minimize` 标记，来启用 `TerserPlugin`。

准备就绪后，然后运行另一个命令 `npm run build`，看看输出结果有没有发生改变。

你发现 `dist/bundle.js` 中的差异了吗？显然，现在整个 bundle 都已经被 minify(压缩) 和 mangle(混淆破坏)，但是如果仔细观察，则不会看到引入 `square` 函数，但能看到 `cube` 函数的混淆破坏版本（`function r(e){return e*e*e}n.a=r`）。现在，随着 minification(代码压缩) 和 tree shaking，我们的 bundle 减小几个字节！虽然，在这个特定示例中，可能看起来没有减少很多，但是，在有着复杂依赖树的大型应用程序上运行 tree shaking 时，会对 bundle 产生显著的体积优化。

T> 在使用 tree shaking 时必须有 [ModuleConcatenationPlugin](/plugins/module-concatenation-plugin) 的支持，您可以通过设置配置项 `mode: "production"` 以启用它。如果您没有如此做，请记得手动引入 [ModuleConcatenationPlugin](/plugins/module-concatenation-plugin)。

## 结论 {#conclusion}

因此，我们学到为了利用 _tree shaking_ 的优势， 你必须...

- 使用 ES2015 模块语法（即 `import` 和 `export`）。
- 确保没有编译器将您的 ES2015 模块语法转换为 CommonJS 的（顺带一提，这是现在常用的 @babel/preset-env 的默认行为，详细信息请参阅[文档](https://babeljs.io/docs/en/babel-preset-env#modules)）。
- 在项目的 `package.json` 文件中，添加 `"sideEffects"` 属性。
- 使用 `mode` 为 `"production"` 的配置项以启用[更多优化项](/concepts/mode/#usage)，包括压缩代码与 tree shaking。

你可以将应用程序想象成一棵树。绿色表示实际用到的 source code(源码) 和 library(库)，是树上活的树叶。灰色表示未引用代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。

如果你对优化输出很感兴趣，请进入到下个指南，来了解 [生产环境](/guides/production) 构建的详细细节。
