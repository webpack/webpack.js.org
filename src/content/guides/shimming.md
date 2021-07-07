---
title: Shimming 预置依赖
sort: 20
contributors:
  - pksjce
  - jhnns
  - simon04
  - jeremenichelli
  - svyandun
  - byzyk
  - EugeneHlushko
  - AnayaDesign
  - dhurlburtusa
  - plr108
  - NicolasLetellier
  - wizardofhogwarts
  - snitin315
  - chenxsan
translators:
  - QC-L
  - lcxfs1991
related:
  - title: Reward modern browser users script
    url: https://hackernoon.com/10-things-i-learned-making-the-fastest-site-in-the-world-18a0e1cdf4a7#c665
  - title: useBuiltIns in babel-preset-env
    url: https://babeljs.io/docs/en/babel-preset-env#usebuiltins
---

`webpack` compiler 能够识别遵循 ES2015 模块语法、CommonJS 或 AMD 规范编写的模块。然而，一些 third party(第三方库) 可能会引用一些全局依赖（例如 `jQuery` 中的 `$`）。因此这些 library 也可能会创建一些需要导出的全局变量。这些 "broken modules(不符合规范的模块)" 就是 _shimming(预置依赖)_ 发挥作用的地方。

W> **我们不推荐使用全局依赖**！webpack 背后的整个理念是使前端开发更加模块化。也就是说，需要编写具有良好的封闭性(well contained)、不依赖于隐含依赖（例如，全局变量）的彼此隔离的模块。请只在必要的时候才使用这些特性。

_shim_ 另外一个极其有用的使用场景就是：当你希望 [polyfill](https://en.wikipedia.org/wiki/Polyfill_(programming)) 扩展浏览器能力，来支持到更多用户时。在这种情况下，你可能只是想要将这些 polyfills 提供给需要修补(patch)的浏览器（也就是实现按需加载）。

下面的文章将向我们展示这两种用例。

T> 为了方便，本指南继续沿用 [起步](/guides/getting-started) 中的代码示例。在继续之前，请确保你已经熟悉这些配置。

## Shimming 预置全局变量 {#shimming-globals}

让我们开始第一个 shimming 全局变量的用例。在此之前，先看下我们的项目：

**project**

```diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- index.html
|- /src
  |- index.js
|- /node_modules
```

还记得我们之前用过的 `lodash` 吗？出于演示目的，例如把这个应用程序中的模块依赖，改为一个全局变量依赖。要实现这些，我们需要使用 `ProvidePlugin` 插件。

使用 [`ProvidePlugin`](/plugins/provide-plugin) 后，能够在 webpack 编译的每个模块中，通过访问一个变量来获取一个 package。如果 webpack 看到模块中用到这个变量，它将在最终 bundle 中引入给定的 package。让我们先移除 `lodash` 的 `import` 语句，改为通过插件提供它：

**src/index.js**

```diff
-import _ from 'lodash';
-
 function component() {
   const element = document.createElement('div');

-  // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

   return element;
 }

 document.body.appendChild(component());
```

**webpack.config.js**

```diff
 const path = require('path');
+const webpack = require('webpack');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'main.js',
     path: path.resolve(__dirname, 'dist'),
   },
+  plugins: [
+    new webpack.ProvidePlugin({
+      _: 'lodash',
+    }),
+  ],
 };
```

我们本质上所做的，就是告诉 webpack……

> 如果你遇到了至少一处用到 `_` 变量的模块实例，那请你将 `lodash` package 引入进来，并将其提供给需要用到它的模块。

运行我们的构建脚本，将会看到同样的输出：

```bash
$ npm run build

..

[webpack-cli] Compilation finished
asset main.js 69.1 KiB [emitted] [minimized] (name: main) 1 related asset
runtime modules 344 bytes 2 modules
cacheable modules 530 KiB
  ./src/index.js 191 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
webpack 5.4.0 compiled successfully in 2910 ms
```

还可以使用 `ProvidePlugin` 暴露出某个模块中单个导出，通过配置一个“数组路径”（例如 `[module, child, ...children?]`）实现此功能。所以，我们假想如下，无论 `join` 方法在何处调用，我们都只会获取到 `lodash` 中提供的 `join` 方法。

**src/index.js**

```diff
 function component() {
   const element = document.createElement('div');

-  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+  element.innerHTML = join(['Hello', 'webpack'], ' ');

   return element;
 }

 document.body.appendChild(component());
```

**webpack.config.js**

```diff
 const path = require('path');
 const webpack = require('webpack');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'main.js',
     path: path.resolve(__dirname, 'dist'),
   },
   plugins: [
     new webpack.ProvidePlugin({
-      _: 'lodash',
+      join: ['lodash', 'join'],
     }),
   ],
 };
```

这样就能很好的与 [tree shaking](/guides/tree-shaking) 配合，将 `lodash` library 中的其余没有用到的导出去除。

## 细粒度 Shimming {#granular-shimming}

一些遗留模块依赖的 `this` 指向的是 `window` 对象。在接下来的用例中，调整我们的 `index.js`：

```diff
 function component() {
   const element = document.createElement('div');

   element.innerHTML = join(['Hello', 'webpack'], ' ');

+   // 假设我们处于 `window` 上下文
+   this.alert('Hmmm, this probably isn\'t a great idea...')
+
   return element;
 }

 document.body.appendChild(component());
```

当模块运行在 CommonJS 上下文中，这将会变成一个问题，也就是说此时的 `this` 指向的是 `module.exports`。在这种情况下，你可以通过使用 [`imports-loader`](/loaders/imports-loader/) 覆盖 `this` 指向：

**webpack.config.js**

```diff
 const path = require('path');
 const webpack = require('webpack');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'main.js',
     path: path.resolve(__dirname, 'dist'),
   },
+  module: {
+    rules: [
+      {
+        test: require.resolve('./src/index.js'),
+        use: 'imports-loader?wrapper=window',
+      },
+    ],
+  },
   plugins: [
     new webpack.ProvidePlugin({
       join: ['lodash', 'join'],
     }),
   ],
 };
```

## 全局 Exports {#global-exports}

让我们假设，某个 library 创建出一个全局变量，它期望 consumer(使用者) 使用这个变量。为此，我们可以在项目配置中，添加一个小模块来演示说明：

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
+   |- globals.js
  |- /node_modules
```

**src/globals.js**

```js
const file = 'blah.txt';
const helpers = {
  test: function () {
    console.log('test something');
  },
  parse: function () {
    console.log('parse something');
  },
};
```

你可能从来没有在自己的源码中做过这些事情，但是你也许遇到过一个老旧的 library，和上面所展示的代码类似。在这种情况下，我们可以使用 [`exports-loader`](/loaders/exports-loader/)，将一个全局变量作为一个普通的模块来导出。例如，为了将 `file` 导出为 `file` 以及将 `helpers.parse` 导出为 `parse`，做如下调整：

**webpack.config.js**

```diff
 const path = require('path');
 const webpack = require('webpack');

 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'main.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: require.resolve('./src/index.js'),
         use: 'imports-loader?wrapper=window',
       },
