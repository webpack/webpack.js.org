---
title: style-loader
source: https://raw.githubusercontent.com/webpack-contrib/style-loader/master/README.md
edit: https://github.com/webpack-contrib/style-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/style-loader
---
Adds CSS to the DOM by injecting a <code>&lt;style&gt;</code> tag

## 安装

```bash
npm install style-loader --save-dev
```

## <a href="https://webpack.js.org/concepts/loaders">用法</a>

建议将 `style-loader` 与 [`css-loader`](https://github.com/webpack/css-loader) 结合使用

**component.js**
```js
import style from './file.css'
```

**webpack.config.js**
```js
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
}
```

###

在使用[局部作用域 CSS](https://github.com/webpack/css-loader#css-scope) 时，模块导出生成的（局部）标识符(identifier)。

**component.js**
```js
import style from './file.css'

style.className === "z849f98ca812"
```

### `Url`

也可以添加一个URL `<link href="path/to/file.css" rel="stylesheet">`，而不是用带有 `<style></style>` 标签的内联 CSS `{String}`。

```js
import url from 'file.css'
```

**webpack.config.js**
```js
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader/url" },
          { loader: "file-loader" }
        ]
      }
    ]
  }
}
```

```html
<link rel="stylesheet" href="path/to/file.css">
```

> :信息来源: 使用 `url` 引用的 Source map 和资源：当 style-loader 与 `{ options: { sourceMap: true } }` 选项一起使用时，CSS 模块将生成为 `Blob`，因此相对路径无法正常工作（他们将相对于 `chrome:blob` 或 `chrome:devtools`）。为了使资源保持正确的路径，必须设置 webpack 配置中的 `output.publicPath` 属性，以便生成绝对路径。或者，您可以启用上面提到的 `convertToAbsoluteUrls` 选项。

### `可选的(Useable)`

按照惯例，`引用计数器 API(Reference Counter API)` 应关联到 `.useable.css`，而 `.css` 的载入，应该使用基本的 `style-loader` 用法（类似于其他文件类型，例如 `.useable.less` 和 `.less`）。

**webpack.config.js**
```js
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.useable\.css$/,
        use: [
          {
            loader: "style-loader/useable"
          },
          { loader: "css-loader" },
        ],
      },
    ],
  },
}
```

#### `引用计数器 API(Reference Counter API)`

**component.js**
```js
import style from './file.css'

style.use(); // = style.ref();
style.unuse(); // = style.unref();
```

样式不会添加在 `import/require()` 上，而是在调用 `use`/`ref` 时添加。如果 `unuse`/`unref` 与 `use`/`ref` 一样频繁地被调用，那么样式将从页面中删除。

:警告: 当 `unuse`/`unref` 比 `use`/`ref` 调用频繁的时候，产生的行为是不确定的。所以不要这样做。

## 选项

|名称|类型|默认值|描述|
|:--:|:--:|:-----:|:----------|
|**`hmr`**|`{Boolean}`|`true`|Enable/disable Hot Module Replacement (HMR), if disabled no HMR Code will be added (good for non local development/production)|
|**`base`** |`{Number}`|`true`|设置模块 ID 基础 (DLLPlugin)|
|**`attrs`**|`{Object}`|`{}`|添加自定义 attrs 到 `<style></style>`|
|**`transform`** |`{Function}`|`false`|转换/条件加载 CSS，通过传递转换/条件函数|
|**`insertAt`**|`{String\|Object}`|`bottom`|在给定位置处插入 `<style></style>`|
|**`insertInto`**|`{String}`|`<head>`|给定位置中插入 `<style></style>`|
|**`sourceMap`**|`{Boolean}`|`false`|启用/禁用 Sourcemap|
|**`convertToAbsoluteUrls`**|`{Boolean}`|`false`|启用 source map 后，将相对 URL 转换为绝对 URL|

### `hmr`

Enable/disable Hot Module Replacement (HMR), if disabled no HMR Code will be added.
This could be used for non local development and production.

**webpack.config.js**
```js
{
  loader: 'style-loader',
  options: {
    hmr: false
  }
}
```

### `base`

当使用一个或多个 [DllPlugin](https://robertknight.github.io/posts/webpack-dll-plugins/) 时，此设置主要用作 [css 冲突](https://github.com/webpack-contrib/style-loader/issues/163) 的修补方案。`base` 可以防止 *app* 的 css（或 *DllPlugin2* 的 css）覆盖 *DllPlugin1* 的 css，方法是指定一个 css 模块的 id 大于 *DllPlugin1* 的范围，例如：

**webpack.dll1.config.js**
```js
{
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader'
  ]
}
```

**webpack.dll2.config.js**
```js
{
  test: /\.css$/,
  use: [
    { loader: 'style-loader', options: { base: 1000 } },
    'css-loader'
  ]
}
```

**webpack.app.config.js**
```
{
  test: /\.css$/,
  use: [
    { loader: 'style-loader', options: { base: 2000 } },
    'css-loader'
  ]
}
```

### `attrs`

如果已定义，style-loader 将把属性值附加在 `<style>` / `<link>` 元素上。

**component.js**
```js
import style from './file.css'
```

**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    { loader: 'style-loader', options: { attrs: { id: 'id' } } }
    { loader: 'css-loader' }
  ]
}
```

```html
<style id="id"></style>
```

#### `Url`

**component.js**
```js
import link from './file.css'
```

**webpack.config.js**
```js
{
  test: /\.css$/,
  use: [
    { loader: 'style-loader/url', options: { attrs: { id: 'id' } } }
    { loader: 'file-loader' }
  ]
}
```

### `transform`

`transform` 是一个函数，可以在通过 style-loader 加载到页面之前修改 css。
该函数将在即将加载的 css 上调用，函数的返回值将被加载到页面，而不是原始的 css 中。
如果 `transform` 函数的返回值是 falsy 值，那么 css 根本就不会加载到页面中。

**webpack.config.js**
```js
{
  loader: 'style-loader',
  options: {
    transform: 'path/to/transform.js'
  }
}
```

**transform.js**
```js
module.exports = function (css) {
  // Here we can change the original css
  const transformed = css.replace('.classNameA', '.classNameB')

  return transformed
}
```

#### `Conditional`

**webpack.config.js**
```js
{
  loader: 'style-loader',
  options: {
    transform: 'path/to/conditional.js'
  }
}
```

**conditional.js**
```js
module.exports = function (css) {
  // 如果条件匹配则加载[和转换] CSS
  if (css.includes('something I want to check')) {
    return css;
  }
  // 如果返回 falsy 值，则不会加载 CSS
  return false
}
```

### `insertAt`

默认情况下，style-loader 将 `<style>` 元素附加到样式目标(style target)的末尾，即页面的 `<head>` 标签，也可以是由 `insertInto` 指定其他标签。这将导致 loader 创建的 CSS 优先于目标中已经存在的 CSS。要在目标的起始处插入 style 元素，请将此查询参数(query parameter)设置为 'top'，例如

**webpack.config.js**
```js
{
  loader: 'style-loader',
  options: {
    insertAt: 'top'
  }
}
```

A new `<style>` element can be inserted before a specific element by passing an object, e.g.

**webpack.config.js**
```js
{
  loader: 'style-loader',
  options: {
    insertAt: {
        before: '#id'
    }
  }
}
```

### `insertInto`
默认情况下，样式加载器将 `<style>` 元素插入到页面的 `<head>` 标签中。如果要将标签插入到其他位置，可以在这里为该元素指定 CSS 选择器。如果你想要插入到 [IFrame](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement) 中，请确保你具有足够的访问权限，样式将被注入到内容文档的 head 中。
你还可以将样式插入到 [ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) 中，如下

**webpack.config.js**
```js
{
  loader: 'style-loader',
  options: {
    insertInto: '#host::shadow>#root'
  }
}
```

### `singleton`

如果已定义，则 style-loader 将重用单个 `<style>` 元素，而不是为每个所需的模块添加/删除单个元素。

> ℹ️  默认情况下启用此选项，IE9 对页面上允许的 style 标签数量有严格的限制。您可以使用 singleton 选项来启用或禁用它。

**webpack.config.js**
```js
{
  loader: 'style-loader',
  options: {
    singleton: true
  }
}
```

### `sourceMap`

启用/禁用 source map 加载

**webpack.config.js**
```js
{
  loader: 'style-loader',
  options: {
    sourceMap: true
  }
}
```

### `convertToAbsoluteUrls`

如果 convertToAbsoluteUrls 和 sourceMaps 都启用，那么相对 url 将在 css 注入页面之前，被转换为绝对 url。这解决了在启用 source map 时，相对资源无法加载的[问题](https://github.com/webpack/style-loader/pull/96)。您可以使用 convertToAbsoluteUrls 选项启用它。

**webpack.config.js**
```js
{
  loader: 'style-loader',
  options: {
    sourceMap: true,
    convertToAbsoluteUrls: true
  }
}
```

## 维护人员

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/bebraw">
          <img width="150" height="150" src="https://github.com/bebraw.png?v=3&s=150">
          </br>
          Juho Vepsäläinen
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/d3viant0ne">
          <img width="150" height="150" src="https://github.com/d3viant0ne.png?v=3&s=150">
          </br>
          Joshua Wiens
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/sapegin">
          <img width="150" height="150" src="https://github.com/sapegin.png?v=3&s=150">
          </br>
          Artem Sapegin
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/michael-ciniawsky">
          <img width="150" height="150" src="https://github.com/michael-ciniawsky.png?v=3&s=150">
          </br>
          Michael Ciniawsky
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/evilebottnawi">
          <img width="150" height="150" src="https://github.com/evilebottnawi.png?v=3&s=150">
          </br>
          Alexander Krasnoyarov
        </a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/sokra">
          <img width="150" height="150" src="https://github.com/sokra.png?v=3&s=150">
          </br>
          Tobias Koppers
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/SpaceK33z">
          <img width="150" height="150" src="https://github.com/SpaceK33z.png?v=3&s=150">
          </br>
          Kees Kluskens
        </a>
      </td>
    <tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/style-loader.svg
[npm-url]: https://npmjs.com/package/style-loader

[node]: https://img.shields.io/node/v/style-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/style-loader.svg
[deps-url]: https://david-dm.org/webpack/file-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/style-loader/
