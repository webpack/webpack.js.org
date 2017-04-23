---
title: css-loader
source: https://raw.githubusercontent.com/webpack-contrib/css-loader/master/README.md
edit: https://github.com/webpack-contrib/css-loader/edit/master/README.md
---
## 安装

```bash
npm install --save-dev css-loader
```

## 用法

The `css-loader` interprets `@import` and `url()` like `requires`.

通过 webpack 配置，CLI或内联使用 loader。

### 通过 webpack 配置 (推荐)

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

**在应用程序中**
```js
import css from 'file.css';
```

### CLI

```bash
webpack --module-bind 'css=style-loader!css-loader'
```

**在应用程序中**
```js
import css from 'file.css';
```

### 内联

**在应用程序中**
```js
import css from 'style-loader!css-loader!./file.css';
```

## 选项

`@import` 和 `url()` 被当做成 `import` 并且会被 css-loader 解析.
比较好的 loaders 对于请求你的生产资源是 [file-loader](https://github.com/webpack/file-loader)
和 [url-loader](https://github.com/webpack/url-loader) 并且指定相应的配置 (见下文).

兼容现有的 css 文件 (当不是在 css 模块模式):

* `url(image.png)` => `require('./image.png')`
* `url(~module/image.png)` => `require('module/image.png')`

## 选项

|名称|默认值|描述|
|:--:|:-----:|:----------|
|**`root`**|`/`|解析 URLs 路径, URLs 以 `/` 开头将不会被翻译|
|**`modules`**|`false`| 启用/禁用 css-modules 模式|
|**`import`** |`true`| 启用/禁用 @import 处理|
|**`url`**|`true`| 启用/禁用 `url()` 处理|
|**`minimize`**|`true`| 启用/禁用 压缩|
|**`sourceMap`**|`false`| 启用/禁用 Sourcemaps|
|**`camelCase`**|`false`| 导出以驼峰化命名的类名|
|**`importLoaders`**|`0`| 在 css-loader 前应用的 loader 的数|
|**`alias`**|`{}`|Create aliases to import certain modules more easily|

下面的 webpack 配置可以加载 CSS 文件，将较小的 PNG/JPG/GIF/SVG 图片文件像字体那样，转为 [Data URLs](https://tools.ietf.org/html/rfc2397) 嵌入到 CSS 文件中，并将较大的文件复制到输出目录。

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
};
```

### Root

对于以一个 `/` 开头的 URLs，默认行为是不翻译：

* `url(/image.png)` => `url(/image.png)`

如果设置了 root 参数，那么 root 参数将被添加到 URL 前面，然后被翻译：

**webpack.config.js**
```js
rules: [
  {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: { root: '.' }
      }
    ]
  }
]
```

* `url(/image.png)` => `require('./image.png')`

不建议使用 'Root-relative' urls，您应该只将其用于旧版 CSS 文件。

### CSS 作用域

默认情况下，CSS将所有的类暴露到全局的选择器作用域中。样式可以在局部作用域中，避免全局作用域的样式。

语法 `:local(.className)` 可以被用来在局部作用域中声明 `className`。局部的作用域标识符会以模块形式暴露出去。

使用 `:local` （无括号）可以为此选择器启用局部模式。 `：global（.className）`可以用来声明一个明确的全局选择器。使用`：global`（无括号）可以为此选择器打开全局模式。

加载器会用唯一的标识符来替换局部选择器。所选择的唯一标识符以模块形式暴露出去。

**app.css**
```css
:local(.className) { background: red; }
:local .className { color: green; }
:local(.className .subClass) { color: green; }
:local .className .subClass :global(.global-class-name) { color: blue; }
```

**app.bundle.css**
``` css
._23_aKvs-b8bW2Vg3fwHozO { background: red; }
._23_aKvs-b8bW2Vg3fwHozO { color: green; }
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 { color: green; }
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 .global-class-name { color: blue; }
```

> 注意: 标识符被输出

``` js
exports.locals = {
  className: '_23_aKvs-b8bW2Vg3fwHozO',
  subClass: '_13LGdX8RMStbBE9w-t0gZ1'
}
```

建议本地选择器使用驼峰化。它们在导入 JS 模块中更容易使用。

`url()` URLs 在块作用域 (`:local .abc`) 规则中的表现像模块中的请求。

* `./file.png` instead of `file.png`
* `module/file.png` instead of `~module/file.png`

你可以使用 `:local(#someId)`，但它不被推荐。推荐用 class 代替 id。

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

您还可以指定自定义 `getLocalIdent` 函数的绝对路径，以根据不同的模式生成类名。注意这需要 `webpack >= 2.2.1`（`options` 对象支持传入函数）。示例：

**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
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
  ]
}
```

注意: 对于使用extract-text-webpack-plugin预呈现，你应该在 **在预渲染 bundle 中** 使用css-loader / locals而不是style-loader！css-loader。它不嵌入CSS，但只导出标识符映射。

### [CSS 模块](https://github.com/css-modules/css-modules)

查询参数模块启用 **CSS 模块** 规范。

这将默认启用本地作用于 CSS。（您可以使用`:global(...)` 或 `:global`选择器或/和规则将其关闭。）

### 组合 CSS

当声明一个本地类名时，你可以从另一个本地类名组合成一个本地类。

``` css
:local(.className) {
  background: red;
  color: yellow;
}

