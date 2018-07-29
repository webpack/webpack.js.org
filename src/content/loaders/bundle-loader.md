---
title: bundle-loader
source: https://raw.githubusercontent.com/webpack-contrib/bundle-loader/master/README.md
edit: https://github.com/webpack-contrib/bundle-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/bundle-loader
---
webpack 的 bundle loader

## 安装

```bash
npm i bundle-loader --save
```

## <a href="https://webpack.docschina.org/concepts/loaders">用法</a>

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.bundle\.js$/,
        use: 'bundle-loader'
      }
    ]
  }
}
```

当你引用 bundle-loader 时，chunk 会被浏览器请求(request)。

**file.js**
```js
import bundle from './file.bundle.js';
```

为了 chunk 在浏览器加载（以及在获取其导出）时可用时，
你需要异步等待。

```js
bundle((file) => {
  // use the file like it was required
  const file = require('./file.js')
});
```

上述代码会将 `require('file.js')` 包裹在一段 `require.ensure` 代码块中

可以添加多个回调函数。它们会按照添加的顺序依次执行。

```js
bundle(callbackTwo)
bundle(callbackThree)
```

当依赖模块都加载完毕时, 如果此时添加一个回调函数，它将会立即执行。

## 选项(options)

|名称|类型|默认值|描述|
|:--:|:--:|:-----:|:----------|
|**`lazy`**|`{Boolean}`|`false`|异步加载导入的 bundle|
|**`name`**|`{String}`|`[id].[name]`|为导入的 bundle 配置自定义文件名|

##

当你使用 bundle-loader 时，文件会被请求(request)。如果想让它按需加载(request it lazy)，请使用：

**webpack.config.js**
```js
{
  loader: 'bundle-loader',
  options: {
    lazy: true
  }
}
```

```js
import bundle from './file.bundle.js'

bundle((file) => {...})
```

> ℹ️  只有调用 load 函数时，chunk 才会被请求(request)

### `name`

可以通过配置中 `name` 选项参数，来设置 bundle 的名称。
查看 [文档](https://github.com/webpack/loader-utils#interpolatename)。

**webpack.config.js**
```js
{
  loader: 'bundle-loader',
  options: {
    name: '[name]'
  }
}
```

> :warning: 一旦 loader 创建了 chunk，它们将遵循以下命名规则
[`output.chunkFilename`](https://webpack.js.org/configuration/output/#output-chunkfilename) 规则，默认是 `[id].[name]`。这里 `[name]` 对应着配置中 `name` 选项参数设置的 chunk 名称。

## 示例

```js
import bundle from './file.bundle.js'
```

**webpack.config.js**
``` js
module.exports = {
  entry: {
   index: './App.js'
  },
  output: {
    path: path.resolve(__dirname, 'dest'),
    filename: '[name].js',
    // 此处可以自定义其他格式
    chunkFilename: '[name].[id].js',
  },
  module: {
    rules: [
      {
        test: /\.bundle\.js$/,
        use: {
          loader: 'bundle-loader',
          options: {
            name: 'my-chunk'
          }
        }
      }
    ]
  }
}
```

一般情况下，chunk 会使用上面的 `filename` 规则，并根据其对应的 `[chunkname]` 命名。

然而，来自 `bundle-loader` 中的 chunk 会使用 `chunkFilename` 规则命名。因此，打包后的示例文件最终将生成为 `my-chunk.1.js` 和 `file-2.js`。

当然，你也可以在 `chunkFilename` 添加哈希值作为文件名的一部分，这是因为在 bundle 的配置选项中放置 `[hash]` 不会生效。

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
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/bundle-loader.svg
[npm-url]: https://npmjs.com/package/bundle-loader

[node]: https://img.shields.io/node/v/bundle-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/bundle-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/bundle-loader

[tests]: http://img.shields.io/travis/webpack-contrib/bundle-loader.svg
[tests-url]: https://travis-ci.org/webpack-contrib/bundle-loader

[cover]: https://coveralls.io/repos/github/webpack-contrib/bundle-loader/badge.svg
[cover-url]: https://coveralls.io/github/webpack-contrib/bundle-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
