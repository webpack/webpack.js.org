---
title: Shimming
sort: 13
contributors:
  - pksjce
  - jhnns
  - simon04
  - jeremenichelli
  - svyandun
related:
  - title: Reward modern browser users script
    url: https://hackernoon.com/10-things-i-learned-making-the-fastest-site-in-the-world-18a0e1cdf4a7#c665
  - title: useBuiltIns in babel-preset-env
    url: https://github.com/babel/babel-preset-env#usebuiltins
---

`webpack` 编译器(compiler)能够识别遵循 ES2015 模块语法、CommonJS 或 AMD 规范编写的模块。然而，一些第三方的库(library)可能会引用一些全局依赖（例如 `jQuery` 中的 `$`）。这些库也可能创建一些需要被导出的全局变量。这些“不符合规范的模块”就是 _shimming_ 发挥作用的地方。

W> __我们不推荐使用全局的东西！__在 webpack 背后的整个概念是让前端开发更加模块化。也就是说，需要编写具有良好的封闭性(well contained)、彼此隔离的模块，以及不要依赖于那些隐含的依赖模块（例如，全局变量）。请只在必要的时候才使用本文所述的这些特性。

_shimming_ 另外一个使用场景就是，当你希望 [polyfill](https://en.wikipedia.org/wiki/Polyfill) 浏览器功能以支持更多用户时。在这种情况下，你可能只想要将这些 polyfills 提供给到需要修补(patch)的浏览器（也就是实现按需加载）。

下面的文章将向我们展示这两种用例。

T> 为了方便，本指南沿用[起步](/guides/getting-started)章节中的代码示例。在继续之前，请确保你已经熟悉那些配置。


## shimming 全局变量

让我们开始第一个 shimming 全局变量的用例。在此之前，我们先看看我们的项目：

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
|- /node_modules
```

还记得我们之前用过的 `lodash` 吗？出于演示的目的，让我们把这个模块作为我们应用程序中的一个全局变量。要实现这些，我们需要使用 `ProvidePlugin` 插件。

使用 [`ProvidePlugin`](/plugins/provide-plugin) 后，能够在通过 webpack 编译的每个模块中，通过访问一个变量来获取到 package 包。如果 webpack 知道这个变量在某个模块中被使用了，那么 webpack 将在最终 bundle 中引入我们给定的 package。让我们先移除 `lodash` 的 `import` 语句，并通过插件提供它：

__src/index.js__

``` diff
- import _ from 'lodash';
-
  function component() {
    var element = document.createElement('div');

-   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

__webpack.config.js__

``` diff
  const path = require('path');
+ const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
-   }
+   },
+   plugins: [
+     new webpack.ProvidePlugin({
+       _: 'lodash'
+     })
+   ]
  };
```

本质上，我们所做的，就是告诉 webpack……

> 如果你遇到了至少一处用到 `lodash` 变量的模块实例，那请你将 `lodash` package 包引入进来，并将其提供给需要用到它的模块。

如果我们 run build，将会看到同样的输出：

``` bash
Hash: f450fa59fa951c68c416
Version: webpack 2.2.0
Time: 343ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  544 kB       0  [emitted]  [big]  main
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} [built]
   [3] ./src/index.js 189 bytes {0} [built]
```

我们还可以使用 `ProvidePlugin` 暴露某个模块中单个导出值，只需通过一个“数组路径”进行配置（例如 `[module, child, ...children?]`）。所以，让我们做如下设想，无论 `join` 方法在何处调用，我们都只会得到的是 `lodash` 中提供的 `join` 方法。

__src/index.js__

``` diff
  function component() {
    var element = document.createElement('div');

-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

__webpack.config.js__

``` diff
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.ProvidePlugin({
-       _: 'lodash'
+       join: ['lodash', 'join']
      })
    ]
  };
```

这样就能很好的与 [tree shaking](/guides/tree-shaking) 配合，将 `lodash` 库中的其他没用到的部分去除。


## 细粒度 shimming

一些传统的模块依赖的 `this` 指向的是 `window` 对象。在接下来的用例中，调整我们的 `index.js`：

``` diff
  function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');
