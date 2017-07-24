---
title: UglifyjsWebpackPlugin
source: https://raw.githubusercontent.com/webpack-contrib/uglifyjs-webpack-plugin/master/README.md
edit: https://github.com/webpack-contrib/uglifyjs-webpack-plugin/edit/master/README.md
---
## 安装

使用 [Yarn](https://yarnpkg.com):

```bash
yarn add uglifyjs-webpack-plugin --dev
```

使用 npm:

```bash
npm install uglifyjs-webpack-plugin --save-dev
```

## 用法

```javascript
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {...},
  output: {...},
  module: {...},
  plugins: [
    new UglifyJSPlugin()
  ]
};
```

## 选项

这个插件支持 UglifyJS 的功能，如下所述:

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| compress | boolean, object | true | 见 [UglifyJS 文档](http://lisperator.net/uglifyjs/compress)。 |
| mangle | boolean, object | true | 见下节。 |
| beautify | boolean | false | 美化输出。 |
| output | 一个提供 UglifyJS [OutputStream](https://github.com/mishoo/UglifyJS2/blob/v2.x/lib/output.js) 选项的对象 | | 更底层地访问 UglifyJS 输出。 |
| comments | boolean, RegExp, function(astNode, comment) -> boolean | 默认保留注释（包括 `/*!`, `/**!`, `@preserve` or `@license`）。 | 注释相关的配置 |
| extractComments | boolean, RegExp, function (astNode, comment) -> boolean, object | false | 从 webpack 2.3.0 开始，是否将注释提取到单独的文件（查看[详细](https://github.com/webpack/webpack/commit/71933e979e51c533b432658d5e37917f9e71595a） |
| sourceMap | boolean | false | 使用 SourceMaps 将错误信息的位置映射到模块。这会减慢编译的速度。**重要！** `cheap` 类 source map 选项无法和插件一同运行！ |
| test | RegExp, Array<RegExp> | <code>/\.js($&#124;\?)/i</code> | 测试匹配的文件 |
| include | RegExp, Array<RegExp> | | 只测试`包含`的文件。 |
| exclude | RegExp, Array<RegExp> | | 只测试被`排除`的文件。 |
| warningsFilter | function(source) -> boolean | | 允许过滤 uglify 警告（从 webpack 2.3.0 开始）。 |

## Mangling

`mangle (boolean|object)` - Passing `true` or an object enables and provides options for UglifyJS name mangling. See [UglifyJS documentation](https://github.com/mishoo/UglifyJS2/tree/v2.x#mangle) for mangle options. Example configuration, this will **not** mangle properties (see below):

```javascript
new UglifyJsPlugin({
  mangle: {
    // 跳过这些
    except: ['$super', '$', 'exports', 'require']
  }
})
```

`mangle.props (boolean|object)` - 传递 true 或者一个对象可以启用并提供 UglifyJS mangling 属性选项 - 参考有关 mangleProperties 选项的 [UglifyJS 文档](https://github.com/mishoo/UglifyJS2#mangleproperties-options)。

> 注意：UglifyJS 警告，[如果你使用 mangling 属性，你可能会破坏你的 source](https://github.com/mishoo/UglifyJS2#mangling-property-names---mangle-props)，所以如果你不确定你为什么需要这个特性，你最好不要使用它！你可以按如下方式调整行为：

Example configuration, this will mangle both names and properties:

```javascript
new UglifyJsPlugin({
  mangle: {
    props: true
  }
})
```

## 提取注释

`extractComments` 选项可以是：
- `true`: 所有在`comments`选项中保存的注释都会被移到单独的文件。如果源文件是 `foo.js` ,那注释将被存储为 `foo.js.LICENSE` 。
- 通常表达式（ 如：`RegExp`或者`string` ）或者 `function (astNode, comment) -> boolean`：
所有匹配所给定的表达式（ 等于返回`true`的函数 ）会被提取为分离文件。`comments`选项指定注释是否被储存， i.e。可以在存储一些注释当在提取其他注释即使是存储已经被被提取。
- `object`存在下面的值，所有的选项：
  - `condition`: 通常表达式或者相应函数（见上文）
  - `filename`: 提取注释的文件会被存储。`字符`或者是返回字符的函数`function (string) -> string`，作为原文件名。默认加上文件后缀名`.LICENSE`。
  - `banner`: Banner 文本会在原文件的头部指出被提取的文件。会在源文件加入该信息。可以是`false`(表示没有banner)，`string`，或者`function (string) -> string`会在提取已经被存储注释的时候被调用。注释会被覆盖。
默认: `/*! For license information please see foo.js.LICENSE */`


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


[npm]: https://img.shields.io/npm/v/uglifyjs-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/uglifyjs-webpack-plugin

[deps]: https://david-dm.org/webpack-contrib/uglifyjs-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/uglifyjs-webpack-plugin

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: https://secure.travis-ci.org/webpack-contrib/uglifyjs-webpack-plugin.svg
[test-url]: http://travis-ci.org/webpack-contrib/uglifyjs-webpack-plugin

[cover]: https://codecov.io/gh/webpack-contrib/uglifyjs-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/uglifyjs-webpack-plugin

[quality]: https://www.bithound.io/github/webpack-contrib/uglifyjs-webpack-plugin/badges/score.svg
[quality-url]: https://www.bithound.io/github/webpack-contrib/uglifyjs-webpack-plugin

***

> 原文：https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
