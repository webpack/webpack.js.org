---
title: BabelMinifyWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/babel-minify-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/babel-minify-webpack-plugin/edit/master/README.md
repo: https://github.com/webpack-contrib/babel-minify-webpack-plugin
translators:
  - KimYangOfCat
---
一个用于 <a href="https://github.com/babel/minify">babel-minify</a> 的 webpack 插件 - 基于 babel 的 minifier

## 安装 {#install}

```bash
npm install babel-minify-webpack-plugin --save-dev
```

## 用法 {#usage}

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

## 选项 {#options}

#### minifyOpts {#minifyopts}

`minifyOpts` 会被传递给 babel-preset-minify。你可以在 babel 仓库的 packages 目录中找到 [所有可用选项](https://github.com/babel/minify/tree/master/packages/babel-preset-minify#options)。

`Default: {}`

#### pluginOpts {#pluginopts}

+ `test`: 匹配特定类型的文件。默认值: `/\.js($|\?)/i`
+ `include`: `include` 的文件。 默认值: `undefined`
+ `exclude`: `exclude` 的文件。 默认值: `undefined`
+ `comments`: 保留注释。 默认值: `/^\**!|@preserve|@license|@cc_on/`,  `falsy` 值将移除所有注释。可以接受函数，带有测试属性的（正则）的对象和值。
+ `sourceMap`: 配置 sourcemap。 默认值: [webpackConfig.devtool](/configuration/devtool/)
+ `parserOpts`: 配置具有特殊解析器选项的 babel。
+ `babel`: 可传入一个自定义的 `babel-core` 以替换默认的。 默认值: `require("babel-core")`
+ `minifyPreset`: 可传入一个自定义的 `babel-minify` 预设以替换默认的。 默认值: `require("babel-preset-minify")`

## 为什么 {#why}

你也可以在 webpack 中使用 [babel-loader](https://github.com/babel/babel-loader)，然后再引入 `minify` [作为一个 preset](https://github.com/babel/minify#babel-preset)，并且会比直接使用此插件执行得更快。— 这是因为 `babel-minify` 处理的文件体积会更小。既然如此，那这个插件存在的意义是什么呢？

+ webpack loader 会对单文件进行操作，并且作为一个 webpack loader 的 minify preset 将会把每个文件视为在浏览器全局范围内直接执行（默认情况下），但是不会优化顶级作用域内的某些内容。若要在文件的顶级作用域内进行优化，请在 minifyOptions 中设置 `mangle: { topLevel: true }`。
+ 当你排除 `node_modules` 不通过 babel-loader 运行时，babel-minify 的优化便不会应用于被排除的文件，因为它们不需要通过 minifier。
+ 当你在 webpack 中使用 babel-loader 时，由 webpack 为模块系统生成的代码不需要经过 loader，也不需要通过 babel-minify 进行优化。
+ 一个 webpack 插件可以操作整个 chunk/bundle 的输出，这不仅可以优化整个 bundle，还可以让你看到压缩输出中的差异。但由于文件通常很大，这样会相对较慢。所以有了[另一种解决方案](https://github.com/webpack-contrib/babel-minify-webpack-plugin/issues/8) — 可以在 loader 中进行部分优化，同时在 plugin 中进行另一部分的优化。

## 维护人员 {#maintainers}

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
