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

**十分重要!** 这个插件这个插件依赖 uglify-js，所以为了使用这个插件，也要安装 uglify-js。然而，目前 (2017/1/25) 可用的 uglify-js npm 包，不支持压缩 ES6 代码。为了支持 ES6，必须提供一个具有压缩 ES6 能力的版本，又称之为 _harmony_ 版本。

如果你的压缩目标是 ES6:

```bash
yarn add git://github.com/mishoo/UglifyJS2#harmony --dev
```

如果你的压缩目标是 ES5:

```bash
yarn add uglify-js --dev
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
| mangle | boolean, object | true | 见下节. |
| beautify | boolean | false | 美化输出。 |
| output | 一个提供 UglifyJS [OutputStream](https://github.com/mishoo/UglifyJS2/blob/master/lib/output.js) 选项的对象 | | 更底层地访问 UglifyJS 输出。 |
| comments | boolean, RegExp, function(astNode, comment) -> boolean | 默认保存包含 `/*!`, `/**!`, `@preserve` or `@license` 的注释 | 注释相关的配置 |
| extractComments | boolean, RegExp, function (astNode, comment) -> boolean, object | false | Whether comments shall be extracted to a separate file, see below. |
| sourceMap | boolean | false | 使用 SourceMaps 将错误信息的位置映射到模块。这会减慢编译的速度。 **Important!** `cheap` source map options don't work with the plugin! |
| test | RegExp, Array<RegExp> | <code>/\.js($&#124;\?)/i</code> | 测试匹配的文件 |
| include | RegExp, Array<RegExp> | | 只测试包含的文件。 |
| exclude | RegExp, Array<RegExp> | | 要从测试中排除的文件。 |
| extractComments | boolean, RegExp, object | | Extract comments to separate file (see [details](https://github.com/webpack/webpack/commit/71933e979e51c533b432658d5e37917f9e71595a), since webpack 2.3.0) |
| warningsFilter | function(source) -> boolean | | Allow to filter uglify warnings (since webpack 2.3.0) |

## Mangling

`mangle.props (boolean|object)` - 传递 true 或者一个对象可以启用并提供 UglifyJS mangling 属性选项 - 参考有关 mangleProperties 选项的 [UglifyJS 文档](https://github.com/mishoo/UglifyJS2#mangleproperties-options)。

> 注意：UglifyJS 警告，[如果你使用 mangling 属性，你可能会破坏你的 source](https://github.com/mishoo/UglifyJS2#mangling-property-names---mangle-props)，所以如果你不确定你为什么需要这个特性，你最好不要使用它！你可以按如下方式调整行为：

```javascript
new UglifyJsPlugin({
  mangle: {
    // 跳过这些
    except: ['$super', '$', 'exports', 'require']
  }
})
```

## Extracting Comments

The `extractComments` option can be
- `true`: All comments that normally would be preserved by the `comments` option will be moved to a separate file. If the original file is named `foo.js`, then the comments will be stored to `foo.js.LICENSE`
- regular expression (given as `RegExp` or `string`) or a `function (astNode, comment) -> boolean`:
  All comments that match the given expression (resp. are evaluated to `true` by the function) will be extracted to the separate file. The `comments` option specifies whether the comment will be preserved, i.e. it is possible to preserve some comments (e.g. annotations) while extracting others or even preserving comments that have been extracted.
- an `object` consisting of the following keys, all optional:
  - `condition`: regular expression or function (see previous point)
  - `filename`: The file where the extracted comments will be stored. Can be either a `string` or `function (string) -> string` which will be given the original filename. Default is to append the suffix `.LICENSE` to the original filename.
  - `banner`: The banner text that points to the extracted file and will be added on top of the original file. will be added to the original file. Can be `false` (no banner), a `string`, or a `function (string) -> string` that will be called with the filename where extracted comments have been stored. Will be wrapped into comment.
Default: `/*! For license information please see foo.js.LICENSE */`


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
