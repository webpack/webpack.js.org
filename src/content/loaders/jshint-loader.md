---
title: jshint-loader
source: https://raw.githubusercontent.com/webpack-contrib/jshint-loader/master/README.md
edit: https://github.com/webpack-contrib/jshint-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/jshint-loader
---
Runs <a href="http://jshint.com/">JSHint</a> on required JavaScript files.

## 安装

```bash
npm i jshint-loader --save
```

## 用法

在 webpack 配置中启用 jshint loader：

``` javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, // 涵盖 .js 文件
        enforce: "pre", // 预先加载好 jshint loader
        exclude: /node_modules/, // 排除掉 node_modules 文件夹下的所有文件
        use: [
          {
            loader: "jshint-loader"
          }
        ]
      }
    ]
  },

  // 更多 jslint 的配置项
  jshint: {
    // 查询 jslint 配置项，请参考 http://www.jshint.com/docs/options/
    // 例如
    camelcase: true,

    //jslint 的错误信息在默认情况下会显示为 warning（警告）类信息
    //将 emitErrors 参数设置为 true 可使错误显示为 error（错误）类信息
    emitErrors: false,

    //jshint 默认情况下不会打断webpack编译
    //如果你想在 jshint 出现错误时，立刻停止编译
    //请设置 failOnHint 参数为true
    failOnHint: false,

    // 自定义报告函数
    reporter: function(errors) { }
  }
}
```

## 自定义报告函数

在默认情况下，`jshint-loader` 会提供一个默认的报告方法。

然而，如果你想自定义报告函数，你可以在 `jshint` 配置下 key 为 `report` 下的配置项里传入自定义的函数。（参考上文的*用法*）

然后，jshint 将会生成与以下示例结构一致的
错误/警告信息（数组）给报告函数。
```js
[
{
    id:        [字符串, 通常是 '(error)'],
    code:      [字符串, 错误/警告（error/warning）编码],
    reason:    [字符串, 错误/警告（error/warning）信息],
    evidence:  [字符串, 对应生成此错误的编码]
    line:      [数字]
    character: [数字]
    scope:     [字符串, 消息作用域;
                通常是 '(main)' 除非代码被解析(eval)了]

    [+ 还有一些旧有的参数，一般用户不必了解]
},
// ...
// 更多的错误/警告
]
```

报告函数会将 loader 的上下文信息保存在 `this` 后执行。你可以使用 `this.emitWarning(...)` 或者 `this.emitError(...)` 方法，手动触发信息的报告。请参考[关于 loader 上下文的 webpack 文档](https://webpack.js.org/api/loaders/#the-loader-context).

**注意：**`jshint reporters` 是与 `jshint-loader` **不兼容**的！
这是因为 reporter 的输入来源，只能从一个文件，而不能同时从多个文件读取。在这种方式下的错误报告，是与 jshint 的[传统 reporters](http://www.jshint.com/docs/reporters/)  不一样的，
因为 loader 插件（例如 jshint-loader）是会在每一个源文件上执行的，因此它们的报告函数也会分别对应每一个源文件上执行。

webpack 控制台输出的格式大致如下：
```js
...

WARNING in ./path/to/file.js
<reporter output>

...
```
`

## 维护人员

<table>
  <tbody>
    <tr>
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


[npm]: https://img.shields.io/npm/v/jshint-loader.svg
[npm-url]: https://npmjs.com/package/jshint-loader

[deps]: https://david-dm.org/webpack-contrib/jshint-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/jshint-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/jshint-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/jshint-loader

***

> 原文：https://webpack.js.org/loaders/jshint-loader/