+
+   // Assume we are in the context of `window`
+   this.alert('Hmmm, this probably isn\'t a great idea...')

    return element;
  }

  document.body.appendChild(component());
```

当模块运行在 CommonJS 环境下这将会变成一个问题，也就是说此时的 `this` 指向的是 `module.exports`。在这个例子中，你可以通过使用 [`imports-loader`](/loaders/imports-loader/) 覆写 `this`：

__webpack.config.js__

``` diff
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: require.resolve('index.js'),
+         use: 'imports-loader?this=>window'
+       }
+     ]
+   },
    plugins: [
      new webpack.ProvidePlugin({
        join: ['lodash', 'join']
      })
    ]
  };
```


## 全局 exports

让我们假设，某个库(library)创建出一个全局变量，它期望用户使用这个变量。为此，我们可以在项目配置中，添加一个小模块来演示说明：

__project__

``` diff
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
+   |- globals.js
  |- /node_modules
```

__src/globals.js__

``` js
var file = 'blah.txt';
var helpers = {
  test: function() { console.log('test something'); },
  parse: function() { console.log('parse something'); }
}
```

你可能从来没有在自己的源码中做过这些事情，但是你也许遇到过一个老旧的库(library)，和上面所展示的代码类似。在这个用例中，我们可以使用 [`exports-loader`](/loaders/exports-loader/)，将一个全局变量作为一个普通的模块来导出。例如，为了将 `file` 导出为 `file` 以及将 `helpers.parse` 导出为 `parse`，做如下调整：

__webpack.config.js__

``` diff
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: require.resolve('index.js'),
          use: 'imports-loader?this=>window'
-       }
+       },
+       {
+         test: require.resolve('globals.js'),
+         use: 'exports-loader?file,parse=helpers.parse'
+       }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        join: ['lodash', 'join']
      })
    ]
  };
```

现在从我们的 entry 入口文件中(即 `src/index.js`)，我们能 `import { file, parse } from './globals.js';` ，然后一切将顺利进行。


## 加载 polyfills

目前为止我们所讨论的所有内容都是处理那些遗留的 package 包，让我们进入到下一个话题：__polyfills__。

有很多方法来载入 polyfills。例如，要引入 [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/) 我们只需要如下操作：

``` bash
npm i --save babel-polyfill
```

然后使用 `import` 将其添加到我们的主 bundle 文件：

__src/index.js__

``` diff
+ import 'babel-polyfill';
+
  function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

T> 请注意，我们没有将 `import` 绑定到变量。这是因为只需在基础代码(code base)之外，再额外执行 polyfills，这样我们就可以假定代码中已经具有某些原生功能。

polyfills 虽然是一种模块引入方式，但是__并不推荐在主 bundle 中引入 polyfills__，因为这不利于具备这些模块功能的现代浏览器用户，会使他们下载体积很大、但却不需要的脚本文件。

