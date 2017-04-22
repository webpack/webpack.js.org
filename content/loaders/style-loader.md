---
title: style-loader
source: https://raw.githubusercontent.com/webpack-contrib/style-loader/master/README.md
edit: https://github.com/webpack-contrib/style-loader/edit/master/README.md
---
## 安装

```
npm install style-loader --save-dev
```

## <a href="https://webpack.js.org/concepts/loaders">用法</a>

### 简洁的 API
``` javascript
require("style-loader!raw-loader!./file.css");
// => 在 file.css 文件中添加规则
```

建议将它与 [`css-loader`](https://github.com/webpack/css-loader) 结合使用: `require("style-loader!css-loader!./file.css")`.

也可以添加URL而不是CSS字符串：
``` javascript
require("style-loader/url!file-loader!./file.css");
// => 把 file.css 的 <link rel="stylesheet"> 添加到文档中
```

### 局部作用域 CSS

（试验性质）

在使用[局部作用域 CSS](https://github.com/webpack/css-loader#css-scope) 时，模块导出生成的标识符：

``` javascript
var style = require("style-loader!css-loader!./file.css");
style.placeholder1 === "z849f98ca812bc0d099a43e0f90184"
```

### 引用计数 API
``` javascript
var style = require("style-loader/useable!css-loader!./file.css");
style.use(); // = style.ref();
style.unuse(); // = style.unref();
```

样式不会在`require`上添加，而是在调用`use`/`ref`时添加样式。如果`unuse`/`unref`的调用次数与`use`/`ref`一样，样式则会从页面中删除

注意：当`unuse`/`unref`被调用次数多时，行为是未定义的。所以不要这样做。

### 选项

#### `insertAt`

默认情况下，style-loader 将 `<style>' 元素附加到样式目标(target)的末尾，除非由 `insertInto` 指定，否则样式目标是指页面的 `<head>` 标签。这将导致由 loader 创建的 CSS 优先于目标(target)中已经存在的CSS。要在目标(target)的开始处插入样式元素，请将此查询参数设置为 'top'，例如，`require('../style.css?insertAt=top')`。

#### `insertInto`
By default, the style-loader inserts the `<style>` elements into the `<head>` tag of the page. If you want the tags to be inserted somewhere else, e.g. into a [ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot), you can specify a CSS selector for that element here, e.g. `require('../style.css?insertInto=#host::shadow>#root')`.

#### `singleton`

如果已定义，则style-loader将重用单个 `<style>` 元素，而不是为每个所需的模块添加/删除单个元素。注意：默认情况下，IE9中启用此选项，这对页面上允许的样式标记数有严格的限制。您可以使用singleton查询参数启用或禁用它(`?singleton` or `?-singleton`)。

#### `convertToAbsoluteUrls`

If convertToAbsoluteUrls and sourceMaps are both enabled, relative urls will be converted to absolute urls right before the css is injected into the page. This resolves [an issue](https://github.com/webpack/style-loader/pull/96) where relative resources fail to load when source maps are enabled.  You can enable it with the convertToAbsoluteUrls query parameter (`?convertToAbsoluteUrls`).

#### `attrs`

If defined, style-loader will attach given attributes with their values on `<style>` / `<link>` element.
Usage:
```javascript
require('style-loader?{attrs:{id: "style-tag-id"}}!style.css');

// will create style tag <style id="style-tag-id">
```
Usage in `url` mode:
```javascript
require('style-loader/url?{attrs:{prop: "value"}}!file-loader!style.css')

// will create link tag <link rel="stylesheet" type="text/css" href="[path]/style.css" prop="value">
```

### 推荐配置

按照惯例，引用计数的API应绑定到.useable.css，而简单的API绑定到.css（其他文件类型也类似，即.useable.less和.less）

所以推荐的 webpack 配置是
``` javascript
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

关于source map支持和资源方面，引用URL应注意：当样式加载器与？sourceMap选项一起使用时，CSS模块将生成为`Blob`s，因此相对路径无法辨别（它们将是相对于`chrome:blob`或`chrome:devtools`）。为了使资源保持正确的路径，必须设置webpack配置的`output.publicPath`属性，以便生成绝对路径。或者，您可以启用上述 `convertToAbsoluteUrls` 选项。

## Contributing

Don't hesitate to create a pull request. Every contribution is appreciated. In development you can start the tests by calling `npm test`.

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150 height="150"
        src="https://avatars.githubusercontent.com/sokra?v=3">
        <br />
        <a href="https://github.com/">Tobias Koppers</a>
      </td>
      <td align="center">
        <img width="150 height="150"
        src="https://avatars.githubusercontent.com/SpaceK33z?v=3">
        <br />
        <a href="https://github.com/">Kees Kluskens</a>
      </td>
    <tr>
  <tbody>
</table>


## LICENSE

MIT

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