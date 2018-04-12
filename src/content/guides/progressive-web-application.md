---
title: 渐进式网络应用程序
sort: 14
contributors:
  - johnnyreilly
  - chenxsan
---

T> 本指南继续沿用[管理输出](/guides/output-management)中的代码示例。

渐进式网络应用程序(Progressive Web Application - PWA)，是一种可以提供类似于原生应用程序(native app)体验的网络应用程序(web app)。PWA 可以用来做很多事。其中最重要的是，在__离线(offline)__时应用程序能够继续运行功能。这是通过使用名为 [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/) 的网络技术来实现的。

本章将重点介绍，如何为我们的应用程序添加离线体验。我们将使用名为 [Workbox](https://github.com/GoogleChrome/workbox) 的 Google 项目来实现此目的，该项目提供的工具可帮助我们更轻松地配置 web app 的离线支持。


## 现在我们并没有离线环境下运行过

到目前为止，我们一直是直接查看本地文件系统的输出结果。通常情况下，真正的用户是通过网络访问网络应用程序；用户的浏览器会与一个提供所需资源（例如，`.html`, `.js` 和 `.css` 文件）的__服务器__通讯。

那么让我们来使用一个简易服务器，搭建出我们所需的离线体验。我们将使用 [http-server](https://www.npmjs.com/package/http-server) package 包：`npm install http-server --save-dev`。还要修改 `package.json` 的 `scripts` 部分，来添加一个 `start` 脚本：

__package.json__

``` diff
{
  ...
  "scripts": {
-    "build": "webpack"
+    "build": "webpack",
+    "start": "http-server dist"
  },
  ...
}
```

如果你之前没有操作过，请运行命令 `npm run build` 来构建你的项目。然后运行命令 `npm start`。这应该输出以下：

``` bash
> http-server dist

启动 http-server，服务目录是 dist
可以访问：
  http://xx.x.x.x:8080
  http://127.0.0.1:8080
  http://xxx.xxx.x.x:8080
按下 CTRL-C 停止服务
```

如果你打开浏览器访问 `http://localhost:8080` (即 `http://127.0.0.1`)，你应该会看到在 `dist` 目录创建出服务，并可以访问 webpack 应用程序。如果停止服务器然后刷新，则 webpack 应用程序不再可访问。

这就是我们最终要改变的现状。在本章结束时，我们应该要实现的是，停止服务器然后刷新，仍然可以查看应用程序正常运行。


## 添加 Workbox

添加 workbox-webpack-plugin 插件，并调整 `webpack.config.js` 文件：

``` bash
npm install workbox-webpack-plugin --save-dev
```

__webpack.config.js__

``` diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const WorkboxPlugin = require('workbox-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
-     title: 'Output Management'
+     title: 'Progressive Web Application'
-   })
+   }),
+   new WorkboxPlugin.GenerateSW({
+     // 这些选项帮助 ServiceWorkers 快速启用
+     // 不允许遗留任何“旧的” ServiceWorkers
+     clientsClaim: true,
+     skipWaiting: true
+   })
  ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

有了 Workbox，我们再看下执行 `npm run build` 时会发生什么：

``` bash
clean-webpack-plugin: /mnt/c/Source/webpack-follow-along/dist has been removed.
Hash: 6588e31715d9be04be25
Version: webpack 3.10.0
Time: 782ms
                                                Asset       Size  Chunks                    Chunk Names
                                        app.bundle.js     545 kB    0, 1  [emitted]  [big]  app
                                      print.bundle.js    2.74 kB       1  [emitted]         print
                                           index.html  254 bytes          [emitted]
precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js  268 bytes          [emitted]
                                                sw.js       1 kB          [emitted]
   [0] ./src/print.js 87 bytes {0} {1} [built]
   [1] ./src/index.js 477 bytes {0} [built]
   [3] (webpack)/buildin/global.js 509 bytes {0} [built]
   [4] (webpack)/buildin/module.js 517 bytes {0} [built]
    + 1 hidden module
Child html-webpack-plugin for "index.html":
     1 asset
       [2] (webpack)/buildin/global.js 509 bytes {0} [built]
       [3] (webpack)/buildin/module.js 517 bytes {0} [built]
        + 2 hidden modules
```

现在你可以看到，生成了 2 个额外的文件：`sw.js` 和体积很大的 `precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js`。`sw.js` 是 Service Worker 文件，`precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js` 是 `sw.js` 引用的文件，所以它也可以运行。可能在你本地生成的文件会有所不同；但是你那里应该会有一个 `sw.js` 文件。

所以，值得高兴的是，我们现在已经创建出 Service Worker 的高兴点。接下来该做什么？


## 注册我们的 Service Worker

让我们将注册 Service Worker，使其出场并开始表演。通过添加以下注册代码来完成此操作：

__index.js__

``` diff
  import _ from 'lodash';
  import printMe from './print.js';

+ if ('serviceWorker' in navigator) {
+   window.addEventListener('load', () => {
+     navigator.serviceWorker.register('/sw.js').then(registration => {
+       console.log('SW registered: ', registration);
+     }).catch(registrationError => {
+       console.log('SW registration failed: ', registrationError);
+     });
+   });
+ }
```

再次运行 `npm build build` 来构建包含注册代码版本的应用程序。然后用 `npm start` 启动服务。访问 `http://localhost:8080` 并查看 console 控制台。在那里你应该看到：

``` bash
SW registered
```

现在来进行测试。停止服务器并刷新页面。如果浏览器能够支持 Service Worker，你应该可以看到你的应用程序还在正常运行。然而，服务器已经__停止__了服务，此刻是 Service Worker 在提供服务。


## 结论

你已经使用 Workbox 项目构建了一个离线应用程序。开始进入将 web app 改造为 PWA 的旅程。你现在可能想要考虑下一步做什么。在这里的[谷歌文档](https://developers.google.com/web/progressive-web-apps/)中可以找到一些不错的资源。

***

> 原文：https://webpack.js.org/guides/progressive-web-application/
