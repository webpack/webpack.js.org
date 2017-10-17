---
title: html-loader
source: https://raw.githubusercontent.com/webpack-contrib/html-loader/master/README.md
edit: https://github.com/webpack-contrib/html-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/html-loader
---
Exports HTML as string. HTML is minimized when the compiler demands.

## 安装

```bash
npm i -D html-loader
```

## 用法

默认情况下，每个本地的 `<img src="image.png">` 都需要通过 require （`require('./image.png')`）来进行加载。您可能需要在配置中为图片指定 loader（推荐 `file-loader` 或 `url-loader` ）

您可以通过查询参数 `attrs`，来指定哪个标签属性组合(tag-attribute combination)应该被此 loader 处理。传递数组或以空格分隔的 `<tag>:<attribute>` 组合的列表。（默认值：`attrs=img:src`）

If you use `<custom-elements>`, and lots of them make use of a `custom-src` attribute, you don't have to specify each combination `<tag>:<attribute>`: just specify an empty tag like `attrs=:custom-src` and it will match every element.

```js
{
  test: /\.(html)$/,
  use: {
    loader: 'html-loader',
    options: {
      attrs: [':data-src']
    }
  }
}
```

要完全禁用对标签属性的处理（例如，如果你在客户端处理图片加载），你可以传入 `attrs=false`。

## 示例

使用此配置：

```js
{
  module: {
    rules: [
      { test: /\.jpg$/, use: [ "file-loader" ] },
      { test: /\.png$/, use: [ "url-loader?mimetype=image/png" ] }
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

通过运行 `webpack --optimize-minimize` 来最小化

```html
'<img src=http://cdn.example.com/49eba9f/a9f92ca.jpg
      data-src=data:image/png;base64,...>'
```

或者在 `webpack.conf.js` 的 rule 选项中指定 `minimize` 属性

```js
module: {
  rules: [{
    test: /\.html$/,
    use: [ {
      loader: 'html-loader',
      options: {
        minimize: true
      }
    }],
  }]
}
```

The enabled rules for minimizing by default are the following ones:
 - removeComments
 - removeCommentsFromCDATA
 - removeCDATASectionsFromCDATA
 - collapseWhitespace
 - conservativeCollapse
 - removeAttributeQuotes
 - useShortDoctype
 - keepClosingSlash
 - minifyJS
 - minifyCSS
 - removeScriptTypeAttributes
 - removeStyleTypeAttributes

 The rules can be disabled using the following options in your `webpack.conf.js`

```js
module: {
  rules: [{
    test: /\.html$/,
    use: [ {
      loader: 'html-loader',
      options: {
        minimize: true,
        removeComments: false,
        collapseWhitespace: false
      }
    }],
  }]
}
```

##

对于以 `/` 开头的 url，默认行为是不转换它们。
如果设置了 `root` 查询参数，它将被添加到 URL 之前，然后进行转换。

和上面配置相同：

``` html

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

您可以使用 `interpolate` 标记，为 ES6 模板字符串启用插值语法，就像这样：

```js
require("html-loader?interpolate!./file.html");
```

```html
<img src="${require(`./images/gallery.png`)}">

<div>${require('./components/gallery.html')}</div>
```
如果你只想在模板中使用 `require`，任何其它的 `${}` 不被转换，你可以设置 `interpolate` 标记为 `require`，就像这样：

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

这里有几种不同的可用导出格式：

+ ```module.exports```（默认配置，cjs 格式）。"Hello world" 转为 ```module.exports = "Hello world";```
+ ```exports.default``` (当设置了 ```exportAsDefault``` 参数，es6to5 格式）。"Hello world" 转为 ```exports.default = "Hello world";```
+ ```export default``` (当设置了 ```exportAsEs6Default``` 参数，es6 格式)。"Hello world" 转为 ```export default "Hello world";```

### 高级选项

如果你需要传递[更多高级选项](https://github.com/webpack/html-loader/pull/46)，特别是那些不能被字符串化，你还可以在 `webpack.config.js` 中定义一个 `htmlLoader` 属性：

```js
var path = require('path')

module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [ "html-loader" ]
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

如果你需要定义两个不同的 loader 配置，你也可以通过 `html-loader?config=otherHtmlLoaderConfig` 改变配置的属性名：

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [ "html-loader?config=otherHtmlLoaderConfig" ]
      }
    ]
  },
  otherHtmlLoaderConfig: {
    ...
  }
};
```

### 导出到 HTML 文件

一个很常见的场景，将 HTML 导出到 _.html_ 文件中，直接访问它们，而不是使用 javascript 注入。这可以通过3个 loader 的组合来实现：

- [file-loader](https://github.com/webpack/file-loader)
- [extract-loader](https://github.com/peerigon/extract-loader)
- html-loader

html-loader 将解析 URL，并请求图片和你所期望的一切资源。extract-loader 会将 javascript 解析为合适的 html 文件，确保引用的图片指向正确的路径，file-loader 将结果写入 .html 文件。示例：

```js
{
  test: /\.html$/,
  use: [ 'file-loader?name=[path][name].[ext]!extract-loader!html-loader' ]
}
```

## 维护人员

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/18315?v=3">
        </br>
        <a href="https://github.com/hemanth">Hemanth</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/8420490?v=3">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150" src="https://avatars.githubusercontent.com/u/5419992?v=3">
        </br>
        <a href="https://github.com/michael-ciniawsky">Michael Ciniawsky</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/6542274?v=3">
        </br>
        <a href="https://github.com/imvetri">Imvetri</a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/1520965?v=3">
        </br>
        <a href="https://github.com/andreicek">Andrei Crnković</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/3367801?v=3">
        </br>
        <a href="https://github.com/abouthiroppy">Yuta Hiroto</a>
      </td>
      <td align="center">
        <img width="150" height="150" src="https://avatars.githubusercontent.com/u/80044?v=3">
        </br>
        <a href="https://github.com/petrunov">Vesselin Petrunov</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/973543?v=3">
        </br>
        <a href="https://github.com/gajus">Gajus Kuizinas</a>
      </td>
    </tr>
  </tbody>
</table>


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