:local(.subClass) {
  composes: className;
  background: blue;
}
```

这不会更改 CSS 本身，但可以导出更多的类名。

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

### 导入本地 CSS

从其他模块导入本地类名：

``` css
:local(.continueButton) {
  composes: button from 'library/button.css';
  background: red;
}
```

``` css
:local(.nameEdit) {
  composes: edit highlight from './edit.css';
  background: red;
}
```

要从多个模块导入，请使用多个 `composes:` 规则。

``` css
:local(.className) {
  composes: edit hightlight from './edit.css';
  composes: button from 'module/button.css';
  composes: classFromThisModule;
  background: red;
}
```

### SourceMaps

包含 Sourcemaps 的，设置 `sourceMap`查询参数。

即 extract-text-webpack-plugin 可以处理它们。

默认情况下不启用它们，因为它们暴露了运行时的开销并增加了 bundle 的大小 (JS SourceMap 不会)。此外，相对路径是错误的，您需要使用包含服务器 URL 的绝对公用路径。


**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    }
  ]
}
```

### toString

You can also use the css-loader results directly as string, such as in Angular's component style.

**webpack.config.js**

```js
{
   test: /\.css$/,
   use: [
     {
       loaders: ['to-string-loader', 'css-loader']
     }
   ]
}
```

or

```js
const cssText = require('./test.css').toString();

console.log(cssText);
```

If there are SourceMaps, they will also be included in the result string.

### ImportLoaders

应用于 `@import` 资源的 loaders 的查询参数 `importLoaders` 允许配置。

`importLoaders`: 在 css-loader 之后的许多 loaders 用于导入资源。

**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    },
    'postcss-loader'
  ]
}
```

当模块系统 (即 webpack) 支持通过源的 loader 匹配时，这可能在将来会改变。

### Minification

### 最小化

默认情况下，css-loader 是通过特定的模块系统来进行压缩 css 的。

某种情况下，压缩 css 是具有破坏性的，所以可以提供一些可选项。cssnano 被用来进行压缩，并且它具有一个[可配置项列表](http://cssnano.co/options/).

也可以通过设置 查询参数`minimize` 的禁用或者启用来进行压缩。

**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        minimize: true || {/* CSSNano Options */}
      }
    }
  ]
}
```

### CamelCase

默认情况下，导出 JSON 键值对形式的类名。如果想要 camelize 类名(在 JS 中应用)，通过设置 css-loader 的查询参数 camelCase 即可实现。

#### Possible Options

|Option|Description|
|:----:|:--------|
|**`true`**|Class names will be camelized|
|**`'dashes'`**|Only dashes in class names will be camelized|
|**`'only'`** |Introduced in `0.27.1`. Class names will be camelized, the original class name will be removed from the locals|
|**`'dashesOnly'`**|Introduced in `0.27.1`. Dashes in class names will be camelized, the original class name will be removed from the locals|

**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    {
      loader: 'css-loader',
      options: {
        camelCase: true
      }
    }
  ]
}
```

```css
.class-name {}
```

```js
import { className } from 'file.css';
```

### Alias

Rewrite your urls with alias, this is useful when it's hard to change url paths of your input files, for example, when you're using some css / sass files in another package (bootstrap, ratchet, font-awesome, etc.).

#### Possible Options

css-loader's `alias` follows the same syntax as webpack's `resolve.alias`, you can see the details at: https://webpack.js.org/configuration/resolve/#resolve-alias

**webpack.config.js**
```js
{
  test: /\.scss$/,
  use: [{
    loader: "style-loader"
  }, {
    loader: "css-loader",
    options: {
      alias: {
        "../fonts/bootstrap": "bootstrap-sass/assets/fonts/bootstrap"
      }
    }
  }, {
    loader: "sass-loader",
    options: {
      includePaths: [
        path.resolve("./node_modules/bootstrap-sass/assets/stylesheets")
      ]
    }
  }]
}
```

```scss
@charset "UTF-8";
@import "bootstrap";
```
Check out this [working bootstrap example](https://github.com/bbtfr/webpack2-bootstrap-sass-sample).

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