---
title: source-map-loader
source: https://raw.githubusercontent.com/webpack-contrib/source-map-loader/master/README.md
edit: https://github.com/webpack-contrib/source-map-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/source-map-loader
---


[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![coverage][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]



从现有的源文件中提取 source maps（从 <code>sourceMappingURL</code> 中提取）。

## 起步 {#getting-started}

安装 `source-map-loader`：

```bash
npm i -D source-map-loader
```

添加 plugin 至 `webpack` 配置。例：

**file.js**

```js
import css from 'file.css';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
};
```

`source-map-loader` 从 JavaScript 入口提取现有的 source maps.
这些 source maps 既可以是内联的也可以是通过 URL 链接引入的。
所有的 source map 数据都按照选定的 [source map style](/configuration/devtool/) 交给 webpack 处理，这些选定可以在 [webpack.config.js](/configuration/) 的 `devtool` 选项中配置。
在使用有自己 source maps 的第三方库时，`source-map-loader` 就显得尤为重要。
如果相关 source map 数据没有按照规范提取、处理并注入 webpack bundle, 浏览器有可能无法正确解读这些数据。`source-map-loader` 允许 webpack 跨库且持续的维护 source map 数据，因而更易于调试。
`source-map-loader` 可以从任何 JavaScript 文件中提取，这也包括 `node_modules` 目录下的 JavaScript 文件。
在设置 [include](/configuration/module/#ruleinclude) 和 [exclude](/configuration/module/#ruleexclude) 规则时，要保证构建性能最优。

最后按偏好运行 `webpack` 方法。

## 示例 {#examples}

### 忽略警告 {#ignoring-warnings}

忽略警告可以使用以下配置：

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  stats: {
    warningsFilter: [/Failed to parse source map/],
  },
};
```

有关 `warningsFilters` 选项的详细信息请[参阅](/configuration/stats/#statswarningsfilter)；

## 贡献 {#contributing}

如果您尚未了解，建议您阅读以下贡献指引。

[CONTRIBUTING](https://github.com/webpack-contrib/source-map-loader/blob/master/.github/CONTRIBUTING.md)

## 许可 {#license}

[MIT](https://github.com/webpack-contrib/source-map-loader/blob/master/LICENSE)

[npm]: https://img.shields.io/npm/v/source-map-loader.svg
[npm-url]: https://npmjs.com/package/source-map-loader
[node]: https://img.shields.io/node/v/source-map-loader.svg
[node-url]: https://nodejs.org/
[deps]: https://david-dm.org/webpack-contrib/source-map-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/source-map-loader
[tests]: https://github.com/webpack-contrib/source-map-loader/workflows/source-map-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/source-map-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/source-map-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/source-map-loader
[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=source-map-loader
[size-url]: https://packagephobia.now.sh/result?p=source-map-loader
