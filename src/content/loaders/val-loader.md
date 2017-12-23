---
title: val-loader
source: https://raw.githubusercontent.com/webpack-contrib/val-loader/master/README.md
edit: https://github.com/webpack-contrib/val-loader/edit/master/README.md
repo: https://github.com/webpack-contrib/val-loader
---
Executes the given module to generate source code on build time

## 安装

```bash
npm i -D val-loader
```

## 用法

此 loader 所加载的模块必须符合以下接口

##

加载的模块必须使用以下*函数接口*，将  `default` export 导出为一个函数。

```js
module.exports = function () {...};
```

Modules transpiled by [Babel](https://babeljs.io/) are also supported

```js
export default function () {...};
```

### `Function Interface`

The function will be called with the loader [`options`](https://webpack.js.org/configuration/module/#useentry) and must either return

#### `{Object}`

Following the **Object Interface**

#### `{Promise}`

Resolving to an `{Object}` following the **Object Interface**

### `Object Interface`

|Name|Type|Default|Description|
|:---|:--:|:-----:|:----------|
|**`code`**|`{String\|Buffer}`|`undefined`|(**Required**) The code that is passed to the next loader or to webpack|
|**`sourceMap`**| [`{Object}`](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit)|`undefined`|(**Optional**) Will be passed to the next loader or to webpack|
|**`ast`**|`{Array<{Object}>}`|`undefined`|(**Optional**) An [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) that will be passed to the next loader. Useful to speed up the build time if the next loader uses the same AST|
|**`dependencies`**|`{Array<{String}>}`|`[]`|An array of absolute, native paths to file dependencies that need to be watched for changes|
|**`contextDependencies`**| `{Array<{String}>}` |`[]`| An array of absolute, native paths to directory dependencies that need to be watched for changes|
|**`cacheable`**|`{Boolean}`|`false`|Flag whether the code can be re-used in watch mode if none of the `dependencies` have changed|

## Options

**`val-loader`** itself has no options. The options are passed as they are (without cloning them) to the exported function

## Examples

If you have a module like this

**answer.js**
```js
function answer () {
  return {
    code: 'module.exports = 42;'
  }
};

module.exports = answer;
```

you can use the **val-loader** to generate source code on build time

**webpack.config.js**
```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: require.resolve('path/to/answer.js'),
        use: [
          {
            loader: 'val-loader'
          }
        ]
      }
    ]
  }
};
```

### `Complete`

A complete example of all available features looks like this

**answer.js**
```js
const ask = require('./ask.js');
const generate = require('./generate.js');

function answer(options) {
  return ask(options.question)
    .then(generate)
    .then(result => ({
      ast: result.abstractSyntaxTree,
      code: result.code,
      // Mark dependencies of answer().
      // The function will be re-executed if one of these
      // dependencies has changed in watch mode.
      dependencies: [
        // Array of absolute native paths!
        require.resolve('./ask.js'),
        require.resolve('./generate.js')
      ],
      // Flag the generated code as cacheable.
      // If none of the dependencies have changed,
      // the function won't be executed again.
      cacheable: true
      sourceMap: result.sourceMap,
    })
  );
}

module.exports = answer;
```

**webpack.config.js**
```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: require.resolve('path/to/answer.js'),
        use: [
          {
            loader: 'val-loader',
            options: {
              question: 'What is the meaning of life?'
            }
          }
        ]
      }
    ]
  }
};
```

## 维护人员

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
        src="https://avatars3.githubusercontent.com/u/781746?v=3&s=150">
        </br>
        <a href="https://github.com/jhnns">Johannes Ewald</a>
      </td>
    </tr>
  <tbody>
</table>


[npm]: https://img.shields.io/npm/v/val-loader.svg
[npm-url]: https://npmjs.com/package/val-loader

[node]: https://img.shields.io/node/v/val-loader.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/webpack-contrib/val-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/val-loader

[travis]: http://img.shields.io/travis/webpack-contrib/val-loader.svg
[travis-url]: https://travis-ci.org/webpack-contrib/val-loader

[appveyor]: https://ci.appveyor.com/api/projects/status/github/webpack-contrib/val-loader?svg=true
[appveyor-url]: https://ci.appveyor.com/project/jhnns/val-loader/branch/master

[cover]: https://codecov.io/gh/webpack-contrib/val-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/val-loader

[chat]: https://badges.gitter.im/webpack-contrib/webpack.svg
[chat-url]: https://gitter.im/webpack-contrib/webpack

***

> 原文：https://webpack.js.org/loaders/val-loader/
