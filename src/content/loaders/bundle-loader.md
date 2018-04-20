---
title: bundle-loader
source: https://raw.githubusercontent.com/webpack-contrib/bundle-loader/master/README.md
edit: https://github.com/webpack-contrib/bundle-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/bundle-loader
---
Bundle loader for webpack

## 安装

```bash
npm i bundle-loader --save
```

## <a href="https://webpack.js.org/concepts/loaders">用法</a>

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

当你引用bundle-loader时，chunk 会被浏览器加载。

**file.js**
```js
import bundle from './file.bundle.js';
```

等到chunk被浏览器加载及被导出时，你需要异步请求等待。

```js
bundle((file) => {
  // use the file like it was required
  const file = require('./file.js')
});
```
上述代码将require 包裹在 require.ensure 的代码块中

可以添加多个回调函数，并且它们会按照添加的顺序依次执行。
```js
bundle(callbackTwo)
bundle(callbackThree)
```
当依赖模块都加载完毕时, 如果此时添加一个回调函数，它将会立即执行。
## 配置选项

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`lazy`**|`{Boolean}`|`false`|异步加载导入的bundle文件|
|**`name`**|`{String}`|`[id].[name]`|为你导入的bundle文件按某种格式设置名字|

##
当你使用bundle-loader时，文件会被加载。如果你想它按需加载（懒加载），请用：

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

> ℹ️  只有调用load函数时，chunk才会被加载。

### `name属性`
你可以通过配置选项中的name属性来设置bundle的名字。  
详情参参阅 [文档](https://github.com/webpack/loader-utils#interpolatename).

**webpack.config.js**
```js
{
  loader: 'bundle-loader',
  options: {
    name: '[name]'
  }
}
```

> :注意: 一旦loader创建了chunks，它们将根据以下
[`output.chunkFilename`](https://webpack.js.org/configuration/output/#output-chunkfilename) 规则命名, 即默认为 `[id].[name]`格式。这里的 `[name]` 对应着配置选项中的name属性中设置的chunk名字。

## 实例演示

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
    // 此处可以自定义格式
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
``
一般情况下，chunk文件名会按照上述代码中`filename`属性对应的命名规则命名。

然而，`bundle-loader`中的chunk文件也可以用`chunkFilename`规则命名。那么上述实例中导出的文件名将分别为`my-chunk.1.js` 和 `file-2.js`。

当然，你也可以在`chunkFilename` 添加哈希值作为文件名的一部分，因为在配置选项参数中直接放`[hash]` 不会起到作用。

## 代码维护人员

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

***

原文地址：https://webpack.js.org/loaders/bundle-loader/
