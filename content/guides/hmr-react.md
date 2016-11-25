---
title: 模块热更新 - React
sort: 8
contributors:
  - jmreidy
  - jhnns
  - xie qianyue
---

模块热重载 (HMR) 的作用是，在应用运行时，无需刷新页面，便能替换、增加、删除必要的模块。HMR 对于那些由单一状态树构成的应用非常有用。因为这些应用的组件是 "dumb" (相对于 "smart") 的，所以在组件的代码更改后，组件的状态依然能够正确反映应用的最新状态。

## 项目配置

下面将会示范怎么在 Babel, React 和 PostCSS（使用 CSS 模块）的项目中配置 HMR。为此，你需要在你的 `package.json` 加上以下依赖，可以通过下面的命令来安装：

```bash
npm install --save-dev babel@6.5.2 babel-core@6.13.2 babel-loader@6.2.4 babel-preset-es2015@6.13.2 babel-preset-react@6.11.1 babel-preset-stage-2@6.13.0 css-loader@0.23.1 postcss-loader@0.9.1 react-hot-loader@3.0.0-beta.1 style-loader@0.13.1 webpack@2.1.0-beta.20 webpack-dev-server@2.1.0-beta.0
```

另外，你也需要安装 React：

```bash
npm install --save react@15.3.0 react-dom@15.3.0
```

### Babel 配置

你的 `.babelrc` 配置文件或许会和下面的配置相差无几：

```bash
{
  "presets": [
    ["es2015", {"modules": false}],
    //Webpack understands the native import syntax, and uses it for tree shaking

    "stage-2",
    //Specifies what level of language features to activate.
    //Stage 2 is "draft", 4 is finished, 0 is strawman.
    //See https://tc39.github.io/process-document/

    "react"
    //Transpile React components to JavaScript
  ],
  "plugins": [
    "react-hot-loader/babel"
    //Enables React code to work with HMR.
  ]
}
```

### Webpack 配置

当然，有很多方法来设置你的 webpack ── 例如通过 API 配置，由单个或多个配置文件来配置，等等。下面是一个基本的配置，可以供你作为参考：

```js
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = env => {
  return {
    entry: [
      'react-hot-loader/patch',
      //activate HMR for React

      'webpack-dev-server/client?http://localhost:8080',
      //bundle the client for webpack dev server
      //and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      //bundle the client for hot reloading
      //only- means to only hot reload for successful updates


      './index.js'
      //the entry point of our app
    ],
    output: {
      filename: 'bundle.js',
      //the output bundle

      path: resolve(__dirname, 'dist'),

      publicPath: '/'
      //necessary for HMR to know where to load the hot update chunks
    },

    context: resolve(__dirname, 'src'),

    devtool: 'inline-source-map',

    devServer: {
      hot: true,
      //activate hot reloading

      contentBase: resolve(__dirname, 'dist'),
      //match the output path

      publicPath: '/'
      //match the output publicPath
    },

    module: {
      loaders: [
        { test: /\.js$/,
          loaders: [
            'babel-loader',
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loaders: [
            'style-loader',
            'css-loader?modules',
            'postcss-loader',
          ],
        },
      ],
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      //activates HMR

      new webpack.NamedModulesPlugin(),
      //prints more readable module names in the browser console on HMR updates
    ],
  };
};
```

上面的内容涵盖了 webpack 配置的方方面面，并不是全部都和 HMR 相关。这个 webpack 开发服务器的[完整的文档](https://webpack.github.io/docs/webpack-dev-server.html)能够让你对它了解更多，这些在 webpack.js.org 上的[文章](https://webpack.js.org/concepts/)也应该一读。

这里有一个基本假设，便是你的 JavaScript 入口在 `./src/index.js`，还有，你在使用 CSS 模块。

配置中的注释或许能够帮助你理解一二。有两个主要的部分值得一看： `devServer` 键和 `entry` 键。另外，`HotModuleReplacementPlugin` 是必须加到 `plugins` 数组中去的。

这里特别要提一下下面的两个模块。在 `entry` 里的 `react-hot-loader`，是 React 配置 HMR 必不可少的模块。还有 `NamedModulesPlugin`，它的用处在于，能让你知道热重载时是哪个模块作出了变动。

### Code

下面是和上面配置相关的代码：

```js
// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from './components/App';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', render);
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

事实上，上面的代码中最重要是引用 `module` 的那一部分代码。首先，我们把 HMR 的触发重载代码放在了 `module.hot` 的条件判断中；webpack 向代码暴露了 `module` 对象，如果我们设置了 `hot: true`，`module.hot` 条件判断里的代码便会执行。

HMR 的 API 还提供了其他的选项，上面的配置并没有全部提及，但最重要的是 `module.hot.accept` 调用。它指定了依据特定的依赖，怎样处理代码的更新。

在上面的例子中，`module.hot` 只有在 `src/components/App.js` 更新时，才回触发 `render` 方法。值得注意的是，`App.js` 的更新包括了它里面依赖的更新 ── 除了 `App.js` 本身更新之外，如果 `App.css` 更新了，也会触发 `render` 方法，因为 `App.css` 包含在 `App.js` 里面。

### Package.json

最后，让我们启动 webpack 开发服务器来生成打包文件，看看 HMR 的运行效果吧。我们可以使用下面的代码来设置 pacakge.json：

```json
{
  "scripts" : {
    "start" : "webpack-dev-server --env.dev"
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
