---
title: 使用不同语言进行配置(Configuration Languages)
sort: 2
contributors:
  - sokra
  - skipjack
  - tarang9211
  - simon04
---

webpack 接受以多种编程和数据语言编写的配置文件。支持的文件扩展名列表，可以在 [node-interpret](https://github.com/js-cli/js-interpret) 包中找到。使用 [node-interpret](https://github.com/js-cli/js-interpret)，webpack 可以处理许多不同类型的配置文件。

## TypeScript

To write the webpack configuration in [TypeScript](http://www.typescriptlang.org/), you would first install the necessary dependencies:

``` bash
npm install --save-dev typescript ts-node @types/node @types/webpack
```

and then proceed to write your configuration:

__webpack.config.ts__

```typescript
import * as webpack from 'webpack';
import * as path from 'path';
declare var __dirname;

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

Similarly, to use [CoffeeScript](http://coffeescript.org/), you would first install the necessary dependencies:

``` bash
npm install --save-dev coffee-script
```

and then proceed to write your configuration:

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

## JSX

In the example below JSX (React JavaScript Markup) and Babel are used to create a JSON Configuration that webpack can understand. (Courtesy of [Jason Miller](https://twitter.com/_developit/status/769583291666169862))

```javascript
import h from 'jsxobj';

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

***

> 原文：https://webpack.js.org/configuration/external-configs/