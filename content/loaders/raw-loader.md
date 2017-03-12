---
title: raw-loader
source: https://raw.githubusercontent.com/webpack-contrib/raw-loader/master/README.md
edit: https://github.com/webpack-contrib/raw-loader/edit/master/README.md
---
## Install

```bash
npm install --save-dev raw-loader
```

## Usage

Use the loader either via your webpack config, CLI or inline.

### Via webpack config (recommended)

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  }
}
```

**In your application**
```js
import txt from 'file.txt';
```

### CLI

```bash
webpack --module-bind 'txt=raw-loader'
```

**In your application**
```js
import txt from 'file.txt';
```

### Inline

**In your application**
```js
import txt from 'raw-loader!./file.txt';
```

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/166921?v=3&s=150">
        </br>
        <a href="https://github.com/bebraw">Juho Vepsäläinen</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/8420490?v=3&s=150">
        </br>
        <a href="https://github.com/d3viant0ne">Joshua Wiens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/533616?v=3&s=150">
        </br>
        <a href="https://github.com/SpaceK33z">Kees Kluskens</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/3408176?v=3&s=150">
        </br>
        <a href="https://github.com/TheLarkInn">Sean Larkin</a>
      </td>
    </tr>
  <tbody>
</table>

[npm]: https://img.shields.io/npm/v/raw-loader.svg
[npm-url]: https://npmjs.com/package/raw-loader

[node]: https://img.shields.io/node/v/raw-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/raw-loader.svg
[deps-url]: https://david-dm.org/webpack/raw-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
