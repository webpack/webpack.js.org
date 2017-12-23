---
title: file-loader
source: https://raw.githubusercontent.com/webpack-contrib/file-loader/master/README.md
edit: https://github.com/webpack-contrib/file-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/file-loader
---
Instructs webpack to emit the required object as file and to return its public URL

## 安装

```bash
npm install --save-dev file-loader
```

## <a href="https://doc.webpack-china.org/concepts/loaders">用法</a>

默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名。

```js
import img from './file.png'
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  }
}
```

生成文件 file.png，输出到输出目录并返回 public URL。

```
"/public/path/0dcbbaa7013869e351f.png"
```

## 选项

|名称|类型|默认值|描述|
|:--:|:--:|:-----:|:----------|
|**`name`**|`{String\|Function}`|`[hash].[ext]`|为你的文件配置自定义文件名模板|
|**`context`**|`{String}`|`this.options.context`|配置自定义文件 context，默认为 `webpack.config.js` [context](https://webpack.js.org/configuration/entry-context/#context)|
|**`publicPath`**|`{String\|Function}`|[`__webpack_public_path__ `](https://webpack.js.org/api/module-variables/#__webpack_public_path__-webpack-specific-)|为你的文件配置自定义 `public` 发布目录|
|**`outputPath`**|`{String\|Function}`|`'undefined'`|为你的文件配置自定义 `output` 输出目录|
|**`useRelativePath`**|`{Boolean}`|`false`|如果你希望为每个文件生成一个相对 url 的 `context` 时，应该将其设置为 `true`|
|**`emitFile`**|`{Boolean}`|`true`|默认情况下会生成文件，可以通过将此项设置为 false 来禁止（例如，使用了服务端的 packages）|

##

You can configure a custom filename template for your file using the query parameter `name`. For instance, to copy a file from your `context` directory into the output directory retaining the full directory structure, you might use

#### `{String}`

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]'
  }
}
```

#### `{Function}`

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name (file) {
      if (env === 'development') {
        return '[path][name].[ext]'
      }

      return '[hash].[ext]'
    }
  }
}
```

#### `placeholders`

|名称|类型|默认值|描述|
|:--:|:--:|:-----:|:----------|
|**`[ext]`**|`{String}`|`file.extname`|资源扩展名|
|**`[name]`**|`{String}`|`file.basename`|资源的基本名称|
|**`[path]`**|`{String}`|`file.dirname`|资源相对于 `context`的路径|
|**`[hash]`**|`{String}`|`md5`|内容的哈希值，下面的 hashes 配置中有更多信息|
|**`[N]`**|`{Number}`|``|当前文件名按照查询参数 `regExp` 匹配后获得到第 N 个匹配结果|

#### `hashes`

`[<hashType>:hash:<digestType>:<length>]` optionally you can configure

|名称|类型|默认值|描述|
|:--:|:--:|:-----:|:----------|
|**`hashType`**|`{String}`|`md5`|`sha1`, `md5`, `sha256`, `sha512`|
|**`digestType`**|`{String}`|`base64`|`hex`, `base26`, `base32`, `base36`, `base49`, `base52`, `base58`, `base62`, `base64`|
|**`length`**|`{Number}`|`9999`|字符的长度|

默认情况下，文件会按照你指定的路径和名称输出同一目录中，且会使用相同的 URL 路径来访问文件。

### `context`

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]',
    context: ''
  }
}
```

你可以使用 `outputPath`，`useRelativePath`和 `publicPath`来指定自定义 `output` 输出路径和 `public` 发布目录。

### `publicPath`

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]',
    publicPath: 'assets/'
  }
}
```

### `outputPath`

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]',
    outputPath: 'images/'
  }
}
```

### `useRelativePath`

如果你希望为每个文件生成一个相对 URL 的 `context` 时，应该将 `useRelativePath` 设置为 `true`。

```js
{
  loader: 'file-loader',
  options: {
    useRelativePath: process.env.NODE_ENV === "production"
  }
}
```

### `emitFile`

默认情况下会生成文件，可以通过将此项设置为 false 来禁用（例如使用了服务端的 packages）。

```js
import img from './file.png'
```

```js
{
  loader: 'file-loader',
  options: {
    emitFile: false
  }
}
```

> ⚠️  返回 public URL 但**不会**生成文件

```
`${publicPath}/0dcbbaa701328e351f.png`
```

## 示例


```js
import png from 'image.png'
```

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name: 'dirname/[hash].[ext]'
  }
}
```

```
dirname/0dcbbaa701328ae351f.png
```

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name: '[sha512:hash:base64:7].[ext]'
  }
}
```

```
gdyb21L.png
```

```js
import png from 'path/to/file.png'
```

**webpack.config.js**
```js
{
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]?[hash]'
  }
}
```

```
path/to/file.png?e43b20c069c4a01867c31e98cbce33c9
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


[npm]: https://img.shields.io/npm/v/file-loader.svg
[npm-url]: https://npmjs.com/package/file-loader

[node]: https://img.shields.io/node/v/file-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/file-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/file-loader

[tests]: http://img.shields.io/travis/webpack-contrib/file-loader.svg
[tests-url]: https://travis-ci.org/webpack-contrib/file-loader

[cover]: https://img.shields.io/codecov/c/github/webpack-contrib/file-loader.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/file-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/file-loader/
