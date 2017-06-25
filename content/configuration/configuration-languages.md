---
title: Configuration Languages
sort: 2
contributors:
  - sokra
  - skipjack
  - tarang9211
  - simon04
---

webpack accepts configuration files written in multiple programming and data languages. The list of supported file extensions can be found at the [node-interpret](https://github.com/js-cli/js-interpret) package. Using [node-interpret](https://github.com/js-cli/js-interpret), webpack can handle many different types of configuration files.


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


## Babel and JSX

In the example below JSX (React JavaScript Markup) and Babel are used to create a JSON Configuration that webpack can understand.

> Courtesy of [Jason Miller](https://twitter.com/_developit/status/769583291666169862)

First install the necessary dependencies:

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

W> If you are using babel elsewhere and have `modules` set to `false`, you will have to either maintain two separate `.babelrc` files or use `const jsxobj = require('jsxobj');` and `module.exports` instead of the new `import` and `export` syntax. This is because while Node does support many new ES6 features, they don't yet support ES6 module syntax.
