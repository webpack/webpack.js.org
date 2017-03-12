---
title: expose-loader
source: https://raw.githubusercontent.com/webpack-contrib/expose-loader/master/README.md
edit: https://github.com/webpack-contrib/expose-loader/edit/master/README.md
---
## Install

```bash
npm i expose-loader --save
```

## Usage

**Note**: Modules must be `require()`'d within in your bundle, or they will not
be exposed.

``` javascript
require("expose-loader?libraryName!./file.js");
// Exposes the exports for file.js to the global context on property "libraryName".
// In web browsers, window.libraryName is then available.
```

This line works to expose React to the web browser to enable the Chrome React devtools:

```
require("expose-loader?React!react");
```

Thus, `window.React` is then available to the Chrome React devtools extension.

Alternately, you can set this in your config file:

webpack v1 usage
```
module: {
  loaders: [
    { test: require.resolve("react"), loader: "expose-loader?React" }
  ]
}
```
webpack v2 usage
```
module: {
  rules: [{
          test: require.resolve('react'),
          use: [{
              loader: 'expose-loader',
              options: 'React'
          }]
      }]
}
```
Also for multiple expose you can use `!` in loader string:

webpack v1 usage
```
module: {
  loaders: [
    { test: require.resolve("jquery"), loader: "expose-loader?$!expose-loader?jQuery" },
  ]
}
```
webpack v2 usage
```
module: {
  rules: [{
          test: require.resolve('jquery'),
          use: [{
              loader: 'expose-loader',
              options: 'jQuery'
          },{
              loader: 'expose-loader',
              options: '$'
          }]
      }]
}
```

The `require.resolve` is a node.js call (unrelated to `require.resolve` in webpack
processing -- check the node.js docs instead). `require.resolve` gives you the
absolute path to the module ("/.../app/node_modules/react/react.js"). So the
expose only applies to the react module. And it's only exposed when used in the
bundle.


[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

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


[npm]: https://img.shields.io/npm/v/expose-loader.svg
[npm-url]: https://npmjs.com/package/expose-loader

[deps]: https://david-dm.org/webpack-contrib/expose-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/expose-loader

[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
