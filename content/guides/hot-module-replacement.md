---
title: 模块热替换
sort: 6
contributors:
  - jmreidy
  - jhnns
  - sararubin
  - aiduryagin
  - rohannair
  - joshsantos
  - drpicox
  - skipjack
  - gdi2290
related:
  - title: 概念 - 模块热替换(Hot Module Replacement)
    url: /concepts/hot-module-replacement
  - title: API - 模块热替换(Hot Module Replacement)
    url: /api/hot-module-replacement
---

模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。本页面重点介绍__实现__，而[概念页面](/concepts/hot-module-replacement)提供了更多关于它的工作原理以及为什么它有用的细节。

W> __HMR__ 不适用于生产环境，这意味着它应当只在开发环境使用。更多详细信息，请查看[生产环境构建指南](/guides/production)。


## 启用 HMR

启用此功能实际上相当简单。我们来看看如何使用 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 来设置 HMR……

``` js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.js',

  plugins: [
    new webpack.HotModuleReplacementPlugin() // 启用 HMR
  ],

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devServer: {
    hot: true, // 告诉 dev-server 我们在使用 HMR
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};
```

不是太坏，嗯？我们使用 `module.hot.accept` 来测试一下……

__index.js__

``` js
import Library from './library';

if (module.hot) {
  module.hot.accept('./library', function() {
    console.log('Accepting the updated library module!');
    Library.log();
  })
}
```

__library.js__

``` js
export default {
  log() {
    // 在服务器启动后进行修改以进行测试
    console.log('Initial log...')
  }
}
```

开始将 `library.js` 中的 `console.log` 语句，改为 `Second log...'`，你应该在浏览器控制台中看到如下输出：

``` diff
[HMR] Waiting for update signal from WDS...
main.js:9998 Initial log...
main.js:9468 [WDS] Hot Module Replacement enabled.
+ 2main.js:9468 [WDS] App updated. Recompiling...
+ main.js:9468 [WDS] App hot update...
+ main.js:9912 [HMR] Checking for updates on the server...
+ main.js:9982 Accepting the updated library module!
+ 0.1bafc70….hot-update.js:11 Second log...
+ main.js:9955 [HMR] Updated modules:
+ main.js:9957 [HMR]  - ./src/library.js
+ main.js:9894 [HMR] App is up to date.
```


## 问题

热模块更换可能很难掌握。例如，假设我有以下 class 类：

``` js
class Logger {
  log(text) {
    console.log('Logging some text: ', text)
  }
}
```

即使包含此 class 类的底层模块已使用新代码进行修补(patch)，任何现有的类实例仍然具有旧的 `log` 方法。也就是说，如果我们修改这个方法内部，那么旧的实例就不会被反映出来，除非我们以使用 `module.hot.accept` 的方式重新实例化它们。

这只是一个例子，但还有很多其他人可以轻松地让人犯错的地方。幸运的是，有很多 loader 在，一些会在下面提到，这将使这个使用过程变得更容易。


## HMR 修改样式表

我们可以使用 `style-loader` 来实现 CSS 的模块热替换(Hot Module Replacement)。当更新 CSS 依赖模块时，此 loader 在后台使用 `module.hot.accept` 来修补(patch) `<style>` 标签。所以，可以使用以下 webpack 配置...

``` js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  // ...
}
```

热加载样式表轻而易举……

__index.js__

``` js
import Lib from './library';
import './styles.css';

// ...
```

__styles.css__

``` css
body {
  background: blue;
}
```

将 `body` 上的样式修改为 `background: red;`，您应该可以立即看到页面的背景颜色随之更改，而无需完全刷新。


## 其他代码和框架

社区还有许多其他 loader 和示例，可以使 HMR 与各种框架和库(library)平滑地进行交互……

- [React Hot Loader](https://github.com/gaearon/react-hot-loader)：实时调整 react 组件。
- [Vue Loader](https://github.com/vuejs/vue-loader)：此 loader 支持用于 vue 组件的 HMR，提供开箱即用体验。
- [Elm Hot Loader](https://github.com/fluxxu/elm-hot-loader)：支持用于 Elm 程序语言的 HMR。
- [Redux HMR](https://survivejs.com/webpack/appendices/hmr-with-react/#configuring-hmr-with-redux)：无需 loader 或插件！只需对 main store 文件进行简单的修改。
- [Angular HMR](https://github.com/AngularClass/angular-hmr)：No loader necessary! A simple change to your main NgModule file is all that's required to have full control over the HMR APIs.没有必要使用 loader！只需对主要的 NgModule 文件进行简单的修改，由 HMR API 完全控制。

T> 如果你知道任何其他 loader 或插件，能够有助于或增强模块热替换(Hot Module Replacement)，请提交一个 pull request 以添加到此列表中！

***

> 原文：https://webpack.js.org/guides/hot-module-replacement/