+      {
+        test: require.resolve('./src/globals.js'),
+        use:
+          'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse',
+      },
     ],
   },
   plugins: [
     new webpack.ProvidePlugin({
       join: ['lodash', 'join'],
     }),
   ],
 };
```

此时，在我们的 entry 入口文件中（即 `src/index.js`），可以使用 `const { file, parse } = require('./globals.js');`，可以保证一切将顺利运行。

## 加载 Polyfills {#loading-polyfills}

目前为止我们所讨论的所有内容都是处理那些遗留的 package，让我们进入到第二个话题：**polyfill**。

有很多方法来加载 polyfill。例如，想要引入 [`babel-polyfill`](https://babel.docschina.org/docs/en/babel-polyfill/) 我们只需如下操作：

```bash
npm install --save babel-polyfill
```

然后，使用 `import` 将其引入到我们的主 bundle 文件：

**src/index.js**

```diff
+import 'babel-polyfill';
+
 function component() {
   const element = document.createElement('div');

   element.innerHTML = join(['Hello', 'webpack'], ' ');

   // Assume we are in the context of `window`
   this.alert("Hmmm, this probably isn't a great idea...");

   return element;
 }

 document.body.appendChild(component());
```

T> 注意，我们没有将 `import` 绑定到某个变量。这是因为 polyfill 直接基于自身执行，并且是在基础代码执行之前，这样通过这些预置，我们就可以假定已经具有某些原生功能。

注意，这种方式优先考虑正确性，而不考虑 bundle 体积大小。为了安全和可靠，polyfill/shim 必须**运行于所有其他代码之前**，而且需要同步加载，或者说，需要在所有 polyfill/shim 加载之后，再去加载所有应用程序代码。
社区中存在许多误解，即现代浏览器“不需要”polyfill，或者 polyfill/shim 仅用于添加缺失功能 - 实际上，它们通常用于**修复损坏实现(repair broken implementation)**，即使是在最现代的浏览器中，也会出现这种情况。
因此，最佳实践仍然是，不加选择地和同步地加载所有 polyfill/shim，尽管这会导致额外的 bundle 体积成本。

如果你认为自己已经打消这些顾虑，并且希望承受损坏的风险。那么接下来的这件事情，可能是你应该要做的：
我们将会把 `import` 放入一个新文件，并加入 [`whatwg-fetch`](https://github.com/github/fetch) polyfill：

```bash
npm install --save whatwg-fetch
```

**src/index.js**

```diff
-import 'babel-polyfill';
-
 function component() {
   const element = document.createElement('div');

   element.innerHTML = join(['Hello', 'webpack'], ' ');

   // Assume we are in the context of `window`
   this.alert("Hmmm, this probably isn't a great idea...");

   return element;
 }

 document.body.appendChild(component());
```

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
    |- globals.js
+   |- polyfills.js
  |- /node_modules
```

**src/polyfills.js**

```javascript
import 'babel-polyfill';
import 'whatwg-fetch';
```

