---
title: svg-inline-loader
source: https://raw.githubusercontent.com/webpack-contrib/svg-inline-loader/master/README.md
edit: https://github.com/webpack-contrib/svg-inline-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/svg-inline-loader
---
此 webpack loader 会将 SVG 文件内联为模块。如果你使用 Adobe Suite 或 Sketch 导出 SVG 时，会生成不必要的冗余文件代码。此 loader 也会帮你移除它。

## 安装 {#install}

```bash
npm install svg-inline-loader --save-dev
```

## 配置 {#configuration}

只需按如下方式配置到  `module.loaders` 即可。

```javascript
    {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
    }
```

警告: 这个 loader 你应只能通过 `module.loaders` 或者 `require('!...')` 配置一次。更多细节参考 [#15](https://github.com/webpack-contrib/svg-inline-loader/issues/15)。

## Query 选项 {#query-options}

#### `removeTags: boolean` {#removetags-boolean}

删除指定的标签和它的子元素。你可以通过设置 `removingTags` 查询数组来指定标签。

默认值: `removeTags: false`

#### `removingTags: [...string]` {#removingtags-string}

警告：你指定 `removeTags: true` 时，它才会执行。

默认值: `removingTags: ['title', 'desc', 'defs', 'style']`

#### `warnTags: [...string]` {#warntags-string}

警告标签，不含：['desc', 'defs', 'style']

默认值: `warnTags: []`

#### `removeSVGTagAttrs: boolean` {#removesvgtagattrs-boolean}

删除 `<svg />` 的 `width` 和 `height` 属性。

默认值: `removeSVGTagAttrs: true`

#### `removingTagAttrs: [...string]` {#removingtagattrs-string}

删除 `<svg />` 内部的属性。

默认值: `removingTagAttrs: []`

#### `warnTagAttrs: [...string]` {#warntagattrs-string}

在 console 发出关于内部 `<svg />` 属性的警告

默认值: `warnTagAttrs: []`
#### `classPrefix: boolean || string` {#classprefix-boolean--string}

添加一个前缀到 svg 文件的 class，以避免冲突。

默认值: `classPrefix: false`

#### `idPrefix: boolean || string` {#idprefix-boolean--string}

添加一个前缀到 svg 文件的 id，以避免冲突。

默认值: `idPrefix: false`

## 使用示例 {#example-usage}

```js
// 使用默认 hashed prefix (__[hash:base64:7]__)
var logoTwo = require('svg-inline-loader?classPrefix!./logo_two.svg');

// 使用自定义字符串
var logoOne = require('svg-inline-loader?classPrefix=my-prefix-!./logo_one.svg');

// 使用自定义字符串和 hash
var logoThree = require('svg-inline-loader?classPrefix=__prefix-[sha512:hash:hex:5]__!./logo_three.svg');
```
hash 操作请参照 [loader-utils](https://github.com/webpack/loader-utils#interpolatename)。

首选 `module.loaders` 用法：
```js
    {
        test: /\.svg$/,
        loader: 'svg-inline-loader?classPrefix'
    }
```

## 维护人员 {#maintainers}

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

[npm]: https://img.shields.io/npm/v/svg-inline-loader.svg
[npm-url]: https://npmjs.com/package/svg-inline-loader

[deps]: https://david-dm.org/webpack-contrib/svg-inline-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/svg-inline-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: https://travis-ci.org/webpack-contrib/svg-inline-loader.svg?branch=master
[test-url]: https://travis-ci.org/webpack-contrib/svg-inline-loader

[cover]: https://codecov.io/gh/webpack-contrib/svg-inline-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/svg-inline-loader
