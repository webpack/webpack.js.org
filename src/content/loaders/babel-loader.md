---
title: babel-loader
source: https://raw.githubusercontent.com/babel/babel-loader/master/README.md
edit: https://github.com/babel/babel-loader/edit/master/README.md
repo: https://github.com/babel/babel-loader
---


This package allows transpiling JavaScript files using [Babel](https://github.com/babel/babel) and [webpack](https://github.com/webpack/webpack).

__Notes:__ Issues with the output should be reported on the babel [issue tracker](https://github.com/babel/babel/issues).

## 安装

> webpack 3.x | babel-loader 8.x | babel 7.x

```bash
npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env webpack
```

> webpack 3.x babel-loader 7.x | babel 6.x

```bash
npm install babel-loader babel-core babel-preset-env webpack
```

## 用法

[文档：使用 loader](https://webpack.js.org/loaders/)

在 webpack 配置对象中，需要添加 babel-loader 到 module 的 loaders 列表中，像下面这样：

```javascript
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

##

参考 `babel` [选项](https://babeljs.io/docs/usage/api/#options)。


你可以使用 [options 属性](https://webpack.js.org/configuration/module/#rule-options-rule-query) 来给 loader 传递选项：

```javascript
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [require('@babel/plugin-transform-object-rest-spread')]
        }
      }
    }
  ]
}
```

此 loader 也支持下面这些 loader 特定(loader-specific)的选项：

* `cacheDirectory`：默认值为 `false`。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)。如果设置了一个空值 (`loader: 'babel-loader?cacheDirectory'`) 或者 `true` (`loader: babel-loader?cacheDirectory=true`)，loader 将使用默认的缓存目录 `node_modules/.cache/babel-loader`，如果在任何根目录下都没有找到 `node_modules` 目录，将会降级回退到操作系统默认的临时文件目录。

* `cacheIdentifier`：默认是一个由 babel-core 版本号，babel-loader 版本号，.babelrc 文件内容（存在的情况下），环境变量 `BABEL_ENV` 的值（没有时降级到 `NODE_ENV`）组成的字符串。可以设置为一个自定义的值，在 identifier 改变后，强制缓存失效。

* `forceEnv`：默认将解析 BABEL_ENV 然后是 NODE_ENV。允许你在 loader 级别上覆盖 BABEL_ENV/NODE_ENV。对有不同 babel 配置的，客户端和服务端同构应用非常有用。

__注意：__`sourceMap` 选项是被忽略的。当 webpack 配置了 sourceMap 时（通过 `devtool` 配置选项），将会自动生成 sourceMap。

## 疑难解答

### babel-loader 很慢！

确保转译尽可能少的文件。你可能使用 `/\.js$/` 来匹配，这样也许会去转译 `node_modules` 目录或者其他不需要的源代码。

要排除 `node_modules`，参考文档中的 `loaders` 配置的 `exclude` 选项。

你也可以通过使用 `cacheDirectory` 选项，将 babel-loader 提速至少两倍。
这会将转译的结果缓存到文件系统中。

### babel 在每个文件都插入了辅助代码，使代码体积过大！

babel 对一些公共方法使用了非常小的辅助代码，比如 `_extend`。
默认情况下会被添加到每一个需要它的文件中

你可以引入 babel runtime 作为一个独立模块，来避免重复引入。

下面的配置禁用了 babel 自动对每个文件的 runtime 注入，而是引入 `babel-plugin-transform-runtime` 并且使所有辅助代码从这里引用。

更多信息请参考[文档](http://babeljs.io/docs/plugins/transform-runtime/)。

**注意：** 你必须执行 `npm install babel-plugin-transform-runtime --save-dev` 来把它包含到你的项目中，也要使用 `npm install babel-runtime --save` 把 `babel-runtime` 安装为一个依赖。

```javascript
rules: [
  // 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/transform-runtime']
      }
    }
  }
]
```

#### **注意：** transform-runtime 和自定义 polyfills (比如 Promise library)

由于 [babel-plugin-transform-runtime](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-runtime) 包含了一个 polyfill，含有自定义的 [regenerator runtime](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js) 和 [core.js](https://github.com/zloirock/core-js), 下面使用 `webpack.ProvidePlugin` 来配置 shimming 的常用方法将没有作用：

```javascript
// ...
        new webpack.ProvidePlugin({
            'Promise': 'bluebird'
        }),
// ...
```

下面这样的写法也没有作用：

```javascript
require('@babel/runtime/core-js/promise').default = require('bluebird');

var promise = new Promise;
```

它其实会生成下面这样 (使用了 `runtime` 后)：

```javascript
'use strict';

var _Promise = require('@babel/runtime/core-js/promise')['default'];

require('@babel/runtime/core-js/promise')['default'] = require('bluebird');

var promise = new _Promise();
```

前面的 `Promise` 库在被覆盖前已经被引用和使用了。

一种可行的办法是，在你的应用中加入一个“启动器(bootstrap)”步骤，在应用开始前先覆盖默认的全局变量。

```javascript
// bootstrap.js

require('@babel/runtime/core-js/promise').default = require('bluebird');

// ...

require('./app');
```

### `babel` 的 node API 已经被移到 `babel-core` 中。

(原文：The node API for `babel` has been moved to `babel-core`.)

如果你收到这个信息，这说明你有一个已经安装的 `babel` 包，并且在 webpack 配置中使用它来作为 loader 的简写 (这样的方式在 webpack 2.x 版本中将不再被支持)。

```js
  {
    test: /\.js$/,
    loader: 'babel',
  }
```

webpack 将尝试读取 `babel` 包而不是 `babel-loader`。

要修复这个问题，你需要删除 `babel` npm 包，因为它在 babel v6 中已经被废除。(安装 `babel-cli` 或者 `babel-core` 来替代它)。

如果你的依赖中有对 `babel` 包的依赖使你无法删除它，可以在 webpack 配置中使用完整的 loader 名称来解决：
```js
  {
    test: /\.js$/,
    loader: 'babel-loader',
  }
```

## [License](http://couto.mit-license.org/)

***

> 原文：https://webpack.js.org/loaders/babel-loader/
