---
title: 模块热更新 - React
sort: 8
contributors:
  - jmreidy
  - jhnns
  - xie-qianyue
---

正如在 [概念](/concepts/hot-module-replacement)章节提到的，模块热重载(HMR)的作用是，在应用运行时，无需刷新页面，便能替换、增加、删除必要的模块。
HMR 对于那些由单一状态树构成的应用非常有用。因为这些应用的组件是 "dumb" (相对于 "smart") 的，所以在组件的代码更改后，组件的状态依然能够正确反映应用的最新状态。

下面的介绍是基于 Babel 和 React 的，但它们对于 HMR 并不是必需的。

T> 如果你想了解别的配置方式，可以告诉我们，或者更好的方式是，提一个 [PR](https://github.com/webpack/webpack.js.org)。

## 项目配置

下面将会示范怎么在 Babel, React 和 PostCSS（使用 CSS 模块）的项目中配置 HMR。为此，你需要在你的 `package.json` 加上以下依赖，可以通过下面的命令来安装：

```bash
npm install --save-dev babel@6.5.2 babel-core@6.13.2 babel-loader@6.2.4 babel-preset-es2015@6.13.2 babel-preset-react@6.11.1 babel-preset-stage-2@6.13.0 css-loader@0.23.1 postcss-loader@0.9.1 react-hot-loader@3.0.0-beta.6 style-loader@0.13.1 webpack@2.1.0-beta.20 webpack-dev-server@2.1.0-beta.0
```

另外，你也需要安装 React：

```bash
npm install --save react@15.3.0 react-dom@15.3.0
```


### Babel 配置

你的 `.babelrc` 配置文件或许会和下面的配置相差无几：

```json
{
  "presets": [
    ["es2015", {"modules": false}],
    // webpack understands the native import syntax, and uses it for tree shaking

    "stage-2",
    // Specifies what level of language features to activate.
    // Stage 2 is "draft", 4 is finished, 0 is strawman.
    // See https://tc39.github.io/process-document/

    "react"
    // Transpile React components to JavaScript
  ],
  "plugins": [
    "react-hot-loader/babel"
    // Enables React code to work with HMR.
  ]
}
```

### Webpack 配置

当然，有很多方法来设置你的 webpack ── 例如通过 API 配置，由单个或多个配置文件来配置，等等。下面是一个基本的配置，可以供你作为参考：

```js
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates


    './index.js'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: resolve(__dirname, 'src'),

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
};
```

上面的内容涵盖了 webpack 配置的方方面面，并不是全部都和 HMR 相关。这个 webpack 开发服务器的[完整的文档](https://webpack.github.io/docs/webpack-dev-server.html)能够让你对它了解更多，这些在 webpack.js.org 上的[文章](https://webpack.js.org/concepts/)也应该一读。

这里有一个基本假设，便是你的 JavaScript 入口在 `./src/index.js`，还有，你在使用 CSS 模块。

配置中的注释或许能够帮助你理解一二。有两个主要的部分值得一看： `devServer` 键和 `entry` 键。另外，`HotModuleReplacementPlugin` 是必须加到 `plugins` 数组中去的。

这里特别要提一下下面的两个模块：

- 在 `entry` 里的 `react-hot-loader`，是 React 配置 HMR 必不可少的模块。

- 还有 `NamedModulesPlugin`，它的用处在于，能让你知道热重载时是哪个模块作出了变动。


### Code

下面是和上面配置相关的代码：

```js
// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

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

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NewApp = require('./components/App').default
    render(NewApp)
  });
}
```

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

```css
// ./src/components/App.css
.app {
    text-size-adjust: none;
    font-family: helvetica, arial, sans-serif;
    line-height: 200%;
    padding: 6px 20px 30px;
}
```

事实上，上面的代码中最重要是引用 `module` 的那一部分代码。

1. 如果我们设置了 `devServer: { hot: true }`，webpack 会暴露 `module.hot` 给我们的代码；

2. 因此，我们可以使用 `module.hot` 钩子函数为特定资源启用 HMR（这里是`App.js`）。这里最重要的 API 是 `module.hot.accept`，它指定如何处理对特定依赖的更改。

3. 注意，因为 Webpack 2 对 ES2015 模块有内置的支持，你不需要在 `module.hot.accept` 中重新引入你的根组件。要完成这项工作，你需要更改 Babel ES2015 在 `.babelrc` 的预设：

  ```
  ["es2015", {"modules": false}]
  ```

  like what we did in [Babel Config](#babel-config). Note that disabling Babel's module plugin is not only necessary for HMR. If you don't disable it you'll run into many other issues (see [Migrating from v1 to v2](/guides/migrating/#mixing-es2015-with-amd-and-commonjs) and [webpack-tree-shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html)).

So in this case, `module.hot.accept` will fire the `render` method whenever `src/components/App.js` or its dependencies are changed - which means the `render` method will also fire when the `App.css` is changed, since `App.css` is included in `App.js`.

###index.html

This needs to be placed inside of `dist` in your project root. webpack-dev-server will not run without it.

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
### Package.json

最后，让我们启动 `webpack-dev-server` 来生成打包文件，看看 HMR 的运行效果吧。我们可以使用下面的 `package.json` 进入：

```json
{
  "scripts" : {
    "start" : "webpack-dev-server"
  }
}
```

运行 `npm start`。然后打开浏览器，在地址栏输入 `localhost:8080`。这时候应该在你的 console.log 中会看到下面的输出：

```bash
dev-server.js:49[HMR] Waiting for update signal from WDS…
only-dev-server.js:74[HMR] Waiting for update signal from WDS…
client?c7c8:24 [WDS] Hot Module Replacement enabled.
```

接着你可以对 App.js 作出修改并保存。你的 console.log 应该会显示下面的信息：

```bash
[WDS] App updated. Recompiling…
client?c7c8:91 [WDS] App hot update…
dev-server.js:45 [HMR] Checking for updates on the server…
log-apply-result.js:20 [HMR] Updated modules:
log-apply-result.js:22 [HMR]  - ./components/App.js
dev-server.js:27 [HMR] App is up to date.
```

我们可以看到，HMR 标记出了被修改文件的路径。这便是 NamedModules 插件所起的作用。
