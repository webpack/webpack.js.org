---
title: file-loader
source: https://raw.githubusercontent.com/webpack-contrib/file-loader/master/README.md
edit: https://github.com/webpack-contrib/file-loader/edit/master/README.md
---
## 安装

```bash
npm install --save-dev file-loader
```

## 用法

默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名。

``` javascript
var url = require("file-loader!./file.png");
// => 输出 file.png 文件到输出目录并返回public url
// => 即返回 "/public-path/0dcbbaa701328a3c262cfd45869e351f.png"
```

默认情况下，文件会被输出，不过如果需要的话，也可以不输出（比如使用了服务端的 packages）。

``` javascript
var url = require("file-loader?emitFile=false!./file.png");
// => 返回public url 但是不输出文件
// => 即返回 "/public-path/0dcbbaa701328a3c262cfd45869e351f.png"
```

#### 文件名模板

你可以使用查询参数 `name` 为你的文件配置自定义的文件名模板。例如，从你的 `context` 目录复制文件到输出目录，并且保留完整的目录结构，你可以使用 `?name=[path][name].[ext]` 。

默认情况下，会按照你指定的路径和文件名输出文件，且使用相同的 URL 路径来访问文件。

你可以使用 `outputPath`, `publicPath` 和 `publicPath` 查询名称参数，来指定自定义的输出路径和发布目录。

```
use: "file-loader?name=[name].[ext]&publicPath=assets/foo/&outputPath=app/images/"
```

`useRelativePath` should be `true` if you wish to generate relative URL to the each file context
```javascript
{
 loader: 'file-loader',
 query: {
  useRelativePath: process.env.NODE_ENV === "production"
 }
}
```

#### 文件名模板占位符

* `[ext]` 资源扩展名
* `[name]` 资源的基本名称
* `[path]` 资源相对于 `context` 查询参数或者配置的路径
* `[hash]` 内容的哈希值，默认为十六进制编码的 `md5`
* `[<hashType>:hash:<digestType>:<length>]` 可选配置
  * 其他的 `hashType`, 即 `sha1`, `md5`, `sha256`, `sha512`
  * 其他的 `digestType`, 即 `hex`, `base26`, `base32`, `base36`, `base49`, `base52`, `base58`, `base62`, `base64`
  * `length` 字符的长度
* `[N]` 当前文件名按照查询参数 `regExp` 匹配后获得到第 N 个匹配结果
#### 示例

``` javascript
require("file-loader?name=js/[hash].script.[ext]!./javascript.js");
// => js/0dcbbaa701328a3c262cfd45869e351f.script.js

require("file-loader?name=html-[hash:6].html!./page.html");
// => html-109fa8.html

require("file-loader?name=[hash]!./flash.txt");
// => c31e9820c001c9c4a86bce33ce43b679

require("file-loader?name=[sha512:hash:base64:7].[ext]!./image.png");
// => gdyb21L.png
// 使用 sha512 哈希值替代 md5 并且使用 7 个字符 的 base64

require("file-loader?name=img-[sha512:hash:base64:7].[ext]!./image.jpg");
// => img-VqzT5ZC.jpg
// 使用自定义名称，sha512 哈希值替代 md5 并且使用 base64 的 7 个字符

require("file-loader?name=picture.png!./myself.png");
// => picture.png

require("file-loader?name=[path][name].[ext]?[hash]!./dir/file.png")
// => dir/file.png?e43b20c069c4a01867c31e98cbce33c9
```

## 贡献

不要犹豫去创建一个pull request。所有的贡献行为都会被感谢。开发时，可以使用 `npm test` 来进行测试。

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
  <tbody>
</table>


## LICENSE

MIT

[npm]: https://img.shields.io/npm/v/file-loader.svg
[npm-url]: https://npmjs.com/package/file-loader

[deps]: https://david-dm.org/webpack-contrib/file-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/file-loader

[tests]: http://img.shields.io/travis/webpack-contrib/file-loader.svg
[tests-url]: https://travis-ci.org/webpack-contrib/file-loader

[cover]: https://codecov.io/gh/webpack-contrib/file-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/file-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack

***

> 原文：https://webpack.js.org/loaders/file-loader/
