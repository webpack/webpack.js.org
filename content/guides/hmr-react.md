---
title: 模块热替换 - React
contributors:
  - jmreidy
  - jhnns
  - sararubin
  - aiduryagin
---

正如在[概念](/concepts/hot-module-replacement)章节提到的，模块热替换(HMR)的作用是，在应用运行时，无需刷新页面，便能替换、增加、删除必要的模块。
HMR 对于那些由单一状态树构成的应用非常有用。因为这些应用的组件是 "dumb" (相对于 "smart") 的，所以在组件的代码更改后，组件的状态依然能够正确反映应用的最新状态。

下面的介绍是基于 Babel 和 React 的，但它们对于 HMR 并不是必需的。

T> 如果你想了解别的配置方式，可以告诉我们，或者更好的方式是，提一个 [PR](https://github.com/webpack/webpack.js.org)。

## 项目配置

下面将会示范怎么在 Babel, React 和 PostCSS（使用 CSS 模块）的项目中配置 HMR。为此，你需要在你的 `package.json` 加上以下依赖，可以通过下面的命令来安装：

```bash
npm install --save-dev babel-core@6.13.2 babel-loader@6.2.4 babel-preset-es2015@6.13.2 babel-preset-react@6.11.1 babel-preset-stage-2@6.13.0 css-loader@0.23.1 postcss-loader@0.9.1 react-hot-loader@3.0.0-beta.6 style-loader@0.13.1 webpack@2.1.0-beta.25 webpack-dev-server@2.1.0-beta.0
```

另外，为了能完成这个示例，你也需要安装：

```bash
npm install --save react@15.3.0 react-dom@15.3.0
```


### Babel 配置

你的 `.babelrc` 配置文件或许会和下面的配置相差无几：

__.babelrc__

```json
{
  "presets": [
    ["es2015", {"modules": false}],
    // webpack 现在已经支持原生的 import 语句了, 并且将其运用在 tree-shaking 特性上

    "stage-2",
    // 指定要启用的语言规范级别
    // Stage 2 代表“草案”，4 是“已完成”，0 是“稻草人(strawman)”。
    // 详情查看 https://tc39.github.io/process-document/

    "react"
    // 转译 React 组件为 JavaScript 代码
  ],
  "plugins": [
    "react-hot-loader/babel"
    // 开启 React 代码的模块热替换(HMR)
  ]
}
```

### 使用 webpack 并配置

当然，有很多方法来设置你的 webpack ── 例如通过 API 配置，由单个或多个配置文件来配置，等等。下面是一个基本的配置，可以供你作为参考：

__webpack.config.js__

```js
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
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

  context: resolve(__dirname, 'src'),

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
    // 开启全局的模块热替换(HMR)

    new webpack.NamedModulesPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
  ],
};
```

上面的内容涵盖了 webpack 配置的方方面面，并不是全部都和 HMR 相关。通过阅读 [webpack-dev-server 配置](https://webpack.github.io/docs/webpack-dev-server.html) 和 [概念章节](https://doc.webpack-china.org/concepts/) 能够让你对它了解更多。

这里有一个基本假设，便是你的 JavaScript 入口在 `./src/index.js`，还有，你在使用 CSS 模块。

配置中的注释或许能够帮助你理解一二。有两个主要的部分值得一看： `devServer` 键和 `entry` 键。另外，`HotModuleReplacementPlugin` 是必须加到 `plugins` 数组中去的。

这里特别要提一下下面的两个模块：

- 在 `entry` 里的 `react-hot-loader`，是 React 配置 HMR 必不可少的模块。

- 还有 `NamedModulesPlugin`，它的用处在于，能让你知道热重载时是哪个模块作出了变动。


### Code

下面是和上面配置相关的代码：

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

事实上，上面的代码中最重要是引用 `module` 的那一部分代码。

1. 如果我们设置了 `devServer: { hot: true }`，webpack 会暴露 `module.hot` 给我们的代码；

2. 因此，我们可以使用 `module.hot` 钩子函数为特定资源启用 HMR（这里是`App.js`）。这里最重要的 API 是 `module.hot.accept`，它指定如何处理对特定依赖的更改。

3. 注意，因为 webpack 2 对 ES2015 模块有内置的支持，你不需要在 `module.hot.accept` 中重新引入你的根组件。要完成这项工作，你需要更改 Babel ES2015 在 `.babelrc` 的预设值：
  ```
  ["es2015", {"modules": false}]
  ```

  与我们在 [Babel 配置文件](#babel-config) 中所配置的是一样的。注意，不仅仅只有模块热替换的场景需要禁用 Babel 模块插件。如果你不将此插件禁用，你可能会遇到许多其他的问题（查看 [从 webpack v1 迁移到 v2](/guides/migrating/#mixing-es2015-with-amd-and-commonjs) 和 [webpack-tree-shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html)）。

  如果你使用了 `babel-preset-env`，确保禁用模块：
  ```
  ["env", {"modules": false}]
  ```

4. 注意，如果你在 webpack 2 配置文件中启用了 ES2015 模块，并且按照上文 #3 的配置，修改了你的 `.babelrc` 文件，你需要使用 `require` 命令，或者，创建两个 `.babelrc` 文件（[查看问题](https://github.com/webpack/webpack.js.org/issues/154)）：
  * 一个文件放置在项目的根目录，并且加上配置: `"presets": ["es2015"]`
  * 另一个文件放置在webpack要构建代码的主目录。在这个例子里，放置的目录路径是 `src/`

所以，在这种情景下，当 `src/components/App.js` 或者它的依赖文件被更改了，`module.hot.accept` 将会触发 `render` 方法，这意味着，因为 `App.js` 里面包含了对 `App.css` 的引用, 所以 `render` 方法同样会在 `App.css` 被修改的时候触发。

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

T> 这个文件需要放置在你的项目根路径下的 `dist` 目录，不然 webpack-dev-server 将因为缺少这个文件而无法运行。

### 结合 npm 使用

最后，让我们启动 `webpack-dev-server` 来打包我们的代码，看看 HMR 的运行效果吧。像下面这样调整 `package.json`：

```json
{
  ...
  "scripts" : {
    "start" : "webpack-dev-server"
  }
  ...
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

***

> 原文：https://webpack.js.org/guides/hmr-react/
