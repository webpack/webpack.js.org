---
title: 起步
sort: 1
contributors:
  - bebraw
  - varunjayaraman
  - cntanglijun
  - chrisVillanueva
  - johnstew
  - simon04
  - aaronang
  - TheDutchCoder
  - sudarsangp
  - Vanguard90
  - chenxsan
  - EugeneHlushko
  - ATGardner
  - ayvarot
  - bjarki
  - ztomasze
  - Spiral90210
  - byzyk
  - wizardofhogwarts
  - myshov
---

webpack 用于编译 JavaScript 模块。一旦完成 [安装](/guides/installation)，你就可以通过 webpack [CLI](/api/cli) 或 [API](/api/node) 与其配合交互。如果你还不熟悉 webpack，请阅读 [核心概念](/concepts) 和 [对比](/comparison)，了解为什么要使用 webpack，而不是社区中的其他工具。

W> 从 webpack v5.0.0-beta.1 开始，需要运行的 Node.js 最低版本是 10.13.0 (LTS)

## 基本安装

首先我们创建一个目录，初始化 npm，然后 [在本地安装 webpack](/guides/installation#local-installation)，接着安装 webpack-cli（此工具用于在命令行中运行 webpack）：

``` bash
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

T> 贯穿整个指南的是，我们将使用 `diff` 块，来展示对目录、文件和代码所做的修改。

现在，我们将创建以下目录结构、文件和内容：

__project__

``` diff
  webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

__src/index.js__

``` javascript
function component() {
  const element = document.createElement('div');

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

__index.html__

``` html
<!doctype html>
<html>
  <head>
    <title>起步</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

我们还需要调整 `package.json` 文件，以便确保我们安装包是 `private(私有的)`，并且移除 `main` 入口。这可以防止意外发布你的代码。

T> 如果你想要了解 `package.json` 内在机制的更多信息，我们推荐阅读 [npm 文档](https://docs.npmjs.com/files/package.json)。

__package.json__

``` diff
  {
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
+   "private": true,
-   "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.20.2",
      "webpack-cli": "^3.1.2"
    },
    "dependencies": {}
  }
```

在此示例中，`<script>` 标签之间存在隐式依赖关系。在 `index.js` 文件执行之前，还需要在页面中先引入 `lodash`。这是因为 `index.js` 并未显式声明它需要 `lodash`，只是假定推测已经存在一个全局变量 `_`。

使用这种方式去管理 JavaScript 项目会有一些问题：

- 无法直接体现，脚本的执行依赖于外部库。
- 如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。
- 如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码。

让我们使用 webpack 来管理这些脚本。

## 创建一个 bundle

首先，我们稍微调整下目录结构，创建分发代码(`/dist`)文件夹用于存放分发代码，源代码(`/src`)文件夹仍存放源代码。源代码是指用于书写和编辑的代码。分发代码是指在构建过程中，经过最小化和优化后产生的输出结果，最终将在浏览器中加载。调整后目录结构如下：

__project__

``` diff
  webpack-demo
  |- package.json
+ |- /dist
+   |- index.html
- |- index.html
  |- /src
    |- index.js
```

要在 `index.js` 中打包 `lodash` 依赖，我们需要在本地安装 library：

``` bash
npm install --save lodash
```

T> 在安装一个 package，而此 package 要打包到生产环境 bundle 中时，你应该使用 `npm install --save`。如果你在安装一个用于开发环境的 package 时（例如，linter, 测试库等），你应该使用 `npm install --save-dev`。更多信息请查看 [npm 文档](https://docs.npmjs.com/cli/install)。

现在，在我们的 script 中 import `lodash`：

__src/index.js__

``` diff
+ import _ from 'lodash';
+
  function component() {
    const element = document.createElement('div');

-   // lodash（目前通过一个 script 引入）对于执行这一行是必需的
+   // lodash，现在通过一个 script 引入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

现在，我们将会打包所有脚本，我们必须更新 `index.html` 文件。由于现在是通过 `import` 引入 lodash，所以要将 lodash `<script>` 删除，然后修改另一个 `<script>` 标签来加载 bundle，而不是原始的 `/src` 文件：

__dist/index.html__

``` diff
  <!doctype html>
  <html>
   <head>
     <title>起步</title>
-    <script src="https://unpkg.com/lodash@4.16.6"></script>
   </head>
   <body>
-    <script src="./src/index.js"></script>
+    <script src="main.js"></script>
   </body>
  </html>
```

在这个设置中，`index.js` 显式要求引入的 `lodash` 必须存在，然后将它绑定为 `_`（没有全局作用域污染）。通过声明模块所需的依赖，webpack 能够利用这些信息去构建依赖图，然后使用图生成一个优化过的 bundle，并且会以正确顺序执行。

可以这样说，执行 `npx webpack`，会将我们的脚本 `src/index.js` 作为 [入口起点](/concepts/entry-points)，也会生成 `dist/main.js` 作为 [输出](/concepts/output)。Node 8.2/npm 5.2.0 以上版本提供的 `npx` 命令，可以运行在初次安装的 webpack package 中的 webpack 二进制文件（即 `./node_modules/.bin/webpack`）：

``` bash
npx webpack

...
Built at: 13/06/2018 11:52:07
  Asset      Size  Chunks             Chunk Names
main.js  70.4 KiB       0  [emitted]  main
...

WARNING in configuration (配置警告)
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment. ('mode' 选项还未设置，webpack 会将其值回退至 'production'。将 'mode' 选项设置为 'development' 或 'production'，来启用对应环境的默认优化设置)
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/ (也可以将其设置为 'none'，以禁用所有默认行为。了解更多 https://webpack.js.org/configuration/mode/)
```

T> 输出可能会稍有不同，但是只要构建成功，那么你就可以放心继续。并且不要担心警告，稍后我们就会解决。

在浏览器中打开 `index.html`，如果一切正常，你应该能看到以下文本：'Hello webpack'。

W> 在浏览器中打开 `index.html`，如果在压缩过后的 JavaScript 中出现语法错误，请设置 [`development 模式`](/configuration/mode/#mode-development)，并再次运行 `npx webpack`。这与最新版本 Node.js (v12.5+) 上运行 `npx webpack` 有关，和 [LTS 版本](https://nodejs.org/en/) 无关。


## 模块

[ES2015](https://babeljs.io/learn-es2015/) 中的 [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) 和 [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) 语句已经被标准化。虽然大多数浏览器还无法支持它们，但是 webpack 却能够提供开箱即用般的支持。

事实上，webpack 在幕后会将代码“转译”，以便旧版本浏览器可以执行。如果你检查 `dist/main.js`，你可以看到 webpack 具体如何实现，这是独创精巧的设计！除了 `import` 和 `export`，webpack 还能够很好地支持多种其他模块语法，更多信息请查看 [模块 API](/api/module-methods)。

注意，webpack 不会更改代码中除 `import` 和 `export` 语句以外的部分。如果你在使用其它 [ES2015 特性](http://es6-features.org/)，请确保你在 webpack [loader 系统](/concepts/loaders/) 中使用了一个像是 [Babel](https://babel.docschina.org/) 或 [Bublé](https://buble.surge.sh/guide/) 的 [transpiler(转译器)](/loaders/#transpiling)。


## 使用一个配置文件

在 webpack v4 中，可以无须任何配置，然而大多数项目会需要很复杂的设置，这就是为什么 webpack 仍然要支持 [配置文件](/concepts/configuration)。这比在 terminal(终端) 中手动输入大量命令要高效的多，所以让我们创建一个配置文件：

__project__

``` diff
  webpack-demo
  |- package.json
+ |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

__webpack.config.js__

``` javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

现在，让我们通过新的配置文件再次执行构建：

``` bash
npx webpack --config webpack.config.js

...
  Asset      Size  Chunks             Chunk Names
main.js  70.4 KiB       0  [emitted]  main
...

WARNING in configuration (配置警告)
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment. ('mode' 选项还未设置，webpack 会将其值回退至 'production'。将 'mode' 选项设置为 'development' 或 'production'，来启用对应环境的默认优化设置)
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/ (也可以将其设置为 'none'，以禁用所有默认行为。了解更多 https://webpack.js.org/configuration/mode/)
```

T> 如果 `webpack.config.js` 存在，则 `webpack` 命令将默认选择使用它。我们在这里使用 `--config` 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用的。

比起 CLI 这种简单直接的使用方式，配置文件具有更多的灵活性。我们可以通过配置方式指定 loader 规则(loader rule)、plugin(插件)、resolve 选项，以及许多其他增强功能。更多详细信息请查看 [配置文档](/configuration)。


## npm scripts

考虑到用 CLI 这种方式来运行本地的 webpack 副本并不是特别方便，我们可以设置一个快捷方式。调整 _package.json_ 文件，添加一个 [npm script](https://docs.npmjs.com/misc/scripts)：

__package.json__

``` diff
  {
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
    "scripts": {
-      "test": "echo \"Error: no test specified\" && exit 1"
+      "test": "echo \"Error: no test specified\" && exit 1",
+      "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.20.2",
      "webpack-cli": "^3.1.2"
    },
    "dependencies": {
      "lodash": "^4.17.5"
    }
  }
```

现在，可以使用 `npm run build` 命令，来替代我们之前使用的 `npx` 命令。注意，使用 npm `scripts`，我们可以像使用 `npx` 那样通过模块名引用本地安装的 npm packages。这是大多数基于 npm 的项目遵循的标准，因为它允许所有贡献者使用同一组通用脚本（如果必要，每个命令都需要添加 `--config` flag）。

现在运行以下命令，然后看看你的脚本别名是否正常运行：

``` bash
npm run build

...
  Asset      Size  Chunks             Chunk Names
main.js  70.4 KiB       0  [emitted]  main
...

WARNING in configuration (配置警告)
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment. ('mode' 选项还未设置，webpack 会将其值回退至 'production'。将 'mode' 选项设置为 'development' 或 'production'，来启用对应环境的默认优化设置)
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/ (也可以将其设置为 'none'，以禁用所有默认行为。了解更多 https://webpack.js.org/configuration/mode/)
```

T> 通过在 `npm run build` 命令和你的参数之间添加两个中横线，可以将自定义参数传递给 webpack，例如：`npm run build -- --colors`。


## 结论

现在，你已经有了一个基础构建配置，你应该移至下一章节 [`资源管理`](/guides/asset-management) 指南，以了解如何通过 webpack 来管理资源，例如 images、fonts。此刻你的项目看起来应该如下：

__project__

``` diff
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
  |- main.js
  |- index.html
|- /src
  |- index.js
|- /node_modules
```

T> 如果你使用的是 npm 5，你可能还会在目录中看到一个 `package-lock.json` 文件。

如果想要了解 webpack 设计思想，你应该看下 [基本概念](/concepts) 和 [配置](/configuration) 页面。此外，[API](/api) 章节可以深入了解 webpack 提供的各种接口。
