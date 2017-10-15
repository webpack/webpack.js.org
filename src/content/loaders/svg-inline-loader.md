---
title: svg-inline-loader
source: https://raw.githubusercontent.com/webpack-contrib/svg-inline-loader/master/README.md
edit: https://github.com/webpack-contrib/svg-inline-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/svg-inline-loader
---
This Webpack loader inlines SVG as module. If you use Adobe suite or Sketch to export SVGs, you will get auto-generated, unneeded crusts. This loader removes it for you, too.

## 安装

```bash
npm install svg-inline-loader --save-dev
```

## 配置

只需加载配置对象到 `module.loaders` 像下面这样。

```javascript
    {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
    }
```

警告: 这个loader你应只配置一次，通过 `module.loaders` 或者 `require('!...')` 配置。 更多细节参考 [#15](https://github.com/webpack-contrib/svg-inline-loader/issues/15)。

## Query 选项

###

删除指定的标签和它的子元素，你可以指定标签通过设置 `removingTags` 查询多个。

默认值: `removeTags: false`

#### `removingTags: [...string]`

警告: 您指定 `removeTags: true` 时，它才会执行。

默认值: `removingTags: ['title', 'desc', 'defs', 'style']`

#### `warnTags: [...string]`

警告标签,例: ['desc', 'defs', 'style']

默认值: `warnTags: []`

#### `removeSVGTagAttrs: boolean`

删除 `<svg />` 的 `width` 和 `height` 属性。

默认值: `removeSVGTagAttrs: true`

#### `removingTagAttrs: [...string]`

删除内部的 `<svg />`的属性。

默认值: `removingTagAttrs: []`

#### `warnTagAttrs: [...string]`

在console发出关于内部 `<svg />` 属性的警告

默认值: `warnTagAttrs: []`
#### `classPrefix: boolean || string`

添加一个前缀到svg文件的class，以避免碰撞。

默认值: `classPrefix: false`

#### `idPrefix: boolean || string`

添加一个前缀到svg文件的id，以避免碰撞。

默认值: `idPrefix: false`

## 使用示例

```js
// 使用默认 hashed prefix (__[hash:base64:7]__)
var logoTwo = require('svg-inline-loader?classPrefix!./logo_two.svg');

// 使用自定义字符串
var logoOne = require('svg-inline-loader?classPrefix=my-prefix-!./logo_one.svg');

// 使用自定义字符串和hash
var logoThree = require('svg-inline-loader?classPrefix=__prefix-[sha512:hash:hex:5]__!./logo_three.svg');
```
hash 操作请参照 [loader-utils](https://github.com/webpack/loader-utils#interpolatename)。

通过 `module.loaders` 优先使用:
```js
    {
        test: /\.svg$/,
        loader: 'svg-inline-loader?classPrefix'
    }
```

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

***

> 原文：https://webpack.js.org/loaders/svg-inline-loader/
