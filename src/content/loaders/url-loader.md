---
title: url-loader
source: https://raw.githubusercontent.com/webpack-contrib/url-loader/master/README.md
edit: https://github.com/webpack-contrib/url-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/url-loader
---
Loads files as `base64` encoded URL

## Install

```bash
npm install --save-dev url-loader
```

## <a href="https://webpack.js.org/concepts/loaders">Usage</a>

The `url-loader` works like the [`file-loader`](/loaders/file-loader/), but can return a DataURL if the file is smaller than a byte limit.


```js
import img from './image.png'
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
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}
```

## Options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`limit`](#limit)**|`{Number}`|`undefined`|Byte limit to inline files as Data URL|
|**[`mimetype`](#mimetype)**|`{String}`|`extname`|Specify MIME type for the file (Otherwise it's inferred from the file extension)|
|**[`fallback`](#fallback)**|`{String}`|`file-loader`|Specify `loader` for the file when file is greater than the limit (in bytes)|

##

If the file is greater than the limit (in bytes) the [`file-loader`](/loaders/file-loader/) is used by default and all query parameters are passed to it.
You can use other loader using `fallback` option.

The limit can be specified via loader options and defaults to no limit.

**webpack.config.js**
```js
{
  loader: 'url-loader',
  options: {
    limit: 8192
  }
}
```

### `mimetype`

Set the MIME type for the file. If unspecified the file extensions will be used to lookup the MIME type.

**webpack.config.js**
```js
{
  loader: 'url-loader',
  options: {
    mimetype: 'image/png'
  }
}
```

### `fallback`

**webpack.config.js**
```js
{
  loader: 'url-loader',
  options: {
    fallback: 'responsive-loader'
  }
}
```

## Maintainers

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


[npm]: https://img.shields.io/npm/v/url-loader.svg
[npm-url]: https://npmjs.com/package/url-loader

[tests]: https://circleci.com/gh/webpack-contrib/url-loader/tree/master.svg?style=svg
[tests-url]: https://circleci.com/gh/webpack-contrib/url-loader/tree/master

[cover]: https://codecov.io/gh/webpack-contrib/url-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/url-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
