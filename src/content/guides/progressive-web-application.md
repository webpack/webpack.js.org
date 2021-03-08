---
title: 渐进式网络应用程序
sort: 22
contributors:
  - johnnyreilly
  - chenxsan
  - EugeneHlushko
  - benschac
  - aholzner
---

T> 本指南继续沿用 [管理输出](/guides/output-management) 中的代码示例。

渐进式网络应用程序(progressive web application - PWA)，是一种可以提供类似于native app(原生应用程序) 体验的 web app(网络应用程序)。PWA 可以用来做很多事。其中最重要的是，在**离线(offline)**时应用程序能够继续运行功能。这是通过使用名为 [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/) 的 web 技术来实现的。

本章将重点介绍，如何为我们的应用程序添加离线体验。我们将使用名为 [Workbox](https://github.com/GoogleChrome/workbox) 的 Google 项目来实现此目的，该项目提供的工具可帮助我们更简单地为 web app 提供离线支持。

## 现在，我们并没有运行在离线环境下 {#we-dont-work-offline-now}

到目前为止，我们一直是直接查看本地文件系统的输出结果。通常情况下，真正的用户是通过网络访问 web app；用户的浏览器会与一个提供所需资源（例如，`.html`, `.js` 和 `.css` 文件）的 **server** 通讯。

我们通过搭建一个简易 server 下，测试下这种离线体验。这里使用 [http-server](https://www.npmjs.com/package/http-server) package：`npm install http-server --save-dev`。还要修改 `package.json` 的 `scripts` 部分，来添加一个 `start` script：

**package.json**

```diff
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

注意：默认情况下，[webpack DevServer](/configuration/dev-server/) 会写入到内存。我们需要启用 [writeToDisk](/configuration/dev-server#devserverwritetodisk-) 选项，来让 http-server 处理 `./dist` 目录中的文件。

如果你之前没有操作过，先得运行命令 `npm run build` 来构建你的项目。然后运行命令 `npm start`。应该产生以下输出：

```bash
> http-server dist

Starting up http-server, serving dist
Available on:
  http://xx.x.x.x:8080
  http://127.0.0.1:8080
  http://xxx.xxx.x.x:8080
Hit CTRL-C to stop the server
```

如果你打开浏览器访问 `http://localhost:8080` (即 `http://127.0.0.1`)，你应该会看到 webpack 应用程序被 serve 到 `dist` 目录。如果停止 server 然后刷新，则 webpack 应用程序不再可访问。

这就是我们为实现离线体验所需要的改变。在本章结束时，我们应该要实现的是，停止 server 然后刷新，仍然可以看到应用程序正常运行。

## 添加 Workbox {#adding-workbox}

添加 workbox-webpack-plugin 插件，然后调整 `webpack.config.js` 文件：

```bash
npm install workbox-webpack-plugin --save-dev
```

**webpack.config.js**

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
+ const WorkboxPlugin = require('workbox-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js',
    },
    plugins: [
<<<<<<< HEAD
      // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
      new CleanWebpackPlugin(),
=======
>>>>>>> 740b17b7f3fd3b3503862c67f6dca4e3e4c1ac39
      new HtmlWebpackPlugin({
-       title: 'Output Management',
+       title: 'Progressive Web Application',
      }),
+     new WorkboxPlugin.GenerateSW({
+       // 这些选项帮助快速启用 ServiceWorkers
+       // 不允许遗留任何“旧的” ServiceWorkers
+       clientsClaim: true,
+       skipWaiting: true,
+     }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
  };
```

完成这些设置，再次执行 `npm run build`，看下会发生什么：

```bash
...
                  Asset       Size  Chunks                    Chunk Names
          app.bundle.js     545 kB    0, 1  [emitted]  [big]  app
        print.bundle.js    2.74 kB       1  [emitted]         print
             index.html  254 bytes          [emitted]
precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js  268 bytes          [emitted]
      service-worker.js       1 kB          [emitted]
...
```

现在你可以看到，生成了两个额外的文件：`service-worker.js` 和名称冗长的 `precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js`。`service-worker.js` 是 Service Worker 文件，`precache-manifest.b5ca1c555e832d6fbf9462efd29d27eb.js` 是 `service-worker.js` 引用的文件，所以它也可以运行。你本地生成的文件可能会有所不同；但是应该会有一个 `service-worker.js` 文件。

所以，值得高兴的是，我们现在已经创建出一个 Service Worker。接下来该做什么？

## 注册 Service Worker {#registering-our-service-worker}

接下来我们注册 Service Worker，使其出场并开始表演。通过添加以下注册代码来完成此操作：

**index.js**

```diff
  import _ from 'lodash';
  import printMe from './print.js';

+ if ('serviceWorker' in navigator) {
+   window.addEventListener('load', () => {
+     navigator.serviceWorker.register('/service-worker.js').then(registration => {
+       console.log('SW registered: ', registration);
+     }).catch(registrationError => {
+       console.log('SW registration failed: ', registrationError);
+     });
+   });
+ }
```

再次运行 `npm run build` 来构建包含注册代码版本的应用程序。然后用 `npm start` 启动服务。访问 `http://localhost:8080` 并查看 console 控制台。在那里你应该看到：

```bash
SW registered
```

现在来进行测试。停止 server 并刷新页面。如果浏览器能够支持 Service Worker，应该可以看到你的应用程序还在正常运行。然而，server 已经**停止** serve 整个 dist 文件夹，此刻是 Service Worker 在进行 serve。

## 结论 {#conclusion}

你已经使用 Workbox 项目构建了一个离线应用程序。开始进入将 web app 改造为 PWA 的旅程。你现在可能想要考虑下一步做什么。[这里](https://developers.google.com/web/progressive-web-apps/)是可以帮助到你解决下一步问题的比较不错的资源。
