---
title: json-loader
source: https://raw.githubusercontent.com/webpack-contrib/json-loader/master/README.md
edit: https://github.com/webpack-contrib/json-loader/edit/master/README.md
---
## Install

```bash
npm install --save-dev json-loader
```

## Usage


### Configuration (recommended)

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  }
}
```

```js
import json from 'file.json';
```

### CLI

```bash
webpack --module-bind 'json=json-loader'
```

```js
import json from 'file.json';
```

### Inline

```js
import json from 'json-loader!file.json';
```

## Maintainer

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

[npm]: https://img.shields.io/npm/v/json-loader.svg
[npm-url]: https://npmjs.com/package/json-loader

[node]: https://img.shields.io/node/v/json-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/json-loader.svg
[deps-url]: https://david-dm.org/webpack/json-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
