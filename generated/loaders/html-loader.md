---
title: html-loader
source: https://raw.githubusercontent.com/webpack/html-loader/master/README.md
edit: https://github.com/webpack/html-loader/edit/master/README.md
---
## 安装
```bash
npm i -D html-loader
```

## 使用
默认情况下，每个本地的 `<img src="image.png">` 都需要 （`require('./image.png')`） 来进行加载。您可能需要为配置中的图片指定加载器（推荐 `file-loader` 或 `url-loader` ）

您可以通过查询参数attrs指定此加载器应处理哪个标签属性组合。传递数组或以空格分隔的<tag>：<attribute>组合列表。（默认值：attrs = img：src）

要完全禁用标签属性处理（例如，如果你在客户端处理图片加载），您可以传入attrs = false。

## 例子

使用此配置：
```js
{
  module: {
    loaders: [
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  },
  output: {
    publicPath: "http://cdn.example.com/[hash]/"
  }
}
```

``` html
<!-- file.html -->
<img src="image.png" data-src="image2x.png" >
```

```js
require("html-loader!./file.html");

// => '<img src="http://cdn.example.com/49eba9f/a992ca.png"
//         data-src="image2x.png">'
```

```js
require("html-loader?attrs=img:data-src!./file.html");

// => '<img src="image.png" data-src="data:image/png;base64,..." >'
```

```js
require("html-loader?attrs=img:src img:data-src!./file.html");
require("html-loader?attrs[]=img:src&attrs[]=img:data-src!./file.html");

// => '<img  src="http://cdn.example.com/49eba9f/a992ca.png"        
//           data-src="data:image/png;base64,..." >'
```

```js
require("html-loader?-attrs!./file.html");

// => '<img  src="image.jpg"  data-src="image2x.png" >'
```

通过运行`webpack --optimize-minimize`来最小化优化

```html
'<img src=http://cdn.example.com/49eba9f/a9f92ca.jpg
      data-src=data:image/png;base64,...>'
```

或在您的`webpack.conf.js`中指定`minimize`查询

```js
module: {
  loaders: [{
    test: /\.html$/,
    loader: 'html',
    query: {
      minimize: true
    }
  }]
}
```

### 'Root-relative' 网址

对于以/开头的网址，默认行为是不编译它们。如果设置了根查询参数，它将被添加到URL之前，然后被编译。

具有与上述相同的配置：
``` html
<!-- file.html -->
<img src="/image.jpg">
```

```js
require("html-loader!./file.html");

// => '<img  src="/image.jpg">'
```

```js
require("html-loader?root=.!./file.html");

// => '<img  src="http://cdn.example.com/49eba9f/a992ca.jpg">'
```

### 插值

您可以使用 `interpolate` 标志为ES6模板字符串启用插值语法，如下所示：

```js
require("html-loader?interpolate!./file.html");
```

```html
<img src="${require(`./images/gallery.png`)}">

<div>${require('./components/gallery.html')}</div>
```
如果你只想使用模板中的 `require` 和任何其它的 `${}` 不被编译，你可以设置 `interpolate` 标志为 `require`，像这样：

```js
require("html-loader?interpolate=require!./file.ftl");
```

```html

<#list list as list>
  <a href="${list.href!}" />${list.name}</a>
</#list>

<img src="${require(`./images/gallery.png`)}">

<div>${require('./components/gallery.html')}</div>
```

### 导出格式

有不同的导出格式可用：

+ ```module.exports``` (默认配置, cjs 格式). "Hello world" becomes ```module.exports = "Hello world";```
+ ```exports.default``` (当设置 ```exportAsDefault``` 参数时，es6to5格式). "Hello world" becomes ```exports.default = "Hello world";```
+ ```export default``` (当设置 ```exportAsEs6Default``` 参数时, es6 格式). "Hello world" becomes ```export default "Hello world";```

### 高级选项

如果你需要传递更多的[高级选项](https://github.com/webpack/html-loader/pull/46)，特别是那些不能被字符串化，你还可以在你的 `webpack.config.js` 中定义一个 `htmlLoader` 属性：

```js
var path = require('path')

module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  htmlLoader: {
    ignoreCustomFragments: [/\{\{.*?}}/],
    root: path.resolve(__dirname, 'assets'),
    attrs: ['img:src', 'link:href']
  }
};
```

如果你需要定义两个不同的加载器配置，你也可以通过 `html-loader?config=otherHtmlLoaderConfig` 改变配置的属性名：

```js
module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: "html-loader?config=otherHtmlLoaderConfig"
      }
    ]
  },
  otherHtmlLoaderConfig: {
    ...
  }
};
```

### 导出到HTML文件

一个很常见的情况是将HTML导出到自己的.html文件中，直接为它们提供服务，而不是使用javascript注入。这可以通过3个loaders的组合来实现：

- [file-loader](https://github.com/webpack/file-loader)
- [extract-loader](https://github.com/peerigon/extract-loader)
- html-loader

html-loader将解析URL，并请求图片和你所期望的一切。extract-loader会将javascript解析为合适的html文件，确保图片被required并指向正确的路径，file-loader将为您写入.html文件。例：

```js
{
  test: /\.html$/,
  loader: 'file-loader?name=[path][name].[ext]!extract-loader!html-loader'
}
```

## 维护者

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150 height="150"
        src="https://avatars.githubusercontent.com/u/18315?v=3">
        <a href="https://github.com/hemanth">Hemanth</a>
      </td>
      <td align="center">
        <img width="150 height="150"
        src="https://avatars.githubusercontent.com/u/8420490?v=3">
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150" src="https://avatars.githubusercontent.com/u/5419992?v=3">
        <a href="https://github.com/michael-ciniawsky">Michael Ciniawsky</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/6542274?v=3">
        <a href="https://github.com/imvetri">Imvetri</a>
      </td>
    <tr>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/1520965?v=3">
        <a href="https://github.com/andreicek">Andrei Crnković</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/3367801?v=3">
        <a href="https://github.com/abouthiroppy">Yuta Hiroto</a>
      </td>
      <td align="center">
        <img width="150" height="150" src="https://avatars.githubusercontent.com/u/80044?v=3">
        <a href="https://github.com/petrunov">Vesselin Petrunov</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/973543?v=3">
        <a href="https://github.com/gajus">Gajus Kuizinas</a>
      </td>
    <tr>
  <tbody>
</table>

## LICENSE

> MIT

> http://www.opensource.org/licenses/mit-license.php

> Copyright (c) 2016 Tobias Koppers @sokra

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[npm]: https://img.shields.io/npm/v/html-loader.svg
[npm-url]: https://npmjs.com/package/html-loader

[deps]: https://david-dm.org/webpack/html-loader.svg
[deps-url]: https://david-dm.org/webpack/html-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack/html-loader.svg
[test-url]: https://travis-ci.org/webpack/html-loader

[cover]: https://codecov.io/gh/webpack/html-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack/html-loader

***

> 原文：https://webpack.js.org/loaders/html-loader/
