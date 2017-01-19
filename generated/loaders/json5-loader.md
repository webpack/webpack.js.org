---
title: json5-loader
source: https://raw.githubusercontent.com/webpack/json5-loader/master/README.md
edit: https://github.com/webpack/json5-loader/edit/master/README.md
---
## Install

```sh
$ npm install --save-dev json5-loader
```

## Usage

You can use the loader either
 * by configuring the `json5-loader` in the `module.loaders` object of the webpack configuration, or
 * by directly using the `json5!` prefix to the require statement.

Suppose we have the following `json5` file
```js
// appData.json5
{
  env: 'production',
  passwordStregth: 'strong'
}
```

#### Usage with preconfigured loader

```js
// webpack.config.js
module.exports = {
  entry: './index.js',
  output: { /* ... */ },
  module: {
    loaders: [
      {
        // make all files ending in .json5 use the `json5-loader`
        test: /\.json5$/,
        loader: 'json5-loader'
      }
    ]
  }
}
```

```js
// index.js
var appConfig = require('./appData.json5')
// or, in ES6
// import appConfig from './appData.json5'

console.log(appConfig.env) // 'production'
```
#### Usage with require statement loader prefix
```js
var appConfig = require("json5-loader!./appData.json5")
// returns the content as json parsed object

console.log(appConfig.env) // 'production'
```

Don't forget to polyfill require if you want to use it in Node.js. See the webpack documentation.

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
        src="https://avatars.githubusercontent.com/gdi2290?v=3">
        <br />
        <a href="https://github.com/">PatrickJS</a>
      </td>
      <td align="center">
        <img width="150" height="150" src="https://avatars.githubusercontent.com/Cellule?v=3">
        <br />
        <a href="https://github.com/">Michael Ferris</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/kmck?v=3">
        <br />
        <a href="https://github.com/">Keith McKnight</a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/radubrehar?v=3">
        <br />
        <a href="https://github.com/">Radu Brehar</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/kentcdodds?v=3">
        <br />
        <a href="https://github.com/">Kent C. Dodds</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/stevelacy?v=3">
        <br />
        <a href="https://github.com/stevelacy">Steve Lacy</a>
      </td>
    <tr>
  <tbody>
</table>

## LICENSE

#### [MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/json-loader.svg
[npm-url]: https://npmjs.com/package/json-loader

[deps]: https://david-dm.org/webpack/json-loader.svg
[deps-url]: https://david-dm.org/webpack/json-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack

[test]: http://img.shields.io/travis/webpack/json-loader.svg
[test-url]: https://travis-ci.org/webpack/json-loader

[cover]: https://coveralls.io/repos/github/webpack/json-loader/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/webpack/json-loader?branch=master