让我们把 `import` 放入一个新文件，并加入 [`whatwg-fetch`](https://github.com/github/fetch) polyfill：

``` bash
npm i --save whatwg-fetch
```

__src/index.js__

``` diff
- import 'babel-polyfill';
-
  function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

__project__

``` diff
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

__src/polyfills.js__

```javascript
import 'babel-polyfill';
import 'whatwg-fetch';
```

__webpack.config.js__

``` diff
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
-   entry: './src/index.js',
+   entry: {
+     polyfills: './src/polyfills.js',
+     index: './src/index.js'
+   },
    output: {
-     filename: 'bundle.js',
+     filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: require.resolve('index.js'),
          use: 'imports-loader?this=>window'
        },
        {
          test: require.resolve('globals.js'),
          use: 'exports-loader?file,parse=helpers.parse'
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        join: ['lodash', 'join']
      })
    ]
  };
```

如此之后，我们可以在代码中添加一些逻辑，根据条件去加载新的 `polyfills.bundle.js` 文件。你该如何决定，依赖于那些需要支持的技术以及浏览器。我们将做一些简单的试验，来确定是否需要引入这些 polyfills：

__dist/index.html__

``` diff
  <html>
    <head>
      <title>Getting Started</title>
+     <script>
+       var modernBrowser = (
+         'fetch' in window &&
+         'assign' in Object
+       );
+
+       if ( !modernBrowser ) {
+         var scriptElement = document.createElement('script');
+
+         scriptElement.async = false;
+         scriptElement.src = '/polyfills.bundle.js';
+         document.head.appendChild(scriptElement);
+       }
+     </script>
    </head>
    <body>
      <script src="index.bundle.js"></script>
    </body>
  </html>
```

现在，我们能在 entry 入口文件中，通过 `fetch` 获取一些数据：

__src/index.js__

``` diff
  function component() {
    var element = document.createElement('div');

    element.innerHTML = join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
+
+ fetch('https://jsonplaceholder.typicode.com/users')
+   .then(response => response.json())
+   .then(json => {
+     console.log('We retrieved some data! AND we\'re confident it will work on a variety of browser distributions.')
+     console.log(json)
+   })
+   .catch(error => console.error('Something went wrong when fetching this data: ', error))
```

当我们开始执行构建时，`polyfills.bundle.js` 文件将会被载入到浏览器中，然后所有代码将正确无误的在浏览器中执行。请注意，以上的这些设定可能还会有所改进，我们只是对于如何解决「将 polyfills 提供给那些需要引入它的用户」这个问题，向你提供一个很棒的想法。


## 深度优化

`babel-preset-env` package 使用 [browserslist](https://github.com/ai/browserslist) 来转译那些你浏览器中不支持的特性。这里预设了 `useBuiltIns` 选项，默认值是 `false`，能将你的全局 `babel-polyfill` 导入方式，改进为更细粒度的 `import` 格式：

``` js
import 'core-js/modules/es7.string.pad-start';
import 'core-js/modules/es7.string.pad-end';
import 'core-js/modules/web.timers';
import 'core-js/modules/web.immediate';
import 'core-js/modules/web.dom.iterable';
```

查看[仓库](https://github.com/babel/babel-preset-env)以获取更多信息。


## Node 内置

像 `process` 这种 Node 内置模块，能直接根据配置文件(configuration file)进行正确的 polyfills，且不需要任何特定的 loaders 或者 plugins。查看 [node 配置页面](/configuration/node)获取更多信息。


## 其他工具

还有一些其他的工具能够帮助我们处理这些老旧的模块。

[`script-loader`](/loaders/script-loader/) 会在全局上下文中对代码进行取值，类似于通过一个 `script` 标签引入脚本。在这种模式下，每一个标准的库(library)都应该能正常运行。`require`, `module` 等的取值是 undefined。

W> 当使用 `script-loader` 时，模块将转化为字符串，然后添加到 bundle 中。它不会被 `webpack` 压缩，所以你应该选择一个 min 版本。同时，使用此 loader 将不会有 `devtool` 的支持。

这些老旧的模块如果没有 AMD/CommonJS 规范版本，但你也想将他们加入 `dist` 文件，你可以使用 [`noParse`](/configuration/module/#module-noparse) 来标识出这个模块。这样就能使 webpack 将引入这些模块，但是不进行转化(parse)，以及不解析(resolve) `require()` 和 `import` 语句。这个实践将提升构建性能。

W> 例如 `ProvidePlugin`，任何需要 AST 的功能，都无法正常运行。

最后，有一些模块支持不同的[模块格式](/concepts/modules)，比如 AMD 规范、CommonJS 规范和遗留模块(legacy)。在大多数情况下，他们首先检查`define`，然后使用一些古怪的代码来导出一些属性。在这些情况下，可以通过[`imports-loader`](/loaders/imports-loader/)设置 `define=>false` 来强制 CommonJS 路径。

***

T> 译者注：shim 是一个库(library)，它将一个新的 API 引入到一个旧的环境中，而且仅靠旧的环境中已有的手段实现。polyfill 就是一个用在浏览器 API 上的 shim。我们通常的做法是先检查当前浏览器是否支持某个 API，如果不支持的话就加载对应的 polyfill。然后新旧浏览器就都可以使用这个 API 了。

***

> 原文：https://webpack.js.org/guides/shimming/
