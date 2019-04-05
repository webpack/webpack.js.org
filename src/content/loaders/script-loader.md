---
title: script-loader
source: https://raw.githubusercontent.com/webpack-contrib/script-loader/master/README.md
edit: https://github.com/webpack-contrib/script-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/script-loader
---


## Install

```bash
npm install --save-dev script-loader
```

## Usage

Executes JS script once in global context.

> :warning: Doesn't work in NodeJS

##

```js
import exec from 'script.exec.js';
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.exec\.js$/,
        use: [ 'script-loader' ]
      }
    ]
  }
}
```

### Inline

```js
import exec from 'script-loader!./script.js';
```

## Options

|                    Name                     |         Type          |     Default     | Description                                 |
| :-----------------------------------------: | :-------------------: | :-------------: | :------------------------------------------ |
|        **[`sourceMap`](#sourcemap)**        |      `{Boolean}`      |     `false`     | Enable/Disable Sourcemaps

### `sourceMap`

Type: `Boolean`
Default: `false`

To include source maps set the `sourceMap` option.

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.script\.js$/,
        use: [
          {
            loader: 'script-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      }
    ]
  }
}
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


[npm]: https://img.shields.io/npm/v/script-loader.svg
[npm-url]: https://npmjs.com/package/script-loader

[node]: https://img.shields.io/node/v/script-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack/script-loader.svg
[deps-url]: https://david-dm.org/webpack/script-loader

[chat]: https://badges.gitter.im/webpack/webpack.svg
[chat-url]: https://gitter.im/webpack/webpack
