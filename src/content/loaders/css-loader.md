---
title: css-loader
source: https://raw.githubusercontent.com/webpack-contrib/css-loader/master/README.md
edit: https://github.com/webpack-contrib/css-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/css-loader
---


## 安装

```bash
npm install --save-dev css-loader
```

## 用法

`css-loader` 解释(interpret) `@import` 和 `url()` ，会 `import/require()` 后再解析(resolve)它们。

引用资源的合适 loader 是 [file-loader](/loaders/file-loader/)和 [url-loader](/loaders/url-loader/)，您应该在配置中指定（查看[如下设置](https://github.com/webpack-contrib/css-loader#assets)）。

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
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
```

##

您也可以直接将 css-loader 的结果作为字符串使用，例如 Angular 的组件样式。

**webpack.config.js**
```js
{
   test: /\.css$/,
   use: [
     'to-string-loader',
     'css-loader'
   ]
}
```

或者

```js
const css = require('./test.css').toString();

console.log(css); // {String}
```

如果有 SourceMap，它们也将包含在字符串结果中。

如果由于某种原因，您需要将 CSS 提取为纯粹的字符串资源（即不包含在 JS 模块中），则可能需要查看 [extract-loader](https://github.com/peerigon/extract-loader)。
例如，当您需要将 CSS 作为字符串进行后处理时，这很有用。

**webpack.config.js**
```js
{
   test: /\.css$/,
   use: [
     'handlebars-loader', // handlebars loader expects raw resource string
     'extract-loader',
     'css-loader'
   ]
}
```

## 选项

|名称|类型|默认值|描述|
|:--:|:--:|:-----:|:----------|
|**[`root`](#root)**|`{String}`|`/`|解析 URL 的路径，以 `/` 开头的 URL 不会被转译|
|**[`url`](#url)**|`{Boolean}`|`true`| 启用/禁用 `url()` 处理|
|**[`alias`](#alias)**|`{Object}`|`{}`|创建别名更容易导入一些模块|
|**[`import`](#import)** |`{Boolean}`|`true`| 启用/禁用 @import 处理|
|**[`modules`](#modules)**|`{Boolean}`|`false`|启用/禁用 CSS 模块|
|**[`minimize`](#minimize)**|`{Boolean\|Object}`|`false`|启用/禁用 压缩|
|**[`sourceMap`](#sourcemap)**|`{Boolean}`|`false`|启用/禁用 Sourcemap|
|**[`camelCase`](#camelcase)**|`{Boolean\|String}`|`false`|以驼峰化式命名导出类名|
|**[`importLoaders`](#importloaders)**|`{Number}`|`0`|在 css-loader 前应用的 loader 的数量|
|**`localIdentName`**|`{String}`|`[hash:base64]`|配置生成的标识符(ident)|

### `root`

对于以 `/` 开头的 URL，默认行为是不转译它们。

`url(/image.png) => url(/image.png)`

如果设置了 `root` 查询参数，那么此查询参数将被添加到 URL 前面，然后再进行转译。

**webpack.config.js**
```js
{
  loader: 'css-loader',
  options: { root: '.' }
}
```

`url(/image.png)` => `require('./image.png')`

不建议使用'相对根路径'的 url。您应该只将其用于旧版 CSS 文件。

### `url`

要禁用 `css-loader` 解析 `url()`，将选项设置为 `false`。

与现有的 css 文件兼容（如果不是在 CSS 模块模式下）。

```
url(image.png) => require('./image.png')
url(~module/image.png) => require('module/image.png')
```

### `alias`

用别名重写你的 URL，在难以改变输入文件的url 路径时，这会很有帮助，例如，当你使用另一个包(package)（如 bootstrap, ratchet, font-awesome 等）中一些 css/sass 文件。

`css-loader` 的别名，遵循与webpack 的 `resolve.alias` 相同的语法，你可以在[resolve 文档](https://webpack.js.org/configuration/resolve/#resolve-alias) 查看细节

**file.scss**
```css
@charset "UTF-8";
@import "bootstrap";
```

**webpack.config.js**
```js
{
  test: /\.scss$/,
  use: [
    {
      loader: "style-loader"
    },
    {
      loader: "css-loader",
      options: {
        alias: {
          "../fonts/bootstrap": "bootstrap-sass/assets/fonts/bootstrap"
        }
      }
    },
    {
      loader: "sass-loader",
      options: {
        includePaths: [
          path.resolve("./node_modules/bootstrap-sass/assets/stylesheets")
        ]
      }
    }
  ]
}
```

查看此示例 [working bootstrap example](https://github.com/bbtfr/webpack2-bootstrap-sass-sample)。

### `import`

要禁用 `css-loader` 解析 `@import`，将选项设置为`false`

```css
@import url('https://fonts.googleapis.com/css?family=Roboto');
```

> _⚠️ 谨慎使用，因为这将禁用解析**所有** `@import`，包括 css 模块 `composes: xxx from 'path/to/file.css'` 功能。_

### [`modules`](https://github.com/css-modules/css-modules)

查询参数 `modules` 会启用 **CSS 模块**规范。

默认情况下，这将启用局部作用域 CSS。（您可以使用 `:global(...)` 或 `:global` 关闭选择器 and/or 规则。

#### `Scope`

默认情况下，CSS 将所有的类名暴露到全局的选择器作用域中。样式可以在局部作用域中，避免全局作用域的样式。

语法 `:local(.className)` 可以被用来在局部作用域中声明 `className`。局部的作用域标识符会以模块形式暴露出去。

使用 `:local`（无括号）可以为此选择器启用局部模式。`:global(.className)` 可以用来声明一个明确的全局选择器。使用`:global`（无括号）可以将此选择器切换至全局模式。

loader 会用唯一的标识符(identifier)来替换局部选择器。所选择的唯一标识符以模块形式暴露出去。

```css
:local(.className) { background: red; }
:local .className { color: green; }
:local(.className .subClass) { color: green; }
:local .className .subClass :global(.global-class-name) { color: blue; }
```

```css
._23_aKvs-b8bW2Vg3fwHozO { background: red; }
._23_aKvs-b8bW2Vg3fwHozO { color: green; }
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 { color: green; }
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 .global-class-name { color: blue; }
```

> :主要信息: 标识符被导出

```js
exports.locals = {
  className: '_23_aKvs-b8bW2Vg3fwHozO',
  subClass: '_13LGdX8RMStbBE9w-t0gZ1'
}
```

建议局部选择器使用驼峰式。它们在导入 JS 模块中更容易使用。

`url()` 中的 URL 在块作用域 (`:local .abc`) 规则中的表现，如同请求模块。

```
file.png => ./file.png
~module/file.png => module/file.png
```

你可以使用 `:local(#someId)`，但不推荐这种用法。推荐使用 class 代替 id。
你可以使用 `localIdentName` 查询参数（默认 `[hash:base64]`）来配置生成的 ident。

 **webpack.config.js**
 ```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]'
      }
    }
  ]
}
```

您还可以通过自定义 `getLocalIdent` 函数来指定绝对路径，以根据不同的模式(schema)生成类名。这需要 `webpack >= 2.2.1`（`options` 对象支持传入函数）。

**webpack.config.js**
```js
{
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    getLocalIdent: (context, localIdentName, localName, options) => {
      return 'whatever_random_class_name'
    }
  }
}
```

> :重要信息: 对于使用 extract-text-webpack-plugin 预渲染，你应该**在预渲染 bundle 中** 使用 `css-loader/locals` 而不是 `style-loader!css-loader` 。它不会嵌入 CSS，但只导出标识符映射(identifier map)。

#### `Composing`

当声明一个局部类名时，你可以与另一个局部类名组合为一个局部类。

```css
:local(.className) {
  background: red;
  color: yellow;
}

:local(.subClass) {
  composes: className;
  background: blue;
}
```

这不会导致 CSS 本身的任何更改，而是导出多个类名。

```js
exports.locals = {
  className: '_23_aKvs-b8bW2Vg3fwHozO',
  subClass: '_13LGdX8RMStbBE9w-t0gZ1 _23_aKvs-b8bW2Vg3fwHozO'
}
```

``` css
._23_aKvs-b8bW2Vg3fwHozO {
  background: red;
  color: yellow;
}

._13LGdX8RMStbBE9w-t0gZ1 {
  background: blue;
}
```

#### `Importing`

从其他模块导入局部类名。

```css
:local(.continueButton) {
  composes: button from 'library/button.css';
  background: red;
}
```

```css
:local(.nameEdit) {
  composes: edit highlight from './edit.css';
  background: red;
}
```

要从多个模块导入，请使用多个 `composes:` 规则。

```css
:local(.className) {
  composes: edit hightlight from './edit.css';
  composes: button from 'module/button.css';
  composes: classFromThisModule;
  background: red;
}
```

### `minimize`

默认情况下，如果模块系统指定，css-loader 将压缩 css。

在某些情况下，压缩对于 css 来说是破坏性的，所以如果需要设置，可以向基于 cssnano 的 minifier(cssnano-based minifier) 提供自己的选项。更多可用信息请查看 [cssnano 文档](http://cssnano.co/guides/)。

还可以使用 `minimize` 查询参数，来禁用或强制压缩。

**webpack.config.js**
```js
{
  loader: 'css-loader',
  options: {
    minimize: true || {/* CSSNano Options */}
  }
}
```

### `sourceMap`

设置 `sourceMap` 选项查询参数来引入 source map。

例如 extract-text-webpack-plugin 能够处理它们。

默认情况下不启用它们，因为它们会导致运行时的额外开销，并增加了 bundle 大小 (JS source map 不会)。此外，相对路径是错误的，您需要使用包含服务器 URL 的绝对公用路径。

**webpack.config.js**
```js
{
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
}
```

### `camelCase`

默认情况下，导出 JSON 键值对形式的类名。如果想要驼峰化(camelize)类名（有助于在 JS 中使用），通过设置 css-loader 的查询参数 `camelCase` 即可实现。

|名称|类型|描述|
|:--:|:--:|:----------|
|**`true`**|`{Boolean}`|类名将被骆驼化|
|**`'dashes'`**|`{String}`|只有类名中的破折号将被骆驼化|
|**`'only'`** |`{String}`|在 `0.27.1` 中加入。类名将被骆驼化，初始类名将从局部移除|
|**`'dashesOnly'`**|`{String}`|在 `0.27.1` 中加入。类名中的破折号将被骆驼化，初始类名将从局部移除|

**file.css**
```css
.class-name {}
```

**file.js**
```js
import { className } from 'file.css';
```

**webpack.config.js**
```js
{
  loader: 'css-loader',
  options: {
    camelCase: true
  }
}
```

### `importLoaders`

查询参数 `importLoaders`，用于配置「`css-loader` 作用于 `@import` 的资源之前」有多少个 loader。

**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
      }
    },
    'postcss-loader',
    'sass-loader'
  ]
}
```

在模块系统（即 webpack）支持原始 loader 匹配后，此功能可能在将来会发生变化。

## 示例

### 资源

以下 `webpack.config.js` 可以加载 CSS 文件，将小体积 PNG/JPG/GIF/SVG 图像转为像字体那样的 [Data URL](https://tools.ietf.org/html/rfc2397) 嵌入，并复制较大的文件到输出目录。

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  }
}
```

