---
title: BabelMinifyWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/babel-minify-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/babel-minify-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/babel-minify-webpack-plugin
---
一个用于<a href="https://github.com/babel/minify">babel-minify</a>的 webpack 插件 - 基于 babel 的 minifier

## 安装

```bash
npm install babel-minify-webpack-plugin --save-dev
```

## 用法

```js
// webpack.config.js
const MinifyPlugin = require("babel-minify-webpack-plugin");
module.exports = {
  entry: //...,
  output: //...,
  plugins: [
    new MinifyPlugin(minifyOpts, pluginOpts)
  ]
}
```

## 选项

###

`minifyOpts` 被传递给 babel-preset-minify。 你可以在包目录中找到[所有可用的选项](https://github.com/babel/minify/tree/master/packages/babel-preset-minify#options)。

`Default: {}`

#### pluginOpts

+ `test`: JS文件扩展名正则表达式。 默认: `/\.js($|\?)/i`
+ `comments`: 保留注释。 默认: `/^\**!|@preserve|@license|@cc_on/`, `falsy` 值将移除所有注释。可以接受函数，带有测试属性的（正则）的对象和值。
+ `sourceMap`: 默认: 使用 [webpackConfig.devtool](https://webpack.js.org/configuration/devtool/)。 这里的设置会覆写`devtool`的设置。
+ `parserOpts`: 配置具有特殊解析器选项的babel。
+ `babel`: 传入一个自定义的 babel-core，代替原来的。 `require("babel-core")`
+ `minifyPreset`: 传入一个自定义的 minify preset，代替原来的。 - `require("babel-preset-minify")`.

## 为什么

你也可以在webpack中使用[babel-loader](https://github.com/babel/babel-loader)，引入 `minify` [作为一个预设](https://github.com/babel/minify#babel-preset)并且应该运行的更快 - 因为 `babel-minify` 将运行在更小的文件。但是，这个插件为什么还存在呢？

+ webpack loader 对单个文件进行操作，并且 minify preset 作为一个 webpack loader将会把每个文件视为在浏览器全局范围内直接执行（默认情况下），并且不会优化顶级作用域内的某些内容。要在文件的顶级作用域内进行优化，请在 minifyOptions 中设置 `mangle: { topLevel: true }`。
+ 当你排除 `node_modules` 不通过 babel-loader 运行时，babel-minify 优化不会应用于被排除的文件，因为它们不会通过 minifier。
+ 当您使用带有 webpack 的 babel-loader 时，由 webpack 为模块系统生成的代码不会通过 loader，并且不会通过 babel-minify 进行优化。
+ 一个 webpack 插件可以在整个 chunk/bundle 输出上运行，并且可以优化整个bundle，你可以看到一些细微的输出差异。但是，由于文件大小通常非常大，所以会慢很多。所以这里有[一个想法](https://github.com/webpack-contrib/babel-minify-webpack-plugin/issues/8) - 我们可以将一些优化作为 loader 的一部分，并在插件中进行一些优化。

## 维护人员

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/294474?v=3&s=150">
        </br>
        <a href="https://github.com/boopathi">Boopathi Rajaa</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
  <tbody>
</table>

[npm]: https://img.shields.io/npm/v/babel-minify-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/babel-minify-webpack-plugin

[deps]: https://david-dm.org/webpack-contrib/babel-minify-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/babel-minify-webpack-plugin

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: https://travis-ci.org/webpack-contrib/babel-minify-webpack-plugin.svg?branch=master
[test-url]: https://travis-ci.org/webpack-contrib/babel-minify-webpack-plugin

[cover]: https://codecov.io/gh/webpack-contrib/babel-minify-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/babel-minify-webpack-plugin

[quality]: https://www.bithound.io/github/webpack-contrib/babel-minify-webpack-plugin/badges/score.svg
[quality-url]: https://www.bithound.io/github/webpack-contrib/babel-minify-webpack-plugin
