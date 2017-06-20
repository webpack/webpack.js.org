---
title: Configuration Languages
sort: 2
contributors:
  - sokra
  - skipjack
  - tarang9211
---

webpack accepts configuration files written in multiple programming and data languages. The list of supported file extensions can be found at the [node-interpret](https://github.com/js-cli/js-interpret) package. Using [node-interpret](https://github.com/js-cli/js-interpret), webpack can handle many different types of configuration files.

For example, to use [CoffeeScript](http://coffeescript.org/), you would first install the necessary dependencies:

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
