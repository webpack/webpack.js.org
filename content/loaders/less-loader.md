---
title: less-loader
source: https://raw.githubusercontent.com/webpack-contrib/less-loader/master/README.md
edit: https://github.com/webpack-contrib/less-loader/edit/master/README.md
---
## 安装

```bash
npm install --save-dev less-loader less
```

## 用法

一起使用[`less-loader`](https://github.com/webpack/less-loader)、[css-loader](https://github.com/webpack/css-loader)和[style-loader](https://github.com/webpack/style-loader)，添加对 webpack 的 LESS 支持。

通过 webpack 配置、命令行或者内联方式使用这个 loader。

### 通过 webpack 配置（推荐）

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      }
    ]
  }
}
```

**在你的项目中**

```js
import css from 'file.less';
```

### 命令行方式（CLI）

```bash
webpack --module-bind 'less=style-loader!css-loader!less-loader'
```
**在你的项目中**

```js
import css from 'file.less';
```
### 内联方式

**在你的项目中**

```js
import css from 'style-loader!css-loader!less-loader!./file.less';
```

## 选项

通过 loader 的选项或者查询参数，你可以将任何 LESS 特定的选项传递给 less-loader。

有关所有可用选项，请参阅[LESS 文档](http://lesscss.org/usage/#command-line-usage-options)。LESS 把 dash-case 为 camelCase。采用值的某些选项（比如 `lessc --modify-var="a=b"` ），最好使用[JSON 语法](http://webpack.github.io/docs/using-loaders.html#query-parameters)处理。

```js
{
  test: /\.less$/,
  use: [
    'style-loader',
    { loader: 'css-loader', options: { importLoaders: 1 } },
    { loader: 'less-loader', options: { strictMath: true, noIeCompat: true } }
	]
}
```

### 插件

为了使用[插件](http://lesscss.org/usage/#plugins)，只需在你的 `webpack.config.js` 文件中，简单地设置 `options.lessPlugins` 选项既可。

```js
const CleanCSSPlugin = require('less-plugin-clean-css');

{
  test: /\.less$/,
  use: [
    'style-loader',
    { loader: 'css-loader', options: { importLoaders: 1 } },
    {
      loader: 'less-loader',
      options: { lessPlugins: [ new CleanCSSPlugin({ advanced: true }) ] }
    }
}
```
### Imports

webpack 提供了一种[高级的机制解析文件](https://webpack.js.org/configuration/resolve/)。less-loader 根除 less `fileLoader`，并且将所有的查询参数传递给 webpack 解析引擎。所以，你可以从 `node_modules` 导入你的 less 模块。只要加一个 `~` 前缀，告诉 webpack 去查询[`模块`](https://webpack.js.org/configuration/resolve/#resolve-modules)。

```css
@import "~bootstrap/less/bootstrap";
```

只要加前缀 `~` 十分必要，因为 `~/` 解析为主目录。webpack 需要区分 `bootstrap` 和 `~bootstrap` ，因为 css 和 less 文件对于导入相对路径的文件没有特殊语法。所以写 `@import "file"` 和 `@import "./file";` 是一样的效果。

还要注意，对于[CSS 模块](https://github.com/css-modules/css-modules)，相对文件路径不会生效。请参阅[此issue的解释](https://github.com/webpack/less-loader/issues/109#issuecomment-253797335)。

### Sourcemaps

因为浏览器的限制，只有结合[extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin)才能使用 suorcemaps。使用这个插件，从生成的JS bundle 中提取 css 代码到一个单独的文件（这样可以提高性能，因为 JS 和 CSS 并行加载）。

**webpack.config.js**

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // 必须是 'source-map' 或者 'inline-source-map'
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract(
          fallbackLoader: 'style-loader',
          loaders: [
            // 通过 loader 参数激活 source maps
            {
              loader: 'css-loader',
              options: { sourceMap: true, importLoaders: 1 }
            },
            {
              loader: 'less-loader',
              options: { sourceMap: true }
            }
          ]
        )
      }
    ]
  },
  plugins: [
    // 提取 CSS 到单独的文件中
    new ExtractTextPlugin('app.bundle.css')
  ]
}
```

如果你想在Chrome浏览器中查看原始的LESS文件，甚至编辑它。[有一篇很好的博客文章](https://medium.com/@toolmantim/getting-started-with-css-sourcemaps-and-in-browser-sass-editing-b4daab987fb0)。查看[test/sourceMap](https://github.com/webpack/less-loader/tree/master/test)目录，获取运行例子。要确保使用HTTP服务器提供内容。

## 贡献

不要犹豫啦，创建一个PR。每一份奉献都是值得欣赏的。在开发中，你可以通过运行 `npm test` 启动测试。

测试基本上只是比较生成的 css 文件和位于 `test/css` 目录下的引用 css 文件。通过运行 `node test/helpers/generateCss.js <less-file-without-less-extension>`，你可以轻松地生成引用 css 文件。它将 less 文件传递给 less，并且把输出写入到 `test/css` 文件夹下。

## 维护者

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150 height="150" src="https://github.com/jhnns.png?s=150">
        <br>
        <a href="https://github.com/jhnns">Johannes Ewald</a>
      </td>
    <tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/less-loader.svg
[npm-url]: https://npmjs.com/package/less-loader

[node]: https://img.shields.io/node/v/less-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/less-loader.svg
[deps-url]: https://david-dm.org/webpack/less-loader

[tests]: http://img.shields.io/travis/webpack/less-loader.svg
[tests-url]: https://travis-ci.org/webpack/less-loader

[cover]: https://coveralls.io/repos/github/webpack/less-loader/badge.svg
[cover-url]: https://coveralls.io/github/webpack/less-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/less-loader/
