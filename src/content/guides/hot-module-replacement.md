---
title: 模块热替换
sort: 15
contributors:
  - jmreidy
  - jhnns
  - sararubin
  - rohannair
  - joshsantos
  - drpicox
  - skipjack
  - sbaidon
  - gdi2290
  - bdwain
  - caryli
  - xgirma
  - EugeneHlushko
  - AnayaDesign
  - aviyacohen
  - dhruvdutt
  - wizardofhogwarts
  - aholzner

related:
  - title: 概念 - 模块热替换
    url: /concepts/hot-module-replacement
  - title:  API - 模块热替换(hot module replacement)
    url: /api/hot-module-replacement
---

T> 本指南继续沿用 [开发环境](/guides/development) 指南中的代码示例。

模块热替换(hot module replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新所有类型的模块，而无需完全刷新。本页面重点介绍其**实现**，而 [概念](/concepts/hot-module-replacement) 页面提供了更多关于它的工作原理以及为什么它有用的细节。

W> **HMR** 不适用于生产环境，这意味着它应当用于开发环境。更多详细信息，
请查看 [生产环境](/guides/production) 指南。

## 启用 HMR {#enabling-hmr}

此功能可以很大程度提高生产效率。我们要做的就是更新 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 配置，
然后使用 webpack 内置的 HMR 插件。我们还要删除掉 `print.js` 的入口起点，
因为现在已经在 `index.js` 模块中引用了它。

T> 如果你在技术选型中使用了 `webpack-dev-middleware` 而没有使用 `webpack-dev-server`，请使用 [`webpack-hot-middleware`](https://github.com/webpack-contrib/webpack-hot-middleware) 依赖包，以在你的自定义服务器或应用程序上启用 HMR。

**webpack.config.js**

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
       app: './src/index.js',
-      print: './src/print.js',
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true,
    },
    plugins: [
      // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```

T> 你可以通过以下命令来修改 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 的配置：`webpack serve --hotOnly`。

现在，我们来修改 `index.js` 文件，以便当 `print.js` 内部发生变更时可以告诉 webpack 接受更新的模块。

**index.js**

```diff
  import _ from 'lodash';
  import printMe from './print.js';

  function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());
+
+ if (module.hot) {
+   module.hot.accept('./print.js', function() {
+     console.log('Accepting the updated printMe module!');
+     printMe();
+   })
+ }
```

更改 `print.js` 中 `console.log` 的输出内容，你将会在浏览器中看到如下的输出
（不要担心现在 `button.onclick = printMe()` 的输出，我们稍后也会更新该部分）。

**print.js**

```diff
  export default function printMe() {
-   console.log('I get called from print.js!');
+   console.log('Updating print.js...');
  }
```

**console**

```diff
[HMR] Waiting for update signal from WDS...
main.js:4395 [WDS] Hot Module Replacement enabled.
+ 2main.js:4395 [WDS] App updated. Recompiling...
+ main.js:4395 [WDS] App hot update...
+ main.js:4330 [HMR] Checking for updates on the server...
+ main.js:10024 Accepting the updated printMe module!
+ 0.4b8ee77….hot-update.js:10 Updating print.js...
+ main.js:4330 [HMR] Updated modules:
+ main.js:4330 [HMR]  - 20
```

## 通过 Node.js API {#via-the-nodejs-api}

在 Node.js API 中使用 webpack dev server 时，不要将 dev server 选项放在 webpack 配置对象中。而是在创建时，
将其作为第二个参数传递。例如：

`new WebpackDevServer(compiler, options)`

想要启用 HMR，还需要修改 webpack 配置对象，使其包含 HMR 入口起点。`webpack-dev-server` 依赖包中具有一个叫做 `addDevServerEntrypoints` 的方法，你可以通过使用这个方法来实现。这是关于如何使用的一个基本示例：

**dev-server.js**

```javascript
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
```

T> 如果你正在使用 [`webpack-dev-middleware`](/guides/development#using-webpack-dev-middleware)，可以通过 [`webpack-hot-middleware`](https://github.com/webpack-contrib/webpack-hot-middleware) 依赖包，在自定义 dev server 中启用 HMR。

## 问题 {#gotchas}

模块热替换可能比较难以掌握。为了说明这一点，我们回到刚才的示例中。如果你继续点击示例页面上的按钮，
你会发现控制台仍在打印旧的 `printMe` 函数。

这是因为按钮的 `onclick` 事件处理函数仍然绑定在旧的 `printMe` 函数上。

为了让 HMR 正常工作，我们需要更新代码，使用 `module.hot.accept` 将其绑定到新的 `printMe` 函数上：

**index.js**

```diff
  import _ from 'lodash';
  import printMe from './print.js';

  function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;  // onclick event is bind to the original printMe function

    element.appendChild(btn);

    return element;
  }

- document.body.appendChild(component());
+ let element = component(); // 存储 element，以在 print.js 修改时重新渲染
+ document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
-     printMe();
+     document.body.removeChild(element);
+     element = component(); // 重新渲染 "component"，以便更新 click 事件处理函数
+     document.body.appendChild(element);
    })
  }
```

这仅仅是一个示例，还有很多让人易于犯错的情况。
幸运的是，有很多 loader（下面会提到一些）可以使得模块热替换变得更加容易。

## HMR 加载样式 {#hmr-with-stylesheets}

借助于 `style-loader`，使用模块热替换来加载 CSS 实际上极其简单。此 loader 在幕后使用了 `module.hot.accept`，在 CSS 依赖模块更新之后，会将其 patch(修补) 到 `<style>` 标签中。

首先使用以下命令安装两个 loader ：

```bash
npm install --save-dev style-loader css-loader
```

然后更新配置文件，使用这两个 loader。

**webpack.config.js**

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: ['style-loader', 'css-loader'],
+       },
+     ],
+   },
    plugins: [
       // 对于 CleanWebpackPlugin 的 v2 versions 以下版本，使用 new CleanWebpackPlugin(['dist/*'])
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```

如同 import 模块，热加载样式表同样很简单：

**project**

```diff
  webpack-demo
  | - package.json
  | - webpack.config.js
  | - /dist
    | - bundle.js
  | - /src
    | - index.js
    | - print.js
+   | - styles.css
```

**styles.css**

```css
body {
  background: blue;
}
```

**index.js**

```diff
  import _ from 'lodash';
  import printMe from './print.js';
+ import './styles.css';

  function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;  // onclick event is bind to the original printMe function

    element.appendChild(btn);

    return element;
  }

  let element = component();
  document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
      document.body.removeChild(element);
      element = component(); // Re-render the "component" to update the click handler
      document.body.appendChild(element);
    })
  }

```

将 `body` 的 style 改为 `background: red;`，你应该可以立即看到页面的背景颜色随之更改，而无需完全刷新。

**styles.css**

```diff
  body {
-   background: blue;
+   background: red;
  }
```

## 其他代码和框架 {#other-code-and-frameworks}

社区还提供许多其他 loader 和示例，可以使 HMR 与各种框架和库平滑地进行交互……

- [React Hot Loader](https://github.com/gaearon/react-hot-loader): 实时调整 react 组件。
- [Vue Loader](https://github.com/vuejs/vue-loader): 此 loader 支持 vue 组件的 HMR，提供开箱即用体验。
- [Elm Hot webpack Loader](https://github.com/klazuka/elm-hot-webpack-loader): 支持 Elm 编程语言的 HMR。
- [Angular HMR](https://github.com/gdi2290/angular-hmr): 没有必要使用 loader！直接修改 NgModule 主文件就够了，
它可以完全控制 HMR API。
- [Svelte Loader](https://github.com/sveltejs/svelte-loader): 此 loader 开箱即用地支持 Svelte 组件的热更新。

T> 如果你知道任何其他 loader 或 plugin，能够有助于或增强模块热替换(hot module replacement)，请提交一个 pull request 以添加到此列表中！