### 提取

对于生产环境构建，建议从 bundle 中提取 CSS，以便之后可以并行加载 CSS/JS 资源。可以通过使用 [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) 来实现，在生产环境模式运行中提取 CSS。

**webpack.config.js**
```js
const env = process.env.NODE_ENV

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: env === 'production'
          ? ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [ 'css-loader' ]
          })
          : [ 'style-loader', 'css-loader' ]
      },
    ]
  },
  plugins: env === 'production'
    ? [
        new ExtractTextPlugin({
          filename: '[name].css'
        })
      ]
    : []
}
```

## 维护人员

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/bebraw.png?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/d3viant0ne.png?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/SpaceK33z.png?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/TheLarkInn.png?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/michael-ciniawsky.png?v=3&s=150">
        </br>
        <a href="https://github.com/michael-ciniawsky">Michael Ciniawsky</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/evilebottnawi.png?v=3&s=150">
        </br>
        <a href="https://github.com/evilebottnawi">Evilebot Tnawi</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/joscha.png?v=3&s=150">
        </br>
        <a href="https://github.com/joscha">Joscha Feth</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/css-loader.svg
[npm-url]: https://npmjs.com/package/css-loader

[node]: https://img.shields.io/node/v/css-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/css-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/css-loader

[tests]: http://img.shields.io/travis/webpack-contrib/css-loader.svg
[tests-url]: https://travis-ci.org/webpack-contrib/css-loader

[cover]: https://codecov.io/gh/webpack-contrib/css-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/css-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/css-loader/
