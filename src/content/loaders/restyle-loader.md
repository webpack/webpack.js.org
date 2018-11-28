---
title: restyle-loader
source: https://raw.githubusercontent.com/webpack-contrib/restyle-loader/master/README.md
edit: https://github.com/webpack-contrib/restyle-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/restyle-loader
---


<div align="center">

Updates style `<link>` href value with a hash to trigger a style reload

Loader new home: [restyle-loader](https://github.com/danielverejan/restyle-loader)

</div>

## Install

```bash
npm install --save-dev restyle-loader
```

## Usage

[Documentation: Using loaders](https://webpack.js.org/loaders/)

## Examples

**webpack.config.js**

```js
{
  test: /\.css?$/,
  use: [
    {
      loader: "restyle-loader"
    },
    {
      loader: "file-loader",
      options: {
        name: "[name].css?[hash:8]"
      }
    }
  ]
}
```
Hash is required to enable HMR

**bundle.js**

```js
require("./index.css");

// Bundle code here...
```


**index.html**

```html

<head>
  <link rel="stylesheet" type="text/css" href="css/index.css">
</head>

```
after the loader runs it becomes
```html

<head>
  <link rel="stylesheet" type="text/css" href="css/index.css?531fdfd0">
</head>

```


## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/">
          <img width="150" height="150" src="https://avatars2.githubusercontent.com/u/7072732?v=3&s=150">
          <br />
          <a href="https://github.com/">Daniel Verejan</a>
        </a>
      </td>
      
    </tr>
  <tbody>
</table>

[npm]: https://img.shields.io/npm/v/restyle-loader.svg
[npm-url]: https://npmjs.com/package/restyle-loader

[deps]: https://david-dm.org/webpack-contrib/restyle-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/restyle-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack-contrib/restyle-loader.svg
[test-url]: https://travis-ci.org/webpack-contrib/restyle-loader

[cover]: https://codecov.io/gh/webpack-contrib/restyle-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/restyle-loader
