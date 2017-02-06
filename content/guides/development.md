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

每个编辑器都有不同的方式来禁用这一功能，以下是一些最常见的：

* **Sublime Text 3** - 在用户设置（preference）中增加 `"atomic_save": false`。
* **IntelliJ** - 在设置中查找 “safe write”并且禁用它。
* **Vim** - 在设置中增加 `:set backupcopy=yes`。
* **WebStorm** - 在 Preferences > Appearance & Behavior > System Settings 中取消选中 `Use "safe write"`。

## Source Maps

当 JavaScript 异常抛出时，你会想知道这个错误发生在哪个文件的哪一行。然而因为 webpack 将文件输出为一个或多个 bundle，所以追踪这一错误会很不方便。

**Source maps** 试图解决这一问题。它有很多[不同的选项](/configuration/devtool) - 每一个都有自己的优缺点。首先，我们使用这一个：

```js
devtool: "cheap-eval-source-map"
```

## 选择一个工具

webpack 可以在 **watch mode**(监视模式)下使用。在这种模式下，webpack 将监视您的文件，并在更改时重新编译。  
**webpack-dev-server** 提供了一个易于部署的开发服务器，具有快速的实时重载（live reloading）功能。  
如果你已经有一个开发服务器并且需要完全的灵活性，可以使用 **webpack-dev-middleware** 作为中间件。  

webapck-dev-server 和 webpack-dev-middleware 使用内存编译，这意味着 bundle 不会被保存在硬盘上。这使得编译十分迅速，并导致你的文件系统更少麻烦。

在大多数情况下**你会想要使用 webpack-dev-server**，因为这是最简单的开始的方式，并且提供了很多开箱即用的功能。

### webpack Watch Mode（监视模式）

webpack 的 watch mode 会监视文件的更改。如果检测到任何的更改，它都会再次执行编译。 

我们也希望在编译时有一个好看的进度条。运行以下命令：

```bash
webpack --progress --watch
```

在你的文件中做一点更改并且保存。你应该会看到 webpack 正在重新编译。

watch mode 对服务器没有预设，所以你需要自己提供一个。一个简易的服务器是 [`serve`](https://github.com/tj/serve)。安装之后（`npm i serve -g`），你可以在输出的文件目录下运行它：

```bash
serve
```

在每一次编译后，你需要手动刷新你的浏览器来查看更改。

### Watch Mode with Chrome DevTools Workspaces

If you set up Chrome to [persist changes when saving from the _Sources_ panel](https://medium.com/@rafaelideleon/webpack-your-chrome-devtools-workspaces-cb9cca8d50da)
so you don't have to refresh the page, you will have to setup webpack to use

```javascript
devtool: "inline-source-map"
```

to continue editing and saving your changes from Chrome or source files.

There are some _gotchas_ about using workspaces with watch:

- Large chunks (such as a common chunk that is over 1MB) that are rebuilt could cause the page to blank,
which will force you to refresh the browser.
- Smaller chunks will be faster to build than larger chunks since `inline-source-map` is slower
due to having to base64 encode the original source code.

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

在你的文件中做一点更改并且保存。你应该可以在控制台中看到正在编译。完成之后，页面应该会刷新。如果控制台中什么都没发生，你可能需要调整下 [`watchOptions`](/configuration/dev-server#devserver-watchoptions-)。

现在你有了实时重载功能，你甚至可以更进一步：Hot Module Replacement（热模块替换）。这是一个接口，使得可以替换模块**而不需要刷新页面**。查看如何[配置 HMR](/guides/hmr-react)。

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