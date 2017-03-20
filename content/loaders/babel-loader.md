---
title: babel-loader
source: https://raw.githubusercontent.com/babel/babel-loader/master/README.md
edit: https://github.com/babel/babel-loader/edit/master/README.md
---
# babel-loader
[![NPM Status](https://img.shields.io/npm/v/babel-loader.svg?style=flat)](https://www.npmjs.com/package/babel-loader)
[![Build Status](https://travis-ci.org/babel/babel-loader.svg?branch=master)](https://travis-ci.org/babel/babel-loader)
[![Build Status](https://ci.appveyor.com/api/projects/status/vgtpr2i5bykgyuqo/branch/master?svg=true)](https://ci.appveyor.com/project/danez/babel-loader/branch/master)
[![codecov](https://codecov.io/gh/babel/babel-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/babel/babel-loader)
  > Babel 是一个用来支持编写下一代 JavaScript 的编译器。

这个包允许我们使用 [Babel](https://github.com/babel/babel) 和 [webpack](https://github.com/webpack/webpack) 来转译 JavaScript 文件。

  __注意：__对于输出结果的 issues 应该提交到 babel [issue tracker](https://github.com/babel/babel/issues)。

## 安装

```bash
npm install babel-loader babel-core babel-preset-env webpack --save-dev
```

或者使用 yarn

```bash
yarn add babel-loader babel-core babel-preset-env webpack --dev
```

__注意：__ [npm](https://npmjs.com) 从 npm@3 版本开始废除了 [隐含依赖自动安装 (auto-installing of peerDependencies)](https://github.com/npm/npm/issues/6565)，所以需要的隐含依赖 (peer dependencies) 例如 babel-core 和 webpack 必须被显式的在你的 `package.json` 中列出。
 
__注意：__ 如果你正在从 babel 5 升级到 babel 6，请参考 [这篇指南](https://medium.com/@malyw/how-to-update-babel-5-x-6-x-d828c230ec53#.yqxukuzdk)。

## 用法

[文档：使用加载器](http://webpack.github.io/docs/using-loaders.html)

在你的 webpack 配置对象中，你需要添加 babel-loader 到 module 的 loaders 列表中，像下面这样：

  ```javascript
module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['env']
      }
    }
  ]
}
  ```

### 选项

参考 `babel` [选项(options)](http://babeljs.io/docs/usage/options/).

你可以通过写一个 [查询字符串(query string)](https://github.com/webpack/loader-utils) 来给加载器传递选项:

  ```javascript
module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader?presets[]=env'
    }
  ]
}
  ```

或者通过使用 [查询属性(query property)](https://webpack.github.io/docs/using-loaders.html#query-parameters)：

  ```javascript
module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['env']
      }
    }
  ]
}
  ```

或者使用全局选项：
  
> 注意这种方式只能在 webpack 1 中使用，webpack 2 中不再支持。

  ```javascript
module: {
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }
  ]
},
babel: {
  presets: ['es2015']
}
  ```

这个加载器也支持下面这些特定的选项：

* `cacheDirectory`：默认值为 `false`。当有设置时，指定的目录将用来缓存加载器的执行结果，之后的构建将尝试读取缓存来避免在每次执行时 Babel 可能产生的重新编译流程。如果设置了一个空值 (`loader: 'babel-loader?cacheDirectory'`) 或者 `true` (`loader: babel-loader?cacheDirectory=true`)，加载器将使用默认的缓存目录 `node_modules/.cache/babel-loader`，如果根目录下找不到 `node_modules` 目录，将会降级到操作系统默认的临时文件目录。

* `cacheIdentifier`：默认是一个由 babel-core 版本号，babel-loader 版本号，.babelrc 文件内容 (存在的情况下)，环境变量 `BABEL_ENV` 的值 (没有时降级到 `NODE_ENV`) 组成的字符串。它可以被设置为一个自定义的值，通过值的改变可以强制丢弃缓存。


* `babelrc`：默认值为 `true`。当设置为 `false` 时，将忽略 `.babelrc` 文件 (`extends` 选项的引用除外)。


* `forceEnv`：默认将解析 BABEL_ENV 然后是 NODE_ENV。允许你在加载器的级别上覆盖 BABEL_ENV/NODE_ENV。对在前端和服务端有不同 babel 配置的同构应用非常有用。

__注意：__`sourceMap` 选项是被忽略的。取而代之的是当你的 webpack (通过 `devtool` 配置选项)配置了 sourceMap 时将会自动被开启。

## 疑难解答

### babel-loader 很慢！

确保转译尽可能少的文件。你可能在使用 `/\.js$/` 来匹配，这样也许会去转译 `node_modules` 目录或者其他不需要的源代码。

要排除 `node_modules`，参考文档中的 `loaders` 配置的 `exclude` 选项。

你也可以通过使用 `cacheDirectory` 选项将 babel-loader 提速至少两倍。这将缓存转译的结果到文件系统中。

### babel 在每个文件都插入了辅助代码，使代码体积过大！

babel 对一些公共方法使用非常少量的辅助代码，比如 `_extend`。默认情况下它们将被加到需要的每个文件中。

你可以引入 babel runtime 作为一个独立模块取而代之，来避免重复插入。

下面的配置禁用了 babel 自动对单文件的 runtime 注入，而是引入 `babel-plugin-transform-runtime` 并且使所有辅助代码从这里引用。

更多信息请参考 [文档](http://babeljs.io/docs/plugins/transform-runtime/)。

**注意：** 你必须执行 `npm install babel-plugin-transform-runtime --save-dev` 来把它包含到你的项目中，也要使用 `npm install babel-runtime --save` 把 `babel-runtime` 安装为一个依赖。

```javascript
loaders: [
  // 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader',
    query: {
      presets: ['env'],
      plugins: ['transform-runtime']
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
require('babel-runtime/core-js/promise').default = require('bluebird');

var promise = new Promise;
```

它其实会生成下面这样 (使用了 `runtime` 后)：

```javascript
'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

require('babel-runtime/core-js/promise')['default'] = require('bluebird');

var promise = new _Promise();
```

前面的 `Promise` 库在被覆盖前已经被引用和使用了。

一种可行的办法是，在你的应用中加入一个“启动器(bootstrap)”步骤，在应用开始前先覆盖默认的全局变量。

```javascript
// bootstrap.js

require('babel-runtime/core-js/promise').default = require('bluebird');

// ...

require('./app');
```

### `babel` 的 node API 已经被移到 `babel-core` 中。

(原文：The node API for `babel` has been moved to `babel-core`.)

如果你收到这个信息，这说明你有一个已经安装的 `babel` 包，并且在 webpack 配置中使用它来作为加载器的简写 (这样的方式在 webpack 2.x 版本中将不再被支持)。

```js
  {
    test: /\.js$/,
    loader: 'babel',
  }
```

Webpack 将尝试读取 `babel` 包而不是 `babel-loader`。

要修复这个问题，你需要删除 `babel` npm 包，因为它在 babel v6 中已经被废除。(安装 `babel-cli` 或者 `babel-core` 来替代它)。

如果你的依赖中有对 `babel` 包的依赖使你无法删除它，可以在 webpack 配置中使用完整的加载器名称来解决：

```js
  {
    test: /\.js$/,
    loader: 'babel-loader',
  }
```

## [License](http://couto.mit-license.org/)
