---
title: 开发
sort: 50
contributors:
  - SpaceK33z
  - rafde
---

在这一章节，我们将会解释如何开始开发并且如何从三种开发工具中进行选择。这里假设你已经有了一个 webpack 配置文件。

W> 永远不要在生产环境中使用这些工具，永远不要。

## 调整你的文本编辑器

一些文本编辑器有“safe write”（安全写入）功能，并且默认启用。因此，保存文件后并不总是会导致 webpack 重新编译。

每个编辑器都有不同的方式来禁用这一功能，以下是一些最常见编辑器的设置：

* **Sublime Text 3** - 在用户首选项（user preference）中增加 `"atomic_save": false`。
* **IntelliJ** - 在首选项（preferences）中使用搜索查找到 “safe write”并且禁用它。
* **Vim** - 在您的设置（settings）中增加 `:set backupcopy=yes`。
* **WebStorm** - 在 Preferences > Appearance & Behavior > System Settings 中取消选中 `Use "safe write"`。

## Source Maps

当 JavaScript 异常抛出时，你常会想知道这个错误发生在哪个文件的哪一行。然而因为 webpack 将文件输出为一个或多个 bundle，所以 追踪这一错误会很不方便。

**Source maps** 试图解决这一问题。它有很多[不同的选项](/configuration/devtool) - 每一个都有自己的优缺点。首先，我们使用这一个：

```js
devtool: "cheap-eval-source-map"
```

## 选择一个工具

webpack 可以在 **watch mode**(监视模式)下使用。在这种模式下，webpack 将监视您的文件，并在被更改时重新编译。  
**webpack-dev-server** 提供了一个易于部署的开发服务器，具有快速的实时重载（live reloading）功能。  
如果你已经有一个开发服务器并且需要充分的灵活性，可以使用 **webpack-dev-middleware** 作为中间件。  

webapck-dev-server 和 webpack-dev-middleware 使用内存编译，这意味着 bundle 不会被保存在硬盘上。这使得编译十分迅速，并使得你的文件系统带来更少的麻烦。

在大多数情况下**你会想要使用 webpack-dev-server**，因为这是最简单的开始的方式，并且提供了很多out-of-the-box（开箱即用）的功能。

### webpack Watch Mode（监视模式）

webpack 的 watch mode 会监视文件的更改。如果检测到任何的更改，它都会再次执行编译。 

我们也希望在编译时有一个好看的进度条。运行以下命令：

```bash
webpack --progress --watch
```

在你的文件中做一点更改并且保存。你应该会看到 webpack 正在重新编译。

watch mode 对服务器没有预设，所以你需要给自己提供一个。一个简易的服务器是 [`serve`](https://github.com/tj/serve)。安装之后（`npm i --save-dev serve`），你可以在输出的文件目录下运行它：

```bash
`npm bin`/serve
```

您可能会发现使用npm scripts运行 `serve` 更方便。您可以这样做，首先在package.json中创建一个 `start` 脚本，如下所示：

```bash
"scripts": {
  "start": "serve"
}
```

然后，您可以通过在项目目录中运行 `npm start` 来启动服务器。在每一次编译后，
你需要手动刷新你的浏览器来查看更改。

T> 您可能会发现 --single 选项对于提供单页应用服务非常有用。

### 用Chrome DevTools工作区使用Watch Mode（监视模式）

如果从[源面板保存时设置Chrome以保持更改](https://medium.com/@rafaelideleon/webpack-your-chrome-devtools-workspaces-cb9cca8d50da#.mmzbo7jkp)，则无需刷新页面，你将不得不设置 webpack 来使用

```javascript
devtool: "inline-source-map"
```

继续编辑和保存来自Chrome或源文件的更改。

有关对监视使用工作区的一些 _gotchas_：

- 重建的大块（Large chunks）（例如超过1MB的公共块）可能导致页面为空白，这将强制您刷新浏览器。
- 较小的块将比较大的块构建得更快，因为 `inline-source-map` 必须对原始源代码进行base64编码而较慢。

### webpack-dev-server

webpack-dev-server 为你提供了一个服务器和实时重载（live reloading） 功能。这很容易设置。

在开始前，确定你有一个 `index.html` 文件指向你的 bundle。假设 `output.filename` 是 `bunlde.js`。

```html
<script src="/bundle.js"></script>
```

首先从 npm 安装 `webpack-dev-server`：

```bash
npm install webpack-dev-server --save-dev
```

安装完成之后，你应该可以使用 `webpack-dev-server` 了，方式如下：

```bash
webpack-dev-server --open
```

T> 如果你的控制台说无法找到该命令，尝试运行 `node_modules/.bin/webpack-dev-server`。正常情况下你应该把该命令加在 `package.json` 中，例如：`"scripts": {"start": "webpack-dev-server"}`。 

上述命令应该自动在浏览器中打开 `http://localhost:8080`。

在你的文件中做一点更改并且保存。你应该可以在控制台中看到正在编译。编译完成之后，页面应该会刷新。如果控制台中什么都没发生，你可能需要调整下 [`watchOptions`](/configuration/dev-server#devserver-watchoptions-)。

现在你有了实时重载功能，你甚至可以更进一步：Hot Module Replacement（热模块替换）。这是一个接口，使得你可以替换模块**而不需要刷新页面**。查看如何[配置 HMR](/guides/hmr-react)。

默认情况下 webpack 会使用**inline mode**（内联模式）。这种模式在你的 bundle 中注入客户端（用来 live reloading 和展示构建错误）。Inline 模式下，你会在你的 DevTools 控制台中看到构建错误。

webpack-dev-server 可以做很多事情，比如转发请求到你的后端服务器。更多配置项，请参阅 [**devServer documentation**](/configuration/dev-server)。

### webpack-dev-middleware

webpack-dev-middleware 适用于基于链接的中间件环境（connect-based middleware stacks）。如果你已经有一个 Node.js 服务器或者你想要完全控制服务器，这将很实用。

这个中间件会导致 webpack 在内存中编译文件。当一个编译正在执行的时候，它会将对于文件的请求延迟，直到编译完成。

W> 该中间件是为进阶用户使用的。对于一般用户，webpack-dev-server 更容易使用。

首先从 npm 上安装依赖：

```bash
npm install express webpack-dev-middleware --save-dev
```

安装完成后，可以按如下所示使用该中间件：

```js
var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");

var app = express();
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/" // 大部分情况下和 `output.publicPath`相同
}));

app.listen(3000, function () {
  console.log("Listening on port 3000!");
});
```

根据你在 `output.publicPath` 和 `output.filename` 中设置的内容，你的 bundle 现在应该在 `http://localhost:3000/bundle.js` 中可以看到了。

默认情况下会使用**watch mode**。也可以使用 **lazy mode**，这使得 webpack 只在对入口点进行请求时再进行重新编译。

设置仅在对入口 `bundle.js` 请求时进行编译：

```js
app.use(webpackDevMiddleware(compiler, {
  lazy: true,
  filename: "bundle.js" // Same as `output.filename` in most cases.
}));
```

还有许多其他的选项可以设置。所有的设置项请查阅 [**devServer 文档**](/configuration/dev-server)。

## 参考

* [SurviveJS - Automatic Browser Refresh](http://survivejs.com/webpack/developing-with-webpack/automatic-browser-refresh/)
* [Webpack your Chrome DevTools Workspaces](https://medium.com/@rafaelideleon/webpack-your-chrome-devtools-workspaces-cb9cca8d50da)

***

> 原文：https://webpack.js.org/guides/development/
