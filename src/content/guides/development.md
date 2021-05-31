---
title: 开发环境
sort: 4
contributors:
  - SpaceK33z
  - rafde
  - fvgs
  - TheDutchCoder
  - WojciechKo
  - Calinou
  - GAumala
  - EugeneHlushko
  - byzyk
  - trivikr
  - aholzner
  - chenxsan
  - maxloh
translators:
  - QC-L
  - jacob-lcs
  - dear-lizhihua
---

T> 本指南继续沿用 [管理输出](/guides/output-management) 指南中的代码示例。

如果你一直跟随之前的指南，应该对一些 webpack 基础知识有着很扎实的理解。在我们继续之前，先来看看如何设置一个开发环境，使我们的开发体验变得更轻松一些。

W> 本指南中的工具**仅用于开发环境**，请**不要**在生产环境中使用它们！

在开始前，我们先将 [`mode` 设置为 `'development'`](/configuration/mode/#mode-development)，并将 `title` 设置为 `'Development'`。

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
+  mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   plugins: [
     new HtmlWebpackPlugin({
-      title: 'Output Management',
+      title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
 };
```

## 使用 source map {#using-source-maps}

当 webpack 打包源代码时，可能会很难追踪到 error(错误) 和 warning(警告) 在源代码中的原始位置。例如，如果将三个源文件（`a.js`, `b.js` 和 `c.js`）打包到一个 bundle（`bundle.js`）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会直接指向到 `bundle.js`。你可能需要准确地知道错误来自于哪个源文件，所以这种提示这通常不会提供太多帮助。

为了更容易地追踪 error 和 warning，JavaScript 提供了 [source maps](http://blog.teamtreehouse.com/introduction-source-maps) 功能，可以将编译后的代码映射回原始源代码。如果一个错误来自于 `b.js`，source map 就会明确的告诉你。

source map 有许多 [可用选项](/configuration/devtool)，请务必仔细阅读它们，以便可以根据需要进行配置。

对于本指南，我们将使用 `inline-source-map` 选项，这有助于解释说明示例意图（此配置仅用于示例，不要用于生产环境）：

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
+  devtool: 'inline-source-map',
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
 };
```

现在，让我们来做一些调试，在 `print.js` 文件中生成一个错误：

**src/print.js**

```diff
 export default function printMe() {
-  console.log('I get called from print.js!');
+  cosnole.log('I get called from print.js!');
 }
```

运行 `npm run build`，编译如下：

```bash
...
[webpack-cli] Compilation finished
asset index.bundle.js 1.38 MiB [emitted] (name: index)
asset print.bundle.js 6.25 KiB [emitted] (name: print)
asset index.html 272 bytes [emitted]
runtime modules 1.9 KiB 9 modules
cacheable modules 530 KiB
  ./src/index.js 406 bytes [built] [code generated]
  ./src/print.js 83 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
webpack 5.4.0 compiled successfully in 706 ms
```

现在，在浏览器中打开生成的 `index.html` 文件，点击按钮，并且在控制台查看显示的错误。错误应该如下：

```bash
Uncaught ReferenceError: cosnole is not defined
   at HTMLButtonElement.printMe (print.js:2)
```

我们可以看到，此错误包含有发生错误的文件（`print.js`）和行号（2）的引用。这是非常有帮助的，因为现在我们可以确切地知道，所要解决问题的位置。

## 选择一个开发工具 {#choosing-a-development-tool}

W> 某些文本编辑器具有 "safe write(安全写入)" 功能，可能会干扰下面一些工具。阅读 [调整文本编辑器](#adjusting-your-text-editor) 以解决这些问题。

在每次编译代码时，手动运行 `npm run build` 会显得很麻烦。

webpack 提供几种可选方式，帮助你在代码发生变化后自动编译代码：

1.  webpack's [Watch Mode](/configuration/watch/#watch)
2.  [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
3.  [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)

多数场景中，你可能需要使用 `webpack-dev-server`，但是不妨探讨一下以上的所有选项。

### 使用 watch mode(观察模式) {#using-watch-mode}

你可以指示 webpack "watch" 依赖图中所有文件的更改。如果其中一个文件被更新，代码将被重新编译，所以你不必再去手动运行整个构建。

我们添加一个用于启动 webpack watch mode 的 npm scripts：

**package.json**

```diff
 {
   "name": "webpack-demo",
   "version": "1.0.0",
   "description": "",
   "private": true,
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
+    "watch": "webpack --watch",
     "build": "webpack"
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "devDependencies": {
     "html-webpack-plugin": "^4.5.0",
     "webpack": "^5.4.0",
     "webpack-cli": "^4.2.0"
   },
   "dependencies": {
     "lodash": "^4.17.20"
   }
 }
```

现在，你可以在命令行中运行 `npm run watch`，然后就会看到 webpack 是如何编译代码。
然而，你会发现并没有退出命令行。这是因为此 script 当前还在 watch 你的文件。

现在，webpack 观察文件的同时，先移除我们之前加入的错误：

**src/print.js**

```diff
 export default function printMe() {
-  cosnole.log('I get called from print.js!');
+  console.log('I get called from print.js!');
 }
```

现在，保存文件并检查 terminal(终端) 窗口。应该可以看到 webpack 自动地重新编译修改后的模块！

唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。如果能够自动刷新浏览器就更好了，因此接下来我们会尝试通过 `webpack-dev-server` 实现此功能。

### 使用 webpack-dev-server {#using-webpack-dev-server}

`webpack-dev-server` 为你提供了一个基本的 web server，并且具有 live reloading(实时重新加载) 功能。设置如下：

```bash
npm install --save-dev webpack-dev-server
```

修改配置文件，告知 dev server，从什么位置查找文件：

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   devtool: 'inline-source-map',
+  devServer: {
+    contentBase: './dist',
+  },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
 };
```

以上配置告知 `webpack-dev-server`，将 `dist` 目录下的文件 serve 到 `localhost:8080` 下。（译注：serve，将资源作为 server 的可访问文件）

T> `webpack-dev-server` 会从 `output.path` 中定义的目录为服务提供 bundle 文件，即，文件将可以通过 `http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]` 进行访问。

W> webpack-dev-server 在编译之后不会写入到任何输出文件。而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。如果你的页面希望在其他不同路径中找到 bundle 文件，则可以通过 dev server 配置中的 [`publicPath`](/configuration/dev-server/#devserverpublicpath-) 选项进行修改。

我们添加一个可以直接运行 dev server 的 script：

**package.json**

```diff
 {
   "name": "webpack-demo",
   "version": "1.0.0",
   "description": "",
   "private": true,
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "watch": "webpack --watch",
+    "start": "webpack serve --open",
     "build": "webpack"
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "devDependencies": {
     "html-webpack-plugin": "^4.5.0",
     "webpack": "^5.4.0",
     "webpack-cli": "^4.2.0",
     "webpack-dev-server": "^3.11.0"
   },
   "dependencies": {
     "lodash": "^4.17.20"
   }
 }
```

现在，在命令行中运行 `npm start`，我们会看到浏览器自动加载页面。如果你更改任何源文件并保存它们，web server 将在编译代码后自动重新加载。试试看！

`webpack-dev-server` 具有许多可配置的选项。关于其他更多配置，请查看 [配置文档](/configuration/dev-server)。

T> 现在，server 正在运行，你可能需要尝试 [模块热替换(hot module replacement)](/guides/hot-module-replacement)！

### 使用 webpack-dev-middleware {#using-webpack-dev-middleware}

`webpack-dev-middleware` 是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 server。`webpack-dev-server` 在内部使用了它，然而它也可以作为一个单独的 package 来使用，以便根据需求进行更多自定义设置。下面是一个 webpack-dev-middleware 配合 express server 的示例。

首先，安装 `express` 和 `webpack-dev-middleware`：

```bash
npm install --save-dev express webpack-dev-middleware
```

现在，我们需要调整 webpack 配置文件，以确保 middleware(中间件) 功能能够正确启用：

**webpack.config.js**

```diff
 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
   devtool: 'inline-source-map',
   devServer: {
     contentBase: './dist',
   },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Development',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
+    publicPath: '/',
   },
 };
```

我们将会在 server 脚本使用 `publicPath`，以确保文件资源能够正确地 serve 在 `http://localhost:3000` 下，稍后我们会指定 port number(端口号)。接下来是设置自定义 `express` server：

**project**

```diff
  webpack-demo
  |- package.json
  |- webpack.config.js
+ |- server.js
  |- /dist
  |- /src
    |- index.js
    |- print.js
  |- /node_modules
```

**server.js**

```javascript
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// 将文件 serve 到 port 3000。
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

现在，添加一个 npm script，以使我们更方便地运行 server：

**package.json**

```diff
 {
   "name": "webpack-demo",
   "version": "1.0.0",
   "description": "",
   "private": true,
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "watch": "webpack --watch",
     "start": "webpack serve --open",
+    "server": "node server.js",
     "build": "webpack"
   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "devDependencies": {
     "express": "^4.17.1",
     "html-webpack-plugin": "^4.5.0",
     "webpack": "^5.4.0",
     "webpack-cli": "^4.2.0",
     "webpack-dev-middleware": "^4.0.2",
     "webpack-dev-server": "^3.11.0"
   },
   "dependencies": {
     "lodash": "^4.17.20"
   }
 }
```

现在，在 terminal(终端) 中执行 `npm run server`，将会有类似如下信息输出：

```bash
Example app listening on port 3000!
...
<i> [webpack-dev-middleware] asset index.bundle.js 1.38 MiB [emitted] (name: index)
<i> asset print.bundle.js 6.25 KiB [emitted] (name: print)
<i> asset index.html 274 bytes [emitted]
<i> runtime modules 1.9 KiB 9 modules
<i> cacheable modules 530 KiB
<i>   ./src/index.js 406 bytes [built] [code generated]
<i>   ./src/print.js 83 bytes [built] [code generated]
<i>   ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
<i> webpack 5.4.0 compiled successfully in 709 ms
<i> [webpack-dev-middleware] Compiled successfully.
<i> [webpack-dev-middleware] Compiling...
<i> [webpack-dev-middleware] assets by status 1.38 MiB [cached] 2 assets
<i> cached modules 530 KiB (javascript) 1.9 KiB (runtime) [cached] 12 modules
<i> webpack 5.4.0 compiled successfully in 19 ms
<i> [webpack-dev-middleware] Compiled successfully.
```

现在，打开浏览器，访问 `http://localhost:3000`。应该看到 webpack 应用程序已经运行！

T> 如果想要了解更多关于模块热替换(hot module replacement)的运行机制，我们推荐你查看 [模块热替换(hot module replacement)](/guides/hot-module-replacement/) 指南。

## 调整文本编辑器 {#adjusting-your-text-editor}

使用自动编译代码时，可能会在保存文件时遇到一些问题。某些编辑器具有 "safe write(安全写入)" 功能，会影响重新编译。

在一些常见的编辑器中禁用此功能，查看以下列表：

- **Sublime Text 3**：在用户首选项(user preferences)中添加 `atomic_save: 'false'`。
- **JetBrains IDEs (e.g. WebStorm)**：在 `Preferences > Appearance & Behavior > System Settings` 中取消选中 "Use safe write"。
- **Vim**：在设置(settings)中增加 `:set backupcopy=yes`。

## 结论 {#conclusion}

<<<<<<< HEAD
现在，你已经学会了如何自动编译代码，并运行一个简单的 development server，查看下一个指南，其中将介绍[代码分割（Code Splitting）](/guides/code-splitting/)。
=======
Now that you've learned how to automatically compile your code and run a development server, you can check out the next guide, which will cover [Code Splitting](/guides/code-splitting/).
>>>>>>> b2b1b5d42c04cdccdc522c97cb2f4604e898a382