**webpack.config.js**

```diff
 const path = require('path');
 const webpack = require('webpack');

 module.exports = {
-  entry: './src/index.js',
+  entry: {
+    polyfills: './src/polyfills',
+    index: './src/index.js',
+  },
   output: {
-    filename: 'main.js',
+    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
     rules: [
       {
         test: require.resolve('./src/index.js'),
         use: 'imports-loader?wrapper=window',
       },
       {
         test: require.resolve('./src/globals.js'),
         use:
           'exports-loader?type=commonjs&exports[]=file&exports[]=multiple|helpers.parse|parse',
       },
     ],
   },
   plugins: [
     new webpack.ProvidePlugin({
       join: ['lodash', 'join'],
     }),
   ],
 };
```

如上配置之后，我们可以在代码中添加一些逻辑，有条件地加载新的 `polyfills.bundle.js` 文件。根据需要支持的技术和浏览器来决定是否加载。我们将做一些简单的试验，来确定是否需要引入这些 polyfill：

**dist/index.html**

```diff
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8" />
     <title>Getting Started</title>
+    <script>
+      const modernBrowser = 'fetch' in window && 'assign' in Object;
+
+      if (!modernBrowser) {
+        const scriptElement = document.createElement('script');
+
+        scriptElement.async = false;
+        scriptElement.src = '/polyfills.bundle.js';
+        document.head.appendChild(scriptElement);
+      }
+    </script>
   </head>
   <body>
-    <script src="main.js"></script>
+    <script src="index.bundle.js"></script>
   </body>
 </html>
```

现在，在 entry 入口文件中，可以通过 `fetch` 获取一些数据：

**src/index.js**

```diff
 function component() {
   const element = document.createElement('div');

   element.innerHTML = join(['Hello', 'webpack'], ' ');

   // Assume we are in the context of `window`
   this.alert("Hmmm, this probably isn't a great idea...");

   return element;
 }

 document.body.appendChild(component());
+
+fetch('https://jsonplaceholder.typicode.com/users')
+  .then((response) => response.json())
+  .then((json) => {
+    console.log(
+      "We retrieved some data! AND we're confident it will work on a variety of browser distributions."
+    );
+    console.log(json);
+  })
+  .catch((error) =>
+    console.error('Something went wrong when fetching this data: ', error)
+  );
```

执行构建脚本，可以看到，浏览器发送了额外的 `polyfills.bundle.js` 文件请求，然后所有代码顺利执行。注意，以上的这些设定可能还会有所改进，这里我们向你提供一个很棒的想法：将 polyfill 提供给需要引入它的用户。

## 进一步优化 {#further-optimizations}

`babel-preset-env` package 通过 [browserslist](https://github.com/browserslist/browserslist) 来转译那些你浏览器中不支持的特性。这个 preset 使用 [`useBuiltIns`](https://babel.docschina.org/docs/en/babel-preset-env#usebuiltins) 选项，默认值是 `false`，这种方式可以将全局 `babel-polyfill` 导入，改进为更细粒度的 `import` 格式：

```js
import 'core-js/modules/es7.string.pad-start';
import 'core-js/modules/es7.string.pad-end';
import 'core-js/modules/web.timers';
import 'core-js/modules/web.immediate';
import 'core-js/modules/web.dom.iterable';
```

See [the babel-preset-env documentation](https://babeljs.io/docs/en/babel-preset-env) for more information.

## Node 内置 {#node-built-ins}

像 `process` 这种 Node 内置模块，能直接根据配置文件进行正确的 polyfill，而不需要任何特定的 loader 或者 plugin。查看 [node](/configuration/node) 配置页面获取更多信息。

## 其他工具 {#other-utilities}

还有一些其他的工具，也能够帮助我们处理这些遗留模块。

如果这些遗留模块没有 AMD/CommonJS 版本，但你也想将他们加入 `dist` 文件，则可以使用 [`noParse`](/configuration/module/#modulenoparse) 来标识出这个模块。这样就能使 webpack 将引入这些模块，但是不进行转化(parse)，以及不解析(resolve) `require()` 和 `import` 语句。这种用法还会提高构建性能。

W> 任何需要 AST 的功能（例如 `ProvidePlugin`）都不起作用。

最后，一些模块支持多种 [模块格式](/concepts/modules)，例如一个混合有 AMD、CommonJS 和 legacy(遗留) 的模块。在大多数这样的模块中，会首先检查 `define`，然后使用一些怪异代码导出一些属性。在这些情况下，可以通过 [`imports-loader`](/loaders/imports-loader/) 设置 `additionalCode=var%20define%20=%20false;` 来强制 CommonJS 路径。

---

T> 译者注：shimming 是一个库(library)，它将一个新的 API 引入到一个旧的环境中，而且仅靠旧的环境中已有的手段实现。polyfill 就是一个用在浏览器 API 上的 shimming。我们通常的做法是先检查当前浏览器是否支持某个 API，如果不支持的话就按需加载对应的 polyfill。然后新旧浏览器就都可以使用这个 API 了。
