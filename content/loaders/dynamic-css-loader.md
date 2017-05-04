---
title: dynamic-css-loader
source: https://raw.githubusercontent.com/webpack-contrib/dynamic-css-loader/master/README.md
edit: https://github.com/webpack-contrib/dynamic-css-loader/edit/master/README.md
---
## Install

```bash
npm install --save-dev dynamic-css-loader
```

## Usage

**TODO**

## Examples

**webpack.config.js**

```js
{
  test: /.../,
  use: ExtractTextPlugin.extract({
    use: [ ... ],
    fallback: [
      'dynamic-css-loader',
      'file-loader',
      'extract-loader',
    ],
  }),
},
```

**file.ext**

```js
// Source code here...
```

**bundle.js**

```js
require("dynamic-css-loader!file-loader!./file.ext");

// Bundle code here...
```

## Maintainers

```bash
https://api.github.com/users/MAINTAINER
```

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/">
          <img width="150" height="150" src="https://avatars.githubusercontent.com/u/5419992?v=3&s=150">
          </br>
          Name
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/">
          <img width="150" height="150" src="https://avatars.githubusercontent.com/u/5419992?v=3&s=150">
          </br>
          Name
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/">
          <img width="150" height="150" src="https://avatars.githubusercontent.com/u/5419992?v=3&s=150">
          </br>
          Name
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/">
          <img width="150" height="150" src="https://avatars.githubusercontent.com/u/5419992?v=3&s=150">
          </br>
          Name
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/">
          <img width="150" height="150" src="https://avatars.githubusercontent.com/u/5419992?v=3&s=150">
          </br>
          Name
        </a>
      </td>
    </tr>
  <tbody>
</table>

[npm]: https://img.shields.io/npm/v/dynamic-css-loader.svg
[npm-url]: https://npmjs.com/package/dynamic-css-loader

[deps]: https://david-dm.org/webpack-contrib/dynamic-css-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/dynamic-css-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/dynamic-css-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/dynamic-css-loader

[cover]: https://codecov.io/gh/webpack-contrib/dynamic-css-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/dynamic-css-loader
