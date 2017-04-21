---
title: 模块热替换 - React
contributors:
  - jmreidy
  - jhnns
  - sararubin
  - aiduryagin
  - rohannair
  - joshsantos
  - drpicox
---

正如在[概念](/concepts/hot-module-replacement)章节提到的，模块热替换(HMR)的作用是，在应用运行时，无需刷新页面，便能替换、增加、删除必要的模块。
HMR 对于那些由单一状态树构成的应用非常有用。因为这些应用的组件是 "dumb" (相对于 "smart") 的，所以在组件的代码更改后，组件的状态依然能够正确反映应用的最新状态。

下面描述的方案，特别地使用了 Babel 和 React ，但 HMR 可以使用其他工具以各种其他方式实现。

T> 如果你想查看其他配置方式的示例，可以告诉我们，或者更好的方式是[提一个 PR](https://github.com/webpack/webpack.js.org)。



## 项目配置

本指南将展示使用了 HMR 的 Babel 的 React 应用程序和 CSS 模块。

首先，安装如下开发依赖：

```bash
npm install --save-dev webpack webpack-dev-server
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
npm install --save-dev style-loader css-loader
```

其次，你需要安装 React, ReactDOM 和 `react-hot-loader`（确保使用这个包的 `next` 版本）

```bash
npm install --save react react-dom react-hot-loader@next
```


### Babel 配置

创建一个带有以下选项的 `.babelrc`：

__.babelrc__

```json
{
  "presets": [
    ["es2015", {"modules": false}],
    // webpack 现在已经支持原生的 import 语句了, 并且将其运用在 tree-shaking 特性上

    "react"
    // 转译 React 组件为 JavaScript 代码
  ],
  "plugins": [
    "react-hot-loader/babel"
    // 开启 React 代码的模块热替换(HMR)
  ]
}
```

我们需要使用 ES2015 模块来使 HMR 正常工作。为此，在我们的 es2015 preset 设置中，将 `module` 选项设置为 false。我们可以使用 `babel-preset-env` 做类似的事情：

```json
["env", {"modules": false}]
```

将 Babel 的模块插件设置为 false，可以帮助修复很多问题（查看[从 v1 迁移到 v2](/guides/migrating/#mixing-es2015-with-amd-and-commonjs)和 [webpack-tree-shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html)）

注意：Node.js 还不支持 ES2015 模块，并且在webpack 2 配置文件中使用 ES2015 模块将造成[问题](https://github.com/webpack/webpack.js.org/issues/154)。

要解决这个问题，你将需要创建两个 `.babelrc` 文件，来分别地编译配置和应用程序代码：

1.一个放置在项目根目录中，并且在配置中使用 `"presets": ["es2015"]`
2.另一个放置在应用程序代码的源代码目录中


### webpack 配置

对于这个例子，我们将使用一个 webpack 配置文件，并做以下假设：

* 所有应用程序源代码都位于 `<root>/src` 文件夹中
* 应用程序的入口起点位于 `/src/index.js`

T> 请查看 [webpack-dev-server 选项](/configuration/dev-server)和[概念页面](/concepts)以熟悉下面的概念

__webpack.config.js__

```js
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  context: resolve(__dirname, 'src'),

  entry: [
    'react-hot-loader/patch',
    // 开启 React 代码的模块热替换(HMR)

    'webpack-dev-server/client?http://localhost:8080',
    // 为 webpack-dev-server 的环境打包代码
    // 然后连接到指定服务器域名与端口

    'webpack/hot/only-dev-server',
    // 为热替换(HMR)打包好代码
    // only- 意味着只有成功更新运行代码才会执行热替换(HMR)


    './index.js'
    // 我们 app 的入口文件
  ],
  output: {
    filename: 'bundle.js',
    // 输出的打包文件

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
    // 对于热替换(HMR)是必须的，让 webpack 知道在哪里载入热更新的模块(chunk)
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // 开启服务器的模块热替换(HMR)

    contentBase: resolve(__dirname, 'dist'),
    // 输出文件的路径

    publicPath: '/'
    // 和上文 output 的“publicPath”值保持一致
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader', ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader?modules', ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 开启全局的模块热替换(HMR)

    new webpack.NamedModulesPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
  ],
};
```


### 应用程序代码

接下来设置我们的 React 应用程序：

__src/index.js__

```js
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件

import App from './components/App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// 模块热替换的 API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  });
}
```

__src/components/App.js__

```js
import React from 'react';
import styles from './App.css';

const App = () => (
  <div className={styles.app}>
    <h2>Hello, </h2>
  </div>
);

export default App;
```

__src/components/App.css__

```css
.app {
  text-size-adjust: none;
  font-family: helvetica, arial, sans-serif;
  line-height: 200%;
  padding: 6px 20px 30px;
}
```

重要提示：

1. 设置 `devServer: { hot: true }` 使得 webpack 会暴露 `module.hot` API 给我们的代码

2. 因此，我们可以使用 `module.hot` 钩子函数，来对指定资源启用 HMR（这里是 `App.js`）。这里最重要的 API 是 `module.hot.accept`，它指定了如何处理对特定依赖的更改。

3. 每当 `src/components/App.js` 或它的依赖文件发生改变，`module.hot.accept` 都将触发 `render` 方法。`render` 方法甚至会在 App.css 改变时触发，这是因为 App.css 包含在 App.js 中。

__dist/index.html__

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Example Index</title>
</head>
<body>
  <div id="root"></div>
  <script src="bundle.js"></script>
</body>
</html>
```

我们需要将 index.html 文件放在我们的 `dist` 文件夹中，不然 webpack-dev-server 将因为缺少这个文件而无法运行。


### 把它们放置在一起

最后，我们向 `package.json` 添加一个 start 任务，它会调用 `webpack-dev-server` 二进制文件。

__package.json__

```json
{
  ...
  "scripts" : {
    "start" : "webpack-dev-server"
  }
  ...
}
```

当我们运行 `npm start` 时，它将启动 webpack dev server，导致我们的代码会被 Babel 编译，然后打包。打开浏览器访问 `http://localhost:8080`，并检查 JS 控制台(console)的日志，会出现类似于：

```bash
dev-server.js:49[HMR] Waiting for update signal from WDS…
only-dev-server.js:74[HMR] Waiting for update signal from WDS…
client?c7c8:24 [WDS] Hot Module Replacement enabled.
```

当您编辑并保存 `App.js` 文件时，您应该会在控制台(console)中看到如下所示的内容，而应用程序应该随着更改进行更新。

```bash
[WDS] App updated. Recompiling…
client?c7c8:91 [WDS] App hot update…
dev-server.js:45 [HMR] Checking for updates on the server…
log-apply-result.js:20 [HMR] Updated modules:
log-apply-result.js:22 [HMR]  - ./components/App.js
dev-server.js:27 [HMR] App is up to date.
```

我们可以看到，HMR 标记出了被修改文件的路径。这便是 NamedModules 插件所起的作用。

***

> 原文：https://webpack.js.org/guides/hmr-react/
