---
title: 使用不同语言进行配置(Configuration Languages)
sort: 2
contributors:
  - sokra
  - skipjack
  - tarang9211
  - simon04
  - peterblazejewicz
---

webpack 接受以多种编程和数据语言编写的配置文件。支持的文件扩展名列表，可以在 [node-interpret](https://github.com/js-cli/js-interpret) 包中找到。使用 [node-interpret](https://github.com/js-cli/js-interpret)，webpack 可以处理许多不同类型的配置文件。


## TypeScript

为了用 [TypeScript](http://www.typescriptlang.org/) 书写 webpack 的配置文件，必须先安装相关依赖：

``` bash
npm install --save-dev typescript ts-node @types/node @types/webpack
```

之后就可以使用 TypeScript 书写 webpack 的配置文件了：

__webpack.config.ts__

```typescript
import * as webpack from 'webpack';
import * as path from 'path';

const config: webpack.Configuration = {
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  }
};

export default config;
```


## CoffeeScript

类似的，为了使用 [CoffeeScript](http://coffeescript.org/) 来书写配置文件, 同样需要安装相关的依赖：

``` bash
npm install --save-dev coffee-script
```

之后就可以使用 Coffeecript 书写配置文件了：

__webpack.config.coffee__

```javascript
HtmlWebpackPlugin = require('html-webpack-plugin')
webpack = require('webpack')
path = require('path')

config =
  entry: './path/to/my/entry/file.js'
  output:
    path: path.resolve(__dirname, 'dist')
    filename: 'my-first-webpack.bundle.js'
  module: rules: [ {
    test: /\.(js|jsx)$/
    use: 'babel-loader'
  } ]
  plugins: [
    new (webpack.optimize.UglifyJsPlugin)
    new HtmlWebpackPlugin(template: './src/index.html')
  ]

module.exports = config
```


## Babel and JSX

在以下的例子中，使用了 JSX（React 形式的 javascript）以及 Babel 来创建 JSON 形式的 webpack 配置文件：

> 感谢 [Jason Miller](https://twitter.com/_developit/status/769583291666169862)

首先安装依赖：

``` js
npm install --save-dev babel-register jsxobj babel-preset-es2015
```

__.babelrc__

``` json
{
  "presets": [ "es2015" ]
}
```

__webpack.config.babel.js__

``` js
import jsxobj from 'jsxobj';

// example of an imported plugin
const CustomPlugin = config => ({
  ...config,
  name: 'custom-plugin'
});

export default (
  <webpack target="web" watch>
    <entry path="src/index.js" />
    <resolve>
      <alias {...{
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }} />
    </resolve>
    <plugins>
      <uglify-js opts={{
        compression: true,
        mangle: false
      }} />
      <CustomPlugin foo="bar" />
    </plugins>
  </webpack>
);
```

W> 如果你在其他地方也使用了 Babel 并且把`模块(modules)`设置为了 `false`，那么你要么同时维护两份单独的 `.babelrc` 文件，要么使用 `conts jsxobj = requrie('jsxobj');` 并且使用 `moduel.exports` 而不是新版本的 `import` 和 `export` 语法。这是因为尽管 Node.js 已经支持了许多 ES6 的新特性，然而还无法支持 ES6 模块语法。

***

> 原文：https://webpack.js.org/configuration/configuration-languages/
